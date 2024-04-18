"use client"
import DashboardHero from '../../../components/Admin/DashboardHero'
import Sidebar from '../../../components/Instructor/Sidebar/Sidebar'
import Heading from '../../../utils/Heading'
import React from 'react'
import { useSelector } from 'react-redux'
import OrderAnalytics from "../../../components/Instructor/analytics/OrderAnalytics"

type Props = {}

const page = (props: Props) => {
    const {user} = useSelector((state:any) => state.auth)
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* <InstructorProtected> */}
      <Heading
        title="Eduwise - Instructor | Order Analytics"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          
          <div className="z-[99]">
           {user && <DashboardHero instructorId={user.id}/>}
            </div>
            <OrderAnalytics />
        </div>
          <Sidebar active={-1} />
      </div>
      {/* </InstructorProtected> */}
      </div>
  )
}

export default page