import React, {useState,useEffect,useMemo,moment,format, Children} from 'react';
import { UserAuth } from '../context/AuthContext';
import {useNavigate,Link,Route} from 'react-router-dom';
import {db} from '../firebase';
import {collection,getDocs,addDoc,onSnapshot,serverTimestamp, doc,deleteDoc,query,orderBy} from 'firebase/firestore';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import {AgGridColumn,AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {NumberSequence} from 'ag-grid-community';
import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const Account = () => {
  const {user, logout} =UserAuth();
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
  
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users");
  useEffect(()=> {
      const getUsers = async () => {
         const data= await getDocs(usersCollectionRef); 
         console.log(data);
         setUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id,index:NumberSequence})));
      }
      getUsers()
  },[])
  users.forEach((user, index) => { user.index = index + 1; });
 
  const deleteCourse  = async (id) => {
    const userCourse= doc(db, 'users', id);
    await deleteDoc(userCourse)
  }
   
  const [professorComments,setProfessorComments] = useState([]);
  const [comment, setComment] = useState("");
  const addComment=(e)=>{
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' 
    + today.getDate() +' at '+ today.getHours()+':'+today.getMinutes();
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
    <ListItemText primary={arr.item.date} secondary={arr.item.comment} />
    </ListItem>
    </List>
    )
  };
  
  const q=query(collection(db,'professorComments'),orderBy('timestamp','desc'));  
  useEffect(() => {
    onSnapshot(q,(snapshot)=>{
    setProfessorComments(snapshot.docs.map(doc=>({
    id: doc.id,
    item: doc.data(),
    timestamp: doc.timestamp, 
  })))
  })},[comment]);
  
  
  
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
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Personal Online Courses and Projects
          </Typography>
          <Button 
            style={{ marginLeft: "auto" }}
            onClick={handleLogout }
            class='border px-6 py-2 my-4' >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box> 
      <div className='max-w-[1500px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'> Your account</h1>
      <p>Student name: {user.displayName}</p>
      <p>Student email: {user.email}</p>
      
      <div>     
      <div> 
      <div class="ag-theme-material" style={ { height: 800, width: '2000', margin: 0 } }>
        <AgGridReact rowData={users}>
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
          <IconButton onClick={() => {deleteCourse(user.value)}} size="small" color="secondary">
          <DeleteIcon />
          </IconButton>
          } /> 
        </AgGridReact>
      </div>                
        </div>
    
        <Link to="/createcourse">
          <Button 
          class='border px-6 py-2 my-4'
          style= {{margin: 10}} 
          color="primary" 
          variant="outlined"> New course</Button>
        </Link>
           
            
          <h1 className='text-2xl font-bold py-4'> Course/Project Advice </h1>
            <textarea type="text" id="input-comment" class=" bg-gray-50 border border-gray-300 
             text-gray-900 text-xl focus:border-blue-500 w-full p-2.5 rounded"  
              placeholder='Course comment...'  
              onChange={e=>setComment(e.target.value)} 
              value={comment} />
          <Button variant="contained" color="primary" onClick={addComment} >Add Comment</Button>
            
          <div class="ag-theme-material" style={ { height: 800, width: '2000', margin: 0 } }>
           <div class=" bg-yellow-50 border border-gray-300 text-gray-900 text-xl
              w-full p-2.5 rounded" >
            {professorComments.map(item=> <Advice key={item.id} arr={item} />)}
           </div>
          </div>
        </div>
           

          </div>
        </div>
     
  )
}
;

export default Account;
