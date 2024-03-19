import React, { useState } from 'react'

type Props = {
    active: number;
    setActive: (active:number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}

const CourseContent:React.FC<Props> = ({active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  )
    const [activeSection, setActiveSection] = useState(1)

    const handleSubmit = (e:any) => {
        e.preventDefault()
    }
    return (
    <div className='m-auto mt-12 p-3'>
        <form onSubmit={handleSubmit}>

        </form>
    </div>
  )
}

export default CourseContent