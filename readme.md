# FUTBOL WEB

Proyecto de práctica para repasar el consumo de APIs con JavaScript. Este proyecto se enfoca en mostrar marcadores en vivo y una tabla de posiciones, mientras aplico conceptos clave como el uso de tablas, templates en HTML y reutilización de componentes.

## Funcionalidades

### 🔴 Partidos en Vivo

- Consume la API de [API-Football](https://www.api-football.com/) para obtener los marcadores en vivo de partidos de fútbol.
- Los datos se actualizan automáticamente cada 2.5 minutos para simular una experiencia en tiempo real.
- Se utiliza un diseño dinámico para mostrar los partidos, empleando `templates` de HTML para crear las tarjetas de cada partido.

### 📋 Tabla de Posiciones

- Muestra la tabla de posiciones de la Liga Argentina 2021.
- Los datos se guardan en `localStorage`, ya que esta información no cambia frecuentemente, optimizando el número de solicitudes a la API.
- Presenta la tabla en un formato ordenado y fácil de leer utilizando tablas HTML.

### 🌐 Reutilización de Componentes

- Incluye un `header` con un menú desplegable que permite navegar fácilmente entre las diferentes secciones del proyecto.
- El diseño y la funcionalidad del header fueron creados previamente y se han integrado en este proyecto como un ejemplo de reutilización de componentes.

## Tecnologías y Herramientas Utilizadas

- **HTML**: Uso de tablas y templates para la estructura de los datos.
- **CSS**: Estilo de las páginas y componentes para una presentación más atractiva.
- **JavaScript**: Manejo de lógica, consumo de la API y actualización dinámica de datos.
- **LocalStorage**: Almacenamiento de la tabla de posiciones para optimizar la experiencia del usuario y reducir las solicitudes a la API.
- **API-Football**: Fuente principal de datos para los marcadores en vivo y la tabla de posiciones.

## Cómo Funciona

1. **Partidos en Vivo**:

   - Al cargar la página, se realiza una solicitud a la API para obtener los datos actuales de los partidos en vivo.
   - La información se actualiza automáticamente cada 2.5 minutos utilizando `setInterval`.
   - Los datos de los partidos se muestran en tarjetas dinámicas generadas con un template HTML.

2. **Tabla de Posiciones**:
   - Al cargar la página, se verifica si los datos ya están almacenados en `localStorage`.
   - Si los datos no están disponibles, se realiza una solicitud a la API para obtenerlos y se almacenan localmente.
   - La tabla se genera dinámicamente en la página utilizando HTML.
