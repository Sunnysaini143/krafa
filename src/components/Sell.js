import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

export default function Sell() {
    const nav=useNavigate();
    const handlecategoryclick=()=>{
nav("/sellform")
    }
    // useEffect(()=>{

    // },[])
  return (
    <div>
<Grid container justifyContent={'center'} alignItems={'center'}>   
    <Grid item paddingBlock={10}>
         <Typography variant="h4">
Choose a Category</Typography> </Grid></Grid>
  
  <Grid container>
    <Grid item xs={.5} sm={2} md={3.5}>

    </Grid>
    <Grid item xs={11} sm={8} md={5}>
<Paper className='outercategorcontainer' elevation={20}>
   
    <div className='categoryname' onClick={handlecategoryclick}>
         <div className="categoryimagetext">
        <img  src="/static/images/fashionimage.png"></img>
        <h4>
        FASHION & BEAUTY</h4>
        </div>

        <div className='navigationarrow'>
            <NavigateNextIcon/>
            </div> 
    </div>
    <div className='categoryname' onClick={handlecategoryclick} >
         <div className="categoryimagetext" >
        <img  src="/static/images/Sports.png"></img>
        <h4>
        SPORTS & TOYS</h4>
        </div>

        <div className='navigationarrow'>
            <NavigateNextIcon/>
            </div> 
    </div><div className='categoryname' onClick={handlecategoryclick}>
         <div className="categoryimagetext">
        <img  src="/static/images/health.png"></img>
        <h4>
        HEALTH & WELLNESS</h4>
        </div>

        <div className='navigationarrow'>
            <NavigateNextIcon/>
            </div> 
    </div><div className='categoryname' onClick={handlecategoryclick}>
         <div className="categoryimagetext">
        <img  src="/static/images/stationery.jpg"></img>
        <h4>
        STATIONERY & OFFICES</h4>
        </div>

        <div className='navigationarrow'>
            <NavigateNextIcon/>
            </div> 
    </div><div className='categoryname' onClick={handlecategoryclick}>
         <div className="categoryimagetext">
        <img  src="/static/images/construction.jpg"></img>
        <h4>
        CONSTRUCTION MATERIALS</h4>
        </div>

        <div className='navigationarrow'>
            <NavigateNextIcon/>
            </div> 
    </div><div className='categoryname' onClick={handlecategoryclick}>
         <div className="categoryimagetext">
        <img  src="/static/images/Automotive.webp"></img>
        <h4>
        AUTOMOTIVE</h4>
        </div>

        <div className='navigationarrow'>
            <NavigateNextIcon/>
            </div> 
    </div><div className='categoryname' onClick={handlecategoryclick}>
         <div className="categoryimagetext">
        <img  src="/static/images/Garden.png"></img>
        <h4>
        HOME & GARDEN</h4>
        </div>

        <div className='navigationarrow'>
            <NavigateNextIcon/>
            </div> 
    </div>
    
</Paper>
</Grid>
<Grid item xs={.5} sm={2} md={3.5}>

</Grid>
  </Grid>
    </div>
  )
}
