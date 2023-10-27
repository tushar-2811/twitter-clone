import React, { useCallback, useEffect } from 'react'
import Image from 'next/image'
import Avatar from '../Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import {ClipLoader} from 'react-spinners'

interface userProps {
    userId : string;
}

const UserHero:React.FC<userProps> = ({userId}) => {
      const {data , isLoading} = useCurrentUser(`/api/user/${userId}`);

      if(isLoading) {
        return (
          <div className='flex justify-center items-center mt-80'>
             <ClipLoader color='lightblue' size={80}/>
          </div>
        )
      }

  return (
    <div className='bg-neutral-700 h-44 relative'>
      { data?.coverImage && (
        <Image 
           src={data.coverImage}
           fill
           alt="Cover Image"
           style={{objectFit : 'cover'}}     
        />
      ) }

      <div className='absolute -bottom-16 left-4'>
          <Avatar userId={userId} isLarge hasBorder />
      </div>
    </div>
  )
}

export default UserHero
