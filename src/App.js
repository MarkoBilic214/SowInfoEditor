import React from 'react';
import './App.css';
import HeadMark from './head/HeadMark';
import SowFileInfo from './SowFileInfo/SowFileInfo';
import { SowProvider } from './providers/SowProvider';
import SowDataTable from './SowData/SowDataTable';

const App = () => {
    return (
    <div className="App">
      <SowProvider>
        <HeadMark></HeadMark>
        <SowFileInfo></SowFileInfo>
        <SowDataTable></SowDataTable>
      </SowProvider>
    </div>
  );
}

export default App;
