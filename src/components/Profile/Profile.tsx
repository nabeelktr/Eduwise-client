import React, { FC, useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { signOut } from 'next-auth/react'
import ProfileInfo from './ProfileInfo'
import { useLogOutQuery } from '../../../redux/features/auth/authApi'
import ChangePassword from '../../components/ChangePassword'

type Props = {
    user: any
}



const Profile: FC<Props> = ({user}) => {
    const [scroll, setScroll] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false);

      const {} = useLogOutQuery(undefined, {
      skip: !logout ? true : false,
      })


    const logoutHandler = async() => {
        await signOut();
        setLogout(true);
    }

    if(typeof window !== "undefined"){
        window.addEventListener("scroll", () => {
          console.log(window.scrollY );
          if(window.scrollY > 85){
            setScroll(true)
          }else{
            setScroll(false)
          }
        })
      }
  return (

    <div className='w-[85%] flex mx-auto '>
        <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-gray-800  bg-gray-50 bg-opacity-90 border dark:border-gray-500 rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${scroll ?
        "top-[120px": "top-[30px]"} left-[30px]`} >
            <SidebarProfile 
              user={user}
              active={active}
              avatar={avatar}
              setActive={setActive}
              logoutHandler={logoutHandler}
            />
        </div>
        {
          active === 1 && (
            <div className='w-full h-full bg-transparent mt-[80px]'>
              <ProfileInfo avatar={avatar} user={user}/>
            </div>
          )
        }
        {
          active === 2 && (
            <div className='w-full h-full bg-transparent mt-[80px]'>
              <ChangePassword />
            </div>
          )
        }
    </div>

  )
}

export default Profile