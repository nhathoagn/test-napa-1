import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slices/posts';

const reducer = {
    posts: postsReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;