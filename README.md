Instrucciones de Uso
1. Requisitos Previos:
 - Node.js: Asegúrate de tener Node.js instalado. Puedes descargarlo
desde https://nodejs.org.
 - Expo CLI: Si no tienes Expo CLI instalado, puedes hacerlo ejecutando
el siguiente comando:
 npm install -g expo-cli
2. Pasos para Ejecutar la Aplicación:
 - Descomprime el archivo RAR que has recibido.
 - Abre una terminal en la carpeta donde descomprimiste el proyecto.
 - Instalar las dependencias del proyecto:
 npm install
3. Ejecutar la Aplicación con Expo:
 - Como Clima ya tiene configurada la API Key de OpenWeatherMap, no
necesitas hacer cambios adicionales en el código.
 - Para iniciar la aplicación, ejecuta el siguiente comando en la
terminal:
 npx expo start
 - Esto abrirá una nueva ventana en tu navegador con un QR Code.
 - Escanea el QR Code con la aplicación Expo Go en tu dispositivo móvil
para ver la aplicación funcionando en tiempo real.
 - También puedes ver la aplicación en un emulador o dispositivo físico
usando las opciones proporcionadas por Expo.
4. Pantalla Principal:
 1. Campo de Entrada: El usuario puede ingresar el nombre de la ciudad
cuyo clima desea consultar.
 2. Botón de Búsqueda: Al hacer clic en este botón, la aplicación
consulta la API y muestra el clima de la ciudad.
 3. Información del Clima: Muestra la temperatura, la humedad y una
breve descripción del clima.
 4. Manejo de Errores: Si se ingresa un nombre de ciudad incorrecto o si
ocurre un error con la API, la aplicación muestra un mensaje de error
adecuado.
