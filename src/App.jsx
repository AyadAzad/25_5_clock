import React from 'react';
import './App.css';
import Clocks from './Components/Clocks';

const App = () => {
  return (
    <div>
      <h1 className='text-center text-3xl p-5 mt-10 text-blue-600 block shadow-lg shadow-blue-500'>Colorful 25+5 clock</h1>
      <Clocks/>
    
    </div>
  );
};

export default App;
