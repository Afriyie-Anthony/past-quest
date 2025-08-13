import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const quickActions = [
  {
    label: "Browse Past Questions",
    icon: "search-outline",
    color: "#E0E7FF",
    description:
      "Find and filter past questions by subject, year, or institution.",
  },
  {
    label: "Upload Past Questions",
    icon: "cloud-upload-outline",
    color: "#F3F4F6",
    description: "Share your own past questions to help others.",
  },
  {
    label: "Download Files",
    icon: "cloud-download-outline",
    color: "#FDE68A",
    description: "Save past questions to your device for offline access.",
  },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      {/* App Banner */}
      <View className="items-center mb-8 mt-10">
        <Ionicons name="cloud-download-outline" size={48} color="#800080" />
        <Text className="text-4xl font-bold text-black my-4 text-center">
          Past<Text className="text-purple-600">Q</Text>uest
        </Text>
        <Text className="text-base text-gray-600 mt-1 text-center">
          Your hub for uploading, browsing, and downloading past questions in
          file format.
        </Text>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 mb-8 border border-gray-200">
        <Ionicons name="search-outline" size={22} color="#800080" />
        <TextInput
          className="ml-2 flex-1 text-base"
          placeholder="Search by subject, year, or institution..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Quick Actions */}
      <Text className="text-lg font-bold text-purple-800 mb-4">
        What would you like to do?
      </Text>
      <View className="mb-10">
        {quickActions.map((action, idx) => (
          <TouchableOpacity
            key={idx}
            className="flex-row items-center bg-white rounded-2xl px-4 py-5 mb-6 "
            style={{ backgroundColor: action.color }}
            activeOpacity={0.9}
            onPress={() => {
              if (action.label === "Browse Past Questions") {
                router.push("/browse");
              } else if (action.label === "Upload Past Questions") {
                router.push("/upload");
              } else if (action.label === "Download Files") {
                router.push("/downloaded");
              }
            }}
          >
            <Ionicons
              name={action.icon as any}
              size={32}
              color="#800080"
              className="mr-4"
            />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-purple-800 mb-1">
                {action.label}
              </Text>
              <Text className="text-gray-600 text-sm">
                {action.description}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color="#800080"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Info Section */}
      <View className="bg-purple-50 rounded-2xl p-5 mb-10">
        <Text className="text-base text-purple-800 font-semibold mb-2">
          How Past Quest Works
        </Text>
        <Text className="text-gray-700 text-sm mb-2">
          • Upload your past questions in PDF or DOC format to help others.
        </Text>
        <Text className="text-gray-700 text-sm mb-2">
          • Browse a wide collection of past questions, filter by subject, year,
          or institution.
        </Text>
        <Text className="text-gray-700 text-sm mb-2">
          • Download files for offline access and exam preparation.
        </Text>
        <Text className="text-gray-700 text-sm">
          • All files are user-contributed and verified for quality.
        </Text>
      </View>

      {/* Call to Action */}
      <View className="items-center mb-10">
        <TouchableOpacity
          className="bg-purple-700 rounded-full px-8 py-4 shadow-lg"
          activeOpacity={0.9}
          onPress={() => router.push("/browse")}
        >
          <Text className="text-white font-bold text-lg">
            Start Browsing Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;
