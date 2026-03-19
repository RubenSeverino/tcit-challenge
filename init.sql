-- Script para crear la tabla de posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL
);