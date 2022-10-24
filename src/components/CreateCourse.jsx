import React, {useState,useEffect,} from 'react';
  import { UserAuth } from '../context/AuthContext';
  import {useNavigate,Link,Route} from 'react-router-dom';
  import {db} from '../firebase';
  import {collection,getDocs,addDoc,updateDoc, doc,deleteDoc} from 'firebase/firestore';
  import {makeStyles} from '@material-ui/core/styles';
  import Button from '@material-ui/core/Button';
  import { IconButton } from '@material-ui/core';
  import DeleteIcon from '@material-ui/icons/Delete';
  import styled from 'styled-components';
  import {AgGridColumn,AgGridReact} from 'ag-grid-react';
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-material.css';
  import AppBar from '@material-ui/core/AppBar';
  import Toolbar from '@material-ui/core/Toolbar';
  import Typography from '@material-ui/core/Typography';
  import { NumberSequence, RowNode } from 'ag-grid-community';
  
  
  
  const CreateCourse = () => {
    const {user, logout} =UserAuth();
    const [website, setWebsite]= useState("");
    const [newStart, setNewStart]= useState("");
    const [newEnd,setNewEnd] = useState("");
    const [newCourse, setNewCourse]= useState("");
    const [users, setUsers] = useState([])
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    
    const createCourse = async() =>{
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' '+ today.getHours()+':'+today.getMinutes();
    
      await addDoc (usersCollectionRef, 
          { website: website,  course:newCourse, start:newStart, end:newEnd, 
            postText:postText, date:date});  } 

    const usersCollectionRef = collection(db, "users");
    
      
    useEffect(()=> {
  
        const getUsers = async () => {
           const data= await getDocs(usersCollectionRef); 
           console.log(data);
           setUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id, index:NumberSequence, option:null})));
        }
        getUsers()
    },[])
  
    const deleteCourse  = async (id) => {
      const userDoc= doc(db, 'users', id);
      await deleteDoc(userDoc)
    }
    users.forEach((user, index) => { user.index = index + 1; });
  
      const Button = styled.button`
      background-color: green;
      color: white;
      font-size: 20px;
      padding: 10px 60px;
      border-radius: 5px;
      margin: 10px 0px;
      cursor: pointer;
      &:disabled {
        color: blue;
        opacity: 0.7;
        cursor: default;
      }
    `;
    
  
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" noWrap>
              Personal Online Courses and Projects
            </Typography>
          </Toolbar>
        </AppBar>
  
      <div className='max-w-[1500px] mx-auto my-16 p-4'>
        <h1 className='text-2xl font-bold py-4'> Your account</h1>
        <p>Student name: {user.displayName}</p>
        <p>Your email: {user && user.email}</p>
        <div>
              <label> Website or source of course/project:
              <input placeholder= 'Website/project' header ='Website/Tittle: '
                  onChange={(event)=>{setWebsite(event.target.value);}}
              />
              </label>
        </div>
        <div>
              <label> Name of course/project: 
              <input placeholder='Courses / Projects...'
                  onChange={(event)=> {setNewCourse(event.target.value);}}
              />
              </label>
        </div>
        <div>
              <label> Starting date: 
              <input type='date' placeholder='Date...'
                  onChange={(event)=>{setNewStart(event.target.value);}}
              />
              </label>
        </div>
        <div>
              <lable>Ending date: 
              <input type='date' placeholder='Date...'
                  onChange={(event)=>{setNewEnd(event.target.value);}}
              />
              </lable>
        </div>
               
        
        </div>

        <div class="bg-gradient-to-b from-yellow-800 to-yellow-600 h-96">
      
        <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <h1 class="text-3xl font-bold leading-7 text-center text-white" > Course/Project Review</h1>
               
        <div class="w-full md:w-1/2 flex flex-col">
          <label class="font-semibold leading-none text-gray-300"> Course Review:</label>
          <textarea class="h-40 text-base leading-none text-black p-3 focus:outline-none focus:border-blue-700 mt-4 bg-white-800 border-0 rounded"
          placeholder='Post...'
            onChange={(event) =>{setPostText(event.target.value)}}/>
        </div>
       
        </div>
        </div>
        <Button 
              style= {{margin: 10}} 
              color="primary" 
              variant="outlined" 
              onClick={createCourse}
              > Create new course</Button> 

      </div>
    )
  }
  
  export default CreateCourse;
  