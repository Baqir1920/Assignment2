import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, loginUser, logoutUser, updateUser, clearError } from '../store/userSlice';

const UserProfile = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const loginError = useSelector((state) => state.user.error);

  const handleSignUp = () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    dispatch(addUser({ username, email, password }));
    setIsSignUp(false);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleUpdate = () => {
    if (!newUsername && !newEmail) {
      Alert.alert('Error', 'At least one field must be filled.');
      return;
    }
    const newDetails = {};
    if (newUsername) newDetails.username = newUsername;
    if (newEmail) newDetails.email = newEmail;
    dispatch(updateUser({ email: loggedInUser.email, newDetails }));
    setEditMode(false);
  };

  useEffect(() => {
    if (loginError) {
      Alert.alert('Login Failed', loginError, [
        { text: 'OK', onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [loginError, dispatch]);

  return (
    <View style={styles.container}>
      {loggedInUser ? (
        <View>
          <Text style={styles.heading}>User Profile</Text>
          <Text style={styles.info}>Username: {loggedInUser.username}</Text>
          <Text style={styles.info}>Email: {loggedInUser.email}</Text>

          {editMode ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="New Username"
                value={newUsername}
                onChangeText={setNewUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="New Email"
                value={newEmail}
                onChangeText={setNewEmail}
              />
              <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setEditMode(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity style={styles.button} onPress={() => setEditMode(true)}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View>
          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={isSignUp ? handleSignUp : handleLogin}
          >
            <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.toggleText}>
              {isSignUp ? 'Already have an account? Login' : 'Sign up for new user'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#007bff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default UserProfile;
