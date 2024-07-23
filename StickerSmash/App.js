import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import UploadExcelScreen from './screens/UploadExcelScreen';
import NewEntriesScreen from './screens/NewEntriesScreen';
import TotalTimeScreen from './screens/TotalTimeScreen';
import { ExcelDataProvider } from './contexts/ExcelDataContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ExcelDataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{ title: '메인 화면' }} />
          <Stack.Screen name="Upload Excel" component={UploadExcelScreen} options={{ title: '엑셀 입력' }} />
          <Stack.Screen name="New Entries" component={NewEntriesScreen} options={{ title: '신규 사업 보고' }} />
          <Stack.Screen name="Total Time" component={TotalTimeScreen} options={{ title: '근무 시간 확인' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExcelDataProvider>
  );
}
