import React, { useContext } from 'react';
import { View, ScrollView, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import ExcelDataContext from '../contexts/ExcelDataContext';

export default function UploadExcelScreen() {
  const { addNewData, fileList, removeFileData } = useContext(ExcelDataContext);

  const handleFileUpload = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        multiple: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        for (const asset of result.assets) {
          const file = asset.uri;
          const fileName = asset.name;

          const response = await fetch(file);
          const arrayBuffer = await response.arrayBuffer();

          const workbook = XLSX.read(arrayBuffer, { type: 'array' });

          // 업무현황(통합) 시트 데이터 처리
          const taskSheet = workbook.Sheets['업무현황(통합)'];
          if (!taskSheet) {
            Alert.alert('Error', '업무현황(통합) 시트를 찾을 수 없습니다.');
            continue;
          }

          // 데이터 읽기
          const taskData = XLSX.utils.sheet_to_json(taskSheet, { header: 1, defval: "" });

          // 헤더와 데이터 분리
          const headers = taskData[2];
          const data = taskData.slice(3);

          // '담당자'와 '소요시간' 컬럼의 인덱스 찾기
          const 담당자Index = headers.indexOf("담당자");
          const 소요시간Index = headers.indexOf("소요시간");

          if (담당자Index === -1 || 소요시간Index === -1) {
            Alert.alert('Error', "'담당자' 또는 '소요시간' 컬럼을 찾을 수 없습니다.");
            continue;
          }

          // 데이터를 담당자별로 집계
          const timeByPerson = data.reduce((acc, row) => {
            const 담당자 = row[담당자Index];
            const 소요시간 = parseFloat(row[소요시간Index]) || 0;

            if (담당자) {
              acc[담당자] = (acc[담당자] || 0) + 소요시간;
            }
            return acc;
          }, {});

          // 업무분담현황 시트 데이터 처리
          const divisionSheet = workbook.Sheets['업무분담현황'];
          if (!divisionSheet) {
            Alert.alert('Error', '업무분담현황 시트를 찾을 수 없습니다.');
            continue;
          }
          const divisionData = XLSX.utils.sheet_to_json(divisionSheet, { range: 6, header: ["업무 구분", "고객사", "지역", "사업명", "인수인계"], defval: "" });

          const filledDivisionData = divisionData.map(row => ({
            '업무 구분': row['업무 구분'],
            '고객사': row['고객사'],
            '지역': row['지역'],
            '사업명': row['사업명'],
            '인수인계': row['인수인계'],
            'fileName': fileName,
          }));

          const newEntriesFound = filledDivisionData.filter(entry => entry['업무 구분'].includes('신규'));

          addNewData(timeByPerson, newEntriesFound, fileName);
        }
      } else {
        Alert.alert('Error', '파일을 선택하지 않았습니다.');
      }
    } catch (error) {
      Alert.alert('Error', '파일을 처리하는 동안 오류가 발생했습니다.');
    }
  };

  const handleRemoveFile = (fileName) => {
    removeFileData(fileName);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <Text style={styles.buttonText}>엑셀 파일 업로드</Text>
      </TouchableOpacity>
      <View style={styles.fileList}>
        <Text style={styles.title}>Uploaded Files</Text>
        {fileList.map((file, index) => (
          <View key={index} style={styles.fileItem}>
            <Text>{file}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFile(file)}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fileList: {
    marginVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  uploadButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  removeButton: {
    backgroundColor: '#6200EE',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
