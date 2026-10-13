import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Resources from './pages/Resources'
import About from './pages/About'
import Contact from './pages/Contact'
import Legacy from './pages/Legacy'
import Gallery from './pages/Gallery'
function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0);document.title=pathname==='/'?'CostGard™ Condensate Drain Seal | Trent Technologies':`${pathname.split('/').filter(Boolean).pop().replaceAll('-',' ')} | Trent Technologies`},[pathname]);return null}
export default function App(){return <BrowserRouter><ScrollToTop/><a href="#main-content" className="skip-link">Skip to content</a><Navbar/><div id="main-content"><Routes><Route path="/" element={<Home/>}/><Route path="/products" element={<Products/>}/><Route path="/services" element={<Products/>}/><Route path="/resources" element={<Resources/>}/><Route path="/photo-gallery" element={<Gallery/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/request-quote" element={<Contact/>}/><Route path="/ahu-blow-through-up-to-100-tons" element={<Navigate to="/blow-through-kit" replace/>}/><Route path="/rtu-unitary-rooftop-up-to-30-tons" element={<Navigate to="/rtu-system-kit" replace/>}/><Route path="/ahu-fan-coil-up-to-30-tons" element={<Navigate to="/light-commercial-kit" replace/>}/><Route path="/ahu-custom-designed-up-to-100-tons" element={<Navigate to="/commercial-kit" replace/>}/><Route path="*" element={<Legacy/>}/></Routes></div><Footer/></BrowserRouter>}
