import React, { createContext, useState } from 'react';

const ExcelDataContext = createContext();

export const ExcelDataProvider = ({ children }) => {
  const [totalTimeByPerson, setTotalTimeByPerson] = useState({});
  const [newEntries, setNewEntries] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileData, setFileData] = useState({}); // 각 파일의 데이터를 저장

  const addNewData = (newTimeByPerson, newEntriesFound, fileName) => {
    setFileData(prevData => ({
      ...prevData,
      [fileName]: { newTimeByPerson, newEntriesFound }
    }));

    setTotalTimeByPerson(prevState => {
      const updatedState = { ...prevState };
      for (const person in newTimeByPerson) {
        updatedState[person] = (updatedState[person] || 0) + newTimeByPerson[person];
      }
      return updatedState;
    });

    setNewEntries(prevEntries => [...prevEntries, ...newEntriesFound.map(entry => ({ ...entry, fileName }))]);
    setFileList(prevFiles => [...prevFiles, fileName]);
  };

  const removeFileData = (fileName) => {
    setFileList(prevFiles => prevFiles.filter(file => file !== fileName));

    // 파일 데이터에서 삭제할 항목 가져오기
    const { newTimeByPerson, newEntriesFound } = fileData[fileName];

    // totalTimeByPerson 업데이트
    setTotalTimeByPerson(prevState => {
      const updatedState = { ...prevState };
      for (const person in newTimeByPerson) {
        updatedState[person] -= newTimeByPerson[person];
        if (updatedState[person] <= 0) {
          delete updatedState[person];
        }
      }
      return updatedState;
    });

    // newEntries 업데이트
    setNewEntries(prevEntries => prevEntries.filter(entry => entry.fileName !== fileName));

    // 파일 데이터에서 삭제
    setFileData(prevData => {
      const updatedData = { ...prevData };
      delete updatedData[fileName];
      return updatedData;
    });
  };

  return (
    <ExcelDataContext.Provider value={{ totalTimeByPerson, newEntries, addNewData, fileList, removeFileData }}>
      {children}
    </ExcelDataContext.Provider>
  );
};

export default ExcelDataContext;
