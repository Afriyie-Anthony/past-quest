import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.replace("/(onboarding-screens)/Getstarted");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  if (showSplash) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-800">
        <View className="items-center">
          {/* Book icon from Ionicons */}
          <Ionicons name="book" size={120} color="#fff" style={{ marginBottom: 24 }} />
          <Text className="text-4xl font-bold text-white tracking-widest">Past Quest</Text>
        </View>
      </View>
    );
  }
  return null;
}
