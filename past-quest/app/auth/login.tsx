import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-4 -mt-20">
      <View className="w-full max-w-md bg-white p-6">
        <Text className="text-4xl font-bold text-black mb-4 text-center">
          Past<Text className="text-purple-600">Q</Text>uest
        </Text>
        <Text className="text-xl font-semibold text-gray-900 mb-1 text-center">Welcome back!</Text>
        
        <Text className="text-md text-gray-700 mb-1">Student ID</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-6 text-base"
          placeholder="Enter your student ID"
          value={studentId}
          onChangeText={setStudentId}
        />
        <Text className="text-md text-gray-700 mb-1">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center"
              style={{ backgroundColor: rememberMe ? '#800080' : '#fff' }}
            >
              {rememberMe ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : null}
            </TouchableOpacity>
            <Text className="ml-2 text-gray-700">Remember me</Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/auth/forgot-password')}>
            <Text className="text-purple-600 text-sm">Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-purple-700 rounded-lg py-3 mt-5 mb-10" onPress={() => router.replace('/(tabs)/home')}>
          <Text className="text-white text-center font-bold text-base">Sign in</Text>
        </TouchableOpacity>

        <Text className="text-md text-gray-500 mb-4 text-center">
          Don&apos;t have an account?{' '}
          <Text className="text-purple-600" onPress={() => router.replace('/auth/signup')}>Sign up now</Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;