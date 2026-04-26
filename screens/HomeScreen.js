import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {

  // 💪 Exercises
  const [exercises, setExercises] = useState([
    {
      id: '1',
      name: 'Push Ups',
      description: 'Upper body exercise',
      completed: false,
      image: require('../assets/images/e-images/pushup.jpg')
    },
    {
      id: '2',
      name: 'Squats',
      description: 'Leg strength exercise',
      completed: false,
      image: require('../assets/images/e-images/squats.jpg')
    },
    {
      id: '3',
      name: 'Plank',
      description: 'Core stability exercise',
      completed: false,
      image: require('../assets/images/e-images/plank.jpg')
    },
    {
      id: '4',
      name: 'Burpees',
      description: 'Full body fat burner',
      completed: false,
      image: require('../assets/images/e-images/burpees.jpg')
    }
  ]);

  // 💬 Quote
  const [quote, setQuote] = useState('');

  // 🌟 DAILY QUOTE
  useEffect(() => {
    const getDailyQuote = async () => {
      try {
        const today = new Date().toDateString();

        const savedDate = await AsyncStorage.getItem('quoteDate');
        const savedQuote = await AsyncStorage.getItem('quote');

        if (savedDate === today && savedQuote) {
          setQuote(savedQuote);
          return;
        }

        const res = await fetch('https://api.quotable.io/random');
        const data = await res.json();

        setQuote(data.content);

        await AsyncStorage.setItem('quoteDate', today);
        await AsyncStorage.setItem('quote', data.content);

      } catch (error) {
        setQuote("Stay strong 💪 Keep going!");
      }
    };

    getDailyQuote();
  }, []);

  // 🗑 Delete
  const deleteExercise = (id) => {
    setExercises(prev => prev.filter(item => item.id !== id));
  };

  // 📦 Render Item
  const renderItem = ({ item }) => {

    const renderRightActions = () => (
      <TouchableOpacity
        onPress={() => deleteExercise(item.id)}
        style={styles.deleteBox}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Details", {
              exercise: item,
              markCompleted: (id) => {
                setExercises(prev =>
                  prev.map(ex =>
                    ex.id === id ? { ...ex, completed: true } : ex
                  )
                );
              }
            })
          }
        >

          <View style={styles.card}>

            {/* 🖼 IMAGE */}
           <Image
  source={
    typeof item.image === 'string'
      ? { uri: item.image }
      : item.image
  }
  style={styles.image}
/>

            <Text style={styles.title}>
              {item.name} {item.completed ? "✅" : ""}
            </Text>

            <Text style={styles.desc}>{item.description}</Text>

          </View>

        </TouchableOpacity>

      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>

      {/* 💬 QUOTE */}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>

      <Text style={styles.header}>💪 Fitness Tracker</Text>
      <Text style={styles.subHeader}>Choose your exercise</Text>

      {/* LIST */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* ADD BUTTON */}
      <View style={styles.buttonWrapper}>
        <Button
          title="Add Exercise +"
          onPress={() =>
            navigation.navigate('Add Exercise', {
              addExercise: (newExercise) => {
                setExercises(prev => [...prev, newExercise]);
              }
            })
          }
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8'
  },

  quoteBox: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },

  quoteText: {
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center'
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111'
  },

  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 3
  },

  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10
  },

  title: {
    fontSize: 18,
    fontWeight: '600'
  },

  desc: {
    fontSize: 13,
    color: '#777',
    marginTop: 5
  },

  buttonWrapper: {
    marginTop: 10
  },

  deleteBox: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    marginBottom: 12,
    borderRadius: 15
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});