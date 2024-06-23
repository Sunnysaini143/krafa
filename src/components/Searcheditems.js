import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { getProducts } from '../productredux/productslices/apihandling';
import Pagination from './Pagination';
import { Grid, Stack, Typography } from '@mui/material';
import {useLocation, useNavigate}from 'react-router-dom'

export default function Searcheditems() {
    const [currentpage, setCurrentpage]=useState(1)
    const [newarray, setNewarray]=useState([])
    const dispatch=useDispatch();
    const location=useLocation();  
    //  const newarray=[];
    const nav=useNavigate();
    let a=location.state.searchitem;
const {data:Products, status}=useSelector(state=>state.Products);


useEffect(()=>{
dispatch(getProducts());

  
},[a])
useEffect(()=>{
  dispatch(getProducts());
},[])
useEffect(()=>{
  setNewarray("");
const regex= new RegExp([a],"i");
const datafiltered= Products.filter((product)=> { 
 if (product.title.match(regex)||product.category.match(regex)){
  return Products;
 }
});
console.log(datafiltered,"datafiltered")
datafiltered.map((product)=>{
 
  // if(product.category===location?.state?.searchitem){
    setNewarray(old => [...old, product])
  // }
  })
},[Products])
const handleProductdetails=(id)=>{
  nav("/ProductDetails",{state:{id:id}})
  console.log(id,"product id");
  }
console.log(newarray);
const rowperpage=3;
const indexoflastpage=currentpage*rowperpage*4;
const firstindex=indexoflastpage-(rowperpage*4);
const currrentRecord=newarray.slice(firstindex,indexoflastpage);
const nPages=Math.ceil(newarray.length/(rowperpage*4));
let card="";
if(newarray.length>=1){

 card=currrentRecord.map(product=>{
    if(status==="Loading"){
      return <p>Loading......</p>
    }
    if(status==="rejected"){
      return <p>Error......</p>
    } 
    return(
      <div className='classcard' style={{marginBottom:"10px"}}>
  <Card key={product.id} className='classcarditem'onClick={()=>handleProductdetails(product.id)}>
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
      
    </Card></div>)})}
    else{
      console.log("No mAthch");
    }
  return (
    <div>
       
        <Grid container>
       <Grid item xs={12}>
       <h4>{`Searches for "${location?.state?.searchitem}"`}</h4>
          <div className='recommended'> 

       {card}

       
       </div>
        </Grid></Grid>
     <Pagination
       nPages={nPages}
       currentPage={currentpage}
       setCurrentPage={setCurrentpage}
       />
    </div>
  )
}
