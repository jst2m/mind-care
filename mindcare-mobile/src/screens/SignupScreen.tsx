// src/screens/SignupScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { storeToken } from '../utils/authStorage';

// Remplacez l'import pour qu'il pointe vers config.ts
import { API_HOST } from '../utils/config';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

export default function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>(''); // ex. "1990-05-15"
  const [gender, setGender] = useState<'Homme' | 'Femme' | 'Ne préfère pas dire'>('Homme');

  const handleSignup = async () => {
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    // Vérifier le format de l’email de base
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
      return;
    }

    try {
      // 1) Appel à l’API avec l’URL correcte (API_HOST vient de config.ts)
      const response = await fetch(`${API_HOST}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: firstname.trim(),
          nom: lastname.trim(),
          email: email.trim(),
          motDePasse: password,
          dateNaissance: birthDate || undefined, // facultatif
          sexe: gender,             // "Homme" | "Femme" | "Ne préfère pas dire"
          role: 'patient',          // ou "professionnel"
        }),
      });

      console.log('Status HTTP signup :', response.status);
      const data = await response.json();
      console.log('Body signup :', data);

      // 2) Si conflit (409), afficher un message
      if (response.status === 409) {
        Alert.alert('Inscription impossible', data.message || 'Email déjà utilisé');
        return;
      }
      // 3) Si erreur générique (400, 500, etc.), afficher message
      if (!response.ok) {
        Alert.alert('Erreur', data.message || 'Problème lors de l’inscription');
        return;
      }

      // 4) Si tout va bien, on récupère le token et on stocke
      const { accessToken } = data as { accessToken: string };
      if (!accessToken) {
        Alert.alert('Erreur', 'Aucun token renvoyé par le serveur.');
        return;
      }
      await storeToken(accessToken);

      // 5) Naviguer vers l’écran protégé
      navigation.replace('Home');
    } catch (error) {
      console.error('Erreur à l’inscription :', error);
      Alert.alert(
        'Erreur réseau',
        'Impossible de contacter le serveur. Vérifiez l’URL et la connexion.'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1 justify-center px-6 bg-gray-50`}>
      <Text style={tw`text-3xl text-center font-bold mb-6`}>Inscription</Text>

      {/* Prénom */}
      <Text style={tw`text-sm text-gray-600 mb-1`}>Prénom</Text>
      <TextInput
        value={firstname}
        onChangeText={setFirstname}
        placeholder="Entrez votre prénom"
        autoCapitalize="words"
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
      />

      {/* Nom */}
      <Text style={tw`text-sm text-gray-600 mb-1`}>Nom</Text>
      <TextInput
        value={lastname}
        onChangeText={setLastname}
        placeholder="Entrez votre nom"
        autoCapitalize="words"
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
      />

      {/* Email */}
      <Text style={tw`text-sm text-gray-600 mb-1`}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="exemple@domaine.com"
        keyboardType="email-address"
        autoCapitalize="none"
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
      />

      {/* Mot de passe */}
      <Text style={tw`text-sm text-gray-600 mb-1`}>Mot de passe</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
      />

      {/* Confirmation */}
      <Text style={tw`text-sm text-gray-600 mb-1`}>Confirmez le mot de passe</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="••••••••"
        secureTextEntry
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
      />

      {/* Date de naissance (optionnel) */}
      <Text style={tw`text-sm text-gray-600 mb-1`}>Date de naissance (YYYY-MM-DD)</Text>
      <TextInput
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="1990-05-15"
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
      />

      {/* Sexe */}
      <Text style={tw`text-sm text-gray-600 mb-1`}>Sexe</Text>
      <TextInput
        value={gender}
        onChangeText={(text) => {
          if (['Homme', 'Femme', 'Ne préfère pas dire'].includes(text))
            setGender(text as any);
        }}
        placeholder="Homme / Femme / Ne préfère pas dire"
        style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
      />

      <TouchableOpacity
        onPress={handleSignup}
        style={tw`w-full bg-green-700 rounded-full py-3 items-center mb-4`}
        activeOpacity={0.8}
      >
        <Text style={tw`text-white font-semibold`}>S'inscrire</Text>
      </TouchableOpacity>

      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-gray-600`}>Vous avez déjà un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={tw`text-green-700 font-semibold`}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
