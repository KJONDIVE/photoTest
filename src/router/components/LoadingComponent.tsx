// *** NPM ***
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Loading = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
      </View>
    </View>
  );
};

// *** STYLES ***
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginRight: 5,
  },
});

export default Loading;
