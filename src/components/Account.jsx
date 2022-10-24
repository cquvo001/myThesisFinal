import React, {useState,useEffect,useMemo,moment,format, Children} from 'react';
import { UserAuth } from '../context/AuthContext';
import {useNavigate,Link,Route} from 'react-router-dom';
import {db} from '../firebase';
import {collection,getDocs,addDoc,onSnapshot,serverTimestamp, doc,deleteDoc,query,orderBy} from 'firebase/firestore';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { IconButton, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import {AgGridColumn,AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NumberSequence, RowNode } from 'ag-grid-community';
import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import firebase from '../firebase';
import Auth from "./auth";

const Account = () => {
  const {user, logout,loading,error} =UserAuth();
  const navigate = useNavigate ();
  const  handleLogout = async () =>{
    try {
      await logout();
      navigate ('/')
      console.log ('You are log out.')
    } catch (e) {
      console.log(e.message);
    }
  }

  const [newName, setNewName]= useState("");
  const [newStart, setNewStart]= useState("");
  const [newEnd,setNewEnd] = useState("");
  const [newCourse, setNewCourse]= useState("");
  const [users, setUsers] = useState([])
  const [postText, setPostText] = useState("");
 
 
  const createUser = async() =>{
        
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
  
    
      await addDoc (usersCollectionRef, 
        { website: newName, course:newCourse, start:newStart, end:newEnd, 
          postText:postText, date:date});  } 

  const usersCollectionRef = collection(db, "users");
    
  useEffect(()=> {

      const getUsers = async () => {
         const data= await getDocs(usersCollectionRef); 
         console.log(data);
         setUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id,index:NumberSequence})));
      }
      getUsers()
  },[])

 
  const deleteUser  = async (id) => {
    const userDoc= doc(db, 'users', id);
    await deleteDoc(userDoc)
  }

  users.forEach((user, index) => { user.index = index + 1; });
    
  const [professorComments,setProfessorComments] = useState([]);
  const [comment, setComment] = useState("");
  const q=query(collection(db,'professorComments'),orderBy('timestamp','desc'));  

  professorComments.forEach((comment, index) => { comment.index = index +  1; });


  useEffect(() => {
        
    onSnapshot(q,(snapshot)=>{
      setProfessorComments(snapshot.docs.map(doc=>({
      id: doc.id,
      item: doc.data(),
      timestamp: doc.timestamp
      
      })))
      })
  },[comment]);
  
  //const timeStampDate = record.createdAt;
  //const dateInMillis  = timeStampDate._seconds * 1000
  //var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()


  const addComment=(e)=>{
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() +' at '+ today.getHours()+':'+today.getMinutes();
    
    e.preventDefault();
  addDoc(collection(db,'professorComments'),{
    comment:comment,
    timestamp:  serverTimestamp.toString(),
    date:date
    
  })
  setComment('')
  };


  const Advice=({arr})=>{
    return (
    <List  class="bg-green-100 text-yellow-900 text-lg font-bold text-right p-14 rounded-lg ">
    <ListItem>
    <ListItemAvatar />
    <ListItemText primary={arr.item.date} secondary={arr.item.comment} />
    </ListItem>
    <DeleteIcon color="secondary" fontSize="large" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(db,'professorComments',arr.id))}} />
    </List>
    )
    };

  
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
    
   
  
  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressSideButtons: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
        },
      ],
      defaultToolPanel: 'columns',
    };
  }, []);
  
  

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
      <p>Student email: {user.email}</p>

      <Button 
      onClick={handleLogout }
      className='border px-6 py-2 my-4'>
      Logout
      </Button>
     <div>     
      <div > 
      <div className="ag-theme-material" style={ { height: 800, width: '2000', margin: 0 } }>
        <AgGridReact rowData={users}  sideBar={sideBar}>
         <AgGridColumn field='index' headerName='No.' width={70}  />
         <AgGridColumn filter={true} field= 'website' headerName=' Website' width={150} wrapText={true} autoHeight={true}/>
         <AgGridColumn filter={true} field='course' width={150} wrapText={true} autoHeight={true}/>
         <AgGridColumn filter={true} field='start' width={150}/>
         <AgGridColumn filter={true} field='end' width={150}/>
         <AgGridColumn filter={true} field='postText' 
          headerName='Course review' width={500} 
          wrapText={true} autoHeight={true}/>
         <AgGridColumn 
           filter={true} field='date' headerName='Created date' /> 
          
          <AgGridColumn 
          headerName='Delete '
          field='id' 
          width={90}
          cellRendererFramework={ user => 
          <IconButton onClick={() => {deleteUser(user.value)}} size="small" color="secondary">
          <DeleteIcon />
          </IconButton>
          } /> 
        </AgGridReact>
                     
        </div>                
        </div>
    
        <Link to="/createcourse">
          <Button 
          className='border px-6 py-2 my-4'
          style= {{margin: 10}} 
          color="primary" 
          variant="outlined"> New course</Button>
          </Link>
 
            {/*<Button 
              style= {{margin: 10}} 
              color="primary" 
              variant="outlined" 
              //onClick={CreateComment}
              onClick={addComment}
        > Save</Button> */}
          <div className="ag-theme-material" style={ { height: 800, width: '2000', margin: 0 } }>
            <form>
           
            <h1 className='text-2xl font-bold py-4'> Course/Project Advice </h1>
            
            <textarea type="text" id="input-comment" class=" bg-gray-50 border border-gray-300 text-gray-900 text-xl
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
             dark:focus:border-blue-500  rounded"  placeholder='Course comment...'  onChange={e=>setComment(e.target.value)} value={comment} />

            <Button variant="contained" color="primary" onClick={addComment}  >Add Comment</Button>
            
            </form>
           <div class="grid grid-cols-2 gap-x-5 gap-y-3">
           <div class=" bg-yellow-50 border border-gray-300 text-gray-900 text-xl
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
             dark:focus:border-blue-500  rounded" >
            {professorComments.map(item=> <Advice key={item.id} arr={item} />)}
            </div>
            </div>
            </div>
            </div>

          </div>
        </div>
     
  )
}
;

export default Account;
