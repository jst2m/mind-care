// src/screens/JournalScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import tw from 'twrnc';

type Entry = {
  id: string;
  date: string;
  mood: number;
  notes: string;
};

const sampleEntries: Entry[] = [
  { id: '1', date: '30/05/2025', mood: 7, notes: 'Je me suis senti calme après la méditation.' },
  { id: '2', date: '29/05/2025', mood: 4, notes: 'Journée stressante au travail.' },
];

export default function JournalScreen() {
  const [entries, setEntries] = useState<Entry[]>(sampleEntries);
  const [mood, setMood] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const addEntry = () => {
    const moodNum = Number(mood);
    if (!mood || isNaN(moodNum) || moodNum < 1 || moodNum > 10) {
      Alert.alert('Erreur', 'Veuillez entrer une humeur valide entre 1 et 10.');
      return;
    }

    const newEntry: Entry = {
      id: String(entries.length + 1),
      date: new Date().toLocaleDateString('fr-FR'),
      mood: moodNum,
      notes,
    };

    setEntries([newEntry, ...entries]);
    setMood('');
    setNotes('');
  };

  const renderItem = ({ item }: { item: Entry }) => (
    <View style={tw`border border-gray-200 rounded-2xl p-4 bg-white shadow mb-4`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-gray-500 text-sm`}>{item.date}</Text>
        <View style={tw`bg-green-100 px-2 py-1 rounded-full`}>
          <Text style={tw`text-green-800 font-semibold`}>Humeur : {item.mood}/10</Text>
        </View>
      </View>
      <Text style={tw`text-green-600`}>{item.notes}</Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <ScrollView contentContainerStyle={tw`p-6`}>
        <Text style={tw`text-3xl text-center text-green-700 font-bold mb-6`}>Journal Émotionnel</Text>

        <View style={tw`mb-8`}>
          <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Nouvelle Entrée</Text>
          <Text style={tw`text-sm text-gray-600 mb-1`}>Humeur (1–10)</Text>
          <TextInput
            keyboardType="numeric"
            value={mood}
            onChangeText={setMood}
            placeholder="Ex : 7"
            style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4`}
          />

          <Text style={tw`text-sm text-gray-600 mb-1`}>Notes</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Écrivez vos pensées..."
            style={tw`w-full border border-gray-300 rounded-lg p-2 mb-4 h-24`}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            onPress={addEntry}
            style={tw`w-full bg-green-700 rounded-full py-3 items-center`}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white font-semibold`}>Ajouter</Text>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={entries}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={tw`pb-8`}
          />
        </View>
      </ScrollView>
    </View>
  );
}
