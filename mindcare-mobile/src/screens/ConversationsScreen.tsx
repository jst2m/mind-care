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
import { apiFetch } from "../utils/api";
import { colors, typography, commonStyles } from "../styles/theme";
import { useAuth } from "../contexts/AuthContext";

type Message = {
  id: number;
  deUuid: string;
  aUuid: string;
  dateEnvoi: string;
  contenu: { type: string; data: number[] } | string;
};

type ConversationItem = {
  professionnelUuid: string;
  professionnelName: string;
  lastMessage: string;
  lastDate: string;
};

export default function ConversationsScreen() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1) Récupère tous les messages
      const allMessages = await apiFetch<Message[]>("/messages");

      // 2) Filtre ceux du patient connecté
      const messagesPatient = allMessages.filter(
        (m) => m.deUuid === user?.uuid || m.aUuid === user?.uuid
      );

      // 3) Groupe par proUuid (dernier message en date)
      const grouped: Record<string, Message> = {};
      messagesPatient.forEach((msg) => {
        const proUuid = msg.deUuid === user?.uuid ? msg.aUuid : msg.deUuid;

        let textMsg = "";
        if (typeof msg.contenu === "string") {
          textMsg = msg.contenu;
        } else if (
          msg.contenu &&
          typeof msg.contenu === "object" &&
          Array.isArray(msg.contenu.data)
        ) {
          textMsg = String.fromCharCode(...msg.contenu.data);
        }

        if (
          !grouped[proUuid] ||
          new Date(msg.dateEnvoi) > new Date(grouped[proUuid].dateEnvoi)
        ) {
          grouped[proUuid] = {
            ...msg,
            contenu: textMsg,
          } as unknown as Message;
        }
      });

      const result: ConversationItem[] = Object.keys(grouped).map((proUuid) => ({
        professionnelUuid: proUuid,
        professionnelName: "",
        lastMessage: grouped[proUuid].contenu as string,
        lastDate: grouped[proUuid].dateEnvoi,
      }));

      setConversations(result);
    } catch (e: any) {
      console.error("Erreur fetch convos :", e);
      setError("Impossible de charger vos conversations.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" color={colors.olive} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={[typography.bodyMedium, { color: colors.red600 }]}>
          {error}
        </Text>
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
          navigation.navigate("HomeTab", {
            screen: "Chat",
            params: {
              professionnelUuid: item.professionnelUuid,
              professionnelName:
                item.professionnelName || item.professionnelUuid.substring(0, 6),
            },
          })
        }
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.convoTitle}>
            {item.professionnelName || item.professionnelUuid.substring(0, 6)}
          </Text>
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
