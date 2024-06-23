import { Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../productredux/productslices/apihandling'; 
import Card from 'react-bootstrap/Card';
import Pagination from '../Pagination';
import { FallingLines } from 'react-loader-spinner'
import {useLocation, useNavigate} from 'react-router-dom'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
function valuetext(value) {
  return `${value}Rs`;
}

export default function Fashion() {
  const [slidervalue, setSliderValue] = React.useState([0, 2000]);
  const [currentpage, setCurrentpage]=useState(1)
  const[Radiogroupvalue, setRadiogroupvalue]=useState("New");
  const [filteropen,setFilteropen]=useState(false);
  const dispatch=useDispatch();
const {data:Products, status}=useSelector(state=>state.Products);
const location=useLocation();
const nav=useNavigate();
// setProducts(Productsitem.sort((a,b)=>a.price>b.price?1:-1)); 
// const newData=Products.sort((a,b)=>a.price>b.price?1:-1
const handleradioChange = (event) => {
  setRadiogroupvalue(event.target.value);
  dispatch(getProducts());
  console.log(Radiogroupvalue);
};
// const mappedArray = Products.map((el, index) => ({ index, value: el.price }));
// mappedArray.sort((a, b) => a.value - b.value);
//   const sortedArray = mappedArray.map(el => Products[el.index]); 
let sortedArray;
let sortedArrayafterfilter;
// const mappedArray=Products.map((el)=>
//   ({index, category:el.category})
// );
if(location.state.category!==""){
 const Arrayafterfilter=Products.filter((el)=>{
  return el.category===`${location.state.category}`
})
const mappedArray = Arrayafterfilter.map((el, index) => ({ index, value: el.price }));
mappedArray.sort((a, b) => a.value - b.value);
//  const sortedArraywitoutfilter = mappedArray.map(el => Products[el.index]); 
const sortedArraywitoutfilter = mappedArray.map(el => Products[el.index]); 

  sortedArrayafterfilter=sortedArraywitoutfilter.filter(function (el) {

  return el.price <= slidervalue[1] && el.price >= slidervalue[0]
      
}
);
}
else {
  const mappedArray = Products.map((el, index) => ({ index, value: el.price }));
  mappedArray.sort((a, b) => a.value - b.value);
  //  const sortedArraywitoutfilter = mappedArray.map(el => Products[el.index]); 
  const sortedArraywitoutfilter = mappedArray.map(el => Products[el.index]); 
  
    sortedArrayafterfilter=sortedArraywitoutfilter.filter(function (el) {
  
    return el.price <= slidervalue[1] && el.price >= slidervalue[0]
        
  }
  );
}
// const mappedArray = Products.map((el, index) => ({ index, value: el.price }));
// mappedArray.sort((a, b) => a.value - b.value);
// //  const sortedArraywitoutfilter = mappedArray.map(el => Products[el.index]); 
// const sortedArraywitoutfilter = mappedArray.map(el => Products[el.index]); 

//  const sortedArrayafterfilter=sortedArraywitoutfilter.filter(function (el) {

//   return el.price <= slidervalue[1] && el.price >= slidervalue[0]
      
// }
// );
if(Radiogroupvalue==="Price Low to High"){

const mappedArray = sortedArrayafterfilter.map((el, index) => ({ index, value: el.price }));
mappedArray.sort((a, b) => a.value - b.value);
  sortedArray = mappedArray.map(el => sortedArrayafterfilter[el.index]); 
 
}
else if(Radiogroupvalue==="Price High to Low"){
  
  const mappedArray = sortedArrayafterfilter.map((el, index) => ({ index, value: el.price }));
  mappedArray.sort((a, b) => b.value - a.value);
   sortedArray = mappedArray.map(el => sortedArrayafterfilter[el.index]); 
 }

else{
  const mappedArray = sortedArrayafterfilter.map((el, index) => ({ index, value: el.price }));
  // mappedArray.sort((a, b) => b.value - a.value);
   sortedArray = mappedArray.map(el => sortedArrayafterfilter[el.index]); 
}

  const rowperpage=3;
  const indexoflastpage=currentpage*rowperpage*4;
  const firstindex=indexoflastpage-(rowperpage*4);
  const currrentRecord=sortedArray.slice(firstindex,indexoflastpage);
  const nPages=Math.ceil(sortedArray.length/(rowperpage*4));

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
    dispatch(getProducts());
    console.log(newValue,"newvalue");
    console.log(slidervalue[1],"slidervalue");

  };
useEffect(()=>{
dispatch(getProducts());
},[]);

const handleProductdetails=(id)=>{
nav("/ProductDetails",{state:{id:id}})
// console.log(id,"product id");
}

// if(status==="Loading"){
//   return <FallingLines
//   color="grey"
//   width="100"
//   visible={true}
//   ariaLabel="falling-circles-loading"
//   />
// }
// if(status==="rejected"){
//   return <p>Error......</p>
// } 
const card=currrentRecord.map(product=>{
  
  return(
    <div className='classcard' style={{marginBottom:"10px"}}>
<Card key={product.id} className='classcarditem' onClick={()=>handleProductdetails(product.id)}>
<div className='cardtextclass'>
    <Card.Img variant="top" className='cardimg' src={product.image} style={{width:'70px', height:"150px"}}/>
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
  )
})
const handlefilter=()=>{
  setFilteropen(!filteropen);
  console.log("filterclicked");
}
  return (
    <div className='fashiondiv'>
      <Grid container paddingInline={0} className='firstcontainer'>
        <Grid item xs={12} md={3}>
          <div className='titlefilter'>
          <h4>{location.state.title}</h4>
          <h4 onClick={handlefilter}>Filter<FilterAltIcon/></h4>
          </div>
        <h4 className='titlebigscreen'>{location.state.title}</h4>
        
        </Grid>
        <Grid item xs={12} md={9}>
        </Grid>
      </Grid>
      <Grid container className='secondcontainer'>
      <Grid item md={2.5} className={"container2-1"}>
          <div className='sub-catergory'>
        <h4>Sub-Categories</h4>
        </div>
        <div className='liitems'>
          <ul className='unorderedlist'>
            <li>Sunglasses</li>
            <li>gift and accessories</li>
            <li>FACE & HAIR TOOLS</li>
            <li>Sports Wear</li>
            <li>Bags</li> 
            <li>FootWear</li>
            <li>Watches</li>
            <li>Cosmetics & Personal Care</li>
            <li>Clothes & Accessories</li>
            <li>Textiles</li>
            <li>Perfumes</li>
          </ul>
        </div>
        <div className='sortby'>
        <h4 >
        Sort By
        </h4>
        </div>
        <div className='radiobtns'>
        <FormControl className='formcontrol'>
      {/* <FormLabel id="demo-radio-buttons-group-label">Sort By</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="New"
        name="radio-buttons-group"
        value={Radiogroupvalue}
        onChange={handleradioChange}
      >
        <FormControlLabel value="New" control={<Radio />} label="New" />
        <FormControlLabel value="Popular" control={<Radio />} label="Popular" />
        <FormControlLabel value="Price Low to High" control={<Radio />} label="Price Low to High" />
        <FormControlLabel value="Price High to Low" control={<Radio />} label="Price High to Low" />

      </RadioGroup>
    </FormControl>
        </div>
        <div className='price'>
        <h4>Price</h4>
        <div className='sliderprice'>
        <Slider
        getAriaLabel={() => ''}
        value={slidervalue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={100}
        min={0}
        max={2000}
      
      />
      </div>
        </div>
        </Grid>
        <Grid item xs={12} sm={5} className={filteropen?'smallscreencontainer2-1':"classnone"}>
          <div className='sub-catergory'>
        <h4>Sub-Categories</h4>
        </div>
        <div className='liitems'>
          <ul className='unorderedlist'>
            <li>Sunglasses</li>
            <li>gift and accessories</li>
            <li>FACE & HAIR TOOLS</li>
            <li>Sports Wear</li>
            <li>Bags</li> 
            <li>FootWear</li>
            <li>Watches</li>
            <li>Cosmetics & Personal Care</li>
            <li>Clothes & Accessories</li>
            <li>Textiles</li>
            <li>Perfumes</li>
          </ul>
        </div>
        <div className='sortby'>
        <h4 >
        Sort By
        </h4>
        </div>
        <div className='radiobtns'>
        <FormControl className='formcontrol'>
      {/* <FormLabel id="demo-radio-buttons-group-label">Sort By</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="New"
        name="radio-buttons-group"
        value={Radiogroupvalue}
        onChange={handleradioChange}
      >
        <FormControlLabel value="New" control={<Radio />} label="New" />
        <FormControlLabel value="Popular" control={<Radio />} label="Popular" />
        <FormControlLabel value="Price Low to High" control={<Radio />} label="Price Low to High" />
        <FormControlLabel value="Price High to Low" control={<Radio />} label="Price High to Low" />

      </RadioGroup>
    </FormControl>
        </div>
        <div className='price'>
        <h4>Price</h4>
        <div className='sliderprice'>
        <Slider
        getAriaLabel={() => ''}
        value={slidervalue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={100}
        min={0}
        max={2000}
      
      />
      </div>
        </div>
        </Grid>
        <Grid item xs={12} md={9.2} className='cardgriditem'>
          <div className='cardposition'>   
         { status==="Loading"?<FallingLines
  color="yellow"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />:card}
    { status==="rejected"?"404 Something went wrong":null}

       {/* {card} */}

       
       </div>
        </Grid>

        
      </Grid>

      <Grid container>
        <Grid item xs={12}>
        <Pagination
       nPages={nPages}
       currentPage={currentpage}
       setCurrentPage={setCurrentpage}
       />
        </Grid>
      </Grid>
    </div>
  )
}
