import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.block}
        onPress={() => navigation.navigate('New Entries')}
      >
        <Text style={styles.blockText}>신규 사업 보고</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => navigation.navigate('Total Time')}
      >
        <Text style={styles.blockText}>근무 시간 확인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => navigation.navigate('Upload Excel')}
      >
        <Text style={styles.blockText}>엑셀 입력</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    width: 250,
    height: 60,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200EE', // 통일된 색상 (보라색)
  },
  blockText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
