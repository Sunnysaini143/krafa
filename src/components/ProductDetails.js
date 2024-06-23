import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
 import { getProducts } from '../productredux/productslices/apihandling';
 import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Typography, Grid, Paper, Stack, Fade, Modal, Backdrop } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
export default function ProductDetails() {
    const [productarray, setProductarray]=useState([]);
    const [zoomin, setZoomin ]=useState(false);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
const[fullscreen, setFullscreen]=useState(false);
    const location=useLocation();
    const dispatch=useDispatch();
    const {data:Products, status}=useSelector(state=>state.Products);
    useEffect(()=>
    {
        dispatch(getProducts());
        // console.log(location.state.id,"location id");
        // console.log(Products,"Products");
        // const card=Products?.filter((item)=>{
        //     if(item.id===location.state.id)
        //     {return setProductarray(item);}
            
        // })
    },[])
    useEffect(()=>{
        console.log(location.state.id,"location id");
        console.log(Products,"Products");
        const card=Products?.filter((item)=>{
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
        
             <img src={productarray.image} ></img> </div> 
           
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
            <Typography variant='h6'>{productarray.category}</Typography>
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
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={fullscreen}
        onClose={()=> setFullscreen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={fullscreen}>
<div>Hello</div>
        </Fade>
        </Modal>

        
         </Grid>
    </Grid>
    </>
  )
}
