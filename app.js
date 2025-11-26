import { Ionicons } from '@expo/vector-icons'; // Iconos de clima
import axios from 'axios'; // Para hacer peticiones HTTP
import { useState } from 'react'; // Hooks de React
import { ActivityIndicator, Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

// Objeto con URLs directas de imágenes para cada tipo de clima
const backgrounds = {
  Default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  Clear: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
  Clouds: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=800&q=80", // cielo nublado
  Rain: "https://images.unsplash.com/photo-1601597112320-9ecfb79d8a1d?auto=format&fit=crop&w=800&q=80",
  Thunderstorm: "https://images.unsplash.com/photo-1505245208761-ba872912fac0?auto=format&fit=crop&w=800&q=80",
  Snow: "https://images.unsplash.com/photo-1608889178678-7d1eeb59eb59?auto=format&fit=crop&w=800&q=80",
  Mist: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  Fog: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
};

// Mapeo de iconos de Ionicons según el clima
const icons = {
  Clear: "sunny",
  Clouds: "cloudy",
  Rain: "rainy",
  Thunderstorm: "thunderstorm",
  Snow: "snow",
  Mist: "cloud-outline",
  Fog: "cloud-outline",
};

// Colores para los iconos según el clima
const iconColors = {
  Clear: "#FFD700",        // amarillo sol
  Clouds: "#B0C4DE",       // gris claro azulado
  Rain: "#00BFFF",         // azul agua
  Thunderstorm: "#FFA500", // naranja
  Snow: "#FFFFFF",         // blanco
  Mist: "#C0C0C0",         // gris claro
  Fog: "#A9A9A9",          // gris oscuro
};

export default function App() {
  // Estado para la ciudad ingresada por el usuario
  const [city, setCity] = useState('');
  // Estado para almacenar los datos del clima
  const [weather, setWeather] = useState(null);
  // Estado para indicar si la app está cargando datos
  const [loading, setLoading] = useState(false);
  // Estado para mostrar errores (por ejemplo, ciudad no encontrada)
  const [error, setError] = useState('');

  // Función que hace la petición al API de OpenWeather
  const fetchWeather = async () => {
    setLoading(true); // Muestra el indicador de carga
    setError(''); // Resetea errores previos
    setWeather(null); // Limpia datos anteriores

    try {
      const apiKey = '5045408b63bf91f3f66055affd3a8de9';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data); // Guarda los datos recibidos
    } catch (err) {
      setError('Ciudad no encontrada'); // Manejo de errores
    } finally {
      setLoading(false); // Oculta el indicador de carga
    }
  };

  // Determina el tipo de clima principal para escoger fondo e icono
  const weatherMain = weather?.weather?.[0]?.main;
  const backgroundUrl = weatherMain && backgrounds[weatherMain]
    ? backgrounds[weatherMain]
    : backgrounds.Default; // Fondo por defecto si no encuentra el clima
  const iconName = weatherMain && icons[weatherMain]
    ? icons[weatherMain]
    : icons.Clear; // Icono por defecto si no encuentra el clima

  return (
    // Componente que muestra la imagen de fondo
    <ImageBackground source={{ uri: backgroundUrl }} style={styles.background}>
      <View style={styles.container}>
        {/* Input para que el usuario escriba la ciudad */}
        <TextInput
          style={styles.input}
          placeholder="Ingresa una ciudad"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#ccc"
        />
        {/* Botón que llama a la función fetchWeather */}
        <Button title="Buscar" onPress={fetchWeather} />

        {/* Indicador de carga mientras se obtiene la información */}
        {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

        {/* Mostrar mensaje de error si la ciudad no existe */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Mostrar información del clima si ya se obtuvo */}
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.text}>Ciudad: {weather.name}</Text>
            <Text style={styles.text}>Temperatura: {weather.main.temp}°C</Text>
            <Text style={styles.text}>Humedad: {weather.main.humidity}%</Text>

            {/* Icono y descripción del clima */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text style={styles.text}>Clima: {weather.weather[0].description} </Text>
              <Ionicons name={iconName} size={40} color={iconColors[weatherMain] || "#FFFFFF"} />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

// Estilos de la app
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' }, // Imagen ocupa toda la pantalla
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.3)' }, // Fondo semi-transparente para legibilidad
  input: { borderWidth: 1, borderColor: '#888', padding: 10, borderRadius: 5, marginBottom: 15, color: '#fff' },
  weatherContainer: { marginTop: 20 },
  text: { color: '#fff', fontSize: 18, marginBottom: 5 },
  error: { color: 'red', marginTop: 10 },
});
