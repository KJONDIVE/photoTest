// *** NPM ***
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorComponent = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>
        Error loading. Please try again later.
      </Text>
    </View>
  );
};

// *** STYLES ***
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ErrorComponent;
