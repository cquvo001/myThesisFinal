import {createContext, useContext,useEffect,useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, 
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../firebase'

export const UserContext = createContext({});

export const UserAuth = ()=> {
    return useContext(UserContext);
};


export const AuthContextProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);
/*
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (currentUser)=> {
            console.log(currentUser);
            setUser(currentUser);
        });
        return ()=> {
            unsubscribe();
        };
    },[]);
*/
  const createUser = (email,password,name) => {
    //return createUserWithEmailAndPassword (auth, email, password)
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: name,
        })
      )
      .then((res) => console.log(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
       
};

const signIn=(email,password)=> {
    //return signInWithEmailAndPassword(auth,email,password);
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((err) => setError(err.code))
      .finally(() => setLoading(false));
}

const logout = ()=> {
    signOut(auth);
}

const forgotPassword=(email) =>{
    return sendPasswordResetEmail(auth,email);
};
    

const contextValue = {
    user,
    loading,
    error,
    signIn,
    createUser,
    logout,
    forgotPassword
    };

return (
    <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>

);
};

