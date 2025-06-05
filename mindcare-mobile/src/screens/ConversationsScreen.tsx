// src/screens/ConversationsScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, typography, commonStyles } from "../styles/theme";

type ConversationItem = {
  professionnelUuid: string;
  professionnelName: string;
  lastMessage: string;
  lastDate: string; 
};

export default function ConversationsScreen() {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const fakeData: ConversationItem[] = [
      {
        professionnelUuid: "66666666-6666-6666-6666-666666666666",
        professionnelName: "Dr. Martin",
        lastMessage: "Bonjour, comment allez-vous aujourd'hui ?",
        lastDate: "2025-06-05T14:20:00.000Z",
      },
      {
        professionnelUuid: "77777777-7777-7777-7777-777777777777",
        professionnelName: "Mme Dupont",
        lastMessage: "N’oubliez pas votre séance de demain à 10 h !",
        lastDate: "2025-06-04T09:15:00.000Z",
      },
    ];

    setTimeout(() => {
      setConversations(fakeData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" color={colors.olive} />
      </View>
    );
  }

  if (conversations.length === 0) {
    return (
      <View style={commonStyles.centered}>
        <Text style={[typography.bodyMedium, { color: colors.gray500 }]}>
          Vous n’avez pas encore de conversation.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: ConversationItem }) => {
    const date = new Date(item.lastDate);
    const formatted = `${date.toLocaleDateString("fr-FR")} ${date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    return (
      <TouchableOpacity
        style={styles.convoCard}
        onPress={() =>
          navigation.navigate("ChatScreen", {
            professionnelUuid: item.professionnelUuid,
            professionnelName: item.professionnelName,
          })
        }
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.convoTitle}>{item.professionnelName}</Text>
          <Text style={styles.convoSubtitle} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        <Text style={styles.convoDate}>{formatted}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.professionnelUuid}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: colors.creamLight,
  },
  convoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  convoTitle: {
    ...typography.bodyMedium,
    fontWeight: "600",
    color: colors.brownDark,
    marginBottom: 4,
  },
  convoSubtitle: {
    ...typography.bodyRegular,
    color: colors.gray500,
    fontSize: 14,
    width: 200,
  },
  convoDate: {
    ...typography.bodyRegular,
    color: colors.gray300,
    fontSize: 12,
  },
});
