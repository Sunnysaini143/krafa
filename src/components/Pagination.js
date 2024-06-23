import React from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Button, IconButton } from '@mui/material';
export default function Pagination({ nPages, currentPage, setCurrentPage }) {
    const pageNumber=[...Array(nPages+1).keys()].slice(1);
    const prevPage=()=>{
        if(currentPage!==1){
         setCurrentPage(currentPage - 1)
        }
        console.log("pre");
       }
       const gotonext=()=>{
         if(currentPage!==nPages){
             setCurrentPage(currentPage + 1)
            }
            console.log("gotonext");
       }
  return (
//     <div>
//                 <nav>
//   <ul className='pagination justify-content-center'>
//     <li className="page-item"><a className='page-link' onClick={prevPage}><ArrowCircleLeftIcon/></a></li>
//     { pageNumber.map((itemnumber)=>
// (<li key={itemnumber}
//     className= {`page-item ${currentPage == itemnumber ? 'active' : ''} `}>
//   <a className='page-link' onClick={()=>setCurrentPage(itemnumber)}> {itemnumber}</a>

// </li>)
//     )}
//     <li className="page-item">
//     <a className='page-link' onClick={gotonext}><ArrowCircleRightIcon/></a>
//     </li>
//   </ul>
// </nav>
//     </div>
     <div className='pagedivclass'>
     <nav className='pagenavclass'>
<ul className='ulclasspage'>
<li className="pageliitems">
    <a onClick={prevPage}><IconButton className='iconbtnclass'><ArrowCircleLeftIcon className='arrowclass'/></IconButton></a>
    </li>
{ pageNumber.map((itemnumber)=>
(<li key={itemnumber}
className= {` ${currentPage == itemnumber ? 'pageliitemsactive' : 'pageliitems'}`}>
<a  onClick={()=>setCurrentPage(itemnumber)}> {itemnumber}</a>

</li>)
)}
<li className="pageliitems">
<a onClick={gotonext}><IconButton className='iconbtnclass'><ArrowCircleRightIcon className='arrowclass'/></IconButton></a>
</li>
</ul>
</nav>
</div>
  )
}
