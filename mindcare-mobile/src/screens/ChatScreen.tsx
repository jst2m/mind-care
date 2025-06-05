import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';
import { apiFetch } from '../utils/api';

type RootStackParamList = {
  ChatScreen: {
    professionnelUuid: string;
    professionnelName: string;
  };
};

type ChatRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

/** Structure renvoyée par l’API pour un message */
type MessageItem = {
  id: number;
  deUuid: string;
  aUuid: string;
  dateEnvoi: string;
  contenu: { type: string; data: number[] } | string;
};

export default function ChatScreen() {
  const route = useRoute<ChatRouteProp>();
  const navigation = useNavigation();

  if (!route.params) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <Text>Aucun chat disponible.</Text>
      </View>
    );
  }

  const professionnelUuid = route.params.professionnelUuid;
  const professionnelName = route.params.professionnelName;

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [newMsg, setNewMsg] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    navigation.setOptions({ title: professionnelName });
    loadConversation();
  }, [professionnelUuid, professionnelName]);

  const loadConversation = async () => {
    if (!professionnelUuid) return;
    try {
      const data = await apiFetch<MessageItem[]>(
        `/messages/conversation/${professionnelUuid}`
      );
      setMessages(data);

      // scroll automatique vers le bas après un court délai
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 50);
    } catch (err) {
      console.error('Erreur chargement conversation :', err);
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !professionnelUuid) return;
    try {
      const payload = {
        toUuid: professionnelUuid,
        contenu: newMsg.trim(),
      };
      const sent = await apiFetch<MessageItem>('/messages', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setMessages((prev) => [...prev, sent]);
      setNewMsg('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50);
    } catch (err) {
      console.error('Erreur envoi message :', err);
    }
  };

  const renderItem = ({ item }: { item: MessageItem }) => {
    // Reconstruire le texte à partir du Buffer reçu ou simple string
    let textMsg = '';
    if (typeof item.contenu === 'string') {
      textMsg = item.contenu;
    } else if (
      item.contenu &&
      typeof item.contenu === 'object' &&
      Array.isArray(item.contenu.data)
    ) {
      textMsg = String.fromCharCode(...item.contenu.data);
    }

    // Alignement à droite si l’expéditeur ≠ pro (i.e. c’est le patient qui a envoyé)
    const isMine = item.deUuid !== professionnelUuid;

    return (
      <View
        style={tw`mx-4 my-2 max-w-3/4 ${
          isMine ? 'self-end bg-green-100' : 'self-start bg-gray-200'
        } rounded-xl p-3`}
      >
        <Text
          style={tw`${
            isMine ? 'text-right text-green-800' : 'text-left text-gray-800'
          }`}
        >
          {textMsg}
        </Text>
        <Text style={tw`text-xs text-gray-500 mt-1`}>
          {new Date(item.dateEnvoi).toLocaleTimeString('fr-FR')}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-white`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      <View style={tw`flex-row items-center border-t border-gray-300 p-2`}>
        <TextInput
          value={newMsg}
          onChangeText={setNewMsg}
          placeholder="Écrire un message..."
          style={tw`flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2`}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Feather name="send" size={24} color="#10B981" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
