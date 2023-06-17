import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const psdRef = useRef();
  const  {createUser} = UserAuth();
  
  const handleSubmit = async (e) =>{
   e.preventDefault();
   const email = emailRef.current.value;
   const name = nameRef.current.value;
   const password = psdRef.current.value;
   if (email && password && name) await createUser(email, password, name);
 };

  return (
    <div class='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 class='text-2xl font-bold py-2'> Sign up an account</h1>
        <p class='py-2'>
          Already have an account? <Link to='/' className='underline'>Sign In</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div class='flex flex-col py-2'>
          <label class='py-2 font-medium'>User name:</label>
          <input placeholder="Name" type="name" ref={nameRef} />
        </div>
        <div class='flex flex-col py-2'>
          <label class='py-2 font-medium'>Email Address</label>
          <input placeholder="Email" type="email" ref={emailRef} />
        </div>
        <div class='flex flex-col py-2'>
          <label class='py-2 font-medium'>Password</label>
          <input placeholder="Password" type="password" ref={psdRef} />
        </div>
        <button 
        class='border p-3 border-blue-500 bg-blue-600 hover:bg-blue-500 
        w-full p-4 my-2 text-white'
        type='submit'
        >
        Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
