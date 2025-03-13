import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { useWindowScroll } from 'react-use'
import { TiLocationArrow } from "react-icons/ti";
import gsap from 'gsap'
 
const navItems = ['Nexus', 'vault', 'Prologue', 'About', 'Contact']


const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] =useState(false)
    const [isIndicatorActive, setIsIndicatorActive] = useState(false)
    const [lastScrolly, setLastScrolly] = useState(0)
    const [isNavvisible, setIsNavvisible] = useState(true)

 const navContainerRef = useRef(null);
 const audieElementRef =useRef(null);

 const {y: currentScrolly} =useWindowScroll();
    
 useEffect(() => {
    if(currentScrolly === 0){
      setIsNavvisible(true);
      navContainerRef.current.classList.remove("floating-nav")   
    }else if(currentScrolly > lastScrolly){
        setIsNavvisible(false)
        navContainerRef.current.classList.add('floating-nav')
    }else if(lastScrolly){
        setIsNavvisible(true);
        navContainerRef.current.classList.add('floating-nav')
    }
    setLastScrolly(currentScrolly)

 },[currentScrolly ])

 useEffect(() => {
    gsap.to(navContainerRef.current, {
        y: isNavvisible ? 0 : -100,
        opacity: isNavvisible ? 1 : 0,
        duration: 0.2,
    })
 },[isNavvisible])

 const toggleAudioIndicator = () => {

     setIsAudioPlaying((prev) => !prev);
     setIsIndicatorActive((prev) => !prev);
 }

 useEffect(() => {
    if(isAudioPlaying){
        audieElementRef.current.play()
    }else{
        audieElementRef.current.pause()
    }
 },[isAudioPlaying])

  return (
    <div 
    ref={navContainerRef} 
    className='fixed inset-x-0 top-4 h-16 border-none z-[100] transition-all duration-700 sm:inset-x-6'
  >
    <header className='absolute top-1/2 w-full -translate-y-1/2'>
      <nav className='flex size-full items-center justify-between p-4'>
        <div className='flex items-center gap-7'>
          <img src="/img/logo.png" alt="logo" className='w-10' />
          <Button 
            id='product-button'
            title='Products'
            rightIcon={<TiLocationArrow />}
            containerClass="bg-blue-50 md:flex items-center justify-center gap-1"
          />
        </div>
  
        <div className='flex h-full items-center'>
          <div className=' hidden md:block'>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className='nav-hover-btn'
              >
                {item}
              </a>
            ))}
          </div>
          <button
  className="ml-10 flex items-center space-x-0.5"
  onClick={toggleAudioIndicator}
>
  {/* Audio element ko button ke bahar rakhein */}
  <audio
    className="hidden"
    ref={audieElementRef}
    src="/audio/loop.mp3"
    loop
  />

  {/* Indicator lines ko sahi tarike se map karein */}
  {[1, 2, 3, 4].map((bar) => (
    <div
      key={bar}
      className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
      style={{ animationDelay: `${bar * 0.1}s` }}
    />
  ))}
</button>  
        </div>
      </nav>
    </header>
  </div>
  
  )
}

export default Navbar