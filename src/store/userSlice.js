import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  users: [],
  loggedInUser: null,
  error: null,
};

// Async actions
export const addUser = createAsyncThunk(
  'user/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(userData);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        return user;
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, newDetails }, { rejectWithValue }) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      const userIndex = users.findIndex((user) => user.email === email);
      if (userIndex === -1) {
        return rejectWithValue('User not found');
      }

      users[userIndex] = { ...users[userIndex], ...newDetails };
      await AsyncStorage.setItem('users', JSON.stringify(users));

      const updatedUser = users[userIndex];
      const loggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (loggedInUser && JSON.parse(loggedInUser).email === email) {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      }

      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      state.loggedInUser = null;
      state.error = null;
      AsyncStorage.removeItem('loggedInUser');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.error = null;
        AsyncStorage.setItem('loggedInUser', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearError } = userSlice.actions;

export default userSlice.reducer;
