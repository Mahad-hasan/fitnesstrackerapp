import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailScreen({ route, navigation }) {

  const { exercise, markCompleted } = route.params;

  // 🖼 SAFE IMAGE HANDLING (IMPORTANT FIX)
  const imageSource =
    typeof exercise.image === 'string'
      ? { uri: exercise.image }
      : exercise.image;

  return (
    <ScrollView style={styles.container}>

      {/* IMAGE */}
      <Image source={imageSource} style={styles.image} />

      {/* CONTENT CARD */}
      <View style={styles.card}>

        {/* NAME */}
        <Text style={styles.title}>{exercise.name}</Text>

        {/* DESCRIPTION */}
        <Text style={styles.desc}>{exercise.description}</Text>

        {/* STATUS */}
        <Text style={styles.status}>
          {exercise.completed ? "✅ Completed" : "⏳ Not Completed"}
        </Text>

      </View>

      {/* BUTTON */}
      {!exercise.completed && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            markCompleted(exercise.id);
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Mark as Completed</Text>
        </TouchableOpacity>
      )}

      {/* COMPLETED MESSAGE */}
      {exercise.completed && (
        <View style={styles.doneBox}>
          <Text style={styles.doneText}>🔥 Great Job! You completed this workout</Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f6f8'
  },

  image: {
    width: '100%',
    height: 280
  },

  card: {
    backgroundColor: '#fff',
    marginTop: -20,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 5
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111'
  },

  desc: {
    fontSize: 16,
    color: '#555',
    marginTop: 10
  },

  status: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: '600',
    color: '#333'
  },

  button: {
    backgroundColor: '#111',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  doneBox: {
    margin: 15,
    padding: 15,
    backgroundColor: '#d1fae5',
    borderRadius: 10
  },

  doneText: {
    color: '#065f46',
    fontWeight: '600',
    textAlign: 'center'
  }
});