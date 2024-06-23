import { Grid, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
export default function Footer() {
  const today= new Date();
  return (
    <>
    <div >
      <Grid container className='fottermainclass'>
       
        <Grid item xs={12} sm={6} md={3.5} className='fottermainclassitem1' flexDirection={'column'} >
          <img src='favicon.ico.png'></img>
          <p className='wholesale'>WHOLESALE</p>
<p className='item1content'>A platform for wholesale trade to showcase their products to customers worldwide.</p>
        </Grid>
        <Grid item xs={12} sm={4} md={1.5} >
          <div className='categorycontent'>
<h3>Categories</h3>
<p>FASHION & BEAUTY</p>
<p>SPORTS & TOYS</p>
<p>HEALTH & WELLNESS</p>
<p>STATIONERY & OFFICES</p>
<p>CONSTRUCTION MATERIALS</p>
<p>AUTOMOTIVE</p>
<p>HOME & GARDEN</p>
</div>


        </Grid>
        <Grid item xs={12}  sm={6} md={1.5}>
        <div className='content2'>
<h3>!</h3>
<p>MACHINERY & PARTS</p>
<p>ELECTRONICS & COMPUTING</p>
<p>FOODS & BEVERAGES</p>

</div>
        </Grid>
        <Grid item xs={12} sm={5} md={1.5}>
        <div className='content3'>
<h3>Support</h3>
<p>Contact Us</p>
<p>FAQ</p>
<p>About Us</p>
<p>Privacy Policy</p>


</div>
        </Grid>
        <Grid item xs={12} sm={6} md={2.7}>
        <div className='content3'>
<h3>Follow Us</h3>
<Stack direction={'row'}>
<IconButton className='footericon'><FacebookRoundedIcon className='facebookicon'/></IconButton>
<IconButton className='footericon'><InstagramIcon className='instaicon'/></IconButton>
<IconButton className='footericon'><XIcon className='xicon'/></IconButton>


</Stack>


</div>
        </Grid>
        
       
      </Grid>
      
    </div>
     <Grid container className='lastline'>
    
       
    <Typography variant='body1' > © krafo {today.getFullYear()}, All Rights Reserved</Typography> 
    
     
   </Grid> 
   </>
  )
}
