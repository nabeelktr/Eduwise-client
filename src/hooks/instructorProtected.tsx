import {redirect} from 'next/navigation'
import { useSelector } from 'react-redux';


interface ProtectedProps{
    children : React.ReactNode,
    user:any
}


export default function InstructorProtected({children, user}: ProtectedProps){
    const isInstructor = user?.role === "instructor"
    console.log(isInstructor, user?.role);

    return isInstructor ? children : redirect("/");
}
