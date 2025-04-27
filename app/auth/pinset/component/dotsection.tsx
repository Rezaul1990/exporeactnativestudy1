import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface DotSectionProps {
  pinArray: string[];
  onBackspace: () => void;
}

export default function DotSection({ pinArray, onBackspace }: DotSectionProps) {
  return (
    <View style={styles.dotWrapperSection}>
      <View style={styles.dotContainer}>
        {[0, 1, 2, 3].map((_, i) => (
          <View
            key={i}
            style={[styles.dot, pinArray.length > i ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
      {pinArray.length > 0 && (
        <TouchableOpacity onPress={onBackspace} style={styles.crossButtonInline}>
          <AntDesign name="close" size={14} color="#003366" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dotWrapperSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#00FF66',
  },
  inactiveDot: {
    backgroundColor: '#99ccff',
  },
  crossButtonInline: {
    marginLeft: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
  },
});
