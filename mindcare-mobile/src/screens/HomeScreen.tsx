// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={tw`flex-1 bg-gray-50`}>
      <ImageBackground
        source={require('../../assets/hero.jpg')}
        style={tw`w-full h-64`}
        imageStyle={tw`opacity-80`}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 items-center justify-center`}>
          <Text style={tw`text-4xl text-white font-bold`}>Bienvenue sur mindCare</Text>
        </View>
      </ImageBackground>

      <View style={tw`px-6 py-8`}>
        <View style={tw`mb-12 items-center`}>
          <Text style={tw`text-2xl text-gray-800 font-semibold mb-2 text-center`}>
            Prenez soin de votre santé mentale
          </Text>
          <Text style={tw`text-gray-600 text-center`}>
            Sur mindCare, explorez des exercices de relaxation, tenez votre journal émotionnel et suivez votre bien-être au quotidien.
          </Text>
        </View>

        <View style={tw`space-y-6`}>
          {/* Exercices */}
          <TouchableOpacity
            style={tw`bg-white rounded-2xl p-6 shadow-lg`}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Exercises' as never)}
          >
            <Text style={tw`text-xl text-green-700 font-semibold mb-2`}>Exercices</Text>
            <Text style={tw`text-gray-600 mb-4`}>
              Détendez-vous avec nos exercices guidés de méditation, respiration et relaxation.
            </Text>
            <View style={tw`items-start`}>
              <View style={tw`px-4 py-2 bg-green-700 rounded-full`}>
                <Text style={tw`text-white font-semibold`}>Découvrir</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Journal */}
          <TouchableOpacity
            style={tw`bg-white rounded-2xl p-6 shadow-lg`}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Journal' as never)}
          >
            <Text style={tw`text-xl text-green-700 font-semibold mb-2`}>Journal de bord</Text>
            <Text style={tw`text-gray-600 mb-4`}>
              Tenez un journal émotionnel pour suivre votre humeur et vos pensées.
            </Text>
            <View style={tw`items-start`}>
              <View style={tw`px-4 py-2 bg-green-700 rounded-full`}>
                <Text style={tw`text-white font-semibold`}>Écrire</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
