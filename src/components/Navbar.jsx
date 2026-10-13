import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react'
export function Brand(){return <Link className="brand" to="/" aria-label="CostGard by Trent Tech home"><span className="brand-product">Cost<span>Gard</span><sup>™</sup><small>HVAC CONDENSATE DRAIN SEAL</small></span><span className="brand-by">by</span><span className="brand-trent">TRENT<small>T E C H</small></span></Link>}
export default function Navbar(){
 const [open,setOpen]=useState(false)
 const header=useRef(null), toggle=useRef(null)
 const {pathname}=useLocation()
 useEffect(()=>{if(!open)return;const close=e=>{if(e.key==='Escape'){setOpen(false);toggle.current?.focus()}};const outside=e=>{if(!header.current?.contains(e.target))setOpen(false)};const resize=()=>{if(window.innerWidth>850)setOpen(false)};document.addEventListener('keydown',close);document.addEventListener('pointerdown',outside);window.addEventListener('resize',resize);return()=>{document.removeEventListener('keydown',close);document.removeEventListener('pointerdown',outside);window.removeEventListener('resize',resize)}},[open])
 return <><div className="utility-bar"><div className="container"><span>ENGINEERED TO PERFORM. BUILT TO LAST.</span><a href="tel:+19035094843"><Phone size={12}/> 903-509-4843</a></div></div><header ref={header} className="header" onClick={e=>{if(e.target.closest('a'))setOpen(false)}}><div className="container nav-inner"><Brand/><button ref={toggle} className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="main-navigation" key={pathname} className={open?'navigation open':'navigation'} aria-label="Main navigation" onClick={()=>setOpen(false)}><NavLink to="/" end>Home</NavLink><NavLink to="/products">CostGard</NavLink><NavLink to="/resources">Resources</NavLink><NavLink to="/about">About</NavLink><NavLink to="/contact">Contact</NavLink><Link className="button" to="/contact">Request a quote <ArrowUpRight size={16}/></Link></nav></div></header></>
}
