import { Grid, Typography } from '@mui/material'
import React, {useState, useRef} from 'react'
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {InputAdornment, TextField} from '@mui/material';
import { Button } from 'bootstrap';
import { red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

export default function Sellform() {
    const[Isdropdownopen, setDropdown]=useState(false);
    const[optionSelcted, setOptionSelected]=useState({data:""});
// const[file, setfile]=useState({data:[]});
const[file, setfile]=useState(["hello"]);
// let newarr=[];
// let datac=[];
    const inputref=useRef(null);
    const handleSelectClick=()=>{
        setDropdown(!Isdropdownopen);
        
    }

    const handleSelect=(value)=>{
        setOptionSelected({data:value});
        setDropdown(false)
    }
    const handlefilechange=(event)=>{
      if (event.target && event.target.files && event.target.files.length > 0) {
        const selectedfile=event.target.files[0];
        const imageURL = URL.createObjectURL(selectedfile);
        if(file.length<=2){
      setfile(oldArray => [...oldArray,imageURL]);
        }
        else{
          // event.preventDefault()
          let array=[...file];
          array.pop();
          setfile(array);
          console.log(file);
          setfile(oldArray => [...oldArray,imageURL]);
        }


      } else {
        console.log('No file selected or event.target is not defined.');
      }
  
    }
    const handleselectfile=()=>{
      inputref.current.click(); 
      // setfile([]);
    }
    function handlecloseicon(value){
      console.log("clicked");
      // file.splice(0,1);
      let array=[...file];
      array.splice(value,1)
      console.log(array);
      setfile(array);
    }
  return (
    <div>
      <Grid container className='sellformtitle'  justifyContent={"center"} >
        {/* <Grid item maxWidth={3.5}></Grid> */}
        <Grid item md={5} justifyContent={'center'} textAlign={'center'}>
            <Typography variant='h4'>
            You’re almost there!
            </Typography>
            <Typography variant='h6'>
            Include as much details and pictures as possible, and set the right price!
            </Typography>
        </Grid>
        {/* <Grid item maxWidth={3.5}></Grid> */}
     
      </Grid>
     <Grid container>
        <Grid item  className='addimage' textAlign={'center'} onClick={handleselectfile}>
            
            <AddIcon className='addicon' />
            <Typography variant='h6'>Add Image</Typography>
           <input type='file' ref={inputref} onChange={handlefilechange} className='classnone'></input>
        </Grid>
        <Grid item  className={file.length<2?"classnone":'selectedimage'} >
          <CloseIcon className='closeicon' onClick={()=>handlecloseicon(1)}/>
          <img src={file[1]} ></img>
        </Grid>
        <Grid item  className={file.length<3?"classnone":'selectedimage'} >
          <CloseIcon className='closeicon' onClick={()=>handlecloseicon(2)}/>
          <img src={file[2]} ></img>
        </Grid>
     </Grid>
     <Grid container justifyContent={'center'}>
        <Grid item xs={11}>
        <div className='sellformselect'>
      <TextField className='sellformselecttext' sx={{ "& fieldset": { border: 'none' }, }} value={optionSelcted.data} placeholder='Select' onClick={handleSelectClick} InputProps={{
                    endAdornment:<InputAdornment position='end'>{Isdropdownopen?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>}</InputAdornment>
                  }}>
                  </TextField>  </div>
     
                  <div className={Isdropdownopen?'sellformselctoption':"classnone"}>
                 <Typography variant='body1' className='optiontext' onClick={()=>handleSelect("Delhi")}>Delhi</Typography>
                 <Typography variant='body1'  className='optiontext' onClick={()=>handleSelect("Dubai")}>Dubai</Typography>
                 <Typography variant='body1'  className='optiontext' onClick={()=>handleSelect("Uman")}>Uman</Typography>
                 <Typography variant='body1'  className='optiontext' onClick={()=>handleSelect("Egypt")}>Egypt</Typography>
                 <Typography variant='body1'   className='optiontext' onClick={()=>handleSelect("England")}>England</Typography>
                  </div>
               
            <input placeholder='Product Name' className='inputsellform'></input>
            <input placeholder='price' className='inputsellform'></input>
            <input placeholder='Location' className='inputsellform'></input>
            
            <input placeholder='Description' className='descriptionsellform'></input>
            
        </Grid>
     </Grid>
     <Grid container justifyContent={'center'} marginBlock={10} textAlign={'center'}>
        

        <Grid item sm={4} md={2} className='buttonpostITEM'>
         <Typography variant='h6' alignSelf={'center'}>  Publish Post</Typography>   
        
           
            
        </Grid>
       

     </Grid>
    </div>
  )
}
