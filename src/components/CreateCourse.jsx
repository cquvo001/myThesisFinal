import React, {useState} from 'react';
  import { UserAuth } from '../context/AuthContext';
  import {db} from '../firebase';
  import {collection, addDoc} from 'firebase/firestore';
  import styled from 'styled-components';
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-material.css';
  import AppBar from '@material-ui/core/AppBar';
  import Toolbar from '@material-ui/core/Toolbar';
  import Typography from '@material-ui/core/Typography';
  
    
    const CreateCourse = () => {
  
    const {user} =UserAuth();
    const [website, setWebsite]= useState("");
    const [newStart, setNewStart]= useState("");
    const [newEnd,setNewEnd] = useState("");
    const [newCourse, setNewCourse]= useState("");
    const [postText, setPostText] = useState("");
        
    const usersCollectionRef = collection(db, "users");
    const createCourse = async() =>{
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() 
      + ' '+ today.getHours()+':'+today.getMinutes();
      await addDoc (usersCollectionRef, 
          { website: website,  course:newCourse, start:newStart, end:newEnd, 
            postText:postText, date:date});  
    } 
   
    
    
  
      const Button = styled.button`
      background-color: green;
      color: white;
      font-size: 20px;
      padding: 10px 60px;
      border-radius: 5px;
      margin: 10px 0px;
      cursor: pointer;
      }
    `;
    
  
    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" noWrap>
              Personal Online Courses and Projects
            </Typography>
          </Toolbar>
        </AppBar>
        <div class="text-blue-500 text-xl font-semibold" align='right' margin='50'>
        <h1 class='text-2xl font-bold py-4'> Account owner</h1>
        <p>Student name: {user.displayName}</p>
        <p>Email: {user.email}</p>
        </div>
        <div class='max-w-[1500px] mx-auto my-16 p-4'>
        <table >
          <tbody class="divide-y">
        <tr>
          <td class="text-yellow-800 text-xl font-semibold"> Website or source of course/project: </td>
          <td >  <input type='text' 
                  class="text-yellow-800 text-xl font-semibold"
                  placeholder= 'Website/project' header ='Website/Tittle: '
                  onChange={(event)=>{setWebsite(event.target.value);}}/>
          </td>
        </tr>
        <tr>
        <td class="text-yellow-800 text-xl font-semibold"> Name of course/project: </td>
        <td><input class="text-yellow-800 text-xl font-semibold"  placeholder='Courses / Projects...'
                  onChange={(event)=> {setNewCourse(event.target.value);}}/>
        </td>          
        </tr>
        <tr>
        <td class="text-yellow-800 text-xl font-semibold"> Starting date: </td>
        <td><input type='date' class="text-green-800 text-xl font-semibold"
                  placeholder='Date...'
                  onChange={(event)=>{setNewStart(event.target.value);}}/>
        </td>
        </tr>
        <tr>
          <td class="text-yellow-800 text-xl font-semibold">Ending date: </td>
          <td>    <input type='date' placeholder='Date...'
                  class="text-red-500 text-xl font-semibold"
                  onChange={(event)=>{setNewEnd(event.target.value);}}/>
          </td>
        </tr>
        </tbody>
        </table>     
        
        </div>

        <div class="bg-gradient-to-b from-yellow-800 to-yellow-600 h-96" style={ { height: 400, width: '8000', margin: 10 } }>
        <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <h1 class="text-3xl font-bold leading-7 text-center text-white" > Course/Project Review</h1>
        <div class="w-full flex flex-col" >
          <label class="font-semibold leading-none text-green-300 text-2xl" > Please add your review here:</label>
          <textarea class=" bg-gray-50 border border-gray-300 
                text-gray-900 text-xl focus:border-blue-500 w-full p-2.5 rounded "
           style={ { height: 300, width: '22000', margin: 10 } }
          placeholder='Course review...'
            onChange={(event) =>{setPostText(event.target.value)}}/>
        </div>
        </div>
        </div>
        <Button 
          style= {{margin: 10}} 
          onClick={createCourse}> 
          Create new course
        </Button> 
      </div>
    )
  }
  
  export default CreateCourse;
  