import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
 import { getProducts } from '../productredux/productslices/apihandling';
 import { useDispatch, useSelector } from 'react-redux';
// import Card from 'react-bootstrap/Card';
import { Typography, Grid, Paper, Fade, Modal, Box, } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { open, close } from '../productredux/productslices/counterslice';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
export default function ProductDetails() {
    const [productarray, setProductarray]=useState([]);
    const [zoomin, setZoomin ]=useState(false);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
const[fullscreen, setFullscreen]=useState(false);
    const location=useLocation();
    const dispatch=useDispatch();
    const {data:Products, status}=useSelector(state=>state.Products);
    // const thirdnavopen=useSelector(state=>state.counter);
    useEffect(()=>
    {
     console.log(status);
        dispatch(getProducts());
        dispatch(open());
        // console.log(location.state.id,"location id");
        // console.log(Products,"Products");
        // Products?.filter((item)=>{
        //     if(item.id===location.state.id)
        //     {return setProductarray(item);}
            
        // })
    },[])
    useEffect(()=>{
        console.log(location.state.id,"location id");
        console.log(Products,"Products");
        // const card=
          Products?.filter((item)=>{
            if(item.id===location.state.id)
            {return setProductarray(item);}
            
        })
    },[Products])
    const handleMouseMove = (e) => {
        setZoomin(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setHoverPos({ x, y });
      };
    
      const handleMouseLeave = () => {
        setZoomin(false);
        setHoverPos({ x: 0, y: 0 });
      };
    
    // console.log(productarray);
const handlefullscreen=()=>{
    setFullscreen(true);
    console.log("fullscren")
}
const handlecloseiconclick=()=>{
  setFullscreen(false);
}
  return (
    <>
    <Grid container className="container1prodctdetails">
        <Grid item className="tiltegridprodutdetails">
            <Typography variant='h4' className='titletypography'>
                Products Details
            </Typography>
        </Grid>

    </Grid>
    <Grid container className='productcontaner2' >
        <Grid item xs={12} md={7} className='container1item1' >
        
            <Paper elevation={10} className='paper1' >
            <div className='fullscreenicondiv' onClick={handlefullscreen}><FullscreenIcon className='fullscreenicon'/></div>   
        <div className='paper1div' onMouseMove={handleMouseMove} onMouseOut={handleMouseLeave}> 
        
             <img src={productarray.image} alt='alt-text'></img> </div> 
           
            </Paper>
           
        </Grid>
        <Grid item xs={0} md={5} className={zoomin?'container2item2zoom':"classnone"}>
        <Paper elevation={10} className='paper1zoom' sx={{ backgroundImage: `url(${productarray.image})`, backgroundPosition: `${hoverPos.x}% ${hoverPos.y}%` }}>
        {/* <div className='paper1divzoom'>  <img src={productarray.image}></img> </div>  */}
            </Paper>
        </Grid>
    <Grid item xs={12} md={5} className={zoomin?"classnone":'container2item2'}>
        {/* <Stack direction={"column"}> */}
        <Paper elevation={10} className='paper2-1'>
            <Typography variant='h6'>Category:"{productarray.category}"</Typography>
            <Typography variant='h6'>{productarray.title}</Typography>

        </Paper>
        <Paper elevation={10} className='paper2-2'>
        <Typography variant='h6'>Owner</Typography>

        </Paper>
        <Paper elevation={10} className='paper2-3'>
            <Typography>More details</Typography>
            <Typography>Minium  Quantity</Typography>
        </Paper>
        {/* </Stack> */}
     

        
         </Grid>
    </Grid>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={fullscreen}
        onClose={()=> setFullscreen(false)}
        // closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={fullscreen}>
      <Grid container className="fadecontainer" >
         
        <Grid item xs={1.5} sm={2} md={2.5}></Grid>
        <Grid item xs={9} sm={8} md={7} className='modalclassproductdetali' alignSelf={'center'}>
       
         < div className='productdetailimage'>

      <img src={productarray.image}></img>
      </div>
          
      <div className='closeiconproductdetails' onClick={handlecloseiconclick}><CloseIcon/></div>
          </Grid> 
          <Grid item xs={1.5} sm={2} md={2.5}></Grid>
          </Grid>
        </Fade>
        </Modal>
    </>
  )
}
