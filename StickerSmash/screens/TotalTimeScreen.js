import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import ExcelDataContext from '../contexts/ExcelDataContext';

export default function TotalTimeScreen() {
  const { totalTimeByPerson } = useContext(ExcelDataContext);

  // 데이터 준비
  const labels = Object.keys(totalTimeByPerson);
  const data = Object.values(totalTimeByPerson);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Total Time by Person</Text>
        {labels.length > 0 ? (
          <>
            {labels.map((person, index) => (
              <Text key={index} style={styles.entry}>{person}: {totalTimeByPerson[person]} hours</Text>
            ))}
            {data.length > 0 && (
              <BarChart
                data={{
                  labels: labels,
                  datasets: [{ data: data }]
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                yAxisLabel=""
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: { borderRadius: 16 }
                }}
                style={{
                  marginVertical: 20,
                  borderRadius: 16,
                }}
              />
            )}
          </>
        ) : (
          <Text style={styles.entry}>No Time Data Found</Text>
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
  entry: {
    marginBottom: 10,
    fontSize: 16,
  },
});
