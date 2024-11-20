
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../src/Components/HomePage/HomePage';
import Authentication from '../src/Components/Authentication/Authentication'

function App() {
  return (
    <div className="">

      <Routes>
        <Route path="/*" element={true?<HomePage/>:<Authentication/>}/>
        
      </Routes>
      
    </div>
  );
}

export default App;
