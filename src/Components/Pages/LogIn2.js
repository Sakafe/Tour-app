import React, {useContext, useState} from 'react';
import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth,signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword,
  signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import Header from '../Header/Header';
import { MyContext } from '../../App';

firebase.initializeApp(firebaseConfig);
function LogIn() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const [newUser,setNewUser] = useState(false);
  const [user,setUser]  = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password : '',
    photo : '',
  })

  const [loggedIn,setLoggedIn]= useContext(MyContext);
  const handleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then((result) =>{
      const {displayName,email,photoURL }= result.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL,
      }
      setUser(signedInUser);
      setLoggedIn(signedInUser);
      console.log(displayName,email,photoURL );
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    })
  }
  const handleFbSignIn = () =>{
    signInWithPopup(auth, fbProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log('fbUser after sign in :', user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  }
  const handleSignOut = () =>{
    signOut(auth).then((res) => {
      // Sign-out successful.
      const signedOutUser = {
        isSignedIn : false,
        name : '',
        email : '',
        photo : '',
        error : '',
        success : false,
      }
      setUser(signedOutUser);
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleonBlur = (event) =>{
    console.log(event.target.name);
   console.log(event.target.value);
   let isFormedValid = true;

   if(event.target.name === 'email'){
  const isFormedValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);

   console.log(isFormedValid);

   }
   if(event.target.name === 'password'){
     const passwordValid = event.target.value.length > 8 ;
    //  const passwordhasNumber = /\S+@\S+\.\S+/.test(event.target.value);
      isFormedValid = (passwordValid);
   }
  if(isFormedValid){
    const newUserInfo = {...user};
    newUserInfo[event.target.name] = event.target.value ;
    setUser(newUserInfo);
  }
  }
  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          console.log(res);
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          // Signed in 
          // const user = res.user;
          // ...
  })
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log(errorCode,errorMessage);
    // ..
  });
    }
    if(!newUser && user.email && user.password ){
      signInWithEmailAndPassword(auth, user.email, user.password)
  .then((res) => {
    // Signed in 
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedIn(newUserInfo);
          console.log('sign in user info',res.user)
  })
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
    // const errorCode = error.code;
    // const errorMessage = error.message;
  });

    }
    e.preventDefault();
  }

  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name, 
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      console.log('User updated successfully');
    }).catch((error) => {
      // An error occurred
      console.log(error);
    });
  } 
  return (
    <div>
        <Header/>
      {
        user.isSignedIn ? <button onClick = {handleSignOut} >Sign out</button> :
        <button onClick = {handleSignIn} >Sign in</button>
      }<br/>
      <button onClick={handleFbSignIn}>Sign in by Facebook</button>
      {
        user.isSignedIn && 
        <div>
           <h1>Welcome {user.name}</h1>
           <p>Your email is '{user.email}'</p>
           <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own authentication</h1>
      <p>Name : {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p>
      <input type="checkbox" name="newUser" onChange={() =>setNewUser(!newUser)} id="newUser" />
      <lebel htmlFor='newUser' >New user sign up</lebel>
      <form onSubmit={handleSubmit}>
      {newUser && <input type="text" onBlur={handleonBlur} name='name' placeholder='your name' required />}<br /> 
      <input type="email" onBlur={handleonBlur} name='email' placeholder='your email' required /><br />
      <input type="password" onBlur={handleonBlur} name='password' placeholder='your password' required /><br />
      <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'Logged in'} successfully.</p>}
    </div>
  );
}

export default LogIn;
