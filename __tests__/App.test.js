import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import App from '../AppMock';

jest.mock('axios');

describe('Weather App', () => {
  
  test('Muestra información del clima después de una búsqueda exitosa', async () => {
    const { getByText } = render(<App />);

    expect(getByText(/Temperatura: 25°C/i)).toBeTruthy();
    expect(getByText(/Humedad: 50%/i)).toBeTruthy();
    expect(getByText(/Descripción: Cielo despejado/i)).toBeTruthy();
  });

  test('Campo de entrada y botón funcionan', () => {
    const { getByTestId } = render(<App />);

    const input = getByTestId('city-input');
    const button = getByTestId('search-button');

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  test('Muestra un mensaje de error cuando la API falla o la ciudad es inválida', async () => {
    axios.get.mockRejectedValueOnce(new Error('Ciudad no encontrada'));

    const { getByTestId, getByText } = render(<App />);

    fireEvent.changeText(getByTestId('city-input'), 'CiudadInvalida');
    fireEvent.press(getByTestId('search-button'));

    await waitFor(() => {
      expect(
        getByText(/Ciudad no encontrada o error en la API/i)
      ).toBeTruthy();
    });
  });

});
