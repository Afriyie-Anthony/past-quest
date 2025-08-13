import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <View className="w-full">
        <Text className="text-4xl font-bold text-black mb-2 text-center">
          Past <Text className="text-purple-600">Q</Text>uest
        </Text>
        <Text className="text-lg font-semibold text-gray-900 mb-1 text-center">Create your account</Text>
        
        <Text className="text-md text-gray-700 mb-1">Full Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
        <Text className="text-md text-gray-700 mb-1">Student ID</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
          placeholder="Enter your student ID"
          value={studentId}
          onChangeText={setStudentId}
        />
        <Text className="text-md text-gray-700 mb-1">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text className="text-md text-gray-700 mb-1">Confirm Password</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => setAgree(!agree)}
            className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center"
            style={{ backgroundColor: agree ? '#800080' : '#fff' }}
          >
            {agree ? (
              <Ionicons name="checkmark" size={16} color="#fff" />
            ) : null}
          </TouchableOpacity>
          <Text className="ml-2 text-gray-700">
            I agree to the{' '}
            <Text className="text-purple-600 underline">Terms of Service</Text> and{' '}
            <Text className="text-purple-600 underline">Privacy Policy</Text>
          </Text>
        </View>
        <TouchableOpacity className="bg-purple-700 rounded-lg py-3 mt-2" onPress={() => {/* handle signup */}}>
          <Text className="text-white text-center font-bold text-base">Create account</Text>
        </TouchableOpacity>

        <Text className="text-md text-gray-500 my-10 text-center">
          Already have an account?{' '}
          <Text className="text-purple-600" onPress={() => router.push('/auth/login')}>Sign in here</Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;