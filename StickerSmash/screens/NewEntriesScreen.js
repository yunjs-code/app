import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ExcelDataContext from '../contexts/ExcelDataContext';

export default function NewEntriesScreen() {
  const { newEntries } = useContext(ExcelDataContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>New Entries</Text>
        {newEntries.length > 0 ? (
          newEntries.map((entry, index) => (
            <View key={index} style={styles.entryCard}>
              <Text style={styles.entryField}><Text style={styles.fieldTitle}>업무 구분:</Text> {entry['업무 구분']}</Text>
              <Text style={styles.entryField}><Text style={styles.fieldTitle}>고객사:</Text> {entry['고객사']}</Text>
              <Text style={styles.entryField}><Text style={styles.fieldTitle}>지역:</Text> {entry['지역']}</Text>
              <Text style={styles.entryField}><Text style={styles.fieldTitle}>사업명:</Text> {entry['사업명']}</Text>
              <Text style={styles.entryField}><Text style={styles.fieldTitle}>인수인계:</Text> {entry['인수인계']}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.entry}>No New Entries Found</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    marginVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  entryCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  entryField: {
    fontSize: 16,
    marginBottom: 5,
  },
  fieldTitle: {
    fontWeight: 'bold',
  },
  entry: {
    fontSize: 16,
  },
});
