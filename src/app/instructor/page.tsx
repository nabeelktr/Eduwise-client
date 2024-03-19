"use client"
import CreateCourse from '../../components/Instructor/Course/CreateCourse'
import { Sidebar } from '../../components/Instructor/Sidebar/SidebarControl'
import { SidebarItem } from '../../components/Instructor/Sidebar/SidebarItems'
import React, { useState } from 'react'
import { HiOutlineComputerDesktop, HiOutlineWrench } from 'react-icons/hi2'

type Props = {}

const InstructorPage = (props: Props) => {
  const [active, setActive] = useState('Create Course')
  return (
    <div className='flex mx-auto '>
      <Sidebar>
        <SidebarItem icon={<HiOutlineComputerDesktop size={25} />} text={'Create Course'}  setActive={setActive} active={active === "Create Course" ? true : false}/>
        <SidebarItem icon={<HiOutlineWrench size={25} />} text={'Edit Course'} setActive={setActive} active={active === "Edit Course" ? true : false}/>
      </Sidebar>
    {
      active === 'Create Course' && (
        <div className='mx-auto 800px:w-[85%] pl-20 800px:pl-5 mr-0 800px:mr-16 '>
        <CreateCourse />
        </div>
      )
    }
    </div>
  )
}

export default InstructorPage