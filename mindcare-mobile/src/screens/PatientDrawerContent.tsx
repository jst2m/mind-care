// src/screens/PatientDrawerContent.tsx
import React from 'react';
import { Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import tw from 'twrnc';
import { removeToken } from '../utils/authStorage';
import { useNavigation } from '@react-navigation/native';

export default function PatientDrawerContent(props: any) {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            await removeToken();
            navigation.replace('Login' as never);
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
