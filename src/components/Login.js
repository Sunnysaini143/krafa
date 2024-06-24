import { Fade, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState, createContext, useEffect } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import ProfileSetup from './ProfileSetup';
import { getAuth, GoogleAuthProvider,signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber,RecaptchaVerifier } from "firebase/auth";
import { app } from './Firebase';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import {useDispatch, useSelector} from 'react-redux'
import { notsignedin, yessignedin } from '../productredux/productslices/signedinslice';
import {toast } from 'react-toastify';
import { child, get } from "firebase/database";
import { addcredential } from '../productredux/productslices/credentialSlice';
import { yesauthenticated } from '../productredux/productslices/authenticateSlice';
import {uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { ref as ref1} from 'firebase/storage';
export const phonenumber=createContext();
export const db=getDatabase(app);
// const dbRef = getDatabase(app);

export default function Login({Ismodalopen, setIsmodalopen,setProfileSetup ,setEmail ,email, number, setNumber},props) {
  // const[number, setNumber]=useState("");
  // const[email,setEmail]=useState({email:""});
  const [signup,setSignUp]=useState(false);
  const [signupwithemail, setSignupwithemail]=useState(false);
  const [statepassword, setPassword]=useState({password:"", confirmpassword:""})
  const [retriveddata, setRetriveddata]=useState({name:"", email:"", phoneno:"", address:"", imageurl:""});
  // const [verificationId, setVerificationId] = useState('');
  // const [verificationCode, setVerificationCode] = useState('');
  // const [verificationError, setVerificationError] = useState(null);
  const auth=getAuth(app);
  const dispatch=useDispatch();
  const selector=useSelector(state=>state.signedin);
  auth.languageCode = 'it';
  const provider = new GoogleAuthProvider();
  const storage=getStorage(app);
//  const refrence=ref(db,"user/"+ email.email);
const encodeEmail = (email) => {
  return email.replace(/\./g, ',').replace(/@/g, '_');
};

  const handleChange=(value)=>{
   setNumber(value);
  }
  const handleClose=()=>{
    setIsmodalopen(false);
    // console.log(Ismodalopen);
  }
 const handlesignup=()=>{
  setSignUp(!signup);
 }
async function handleNext (){
  if(signupwithemail?email==null:number.length<10)
    {
      toast.error(signupwithemail?"please enter valid Email":"please enter the valid Phone Number")
      // alert("please enter the details")
    }

    else if(signupwithemail==true)
      { if(statepassword.password!==statepassword.confirmpassword)
      {
        // alert("please enter valid password")
        toast.error("please enter valid password")

      }
    else{
      
     try{ 
      await createUserWithEmailAndPassword(auth,email, statepassword.password);
        
          toast.success("Account created successfully");
          // alert("User created successfully: " + response.user.email);
          setIsmodalopen(false);
          setProfileSetup(true);
          // dispatch(yessignedin())
          localStorage.setItem('signedin', true)
          }
        
        catch(error) {
toast.error("Error during creating account:" + error.message)
          // alert("Error creating user: " + error.message);
        }
       
    }
    }
    else{
      setIsmodalopen(false);
      setProfileSetup(true) 
  // console.log("Next");
  // set(refrence, {
  //   email:email.email,
  // }).then(alert("sucess"))
    }
 }

async function handleContinue(){
  


  if(signupwithemail?email==null:number.length<10){
    (toast.error(signupwithemail?"Enter valid email":"Enter valid PhoneNumber"))
  }
  else if(signupwithemail==true){
    if(statepassword.password.length<8){
       toast.error("Enter valid Password")
    }
    else{
      const encodedEmaildata = encodeEmail(email);
      console.log(encodedEmaildata);
      const refrence=ref(db,`userdetails/${encodedEmaildata}`);
     try{ 
      let data, imageurl1={url:""};
 const usercredential= await signInWithEmailAndPassword(auth, email, statepassword.password);
  toast.success("successfully loged in");
  setIsmodalopen(false);
   onValue(refrence, async (snapshot) => {
     data = snapshot.val();
    console.log(data.name,"data");
   const imageref=ref1(storage,`images/${encodedEmaildata}`);
 const url= await getDownloadURL(imageref);
      imageurl1.url=url;
      console.log(url,"url");
console.log(imageurl1,"imageurl1");
    
    const collectivedata={
      name:data.name,
      phoneNo:data.number,
      email:data.email,
      address:data.address,
      imageurl:imageurl1.url
    }
    console.log(collectivedata,"collectivedata");
    dispatch(addcredential(collectivedata));
    dispatch(yesauthenticated());
    localStorage.setItem('items', true)
    localStorage.setItem('body', JSON.stringify(collectivedata));
  })
  }
  catch(error){
    toast.error(error.message)
  }
  
}
}
else if(signupwithemail==false) {
  toast.info("Please sign up with email")
  console.log(number);
  
  // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //   'size': 'invisible',
  //   'callback': (response) => {
  //     console.log("resolved");
  //   }}
  // )
  // setCaptcha();
//   const phoneNumber="7302756558";
//   // console.log(phoneNumber);
//   const appVerifier=new RecaptchaVerifier(auth, 'recaptcha-container',{
//     //  'size': 'invisible',
//     'callback': (response) => {
//   signInWithPhoneNumber(auth,phonenumber, appVerifier )
//   .then((confirmationResult) => {
//     const code = window.prompt("Enter OTP");
//     confirmationResult.confirm(code).then((result) => {
//       // User signed in successfully.
//       const user = result.user;
//       // ...
//       // console.log("successfully logged in ")
//     }).catch((error) => {
//       // User couldn't sign in (bad verification code?)
//       // ...
//     });
//   })
//   .catch((error) => {
//     // Error; SMS not sent
//     console.error(error);
//   });}
// })
  // const appVerifier = new RecaptchaVerifier('recaptcha-container', {
  //   'size': 'invisible',
  //   'callback': (response) => {
  //     // reCAPTCHA solved, allow signInWithPhoneNumber.
  //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //       .then((confirmationResult) => {
  //         // SMS sent. Prompt user to enter the code from the SMS message.
  //         setVerificationId(confirmationResult.verificationId);
  //         const code = window.prompt("Enter OTP");
  //         return confirmationResult.confirm(code);
  //       })
  //       .then((result) => {
  //         // User signed in successfully.
  //         const user = result.user;
  //         console.log("Successfully logged in ", user);
  //       })
  //       .catch((error) => {
  //         // Error; SMS not sent or other issues
  //         console.error(error);
  //         setVerificationError(error.message);
  //       });
  //   },
  //   'expired-callback': () => {
  //     // Response expired. Ask user to solve reCAPTCHA again.
  //     console.log('reCAPTCHA expired');
  //   }
  // });

  // // Trigger reCAPTCHA challenge
  // appVerifier.render().catch((error) => {
  //   console.error('Error rendering reCAPTCHA:', error);
  // });
};
 }
 const googleClick=()=>{
  try{ signInWithPopup(auth, provider).then( toast.success("successfully signed in"));
          setIsmodalopen(false);
          setProfileSetup(true);
          dispatch(yessignedin());
          localStorage.setItem('signedin', true)
  //  console.log(auth,"auth");
  
  }
  catch(err){
toast("error",err)
  }
 
}
 const handleemail=()=>{
setSignupwithemail(!signupwithemail)
 }
 const handleEmailchange=(e)=>{
setEmail ({...email, 
  email:e.target.value
});
 }
 useEffect(()=>{
  setSignUp(false);
    setIsmodalopen(false);
setEmail("");
setNumber("");
const signedin=localStorage.getItem("signedin");
signedin?dispatch(yessignedin()):dispatch(notsignedin());
// console.log(signedin,"signedin");
 },[])  
 const handlepassword=(e)=>{
setPassword({...statepassword, [e.target.name]:e.target.value})
// console.log(statepassword);
 }
  return (
    <>
         <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Ismodalopen}
        onClose={()=> setIsmodalopen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
    <Fade in={Ismodalopen}>
      <Grid container className="fadecontainer" >
         
        <Grid item xs={1.5} sm={2} md={4}></Grid>
        <Grid item xs={9} sm={8} md={4} className='modalclass' alignSelf={'center'}>
    
         < div className='fadecontent'>
         <div className='closebutton'>   <CloseIcon className='closebtn' onClick={handleClose}/></div>
           <Typography variant='h4' className='detailsheading'>{signup?"Welcome User":"Sign In"}</Typography> 
           <Typography variant='body2' className='detailstext'>Please enter your details</Typography> 

         
          <div className={signupwithemail?'rowoffade1display':'rowoffade1'}>
            {/* <FormControl className='formcontrol'> */}
          <PhoneInput
           inputClass="phoneiinputclass"
           buttonClass="phonebuttonclass"
           containerClass='phonecontainerclass'
          // inputStyle={{color:'green', width:"100%"}}
          // containerStyle={{borderRadius:"30px"}}
          // dropdownStyle={{height:'50px'}}
              country={'in'}
              value={number}
              onChange={handleChange}
              inputProps={{required:true}}/>
           </div>
          
           <div className={signupwithemail?'rowoffade1-2':'rowoffade1-2display'}>
           <input placeholder='Email' name="email" onChange={handleEmailchange} ></input>

           </div>
           <div className={signupwithemail?'rowoffade1-2':"classnone"}>
           <input placeholder='Password' name="password" onChange={handlepassword}></input>
        
           </div>
           <div className={signupwithemail?signup?'rowoffade1-2':'rowoffade1-2display':"classnone"}>
           <input placeholder='Confirm Password' name="confirmpassword" onChange={handlepassword} ></input>

           </div>
           <div id='recaptcha-container'></div>
           <div className='rowoffade2' onClick={()=>{signup? handleNext():handleContinue()}}><h6 >{signup?"Next":"Continue"}</h6></div>
           
           <div className='rowoffade3'>
           <h6 onClick={handleemail}>{ signupwithemail?"Continue With number":"Continue with Email"}</h6>
           </div>
           <div className='rowoffade4'><p>Or</p></div>
           
           <div className='rowoffade5' onClick={googleClick}>
           <GoogleIcon className='googlebtn'/></div>
  
           
           <div className='rowoffade6'>
            <p>{signup?"Already a member ?":"Not a member?"} </p><h6 onClick={handlesignup}>{signup?"Sign IN":"Sign Up"}</h6></div>
      
            </div>
            
          </Grid> 
          <Grid item xs={1.5} sm={2} md={4}></Grid>
          </Grid>
        </Fade></Modal>
       <phonenumber.Provider value={number}>
        <ProfileSetup/>
     
       </phonenumber.Provider>
      </>
  )
}
