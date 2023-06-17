import {createContext, useContext,useEffect,useState } from 'react';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut, 
    onAuthStateChanged,
    sendPasswordResetEmail, 
    fetchSignInMethodsForEmail} from 'firebase/auth';
import {auth} from '../firebase';

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

  const createUser = (email,password,name) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: name,
        })
      )
      .then((res) => console.log(res))
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else if ( errorCode === 'auth/email-already-in-use' ) {
          alert('The email is available. Please choose another email or Sign in.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
      .finally(() => setLoading(false));
  };


const signIn = (email,password)=>{
signInWithEmailAndPassword(auth,email, password).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  if ( errorCode === 'auth/user-not-found' ) {
          if ( errorCode == 'auth/user-not-found' ) {
              alert('Please provide a valid email.');
          } else if ( errorCode == 'auth/invalid-email' ) {
              alert('Please provide a valid email');
          } else {
              alert(errorMessage);
          }
          console.log(error);
  } else if ( errorCode === 'auth/wrong-password' ) {
      fetchSignInMethodsForEmail(auth,email).then(function( result ){
      });
      alert('Wrong password. Please try again');
    } else if ( errorCode == 'auth/too-many-requests' ) {
      alert('The account had temporarily disabled. You can immediately restore it by resetting your password or you can try again later.');
    } else {
      alert( errorMessage );
  }
  console.log( error );
});
}

const forgotPassword=(email) =>{
  return sendPasswordResetEmail(auth,email);
};

const logout = ()=> {
    signOut(auth);
}

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

