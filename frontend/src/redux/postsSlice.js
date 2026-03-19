import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/posts';

// Acciones asincronas
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
    const response = await axios.post(API_URL, newPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: { items: [], filter: '' },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload; // Filtrado local
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => { state.items = action.payload; })
            .addCase(addPost.fulfilled, (state, action) => { state.items.push(action.payload); })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(post => post.id !== action.payload.id);
            });
    },
});

export const { setFilter } = postsSlice.actions;
export default postsSlice.reducer;