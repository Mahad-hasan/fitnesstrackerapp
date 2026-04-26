import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function CompletedScreen() {

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        setQuote(data.content);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setQuote("Stay consistent 💪 Success will follow.");
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Workout Completed 🎉</Text>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.quote}>"{quote}"</Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 25,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center'
  },

  quote: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic'
  }
});