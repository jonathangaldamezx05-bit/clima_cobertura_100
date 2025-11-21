import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';
import { ActivityIndicator, Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

const backgrounds = {
  Default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  Clear: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
  Clouds: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=800&q=80", // cielo nublado directo
  Rain: "https://images.unsplash.com/photo-1601597112320-9ecfb79d8a1d?auto=format&fit=crop&w=800&q=80",
  Thunderstorm: "https://images.unsplash.com/photo-1505245208761-ba872912fac0?auto=format&fit=crop&w=800&q=80",
  Snow: "https://images.unsplash.com/photo-1608889178678-7d1eeb59eb59?auto=format&fit=crop&w=800&q=80",
  Mist: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  Fog: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
};

const icons = {
  Clear: "sunny",
  Clouds: "cloudy",
  Rain: "rainy",
  Thunderstorm: "thunderstorm",
  Snow: "snow",
  Mist: "cloud-outline",
  Fog: "cloud-outline",
};

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

  const weatherMain = weather?.weather?.[0]?.main;
  const backgroundUrl = weatherMain && backgrounds[weatherMain]
    ? backgrounds[weatherMain]
    : backgrounds.Default;
  const iconName = weatherMain && icons[weatherMain]
    ? icons[weatherMain]
    : icons.Clear;

  return (
    <ImageBackground source={{ uri: backgroundUrl }} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa una ciudad"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#ccc"
        />
        <Button title="Buscar" onPress={fetchWeather} />
        {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.text}>Ciudad: {weather.name}</Text>
            <Text style={styles.text}>Temperatura: {weather.main.temp}°C</Text>
            <Text style={styles.text}>Humedad: {weather.main.humidity}%</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>Clima: {weather.weather[0].description} </Text>
              <Ionicons name={iconName} size={30} color="white" />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.3)' },
  input: { borderWidth: 1, borderColor: '#888', padding: 10, borderRadius: 5, marginBottom: 15, color: '#fff' },
  weatherContainer: { marginTop: 20 },
  text: { color: '#fff', fontSize: 18, marginBottom: 5 },
  error: { color: 'red', marginTop: 10 },
});
