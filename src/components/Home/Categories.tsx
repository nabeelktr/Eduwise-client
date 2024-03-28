import React from 'react'


type Props = {}

const Categories = (props: Props) => {
  return (
<div className="h-[600px] w-full flex flex-col" style={{ backgroundImage: "url(/assets/category.png)" }}> 
    <div className='items-center justify-center flex flex-col py-20 gap-2'>
        <h1 className=' text-4xl font-[1000] text-center'>Expand Your Career</h1>
        <h1 className=' text-4xl text-center'>With Our Courses</h1>
    </div>
</div>
  )
}

export default Categories