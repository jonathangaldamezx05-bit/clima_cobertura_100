import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const apiKey = '5045408b63bf91f3f66055affd3a8de9';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Ciudad no encontrada');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa una ciudad"
        value={city}
        onChangeText={setCity}
        testID="city-input"
      />
      <Button title="Buscar" onPress={fetchWeather} testID="search-button" />
      
      {loading && <ActivityIndicator size="large" />}
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      {weather && (
        <View style={styles.weatherContainer} testID="weather-info">
          <Text>Ciudad: {weather.name}</Text>
          <Text>Temperatura: {weather.main.temp}°C</Text>
          <Text>Humedad: {weather.main.humidity}%</Text>
          <Text>Clima: {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  weatherContainer: { marginTop: 20 },
  error: { color: 'red', marginTop: 10 },
});
