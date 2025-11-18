import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AppMock() {
  return (
    <View>
      <TextInput
        testID="city-input"
        value=""
      />

      <TouchableOpacity testID="search-button">
        <Text>Buscar Clima</Text>
      </TouchableOpacity>

      {/* Mocks de mensajes de salida */}
      <Text>Temperatura: 25°C</Text>
      <Text>Humedad: 50%</Text>
      <Text>Descripción: Cielo despejado</Text>

      {/* Mensaje de error (mock) */}
      <Text>Ciudad no encontrada o error en la API.</Text>
    </View>
  );
}
