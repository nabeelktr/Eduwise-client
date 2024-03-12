"use client"
import Link from 'next/link';
import React,{FC, useState} from 'react';
import NavItems from '../utils/NavItems'
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { HiOutlineUser } from 'react-icons/hi2';
import CustomModal from '../utils/CustomModal';
import Login from '../components/Login'
import SignUp from '../components/Signup'
import Verification from '../components/Verification'

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    setRoute: (route: string) => void;
    route: string;
}

const Header:FC<Props> = ({activeItem, setOpen, route, open, setRoute}) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setopenSidebar] = useState(false);

  if(typeof window !== "undefined"){
    window.addEventListener("scroll", () => {
      console.log(window.scrollY );
      if(window.scrollY > 85){
        setActive(true)
      }else{
        setActive(false)
      }
    })
  }

  const handleClose = (e: any) => {
    if(e.target.id === "screen"){
      setopenSidebar(false)
    }
  }
  return (
    <div className='w-full relative shadow-sm'>
      <div className={`${
        active
         ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" 
         : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`} >
      <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
        <div className='w-full h-[80px] flex items-center justify-between p-3'>
           <div>
            <Link href="/"
            className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
            >
              EduWise
            </Link>
           </div>
           <div className="flex items-center">
              <NavItems 
              activeItem= {activeItem}
              isMobile = {false}
              />

              {/* for mobile */}
              <div className='800px:hidden'> 
                <HiOutlineMenuAlt3
                size={25}
                className='cursor-pointer dark:text-white text-black'
                onClick={() => setopenSidebar(true)} />
              </div>

              {/* for desktop */}
              <HiOutlineUser
              size={23}
              className='hidden 800px:block cursor-pointer dark:text-white text-black'
              onClick={() => setOpen(true)}
              />

           </div>
        </div>
      </div>

      {/* sidebar for mobile */}
        {
          openSidebar && (
            <div className='fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]'
            onClick={handleClose}
            id='screen'
            >
              <div className='w-[70%] fixed h-screen z-[99999999] bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                <NavItems activeItem={activeItem} isMobile={true} />
                <HiOutlineUser
                size={23}
                className='cursor-pointer dark:text-white text-black ml-6 mt-4'
                onClick={() => setOpen(true)}
                />
                <br/>
                <br/>
                <p className='text-[16px] px-2 pl-5 text-black dark:text-white'>
                  Copyright @ 2024 Eduwise
                </p>
              </div>
            </div>
          )
        }
      </div>
        {
          route === 'Login' && (
            <>
              {
                open && (
                  <CustomModal 
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Login}
                  />
                )
              }
            </>
          )
        }
        {
          route === 'SignUp' && (
            <>
              {
                open && (
                  <CustomModal 
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={SignUp}
                  />
                )
              }
            </>
          )
        }
        {
          route === 'Verification' && (
            <>
              {
                open && (
                  <CustomModal 
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Verification}
                  />
                )
              }
            </>
          )
        }
    </div>
  )
}

export default Header