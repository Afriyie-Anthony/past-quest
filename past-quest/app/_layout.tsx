import { Stack } from "expo-router";
import "./global.css";
// Removed AuthProvider import, file does not exist
// Removed missing context providers
import { View } from "react-native";

export default function RootLayout() {
  return <ThemedRoot />;
}

function ThemedRoot() {
  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
