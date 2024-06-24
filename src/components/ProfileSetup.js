import { Fade, FormControl, Grid, Input, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState, useRef } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
// import {phonenumber} from './Login';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {getStorage} from 'firebase/storage';
import { app } from './Firebase';
import {uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as ref1} from 'firebase/storage';
import { getDatabase, set, ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { notauthenticated, yesauthenticated, setauthentication } from '../productredux/productslices/authenticateSlice';
import { addcredential } from '../productredux/productslices/credentialSlice';
import { notsignedin, yessignedin } from '../productredux/productslices/signedinslice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileSetup({profilesetup,setProfileSetup,email, number, setNumber, setEmail},props) {
  // const [file, setFile] = useState([]);
   const[imageurl, setImageurl]=useState("");
const [userdata, setUserdata]=useState({fullname:"", email:"", address:"", number:""})
const inputref=useRef();
const dispatch = useDispatch();
const authentication=useSelector(state=>state.authentication);
const db=getDatabase(app);
let result="";
let encodedEmaildata="";
const encodeEmail = (email) => {
  return email.replace(/\./g, ',').replace(/@/g, '_');
};

// const refrence=ref(db,'userdetails/'+`${number}`);

// const refemail=ref(db,'user/sunnysaini')
const storage=getStorage(app);
// useEffect(()=>{
//   getData();
//  const itemdata= localStorage.getItem("items");
//  console.log(itemdata,"itemdata"
//  );
//   },[]);

//   const getData=async()=>{
//     const bodydata= await localStorage.getItem('body')
// console.log(bodydata,'bodydata');
//   }
const handledatachange=(e)=>{
setUserdata({...userdata, [e.target.name]:e.target.value})
}
const handleEmailchange=(e)=>{
  setEmail ({...email, 
    email:e.target.value
  });
   }
   const handleChange=(value)=>{
    setNumber(value);
   }
const handleupload=()=>
  {
    // console.log(number);
    // console.log(email);

    if(userdata.fullname.length<2){
    toast.error("enter your fullname")
  }
  else if(userdata.address.length<2){
    toast.error("enter your address")
  }
  else if(email.length<3)
    {
      toast.error("invalid email")
      }
    
//     else if(number.length<5){
// if(userdata<10){
//   alert("invalid number")
// }
    // }
   
  else{
   
    const body ={
      name:userdata.fullname,
      email:email,
      phoneNo:number,
      address:userdata.address,
      imageurl:imageurl
  }
  localStorage.setItem('body', JSON.stringify(body));
  dispatch(addcredential(body))
    // console.log("email full");
     encodedEmaildata = encodeEmail(email)
      console.log(encodedEmaildata)
// const refrence=ref(db,'userdetails/'+`${number}`);

      const refrence=ref(db,`userdetails/${encodedEmaildata}`)
    set(refrence, {
           name:userdata.fullname,
      email:email,
      number:number,
      address:userdata.address
         }).then(alert("Successfully Signed In"),
         dispatch(yesauthenticated()),

         setProfileSetup(false)
        ).then(
          localStorage.setItem('items', true),
        )


      
      // console.log(authentication,"authentication");
  }  
   
  //  console.log("sucess");
   }
    const handleClose=()=>{
        setProfileSetup(false);
    }
    // const phoneNumber=useContext(phonenumber);
    const handleprofilephoto=(e)=>{
      encodedEmaildata = encodeEmail(email)
      console.log(encodedEmaildata);
const selectedfile=e.target.files[0];
// setFile(e.target.files[0]);
// const imageref=ref(db,`userdetails/${userdata.name}`);

const imageref=ref1(storage,`images/${encodedEmaildata}`);
uploadBytes(imageref,selectedfile).then(()=>{
  // alert("uploaded")
getDownloadURL(imageref).then((url)=>{
  setImageurl(url);
})
    } 
  )}    
   
 const handleprofilephotoclick=()=>{
inputref.current.click();
  }
  

   
//   useEffect(()=>{
// setImageurl("");
// onValue(refemail, (snapshot) => {
//   const data = snapshot.val();
//   // updateStarCount(postElement, data);
//   result=data.email;
//   console.log(result);
//   console.log(email);
// });
// // refemail.once("value", snapshot => {
// //   const data = snapshot.val()
// //   console.log(data)
//   // })
//   },[])
  return (
    <div className='outerdiv'>
     
         <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={profilesetup}
        onClose={()=> setProfileSetup(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
       
      
       <Fade in={profilesetup}>
      <Grid container className="fadecontainerp" >
         
        <Grid item xs={1.5} sm={2} md={4}></Grid>
        <Grid item xs={9} sm={8} md={4}className='modalclassp' alignSelf={'center'}>
    
         < div className='fadecontent'>
         <div className='closebuttonp'>  <CloseIcon className='closebtn' onClick={handleClose}/></div>
           <Typography variant='h4' className='detailsheading'>Profile Setup</Typography> 
           <Stack className='rowoffade11' onClick={handleprofilephotoclick} sx={{ backgroundImage: `url(${imageurl})`, backgroundSize:"cover", zIndex:1}} >
            <input type="file" ref={inputref} className='classnone' onChange={handleprofilephoto}></input>
           </Stack>
           {/* <AddCircleIcon className='addicon'/> */}
      
<div className='rowoffade10'>
  <input placeholder='Full Name' name="fullname" value={userdata.fullname} onChange={handledatachange}></input>  

</div>  
<div className='rowoffade10'>
  <input placeholder={email==""?"Email":email} name="email" value={email} onChange={handleEmailchange}></input>
  
</div>
         
          <div className='rowoffade10'>
            {/* <FormControl className='formcontrol'> */}
          <PhoneInput
           inputClass="phoneiinputclass1"
           buttonClass="phonebuttonclass"
           containerClass='phonecontainerclass'
          // inputStyle={{color:'green', width:"100%"}}
          // containerStyle={{borderRadius:"30px"}}
          // dropdownStyle={{height:'50px'}}
              country={'in'}
  
              value={number}
              onChange={handleChange}
              inputProps={{required:true}}
              />
           </div>
           <div className='rowoffade10'>
  <input placeholder='Address' name="address" value={userdata.address} onChange={handledatachange}></input>
  
</div>
           <div className='rowoffade20'  onClick={handleupload} ><h6 >Submit</h6></div>
           
      
            </div>
            
          </Grid> 
          <Grid item xs={1.5}sm={2} md={4}></Grid>
          </Grid>
        </Fade>
        
        </Modal>
    </div>
  )
}
