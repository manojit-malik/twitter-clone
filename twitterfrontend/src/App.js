// import { Routes, Route } from 'react-router-dom';
// import './App.css';
// import HomePage from '../src/Components/HomePage/HomePage';
// import Authentication from '../src/Components/Authentication/Authentication';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserProfile } from '../src/Store/Auth/Action';  

// function App() {
//   const jwt = localStorage.getItem("jwt"); 
//   const { auth } = useSelector((store) => store);  
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUserProfile(jwt));  
//     }
//   }, [auth.jwt]);

//   return (
//     <div className="">
//       <Routes>
//         <Route path="/*" element={auth.user?<HomePage />:<Authentication/>} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../src/Components/HomePage/HomePage';
import Authentication from '../src/Components/Authentication/Authentication';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../src/Store/Auth/Action';  

function App() {
  const jwt = localStorage.getItem("jwt"); 
  const { auth } = useSelector((store) => store);  
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));  
    }
  }, [dispatch, jwt]); // Add 'dispatch' and 'jwt' to the dependency array

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
