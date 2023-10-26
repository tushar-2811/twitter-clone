import React, { useCallback, useEffect, useState } from 'react'
import {BsHouseFill,BsBellFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import SideBarLogo from '../SideBarLogo'
import SidebarItem from './SideBarItem'
import {BiLogOut} from 'react-icons/bi'
import SidebarTweetButton from './SidebarTweetButton'
import useLoginModal from '@/hooks/useLoginModal'
import toast from 'react-hot-toast'
import useUser from '@/hooks/useUser'
// import useCurrentUser from '@/hooks/useCurrentUser'
// import {signOut , useSession } from 'next-auth/react'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/pages/api/auth/[...nextauth]'



const SideBar = () => {
  // const {data:currentUser} = useCurrentUser();
  // const LoginModal = useLoginModal();

  const userModel = useUser();
  // const [token , setToken] = useState();

 useEffect(() => {
    // if(localStorage.token) {
      // const token: any = localStorage.getItem('token');
      // setToken(token);
    // }

    if(localStorage.getItem('token')) {
        userModel.setUser(); 
    }
 },[])

  const handleLogout = useCallback(() => {
      userModel.removeUser();
      localStorage.clear();
      toast.success("log out successful");
  },[])

const items = [
  {
    label : 'Home',
    href : '/',
    icon : BsHouseFill
  },
  {
    label : 'Notifications',
    href : '/notifications',
    icon : BsBellFill
  },
  {
    label : 'Profile',
    href : "/profile",
    icon : FaUser
  }
]
  

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6' >
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SideBarLogo/>
          {
            items.map((item) => (
              <SidebarItem 
               key={item.href}
               href={item.href}
               label={item.label}
               icon={item.icon}
               />
            ))
          }
          {
            ( userModel.user  && <SidebarItem onClick={handleLogout} icon={BiLogOut} label='Logout' />)
          }
         
          <SidebarTweetButton/>
        </div>
      </div>
      
    </div>
  )
}

export default SideBar
