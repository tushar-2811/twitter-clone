import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'

interface AvatarProps {
    userId : string;
    isLarge ?: boolean;
    hasBorder ?: boolean;
    profileImage ?: string;
}

const Avatar:React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder,
    profileImage
}) => {
    const router = useRouter();
    // const [user , setUser] = useState();
    // useEffect(() => {
       
    // },[])

    const onClick = useCallback((e:any) => {
         const url = `/profile/${userId}`;
         router.push(url);
    },[router , userId])
  return (
    <div 
    className={`
     ${hasBorder ? 'border-4 border-black' : ""}
     ${isLarge ? 'h-32' : 'h-12'}
     ${isLarge ? 'w-32' : 'w-12' }
     rounded-full
     hover:opacity-90
     transition
     relative
     cursor-pointer    
    `}>

      <Image
         fill
         style={{
           objectFit : 'cover'
           ,borderRadius : '100%'
         }}
         alt = 'Avatar'
         onClick={onClick}
         src={profileImage || '/images/placeholder.png'}
      />
      
    </div>
  )
}

export default Avatar
