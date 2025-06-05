import React from "react";
import { Alert } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import tw from "twrnc";
import { useAuth } from "../contexts/AuthContext";

export default function PatientDrawerContent(props: any) {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            await logout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Déconnexion"
        labelStyle={tw`text-red-600`}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}
