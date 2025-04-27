import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = width / 5;
const HORIZONTAL_SPACING = 15;

interface KeypadProps {
  onPress: (value: string) => void;
}

export default function Keypad({ onPress }: KeypadProps) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''];

  return (
    <View style={styles.keypad}>
      {Array(4).fill(null).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {keys.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.keyButton, item === '' && styles.keyButtonDisabled]}
              onPress={() => item && onPress(item)}
              disabled={item === ''}
            >
              <Text style={styles.keyText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keypad: {
    marginTop: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HORIZONTAL_SPACING,
    marginBottom: 15,
  },
  keyButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: HORIZONTAL_SPACING / 2,
  },
  keyButtonDisabled: {
    backgroundColor: 'transparent',
  },
  keyText: {
    fontSize: 24,
    color: '#003366',
    fontWeight: '600',
  },
});
