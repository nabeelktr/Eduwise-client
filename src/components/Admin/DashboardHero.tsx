import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardWidgets from '../../components/Instructor/Widgets/DashboardWidgets'
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