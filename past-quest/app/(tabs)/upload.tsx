import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [examType, setExamType] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      <View className="items-center mb-2 mt-10">
        <Ionicons name="cloud-upload-outline" size={48} color="#800080" />
      </View>
      <Text className="text-3xl font-bold text-black mb-2 text-center">Upload Past Questions</Text>
      <Text className="text-base text-gray-600 mb-6 text-center">Share your knowledge and help others by uploading past exam questions to our repository.</Text>

      {/* Upload Form Card */}
      <View className="bg-white py-4 px-2 mb-8">
        <Text className="text-xl font-bold text-purple-800 mb-1">Question Upload Form</Text>
        <Text className="text-sm text-gray-500 mb-4">Add new questions to the repository for students to practice with.</Text>

        {/* Title */}
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
          placeholder="e.g., Mathematics Final Exam 2023"
          value={title}
          onChangeText={setTitle}
        />
        <Text className="text-xs text-gray-500 mb-2">Give your question set a descriptive title.</Text>

        {/* Course & Year */}
        <View className="flex-row mb-3">
          <View className="flex-1 mr-2">
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-base"
              placeholder="Course (e.g., Mathematics)"
              value={course}
              onChangeText={setCourse}
            />
          </View>
          <View className="flex-1">
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-base"
              placeholder="Year (e.g., 2025)"
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text className="text-xs text-gray-500 mb-2">The year the exam was taken</Text>

        {/* Exam Type */}
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
          placeholder="Exam Type (e.g., Final, Midsem, Quiz)"
          value={examType}
          onChangeText={setExamType}
        />

        {/* Description */}
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
          placeholder="Add a description of the question set..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
        <Text className="text-xs text-gray-500 mb-2">Provide additional details about the question set.</Text>

        {/* Upload Files */}
        <TouchableOpacity
          className="border-2 border-dashed border-gray-300 rounded-2xl p-6 items-center mb-4 bg-gray-50"
          activeOpacity={0.8}
          onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync({
              type: ["application/pdf", "application/msword", "image/jpeg", "image/png"],
              multiple: true,
              copyToCacheDirectory: true,
            });
            if (result && result.assets && result.assets.length > 0) {
              setFiles((prev) => [...prev, ...result.assets]);
            }
          }}
        >
          <Ionicons name="cloud-upload-outline" size={36} color="#800080" />
          <Text className="text-base font-semibold text-gray-700 mt-2 mb-1">Tap to browse files</Text>
          <Text className="text-xs text-gray-500 mb-2">(PDF, DOCX, JPG, PNG)</Text>
          <Text className="text-xs text-gray-400">Upload your question files (PDF, DOCX, etc.).</Text>
          {files && files.length > 0 && (
            <View className="mt-2">
              {files.map((file, idx) => (
                <Text key={idx} className="text-xs text-purple-800">{file.name || file.uri}</Text>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Upload Button */}
        <TouchableOpacity className="bg-purple-700 rounded-lg py-3 mt-2" activeOpacity={0.9}>
          <Text className="text-white text-center font-bold text-base">Upload Questions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Upload;