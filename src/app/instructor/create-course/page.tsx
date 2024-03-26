"use client"
import InstructorProtected from '../../../hooks/instructorProtected'
import CreateCourse from '../../../components/Instructor/CreateCourse/CreateCourse'
import React from 'react'
import Heading from '../../../utils/Heading'
import Sidebar from '../../../components/Instructor/Sidebar/Sidebar'


type Props = {}

const CreateCoursePage = (props: Props) => {

  return (
    <InstructorProtected >
    <Heading
      title="Eduwise - Instructor"
      description="Platform for students to learn and get help from teachers"
      keywords="Programming, MERN, Redux"
    />
  <div className="flex mx-auto z-[9999]">

      <div className="mx-auto 800px:w-[85%] px-[100px] 800px:pl-5 mr-0 800px:mr-16 ">
        <CreateCourse />
      </div>
    <Sidebar active={0}  />
    </div>
    </InstructorProtected>
  )
}

export default CreateCoursePage