/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState : [],
    reducers :{
        addFeed : (state,action) => {
            return action.payload;
        },
        removeUserFromFeed : (state,action) =>{
            if (Array.isArray(state)) {
                const newFeed = state.filter(user => user._id !== action.payload);
                return newFeed;
              }
              return state; // If state isn't an array, return it unchanged
        }
    }
});

export const {addFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;