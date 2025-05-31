// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import tw from 'twrnc';

// Importez API_HOST depuis config.ts
import { API_HOST } from '../utils/config';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { storeToken } from '../utils/authStorage';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      // Utilisez `API_HOST` pour pointer vers votre back-end
      const response = await fetch(`${API_HOST}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse: password }),
      });

      console.log('Status HTTP login :', response.status);
      const data = await response.json();
      console.log('Body login :', data);

      if (!response.ok) {
        Alert.alert('Connexion impossible', data.message || 'Identifiants invalides');
        return;
      }

      // Supposons que le back-end renvoie { accessToken: "…" }
      const { accessToken } = data as { accessToken: string };
      if (!accessToken) {
        Alert.alert('Erreur', 'Aucun token renvoyé par le serveur.');
        return;
      }
      await storeToken(accessToken);

      navigation.replace('Home');
    } catch (error) {
      console.error('Erreur au login :', error);
      Alert.alert('Erreur', 'Impossible de se connecter. Veuillez réessayer.');
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-6 bg-gray-50`}>
      <Text style={tw`text-3xl text-center font-bold mb-6`}>Connexion</Text>

      <Text style={tw`text-sm text-gray-600 mb-1`}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="exemple@domaine.com"
        keyboardType="email-address"
        autoCapitalize="none"
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
      />

      <Text style={tw`text-sm text-gray-600 mb-1`}>Mot de passe</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-6`}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={tw`w-full bg-green-700 rounded-full py-3 items-center`}
        activeOpacity={0.8}
      >
        <Text style={tw`text-white font-semibold`}>Se connecter</Text>
      </TouchableOpacity>

      <View style={tw`mt-4 flex-row justify-center`}>
        <Text style={tw`text-gray-600`}>Pas encore de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Signup')}>
          <Text style={tw`text-green-700 font-semibold`}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
