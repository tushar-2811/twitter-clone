import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import {ClipLoader} from 'react-spinners'


const FollowBar = () => {

  // const userModel = useUser();
  const [data1 , setData] = useState([]);
  const {data , isLoading} = useCurrentUser('/api/users');
  console.log(data);
  // const {data , isLoading } = useSWR('/api/users' , fetcherfxn);

  // if(isLoading) {
  //   return <h1 className='text-white'> ...Loading </h1>
  // }

//  useEffect(() => {
//   const fetcherfxn = async(url:string) => {
//     const {data} = await axios.get(url , {
//      headers : {
//        Authorization : `Bearer ${localStorage.getItem('token')}`
//      }
//     });
//     console.log(data);
//     setData(data.allUsers);
//     console.log(data1)
// }
//    if(userModel.user) {
//      fetcherfxn("api/users");
//    }
//  },[userModel.user])

if(isLoading) {
  return (
    <div className='flex justify-center items-center mt-80'>
       <ClipLoader color='lightblue' size={80}/>
    </div>
  )
}

  return (
    <div className='px-6 py-4 hidden lg:block'>
        <div className='bg-neutral-800 rounded-xl p-4'>
            <h2 className='text-white text-xl font-semibold' >Who to follow</h2>
            <div className='flex flex-col gap-6 mt-4'>
                 {
                  data?.map((user:any) => (
                    <div key={user.id} className='flex flex-col gap-4'>
                      <Avatar userId={user.id} profileImage={user.profileImage} isLarge={false} />
                      <div className='flex flex-col '>
                        <p className='text-white font-semibold text-sm' > {user.name} </p>
                        <p className='text-neutral-400 text-sm '> @{user.username} </p>
                      </div>
                    </div>
                  ))
                 }
            </div>
        </div>
      
    </div>
  )
}

export default FollowBar
