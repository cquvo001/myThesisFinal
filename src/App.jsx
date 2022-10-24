import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from  './components/Signup';
import Account from './components/Account';
import CreateReview from './components/CreateReview';
import {AuthContextProvider, UserAuth} from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import CreateCourse from './components/CreateCourse';
import Auth from "./components/auth";


function App() {
  const { user, loading, error } = UserAuth();
  return (
    <div className="App">
  
      <h1 className='text-center text-3xl font-bold '>
        XAMK - Kaakkois-Suomen Ammattikorkeakoulu 
      </h1>
      <AuthContextProvider>
      <Routes>
        <Route path ='/' element ={ <Signin /> } /> 
        <Route path ='/signup' element ={<Signup />} /> 
        <Route path ='/account' 
        element ={
        <ProtectedRoute>
        {error && <p className="error">{error}</p>}
        {loading ? <h2>Loading...</h2> : <> {<Account />} </>} 
        {/*< Account />*/}
        </ProtectedRoute> 
        } /> 
        <Route path='/createreview' element={<CreateReview />} />
        <Route path='/createcourse' element={<CreateCourse />} />
      </Routes>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
