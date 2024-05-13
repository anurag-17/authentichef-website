const { configureStore } = require("@reduxjs/toolkit");
// import userReducers from "./slice"
// import todoReducer from "./todoSlice"
export const store = configureStore({
  reducer: {
    // useData :userReducers,
    // todosData:todoReducer
  },
});
