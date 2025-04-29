import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullname: '',
  email: '',
  profilePicture: '', // You can add more fields as needed
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.profilePicture = action.payload.profilePicture;
    },
    resetUser: () => initialState,
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;