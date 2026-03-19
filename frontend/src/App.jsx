import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, deletePost, setFilter } from './redux/postsSlice';

function App() {
    const dispatch = useDispatch();
    // Obtenemos los datos del redux
    const { items, filter } = useSelector((state) => state.posts);

    // Variables locales del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [textoFiltro, setTextoFiltro] = useState('');

    // Carga inicial de los datows del Posts
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // filtrado local de los datos
    const postsFiltrados = items.filter((post) =>
        post.nombre.toLowerCase().includes(filter.toLowerCase())
    );

    // definiomos la función para crear un nuevo post 
    const handleCrear = (ev) => {
        ev.preventDefault();
        if (!nombre || !descripcion) return alert('Debes llenar ambos campos');

        dispatch(addPost({ nombre, descripcion }));
        setNombre('');
        setDescripcion('');
    };

    const handleFilter = () => {
        dispatch(setFilter(textoFiltro))
    }
    const handleDelete = (del) => {
        dispatch(deletePost(del))
    }



    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Gestión de Publicaciones</h1>

            {/* 1. SECCIÓN DE FILTRO */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '15px', background: '#f4f4f4', borderRadius: '8px' }}>
                <input
                    type="text"
                    placeholder="Filtrar por nombre..."
                    value={textoFiltro}
                    onChange={(e) => setTextoFiltro(e.target.value)}
                    style={{ padding: '8px', width: '250px' }}
                />
                <button
                    onClick= { handleFilter }
                    style={{ backgroundColor: '#25ad45', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                >
                    Buscar
                </button>
            </div>

            {/* 2. TABLA DE DATOS */}
            <div style={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '30px', border: '1px solid #ddd' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#007bff', zIndex: 1 }}>
                        <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Nombre</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Descripcion</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postsFiltrados.map((post) => (
                            <tr key={post.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '12px' }}>{post.nombre}</td>
                                <td style={{ padding: '12px' }}>{post.descripcion}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {postsFiltrados.length === 0 && (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No se encontraron posts.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* 3. FORMULARIO DE CREACIÓN */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '20px', borderRadius: '8px'}}>
                <form style={{ display: 'flex', gap: '20px', alignItems: 'center',width:'100%' }} onSubmit={handleCrear}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label >Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            style={{ padding: '8px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label >Descripción:</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            style={{ padding: '8px'}}
                        />
                    </div>
                    <button
                        style={{ display: 'flex', alignItems: 'center', backgroundColor: '#25ad45', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Crear Post
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;