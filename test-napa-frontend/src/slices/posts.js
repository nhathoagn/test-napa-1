import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostsDataService from "../services/PostService";

const initialState = [];

export const createPosts = createAsyncThunk(
    "posts/create",
    async ({ avatarr,name, description, imagee }) => {
        const res = await PostsDataService.create({ avatarr,name, description, imagee });
        return res.data;
    }
);

export const retrievePosts = createAsyncThunk(
    "posts/retrieve",
    async () => {
        const res = await PostsDataService.getAll();
        return res.data;
    }
);

export const updatePosts = createAsyncThunk(
    "posts/update",
    async ({ id, data }) => {
        console.log("data-update",data)
        const res = await PostsDataService.update(id, data);
        console.log("aaaa")
        return res.data;
    }
);

export const deletePosts = createAsyncThunk(
    "posts/deleteRevert",
    async ({ id }) => {
        console.log("detele", id)
       // const res = await PostsDataService.remove(id);
        return {id};
    }
);
export const restorePosts = createAsyncThunk(
    "posts/delete",
    async ({ id }) => {
        console.log("restore", id)
        const res = await PostsDataService.findByID(id);
        return res.data;
    }
);
export const disablePosts = createAsyncThunk(
    "posts/disable",
    async ({id}) => {
        const res = await PostsDataService.deleteRevert(id)
        return res.data
    }
);

export const enablePosts = createAsyncThunk(
    "posts/enable",
    async ({id}) => {
        const res = await PostsDataService.revert(id)
        console.log("ve",id)
        return res.data
    }
);
export const commentsPosts = createAsyncThunk(
    "posts/comments",
     async  ({id,data }) => {
         console.log("data-comment", id, data )
     const res =  await PostsDataService.comments(id,data)
         console.log("data-comment-2", res)
         return res.data
     }
)

export const likePosts = createAsyncThunk(
    "posts/like",
    async ({id}) => {
        const res = await PostsDataService.like(id)
        return res.data
    }
)


export const findPostsByName = createAsyncThunk(
    "posts/findByName",
    async ({ name }) => {
        const res = await PostsDataService.findByName(name);
        return res.data;

    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: {
        [createPosts.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrievePosts.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [updatePosts.fulfilled]: (state, action) => {
            const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [deletePosts.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            console.log("index-delete", index)
            state.splice(index, 1);
        },
        [restorePosts.fulfilled]: (state, action) => {
            // let index = state.findIndex(({ id }) => id === action.payload.id);
            // console.log("index-restore", index)
            // let data = action.payload
            // state.splice(index,0,data)
            // state.push(index)
        },
        [disablePosts.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [enablePosts.fulfilled]: (state,action) => {
            let index = state.findIndex(({id}) => id === action.payload.id )
            state[index] = {
                ...state[index],
                ...action.payload,
            }



        },
        [findPostsByName.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [likePosts.fulfilled]: (state, action) => {
            const index = state.findIndex(tutorial => tutorial.id === action.payload.id)
           state.push({...action.payload})
        },
        [commentsPosts.fulfilled]: (state, action) => {
            const index = state.findIndex(tutorial => tutorial.id === action.payload.id)
            state[index] = {
                ...state[index],
                ...action.payload
            }
        }
    },
});
console.log("state sum", initialState)

const { reducer } = postsSlice;
export default reducer;