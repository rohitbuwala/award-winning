import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <main className='reletive min-h-screen w-screen overflow-x-hidden'>
      <Navbar/>
        <Hero/>
        <About/>
        <Features/>
        <Story/>
        <Contact/>
        <Footer/>
    </main>
    </>
  )
}

export default App
