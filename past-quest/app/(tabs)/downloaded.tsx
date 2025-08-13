import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const downloadedFiles = [
  {
    name: 'Mathematics Final Exam 2023.pdf',
    size: '1.2 MB',
    date: 'Apr 14, 2025',
  },
  {
    name: 'Software Engineering Pasco.docx',
    size: '800 KB',
    date: 'Apr 15, 2025',
  },
];

const Downloaded = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      <Text className="text-3xl font-bold text-black mb-2 text-center">Downloaded Files</Text>
      <Text className="text-base text-gray-600 mb-6 text-center">Access your downloaded past questions here for offline study.</Text>

      {downloadedFiles.length === 0 ? (
        <View className="items-center mt-20">
          <Ionicons name="cloud-download-outline" size={48} color="#800080" />
          <Text className="text-gray-500 mt-4">No files downloaded yet.</Text>
        </View>
      ) : (
        downloadedFiles.map((file, idx) => (
          <View key={idx} className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex-row items-center">
            <Ionicons name="document-outline" size={32} color="#800080" className="mr-4" />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">{file.name}</Text>
              <Text className="text-xs text-gray-500">{file.size} • Downloaded on {file.date}</Text>
            </View>
            <TouchableOpacity className="bg-purple-50 px-4 py-2 rounded-lg flex-row items-center ml-2" activeOpacity={0.8}>
              <Ionicons name="open-outline" size={18} color="#800080" />
              <Text className="ml-2 text-purple-800 font-semibold">Open</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Downloaded;