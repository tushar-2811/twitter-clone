import React, { useEffect,useState } from 'react'
import {useRouter} from 'next/router'
import Header from '@/components/Header';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import UserHero from '@/components/users/UserHero';
import useCurrentUser from '@/hooks/useCurrentUser';


const userView = () => {
    const router = useRouter();
    const userId = router.query.userid;
    const {data , isLoading} = useCurrentUser(`/api/users/${userId}`);
    // const [isLoading , setIsLoading] = useState(true);
    // const [userData , setUserData] = useState<any>()

    // useEffect(() => {
    //    const fetcher = async() => {
    //        const {data} = await axios.get(`/api/users/${userId}` , {
    //         headers : {
    //             Authorization : `Bearer ${localStorage.getItem('token')}`
    //         }
    //        })
    //        setUserData(data.user);
    //        setIsLoading(false);
    //    }
    //    fetcher();
       
    // },[userData , isLoading])

    if(isLoading) {
      return (
        <div className='flex justify-center items-center mt-80'>
           <ClipLoader color='lightblue' size={80}/>
        </div>
      )
    }
   
  return (
    <>
    <Header showBackArrow label={data?.name} />
    <UserHero userId={userId as string} />
    </>
  )
}

export default userView;
