// src/screens/SearchProsScreen.tsx

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { apiFetch } from "../utils/api";
import { colors, typography, commonStyles, fonts } from "../styles/theme";

type ProsItem = {
  uuid: string;
  specialite: string;
  description: string;
  telephonePro: string;
  siteWeb: string;
  utilisateur: {
    prenom: string;
    nom: string;
  };
};

export default function SearchProsScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pros, setPros] = useState<ProsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const handle = setTimeout(() => {
      fetchPros(searchTerm);
    }, 400);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  const fetchPros = async (term: string) => {
    try {
      setLoading(true);
      const url =
        term && term.trim().length > 0
          ? `/professionnels?search=${encodeURIComponent(term.trim())}`
          : "/professionnels";

      const data = await apiFetch<ProsItem[]>(url);
      setPros(data);
    } catch (err) {
      console.error("Erreur fetch pros :", err);
      setPros([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ProsItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChatScreen", {
            professionnelUuid: item.uuid,
            professionnelName: `${item.utilisateur.prenom} ${item.utilisateur.nom}`,
          });
        }}
        style={styles.iconButton}
      >
        <Feather name="message-circle" size={24} color={colors.olive} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => {
          navigation.navigate("ProProfile", {
            professionnelUuid: item.uuid,
            professionnelName: `${item.utilisateur.prenom} ${item.utilisateur.nom}`,
          });
        }}
      >
        <Text style={styles.itemTitle}>
          {item.utilisateur.prenom} {item.utilisateur.nom}
        </Text>
        <Text style={styles.itemSubtitle}>{item.specialite}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Rechercher un professionnel"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.olive} style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={pros}
          keyExtractor={(item) => item.uuid}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>
              {searchTerm ? "Aucun professionnel trouvé." : "Tapez pour rechercher un psy…"}
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.creamLight,
  },
  searchContainer: {
    padding: 16,
  },
  input: {
    ...commonStyles.input,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyText: {
    ...typography.bodyRegular,
    color: colors.gray500,
    textAlign: "center",
    marginTop: 32,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  iconButton: {
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: fonts.baseSans,
    fontSize: 16,
    fontWeight: "600",
    color: colors.brownDark,
  },
  itemSubtitle: {
    fontFamily: fonts.baseSans,
    fontSize: 14,
    color: colors.gray500,
  },
});
