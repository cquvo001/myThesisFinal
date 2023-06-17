import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from  './components/Signup';
import Account from './components/Account';
import CreateCourse from './components/CreateCourse';
import {AuthContextProvider} from './context/AuthContext';


function App() {
  return (
    <div >
      <h1 class='text-center text-3xl font-bold '>
        XAMK - Kaakkois-Suomen Ammattikorkeakoulu 
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path ='/' element ={ <Signin /> } /> 
          <Route path ='/signup' element ={<Signup />} /> 
          <Route path ='/account' element ={<Account/>} /> 
          <Route path='/createcourse' element={<CreateCourse />} />
        </Routes>
      </AuthContextProvider>
      
    </div>
  );
}
export default App;
