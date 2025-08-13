import React, { useRef, useState } from 'react';
import type { ViewToken } from 'react-native';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: 'welcome',
    title: 'Welcome to Past Quest!',
    description: 'Find, practice, and track your progress with organized past questions.',
    image: require('../../assets/images/getstarted.jpg'),
    icon: null,
  },
  {
    key: 'organized',
    title: 'Organized Past Questions',
    description: 'Filter by subject, year, and institution for targeted practice.',
    image: null,
    icon: <Ionicons name="funnel" size={64} color="#800080" />,
  },
  {
    key: 'practice',
    title: 'Practice & Track Progress',
    description: 'Take quizzes and monitor your performance over time.',
    image: null,
    icon: <Ionicons name="stats-chart" size={64} color="#800080" />,
  },
];

const Getstarted = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  const handleSkip = () => {
    router.push('/auth/login');
  };

  const handleGetStarted = () => {
    router.push('/auth/login');
  };

  const onViewableItemsChanged = useRef((info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (info.viewableItems.length > 0) {
      setCurrentIndex(info.viewableItems[0].index ?? 0);
    }
  }).current;

  return (
    <View className="flex-1 bg-white">
      {/* Skip button at top right */}
      <View className="w-full flex-row justify-end items-center pt-8 pr-6 mt-10">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-purple-800 font-semibold text-base">Skip</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            {/* First slide: image only, others: icon only */}
            {item.image ? (
              <Image source={item.image} style={{ width: 300, height: 370, borderRadius: 16, marginVertical: 24 }} />
            ) : item.icon}
            <Text className="text-3xl font-bold text-purple-800 mb-2 text-center">{item.title}</Text>
            <Text className="text-base text-gray-700 mb-8 text-center">{item.description}</Text>
          </View>
        )}
      />
      {/* Indicators */}
      <View className="flex-row justify-center items-center mb-6">
        {slides.map((_, idx) => (
          <View
            key={idx}
            className={
              'w-3 h-3 mx-1 rounded-full ' +
              (idx === currentIndex ? 'bg-purple-800' : 'bg-gray-300')
            }
          />
        ))}
      </View>
      {/* Always show Get Started button */}
      <View className="flex-row justify-center mb-10 px-4">
        <TouchableOpacity onPress={handleGetStarted} className="bg-purple-800 px-6 py-4 rounded-xl w-full">
          <Text className="text-white text-center font-bold">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Getstarted;