import './index.css';
import { Canvas } from './Canvas';
import data from './data';
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
function app() {
  const headingref = useRef(null);
  const growingRef = useRef(null)
  const [canvas, setCanvas] = useState(false);
  useEffect(() => {
    const scroll = new LocomotiveScroll();
  }, []);
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' },
  ];
  useEffect(() => {
    const handleClick = (e) => {
      setCanvas((previousCanvas) => {
        if (!previousCanvas) {
          gsap.to(growingRef.current, {
            top: e.clientX,
            left: e.clientY,
          })

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1,
            ease: "power2.inOut"
          })

          gsap.to(growingRef.current, {
            scale: 1000,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingRef.current, {
                scale: 0,
                clearProps: "all"
              })
            }
          })
        }
        else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut"
          })
        }
        return !previousCanvas;
      });
    }
    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);
  return (
    <>

      {/* <div className="w-full min-h-screen relative"> 
        {data[0].map((canvasData, index) => (
          <Canvas details={canvasData} />
        ))}
      </div>
      <div className="w-full min-h-screen relative">
        {data[1].map((canvasData, index) => (
          <Canvas details={canvasData} />
        ))}
      </div> */}
      <span ref={growingRef} className='growing fixed block top-[-20px] left-[-20px] w-5 h-5 rounded-full'></span>
      <div className="w-full min-h-screen relative">
        {canvas && data[0].map((canvasData, index) => (
          <Canvas key={index} details={canvasData} />
        ))}
        <nav className="w-full  py-4 top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">ThirtySixStudio</div>
              <ul className="flex space-x-6">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.path}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="contanier mt-[3%] w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className='text-3xl'>At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.</h3>
              <p className='mt-[6%]'>We're a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.</p>
              <p className='mt-10'>Scroll</p>
            </div>
          </div>
          <div className='w-full absolute left-0 bottom-0'>
            <h1 ref={headingref} className='text-[14rem] tracking-tight pl-5 leading-none '>ThirtySixStudio</h1>
          </div>
        </nav >
      </div >
      <div className="w-full min-h-screen mt-[20%] px-10">
        <h1 className="text-8xl tracking-tighter">About the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          We are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </>
  );
}
export default app;
