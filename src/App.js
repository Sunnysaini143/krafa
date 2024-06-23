import logo from './logo.svg';
import './App.css';
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import Login from './components/Login';
import Fashion from './components/categories/Fashion';
import Sports from './components/categories/Sports';
import Health from './components/categories/Health';
import Garden from './components/categories/Garden';
import Construction from './components/categories/Construction';
import Stationery from './components/categories/Stationery';
import Automotive from './components/categories/Automotive';
import Searcheditems from './components/Searcheditems';
import Sell from './components/Sell';
import Sellform from './components/Sellform';
import ProductDetails from './components/ProductDetails';
function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
<Route index element={<Home/>}></Route>
<Route path="/Login" element={<Login/>}></Route>
<Route path="/Fashion" element={<Fashion/>}></Route>
<Route path="/Sports" element={<Sports/>}></Route>
<Route path="/Health" element={<Health/>}></Route>
<Route path="/Garden" element={<Garden/>}></Route>
<Route path="/Construction" element={<Construction/>}></Route>
<Route path="/Stationery" element={<Stationery/>}></Route>
<Route path="/Automotive" element={<Automotive/>}></Route>
<Route path="/Searcheditems" element={<Searcheditems/>}></Route>
<Route path="/Sell" element={<Sell/>}></Route>
<Route path="/Sellform" element={<Sellform/>}></Route>
<Route path="/ProductDetails" element={<ProductDetails/>}></Route>










    </Route>
  ))
  return (
    <div>
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
