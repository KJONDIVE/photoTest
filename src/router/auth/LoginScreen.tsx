// *** NPM ***
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

// *** OTHER ***
import {authStore} from '../../store';

const LoginScreen = (): JSX.Element => {
  // *** USE STATE ***
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // *** HANDLERS ***
  const handleLogin = () => {
    authStore.setAuth(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};


// *** STYLES ***
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default LoginScreen;
