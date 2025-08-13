import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const subjects = ['All Subjects', 'Mathematics', 'English', 'Biology', 'Physics', 'Chemistry', 'Software Engineering'];
const years = ['All Years', '2025', '2024', '2023', '2022'];
const examTypes = ['All Exam Types', 'midsem', 'final', 'quiz'];

const questions = [
  {
    title: 'Mathematics past question',
    date: '2023-05-16T00:00:00.000Z',
    type: 'midsem',
    description: 'MATHS obj',
    files: 2,
    uploaded: 'Apr 14, 2025',
  },
  {
    title: 'Software Engineering Pasco',
    date: '2024-01-01T00:00:00.000Z',
    type: 'midsem',
    description: 'Solved with 99% accuracy',
    files: 0,
    uploaded: 'Apr 15, 2025',
  },
];

const Browse = () => {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState(subjects[0]);
  const [year, setYear] = useState(years[0]);
  const [examType, setExamType] = useState(examTypes[0]);

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      <Text className="text-3xl font-bold text-black mb-2 mt-10 text-center">Browse Past Questions</Text>
      <Text className="text-base text-gray-600 mb-6 text-center">Search and filter through our repository to find the perfect practice materials</Text>

      {/* Question Repository Card */}
      <View className="bg-white rounded-2xl shadow-sm p-4 mb-8">
        <Text className="text-xl font-bold text-purple-800 mb-1">Question Repository</Text>
        <Text className="text-sm text-gray-500 mb-4">Search and filter through our collection of past exam questions.</Text>
        <View className="flex-row items-center mb-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2 text-base"
            placeholder="Search by title or description..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity className="bg-purple-700 px-4 py-3 rounded-lg" activeOpacity={0.8}>
            <Text className="text-white font-semibold">Search</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mb-4">
          {/* Subject Filter */}
          <View className="flex-1 mr-2">
            <TouchableOpacity className="border border-gray-300 rounded-lg px-3 py-2 bg-white" activeOpacity={0.8}>
              <Text className="text-gray-700">{subject}</Text>
            </TouchableOpacity>
          </View>
          {/* Year Filter */}
          <View className="flex-1 mr-2">
            <TouchableOpacity className="border border-gray-300 rounded-lg px-3 py-2 bg-white" activeOpacity={0.8}>
              <Text className="text-gray-700">{year}</Text>
            </TouchableOpacity>
          </View>
          {/* Exam Type Filter */}
          <View className="flex-1">
            <TouchableOpacity className="border border-gray-300 rounded-lg px-3 py-2 bg-white" activeOpacity={0.8}>
              <Text className="text-gray-700">{examType}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Questions List */}
      {questions.map((q, idx) => (
        <View key={idx} className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-1">{q.title}</Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar-outline" size={16} color="#f59e42" />
            <Text className="ml-1 text-xs text-yellow-700">{q.date}</Text>
            <View className="ml-2 px-2 py-1 rounded-full bg-purple-100">
              <Text className="text-xs text-purple-800">{q.type}</Text>
            </View>
          </View>
          <Text className="text-gray-700 mb-2">{q.description}</Text>
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center">
              <Ionicons name="document-outline" size={16} color="#888" />
              <Text className="ml-1 text-xs text-gray-600">{q.files} files</Text>
            </View>
            <Text className="text-xs text-gray-500">Uploaded on {q.uploaded}</Text>
            <TouchableOpacity className="bg-purple-50 px-4 py-2 rounded-lg flex-row items-center" activeOpacity={0.8}>
              <Ionicons name="cloud-download-outline" size={18} color="#800080" />
              <Text className="ml-2 text-purple-800 font-semibold">Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Browse;