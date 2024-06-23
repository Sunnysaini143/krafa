import React, { useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Slider from "react-slick";
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { open,close } from '../productredux/productslices/counterslice';
import { getProducts } from '../productredux/productslices/apihandling';
import { getDatabase } from "firebase/database";
import { app } from './Firebase';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner'

const database=getDatabase(app);
export default function Home({thirdnavisopen, setIsopen}) {
  const dispatch=useDispatch();
  const selected=useSelector(state=>state.counter)
  const{data:products, status}=useSelector(state=>state.Products)
const nav=useNavigate();
  useEffect(()=>{
dispatch(getProducts());
console.log(products);
  },[]);
// if(status==="Loading"){
//   return <p>Loading......</p>
// }
// if(status==="rejected"){
//   return <p>Error......</p>
// }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
  
  };
  
// const handleClick=()=>{
//   // dispatch(increment());
// }
// const handlecategory=(value)=>{
//   nav(`/${value}`);
//   // setIsopen(true);
//   dispatch(open());
//   // setCategory(`${value}`);
// }
const handlecategory=(value,category,title)=>{
  nav(`/${value}`,{state:{category:category,title:title}});
  dispatch(open());
  // setCategory(`${value}`);
}
  const cards=products.map(product=>{
  if(product.id==1||product.id==2||product.id==3||product.id==4){
  return(
    <>
      <div className='classcard' style={{marginBottom:"10px"}}>
<Card key={product.id} className='classcarditem'>
<div className='cardtextclass'>
    <Card.Img className='cardimg' variant="top" src={product.image} />
    </div>  
    <Card.Body>{product.title}
      <Card.Title></Card.Title>
      <Card.Text>
        {product.price}
      </Card.Text>
      </Card.Body>    
  </Card>
  </div>
  </>
  )}

})
const cards2=products.map(product=>{
  if(product.id==5||product.id==7||product.id==9||product.id==14){
  return(
    <>
      <div className='classcard' style={{marginBottom:"10px"}}>
{/* <Card key={product.id} className='h-100'> */}
<Card key={product.id} className='classcarditem'>
<div className='cardtextclass'>
    <Card.Img className='cardimg' variant="top" src={product.image} />
    </div>  
    <Card.Body>{product.title}
      <Card.Title></Card.Title>
      <Card.Text>
        {product.price}
      </Card.Text>
      </Card.Body>
      {/* <Card.Footer style={{backgroundColor:"white"}}>
      <Button variant="primary" onClick={()=>addtocart(product)}>Add to cart</Button>
      </Card.Footer> */}
    
  </Card>
  </div>
  </>
  )}

})
  return (
    <div>
    <Grid container className='sliderclass'>
      <Grid item xs={12}>
      <Slider {...settings}>
        <div className='slider1'>
       
         
        </div>
        <div className='slider2'>
      
          
        </div>
        <div className='slider3'> 
      
          
        </div>
        <div className='slider4'> 
      
          
        </div>
        </Slider>
      </Grid>
    </Grid>
    <div className='smallscreencategory'>
<ul className='unorderlistsmallscreen'>
  <li>
    <div className='categorycontentdiv'>
      <img src="/static/images/fashionimage.png"></img>
      <div className='divh6'>
      <h6 onClick={()=>handlecategory("FASHION","women's clothing","fashion & Beauty")}>fashion & Beauty</h6></div>
    </div>
  </li>
  <li>
    <div className='categorycontentdiv'>
      <img src="/static/images/Sports.png"></img>
      <div className='divh6'>
      <h6 onClick={()=>handlecategory("SPORTS","men's clothing","SPORTS & TOYS")}>SPORTS & TOYS</h6></div>
    </div>
  </li>
  <li>
    <div className='categorycontentdiv'>
      <img src="/static/images/health.png"></img>
      <div className='divh6'>
      <h6 onClick={()=>handlecategory("HEALTH","","HEALTH & WELLNESS")}>HEALTH & WELLNESS</h6>
      </div>
    </div>
  </li>
  <li>
    <div className='categorycontentdiv'>
      <img src="/static/images/stationery.jpg"></img>
      <div className='divh6'>
      <h6 onClick={()=>handlecategory("STATIONERY","","STATIONERY & OFFICES")}>STATIONERY & OFFICES</h6>
      </div>
    </div>
  </li>
  <li>
    <div className='categorycontentdiv'>
      <img src="/static/images/construction.jpg"></img>
      <div className='divh6'>
      <h6 onClick={()=>handlecategory("CONSTRUCTION","","CONSTRUCTION MATERIALS")}>CONSTRUCTION MATERIALS</h6>
      </div>
    </div>
  </li>
  <li>
    <div className='categorycontentdiv'>
      <img src="/static/images/Automotive.webp"></img>
      <div className='divh6'>
      <h6 onClick={()=>handlecategory("AUTOMOTIVE","electronics","AUTOMOTIVE")}>AUTOMOTIVE</h6>
      </div>
    </div>
  </li> <li>
    <div className='categorycontentdiv'>
      <img src="/static/images/Garden.png"></img>
      <div className='divh6'>
      <h6 onClick={()=>handlecategory("GARDEN","","HOME & GARDEN")}>HOME & GARDEN</h6>
      </div>
    </div>
  </li> 
</ul>
    </div>
    <Grid container className='products'>
      <Grid item xs={12} >
        <Typography variant='h4'>Best Products</Typography>
        
        {/* <Stack direction={"row"} spacing={2}>{cards}</Stack> */}
        <div className='recommended '>
          {/* {cards} */}
          { status==="Loading"?<FallingLines
  color="yellow"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />:cards}
    { status==="rejected"?"404 Something went wrong":null}

          </div>

        
      </Grid>
    </Grid>
    <Grid container className='products'>
      <Grid item xs={12} >
        <Typography variant='h4'>Featured Products</Typography>
        
        {/* <Stack direction={"row"} spacing={2}>{cards2}</Stack> */}
        <div className='recommended '>
          {/* {cards2} */}
          { status==="Loading"?<FallingLines
  color="yellow"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />:cards2}
    { status==="rejected"?"404 Something went wrong":null}

          </div>
        
      </Grid>
    </Grid>
    
    </div>
   
  )
}
