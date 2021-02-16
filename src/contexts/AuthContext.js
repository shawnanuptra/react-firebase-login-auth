import React, { useContext, useEffect, useState, } from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    //set up a State
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //Signup function, using 'auth' from firebase.js
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    //Login function, using 'auth' from firebase.js
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    //Logout function
    function logout(){
        return auth.signOut();
    }

    //Reset password function
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        return auth.currentUser.updateEmail(email);
    }

    function updatePassword(password){
        return auth.currentUser.updatePassword(password);
    }

    //Used to only do this once
   useEffect(() => {
        //When the AuthState changes, e.g. user is signed up, this method will be triggered
        //this changes the State of CurrentUser to have value of 'user'
       const unsubscribe = auth.onAuthStateChanged(user => {
           setCurrentUser(user);
           setLoading(false);
           
       })
       //when .onAuthStateChanged is run, it will call a method that returns 'unsubscribe', so it will stop listening to the AuthStateChanged
       //we just return 'unsubscribe' to stop listening
       return unsubscribe;
   }, [])

   

    //the Context object
    const value= {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
        updateEmail
    }
    
    return (
        // Insert the Context values into the Provider, works the same way as Flutter Provider
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
