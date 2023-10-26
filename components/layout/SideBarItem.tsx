import useLoginModal from '@/hooks/useLoginModal';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { IconType } from 'react-icons';

interface sidebarprops {
    label : string;
    href ?: string;
    icon : IconType;
    onClick?: () => void

}
const SidebarItem:React.FC<sidebarprops> = ({
    label,
    href,
    icon: Icon,
    onClick
}) => {
  
  const router = useRouter();
  const LoginModal = useLoginModal();
  // const userModel = useUser();
  // const [token , setToken] = useState(null);

  // useEffect(() => {
  //   if(localStorage.token) {
  //      const token: any = localStorage.getItem('token');
  //      setToken(token);
  //      userModel.setUser();   
  //   }
  // },[])
  const userModel = useUser();


  const handleClick = useCallback(() => {

    //  if(!userModel.user){
    //     // LoginModal.onOpen();
    //     return;
    //  }
    
      if(onClick) {
        return onClick();
      }

      if(href) {
        router.push(href);
      }
  },[router , onClick , href])
  return (
    <div onClick={handleClick} className='flex flex-row items-center' >
      <div className='
      relative
      rounded-full
      h-14
      w-14
      flex
      items-center
      justify-center
      p-4
      hover:bg-slate-300
      hover:bg-opacity-10
      cursor-pointer
      lg:hidden
      '>
       <Icon size={28}  color='white'/>
      </div>

      <div className='
         relative
         hidden
         lg:flex
         gap-4
         p-4
         rounded-full
         hover:bg-slate-300
         hover:bg-opacity-10
         cursor-pointer
         items-center
      '>
        <Icon size={24} color='white'/>
        <p className='hidden  text-white text-xl lg:block' >
            {label}
        </p>
      </div>
    </div>
  )
}

export default SidebarItem;
