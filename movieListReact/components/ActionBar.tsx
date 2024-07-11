import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActionBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ActionBar;