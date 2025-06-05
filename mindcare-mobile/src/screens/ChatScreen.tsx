// src/screens/ChatScreen.tsx

import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { apiFetch } from "../utils/api";
import { colors, typography } from "../styles/theme";

type RootStackParamList = {
  ChatScreen: {
    professionnelUuid: string;
    professionnelName: string;
  };
};

type ChatRouteProp = RouteProp<RootStackParamList, "ChatScreen">;

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text>Aucun chat disponible.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const professionnelUuid = route.params.professionnelUuid;
  const professionnelName = route.params.professionnelName;

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [newMsg, setNewMsg] = useState<string>("");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    navigation.setOptions({ title: professionnelName });
    loadConversation();
  }, [professionnelUuid, professionnelName]);

  const loadConversation = async () => {
    if (!professionnelUuid) return;
    try {
      const data = await apiFetch<MessageItem[]>(`/messages/conversation/${professionnelUuid}`);
      setMessages(data);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 50);
    } catch (err) {
      console.error("Erreur chargement conversation :", err);
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !professionnelUuid) return;
    try {
      const payload = {
        toUuid: professionnelUuid,
        contenu: newMsg.trim(),
      };
      const sent = await apiFetch<MessageItem>("/messages", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setMessages((prev) => [...prev, sent]);
      setNewMsg("");
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50);
    } catch (err) {
      console.error("Erreur envoi message :", err);
    }
  };

  const renderItem = ({ item }: { item: MessageItem }) => {
    let textMsg = "";
    if (typeof item.contenu === "string") {
      textMsg = item.contenu;
    } else if (
      item.contenu &&
      typeof item.contenu === "object" &&
      Array.isArray(item.contenu.data)
    ) {
      textMsg = String.fromCharCode(...item.contenu.data);
    }

    const isMine = item.deUuid !== professionnelUuid;

    return (
      <View
        style={[
          styles.bubble,
          isMine ? styles.bubbleMine : styles.bubbleTheirs,
        ]}
      >
        <Text style={isMine ? styles.textMine : styles.textTheirs}>{textMsg}</Text>
        <Text style={styles.timeStamp}>
          {new Date(item.dateEnvoi).toLocaleTimeString("fr-FR")}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={newMsg}
            onChangeText={setNewMsg}
            placeholder="Écrire un message..."
            style={styles.textInput}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Feather name="send" size={24} color={colors.green700} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    marginHorizontal: 16,
    marginVertical: 8,
    maxWidth: "75%",
    borderRadius: 16,
    padding: 12,
  },
  bubbleMine: {
    alignSelf: "flex-end",
    backgroundColor: colors.green100,
  },
  bubbleTheirs: {
    alignSelf: "flex-start",
    backgroundColor: colors.gray200,
  },
  textMine: {
    textAlign: "right",
    color: colors.green700,
  },
  textTheirs: {
    textAlign: "left",
    color: colors.gray800,
  },
  timeStamp: {
    fontSize: 10,
    color: colors.gray500,
    marginTop: 4,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.gray300,
    padding: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: 14,
  },
});
