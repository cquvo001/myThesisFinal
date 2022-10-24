import React, { useState,useEffect } from "react";
import {db} from '../firebase';
import { NumberSequence, RowNode } from 'ag-grid-community';

import {collection,getDocs,addDoc,updateDoc, doc,deleteDoc} from 'firebase/firestore';

function Header({ saveCom }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCom(input);
    setInput("");
  };


  const [todos, setTodos] = useState([]);
  const [postText, setPostText] = useState("");
  

  const createTodo = async() =>{
        
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
  
    
      await addDoc (usersCollectionRef, 
        {  postText:postText, date:date});  } 

  const usersCollectionRef = collection(db, "todos");
    
      
  useEffect(()=> {

      const getTodos = async () => {
         const data= await getDocs(usersCollectionRef); 
         console.log(data);
         setTodos(data.docs.map((doc)=>({...doc.data(),id: doc.id, index:NumberSequence})));
      }
      getTodos()
  },[])

  todos.forEach((todo, index) => { todo.index = index + 1; });




  const getTodos = () => {
    const getFromFirebase = collection("todos");
    getFromFirebase.onSnapshot((querySnapShot) => {
      const saveFirebaseTodos = [];
      querySnapShot.forEach((doc) => {
        saveFirebaseTodos.push(doc.data());
      });
      setTodos(saveFirebaseTodos);
    });


  return (
    <div>
      <center>
        <form onSubmit={handleSubmit}>
          <h1 className="title">Professor comment</h1>
          <div className="input">
            <input
              type="text"
              required
              placeholder="Course/Project comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
        </center> 
        <div className="saveandget">
        <Header createTodo={createTodo} getTodos={getTodos} />
        </div>
    
    </div>
  );
}
};

export default Header;