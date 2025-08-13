import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const [name, setName] = useState('Student Name');
  const [email, setEmail] = useState('student@email.com');
  const [bio, setBio] = useState('A passionate student eager to learn and share knowledge.');
  const [editing, setEditing] = useState(false);

  // Example stats
  const uploads = 12;
  const downloads = 34;
  const reputation = 120;

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      {/* Profile Header */}
      <View className="items-center mb-8">
        <Image source={require('../../assets/images/getstarted.jpg')} style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 12 }} />
        {editing ? (
          <TextInput
            className="text-2xl font-bold text-gray-900 text-center mb-1"
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
          />
        ) : (
          <Text className="text-2xl font-bold text-gray-900">{name}</Text>
        )}
        {editing ? (
          <TextInput
            className="text-base text-gray-500 mb-2 text-center"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
        ) : (
          <Text className="text-base text-gray-500 mb-2">{email}</Text>
        )}
        {editing ? (
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 mb-2 text-base text-center"
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            multiline
          />
        ) : (
          <Text className="text-sm text-gray-600 mb-2 text-center">{bio}</Text>
        )}
        <TouchableOpacity
          className={`bg-${editing ? 'green' : 'purple'}-700 rounded-full px-6 py-2 mt-2`}
          activeOpacity={0.9}
          onPress={() => setEditing(!editing)}
        >
          <Text className="text-white font-semibold">{editing ? 'Save Profile' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View className="flex-row justify-between bg-gray-50 rounded-2xl shadow-sm px-6 py-4 mb-8">
        <View className="items-center">
          <Ionicons name="cloud-upload-outline" size={28} color="#800080" />
          <Text className="text-lg font-bold text-purple-800 mt-1">{uploads}</Text>
          <Text className="text-xs text-gray-500">Uploads</Text>
        </View>
        <View className="items-center">
          <Ionicons name="cloud-download-outline" size={28} color="#800080" />
          <Text className="text-lg font-bold text-purple-800 mt-1">{downloads}</Text>
          <Text className="text-xs text-gray-500">Downloads</Text>
        </View>
        <View className="items-center">
          <Ionicons name="star" size={28} color="#FFD700" />
          <Text className="text-lg font-bold text-yellow-600 mt-1">{reputation}</Text>
          <Text className="text-xs text-gray-500">Reputation</Text>
        </View>
      </View>

      {/* Account Actions */}
      <View className="bg-white rounded-2xl shadow-md p-4 mb-8">
        <Text className="text-lg font-bold text-purple-800 mb-2">Account</Text>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100" activeOpacity={0.8}>
          <Ionicons name="cloud-upload-outline" size={22} color="#800080" className="mr-3" />
          <Text className="text-gray-700">My Uploads</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100" activeOpacity={0.8}>
          <Ionicons name="cloud-download-outline" size={22} color="#800080" className="mr-3" />
          <Text className="text-gray-700">My Downloads</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100" activeOpacity={0.8}>
          <Ionicons name="settings-outline" size={22} color="#800080" className="mr-3" />
          <Text className="text-gray-700">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3" activeOpacity={0.8}>
          <Ionicons name="help-circle-outline" size={22} color="#800080" className="mr-3" />
          <Text className="text-gray-700">Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <View className="items-center mb-10">
        <TouchableOpacity className="bg-gray-100 rounded-full px-8 py-3" activeOpacity={0.9}>
          <Text className="text-purple-800 font-bold">Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;