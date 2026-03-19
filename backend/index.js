const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Obtener lista de posts
app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, descripcion FROM posts');
        res.json(result.rows); // Retorna array de objetos en camelCase (nombre, descripcion)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Crear un post
app.post('/posts', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const result = await pool.query(
            'INSERT INTO posts (nombre, descripcion) VALUES ($1, $2) RETURNING *',[nombre, descripcion]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un post
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: "Post no encontrado" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));