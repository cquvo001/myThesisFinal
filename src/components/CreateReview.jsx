import React, { useState,useEffect } from 'react';
import {addDoc,collection,doc,deleteDoc,getDocs} from 'firebase/firestore';
import {db, auth} from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { NumberSequence, RowNode } from 'ag-grid-community';
import { UserAuth } from '../context/AuthContext';  
import { data } from 'autoprefixer';

function CreateReview() {
  const {user, logout} =UserAuth();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [users, setUsers] = useState([])
  const [yourCourse, setYourCourse]=useState([])
  
  const usersCollectionRef = collection(db,"users");
  
  useEffect(()=> {
  
    const getUsers = async () => {
       const data= await getDocs(usersCollectionRef); 
       console.log(data);
       setUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id, index:NumberSequence, option:null})));
    }
    getUsers()
},[])

  const CreateReview = async () => {
    await addDoc (usersCollectionRef, {
      title:  title||null,
      postText: postText||null,
      author: { name: auth.currentUser.displayName, id:auth.currentUser.uid},
    });  
    Navigate("/account")
  }

  return (
    <div class="bg-gradient-to-b from-yellow-800 to-yellow-600 h-96">
      <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        {users.map((course)=>{  
        return (
          <div >
            {/*<h1 class="text-3xl font-bold leading-7 text-center text-white" > 
            Course/Project Review</h1>*/}
             Course name: {course.course}
             <p>Your email: {user.email}</p>
          </div> )})}   
               
          <label class="font-semibold leading-none text-gray-300"> 
          Course comment:</label>
          <textarea class="h-40 text-base leading-none text-black p-3 focus:outline-none
          focus:border-blue-700 mt-4 bg-white-800 border-0 rounded"
          placeholder='Post...'
            onChange={(event) =>{setPostText(event.target.value)}}/>
        
      </div>
        
        <div class="flex items-center justify-center w-full">
          <button class="mt-9 font-semibold leading-none text-white py-4 px-10
         bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 
         focus:ring-blue-700 focus:outline-none"
         onClick={CreateReview}
         >
          Submit 
          </button>
        </div>
  </div>
    
  )
}

export default CreateReview
