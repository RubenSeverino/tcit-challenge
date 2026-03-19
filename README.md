# Challenge Técnico: Fullstack Post Manager (TCIT)

Este proyecto es una aplicación web completa para la gestión de publicaciones, desarrollada como parte de un proceso de selección técnica. Implementa un CRUD funcional con persistencia en base de datos y un manejo de estado global eficiente.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React + Vite, Redux Toolkit, Axios.
- **Backend:** Node.js + Express.
- **Base de Datos:** PostgreSQL.
- **Estilos:** CSS (Inline/App.css).

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (Versión 16 o superior)
- [PostgreSQL](https://www.postgresql.org/) corriendo localmente.

## 🚀 Configuración del Proyecto

### 1. Base de Datos
Ejecuta el script contenido en el archivo `init.sql` en tu terminal de PostgreSQL o pgAdmin para crear la tabla necesaria.

### 2. Backend
1. Navega a la carpeta `backend/`.
2. Instala las dependencias: `npm install`.
3. Crea un archivo `.env` basado en `.env.example` con tus credenciales locales.
4. Inicia el servidor: `node index.js`. (http://localhost:5000)

### 3. Frontend
1. Navega a la carpeta `frontend/`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm run dev` (La aplicación se abrirá usualmente en http://localhost:5173)
-------------
