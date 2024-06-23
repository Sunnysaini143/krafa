import React, { useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid, Typography, Input, IconButton, Stack} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Login from './Login';
import ProfileSetup from './ProfileSetup';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { store } from '../productredux/store';
import { useSelector,useDispatch } from 'react-redux';
import { open, close } from '../productredux/productslices/counterslice';
import { yesautenticated, notauthenticated, setauthentication } from '../productredux/productslices/authenticateSlice';
import { notsignedin } from '../productredux/productslices/signedinslice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toast } from 'react-toastify';

import { addcredential } from '../productredux/productslices/credentialSlice';
export default function Navbar() {
  const[optionselected, setOptionselected]=useState({data:""});
  const[selectisopen, SetSelectisopen]=useState(false);
  // const[thirdnavisopen, setIsopen]=useState(false);
  const[categoryclicked, setCategory]=useState("Product")
  const[Ismodalopen, setIsmodalopen]=useState(false);
  const [profilesetup, setProfileSetup]=useState(false)
  const[email,setEmail]=useState({email:""});
  const[number, setNumber]=useState("");
  const[searchitem, setSearchitem]=useState("");
  const [popup, setPopup]=useState(false)


  const nav=useNavigate();
  let location = useLocation();
  const dispatch=useDispatch();
const Isopen=useSelector(state=>state.counter);
const authentication = useSelector(state=>state.authentication);
const selector=useSelector(state=>state.signedin);
const credential=useSelector(state=>state.credential);
// const newcredential=JSON.stringify(credential)
// console.log(credential,"newcredential")
const { name, address, imageurl, phoneNo } = credential.data || {};
// console.log( name, address, imageurl,phoneNo,"data");

// console.log(credential.data.name,"credential");

// const [credential, setCredential]=useState({
//   name:"",
//   email:"",
//   phoneNo:"",
//   address:"",
//   imageurl:""
// })
  // const handleClose=()=>{
  //   setIsmodalopen(false);
  //   console.log(Ismodalopen);
  // }
  
  useEffect(()=>{
    if(location.pathname!=="/" && location.pathname!=="/Sell" && location.pathname!=="/sellform" ){
      // setIsopen(true)
      dispatch(open());
     
      // setCategory("Product")
    }
    
  },[])
  useEffect(()=>{
    const items = localStorage.getItem('items');
    const bodydata = JSON.parse(localStorage.getItem('body'));
    if(bodydata){
      dispatch(addcredential(bodydata))
    }
   
    
  //   setCredential({
  //     name:bodydata.name,
  // email:bodydata.email,
  // phoneNo:bodydata.phoneNo,
  // address:bodydata.address,
  // imageurl:bodydata.imageurl
  //   })
// console.log(bodydata,"bodydata");
// console.log(bodydata.name,"bodydata.name");


// console.log(items,"items");

    if (items) {
      // console.log(items,"items");
     dispatch(setauthentication(items)) ;
    } 
  },[])

  const handleSelectClick=()=>{
    SetSelectisopen(!selectisopen);
  }
  function handleSelect(value){
    setOptionselected({data:value});
    // console.log("clicked")
    // console.log(value)

    SetSelectisopen(!selectisopen);
  }
  const handlesearch=(e)=>{
setSearchitem(e.target.value)
  }
  const handleClicksearch=()=>{
    if(searchitem!==""){
      nav("/Searcheditems",{state:{searchitem:searchitem}})
    }
   
  }
  const handlelogin=()=>{
    // console.log(selector);
  //  nav("/login");
  // setIsmodalopen(true)
  selector?setProfileSetup(true):setIsmodalopen(true);

  // console.log(Ismodalopen);
  }
  const handlelprofile=()=>{
    setPopup(true);

// console.log("hello g",popup);
  }
 const handlelogout=()=>{
  // toast.success("Logout Successfully")
 try{
  alert("Logout")

  localStorage.removeItem('items')
  dispatch(notauthenticated());
  localStorage.removeItem('signedin')
  dispatch(notsignedin());

}
catch (error) {
  console.error('Error during logout:', error);
  toast.error("An error occurred during logout");
}
 }
  const handlecategory=(value,category, title)=>{
    nav(`/${value}`,{state:{category:category, title:title}});
    dispatch(open());
    setCategory(`${value}`);
  }
  const handlehome=()=>{
    nav("/");
    dispatch(close());
    setCategory(`Product`);
  }
  const handlesell=()=>{
    if(authentication=="true")
{
  nav("/Sell")
dispatch(close());
}
else{
  selector?setProfileSetup(true):setIsmodalopen(true);
}
  }
  return (
    <div className='firstdiv'>
     
      <div className='seconddiv'>
        <AppBar position='static' className='appbarclass'>
            <Toolbar className='navbar'>
              <Grid container paddingInline={0} className='divmaincontainer'>
                <Grid item xs={12} sm={6} md={3} className='firstitemclass'>
                  <Grid container justifyContent={'flex-start'} className='gridinsideitemfirst' >
                    <Grid item xs={3} sm={4} md={4} className='imageslogoclass'>  
                <img src="/static/images/logo.png"></img>
                <Typography variant='body1' className='wholesale' >WholeSale</Typography>
                </Grid>
                <Grid item xs={9} sm={8} md={8} paddingBlock={1.7} paddingInline={1} className='selcetclass'>
                  <Grid container className='onlyforsmallscreen'>
                    <Grid item xs={4.5} className='smallscreenlogin'>
                      <div className="logintext">
                      <Stack direction={"column"} className={authentication?"prifileauthenticated":"loginshow"} >
                   <Popup trigger={ <div onClick={handlelprofile} className={authentication?'profileimage':"classnone"}><img src={imageurl}></img></div>} open={popup} position="bottom left"> 
                   
                   <div>Profile</div>
                   <div>Update Profile</div>
                   <div>Cahange Password</div>
                   <div onClick={handlelogout}>Logout</div>

                   </Popup>
                  
                   {authentication? 
                   <Popup trigger={<div className='username'><h6 onClick={handlelprofile}>{name}</h6></div>} open={popup} position="bottom left"> 
                   
                   <div>Profile</div>
                   <div>Update Profile</div>
                   <div>Cahange Password</div>
                   <div onClick={handlelogout}>Logout</div>

                   </Popup>
                   
                     :<h6  onClick={handlelogin}>Login</h6>}  
                  
                  
       <Login number={number} setNumber={setNumber} setEmail={setEmail}  email={email.email} Ismodalopen={Ismodalopen} setIsmodalopen={setIsmodalopen} setProfileSetup={setProfileSetup}/>
     
      {/* </Modal> */}




      {/* <Modal
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
      > */}
<ProfileSetup number={number} setNumber={setNumber} setEmail={setEmail}  email={email.email} profilesetup={profilesetup} setProfileSetup={setProfileSetup}/>

     
      {/* </Modal> */}




      </Stack>
      </div>
                    </Grid>
                    <Grid item xs={4.5}>
                    <IconButton className='iconbtn' onClick={handlesell}><AddIcon className='plusicon'/></IconButton>
</Grid>
<Grid item xs={3}>
<FmdGoodIcon onClick={handleSelectClick} className='locationicon' ></FmdGoodIcon>
</Grid>
                  </Grid>
                
                 <div className='select'>
      <TextField className='selecttext' sx={{ "& fieldset": { border: 'none' }, }} value={optionselected.data} placeholder='Select' onClick={handleSelectClick} InputProps={{
                    endAdornment:<InputAdornment position='end'>{selectisopen?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>}</InputAdornment>
                  }}>
                  </TextField>
     
                  <div className={selectisopen?'selctoption':"classnone"}>
                 <Typography variant='body1' className='optiontext' onClick={()=>handleSelect("Delhi")}>Delhi</Typography>
                 <Typography variant='body1'  className='optiontext' onClick={()=>handleSelect("Dubai")}>Dubai</Typography>
                 <Typography variant='body1'  className='optiontext' onClick={()=>handleSelect("Uman")}>Uman</Typography>
                 <Typography variant='body1'  className='optiontext' onClick={()=>handleSelect("Egypt")}>Egypt</Typography>
                 <Typography variant='body1'   className='optiontext' onClick={()=>handleSelect("England")}>England</Typography>
                  </div>
                 </div>
                </Grid>
                </Grid>

                </Grid>

                <Grid item xs={0} sm={3} md={6} className='seconditemclass'>
                  <Grid container paddingBlock={1.7} className='searchgridcontainer'>
                    <div className='search'>
                    <TextField className='searchbox' value={searchitem} onChange={handlesearch} sx={{ "& fieldset": { border: 'none' }, }}  placeholder='Search here' InputProps={{
                    startAdornment:<InputAdornment position='start'><IconButton onClick={handleClicksearch}> <SearchIcon className='seachicon'/></IconButton></InputAdornment>
                  }}>
                  </TextField>
                      </div>
                  </Grid>
                  </Grid>
                  <Grid item xs={0} sm={3} md={3} flexDirection={'row'} className='thirditemclass'>
                   <Stack direction={'row'}>
                   
                   <Grid item xs={6} paddingBlock={1} className="logintext">
                   <Stack direction={"column"} className={authentication?"prifileauthenticated":"loginshow"} >
                   <Popup trigger={ <div onClick={handlelprofile} className={authentication?'profileimage':"classnone"}><img src={imageurl}></img></div>} open={popup} position="bottom left"> 
                   
                   <div>Profile</div>
                   <div>Update Profile</div>
                   <div>Cahange Password</div>
                   <div onClick={handlelogout}>Logout</div>

                   </Popup>
                  
                   {authentication? 
                   <Popup trigger={<div className='username'><h6 onClick={handlelprofile}>{name}</h6></div>} open={popup} position="bottom left"> 
                   
                   <div>Profile</div>
                   <div>Update Profile</div>
                   <div>Cahange Password</div>
                   <div onClick={handlelogout}>Logout</div>

                   </Popup>
                   
                     :<h6  onClick={handlelogin}>Login</h6>}  
                  
                  
       <Login number={number} setNumber={setNumber} setEmail={setEmail}  email={email.email} Ismodalopen={Ismodalopen} setIsmodalopen={setIsmodalopen} setProfileSetup={setProfileSetup}/>
     
      {/* </Modal> */}




      {/* <Modal
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
      > */}
<ProfileSetup number={number} setNumber={setNumber} setEmail={setEmail}  email={email.email} profilesetup={profilesetup} setProfileSetup={setProfileSetup}/>

     
      {/* </Modal> */}




      </Stack>
     
                  </Grid>
                  
                  <Grid item xs={4.5} paddingBlock={1.7} className="logintext"> 
                  <div className='selldiv' onClick={handlesell}>
                    <IconButton className='iconbtn'><AddIcon className='plusicon'/></IconButton>

                    <h6>SELL</h6>
                  </div>
                  </Grid>   
                  </Stack>
                  </Grid>

                 
              </Grid>
               
            </Toolbar>
            </AppBar>
            <div className='navbar2smallscreen'>
              <nav className='navbar2smallscreennav' >


<div className='search'>
                    <TextField className='searchbox' value={searchitem} onChange={handlesearch} sx={{ "& fieldset": { border: 'none' }, }}  placeholder='Search here' InputProps={{
                    startAdornment:<InputAdornment position='start'><IconButton onClick={handleClicksearch}> <SearchIcon className='seachicon'/></IconButton></InputAdornment>
                  }}>
                  </TextField>
                      </div>
 
              </nav>
            </div>

            <div className='navbar2'>
              <nav className='secondnav' >

<div className='textcontent'>

  <h6>All Categories</h6>

</div>
<div className='textcontent'>
  <h6 onClick={()=>handlecategory("FASHION","women's clothing", "FASHION & BEAUTY")}>FASHION & BEAUTY</h6>
  </div>
  <div className='textcontent'>
  <h6 onClick={()=>handlecategory("SPORTS","electronics","SPORTS & TOYS")}>SPORTS & TOYS</h6>
  </div>
  <div className='textcontent'>

  <h6 onClick={()=>handlecategory("HEALTH","men's clothing","HEALTH & WELLNESS")}>HEALTH & WELLNESS</h6>
  </div>
  <div className='textcontent'>

  <h6 onClick={()=>handlecategory("STATIONERY","","STATIONERY & OFFICES")}>STATIONERY & OFFICES</h6>
  </div>
  <div className='textcontent'>
  <h6 onClick={()=>handlecategory("CONSTRUCTION","","CONSTRUCTION MATERIALS")}>CONSTRUCTION MATERIALS</h6>
  </div>
  <div className='textcontent'>
  <h6 onClick={()=>handlecategory("AUTOMOTIVE","","AUTOMOTIVE")}>AUTOMOTIVE</h6>
  </div>
  <div className='textcontent'>
  <h6 onClick={()=>handlecategory("GARDEN","","HOME & GARDEN")}>HOME & GARDEN</h6>
  </div>
              </nav>
            </div>
            
       
        <div className={Isopen?'navbar3':"notopen"}>
            <Toolbar >
              <nav className='nav3'>

<div className='textcontent3'>

  <p1 onClick={handlehome}>{`Home > `}</p1><p2>{categoryclicked}</p2>

  </div>
              </nav>
            </Toolbar>
            </div>
        </div>
        {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Ismodalopen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={Ismodalopen}>
         <Login/>
         
         </Fade>
      </Modal> */}
             

    </div>
  )
}
