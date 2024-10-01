import { configureStore } from "@reduxjs/toolkit";
import userSignupSliceReducers from "./features/userSignup/userSignupSlice";
import professionalsSliceReducers from "./features/professionals/professionalsSlice";
import ProfessionalSignupSliceReducers from "./features/professionalSignup/professionalSignupSlice";

export const store = configureStore({
  reducer: {
    usersignup: userSignupSliceReducers.reducer,
    professionals: professionalsSliceReducers.reducer,
    professionalSignup: ProfessionalSignupSliceReducers.reducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
