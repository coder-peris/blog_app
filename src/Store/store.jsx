import { createStore, action, thunk, computed } from "easy-peasy";
import api from '../api/posts';

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    newPostTitle: '',
    setNewPostTitle: action((state, payload) => {
        state.newPostTitle = payload
    }),
    newPostBody: '',
    setNewPostBody: action((state, payload) => {
        state.newPostBody = payload;
    }),
    editedTitle: '',
    setEditedTitle: action((state, payload) => {
        state.editedTitle = payload;
    }),
    editedBody: '',
    setEditedBody: action((state, payload) => {
        state.editedBody = payload;
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (id) => state.posts.find(post => (post.id) == id)
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        try {
            const response = await api.post('/posts', newPost);
            actions.setPosts([...posts, response.data]);
            actions.setNewPostTitle('');
            actions.setNewPostBody('');
        }
        catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    deletePost: thunk(async (actions, id, helpers) => {
        const { posts } = helpers.getState();
        try {
            await api.delete(`/posts/${id}`);
            actions.setPosts(posts.filter(post => post.id != id));
        }
        catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    editPost: thunk(async (actions, editedPost, helpers) => {
        const { posts } = helpers.getState();
        const { id } = editedPost;
        try {
            const response = await api.put(`/posts/${id}`, editedPost);
            actions.setPosts(posts.map(post => post.id == id ? { ...response.data } : post))
            actions.setEditedTitle('');
            actions.setEditedBody('');
        }
        catch (err) {
            console.log(`Error: ${err.message}`);
        }
    })
});