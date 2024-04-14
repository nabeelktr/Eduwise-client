import React from 'react'
import DashboardHeader from './DashboardHeader'
type Props = {
  instructorId?:string
}

const DashboardHero = ({instructorId}: Props) => {
  return (
    <div>
        <DashboardHeader instructorId={instructorId}/>
    </div>
  )
}

export default DashboardHero