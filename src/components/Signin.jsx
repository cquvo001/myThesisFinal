import React, { useState,useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import {auth} from '../firebase';
import {sendPasswordResetEmail} from 'firebase/auth';

const Signin = () => {
  const { getAuth, signIn, } = UserAuth(); 
  const [email,setEmail] = useState ('');
  const navigate =  useNavigate();
  const emailRef = useRef();
  const psdRef = useRef();

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) {
      await signIn(email, password)
      setEmail(email)
      navigate('/account')};
      console.log(password);
  };
const forgotPassword = (email) => {
  console.log("reset email sent to " + email);
    sendPasswordResetEmail(auth, email, null)
        .then(() => {
            alert("reset email sent to " + email);
        })
        .catch(function (e) {
            console.log(e);
        });
};
 
const forgotPasswordHandler = () => {
  const email = emailRef.current.value;
  if (email)
    forgotPassword(email).then(() => {
    emailRef.current.value = "";
      });
};

  return (
    <div class='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 class='text-2xl font-bold py-2'> Sign in to your account</h1>
        <p class='py-2'>
          Don't have an account yet? {' '}<Link to='/signup' className='underline'>Sign up.</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label class='py-2 font-medium'>Email Address</label>
          <input placeholder="Email" type="email" ref={emailRef} />
        </div>
        <div class='flex flex-col py-2'>
          <label class='py-2 font-medium'>Password</label>
          <input placeholder="Password" type="password" ref={psdRef} />
        </div>
        <button className='border p-3 border-blue-500 bg-blue-600 hover:bg-blue-500 w-full 
        p-4 my-2 text-white'>Sign In</button>
        <button onClick={forgotPasswordHandler}>Forgot Password?</button>
       <div class="resetPassword-main">
        </div>
      </form>
    </div>
  )
}

export default Signin
