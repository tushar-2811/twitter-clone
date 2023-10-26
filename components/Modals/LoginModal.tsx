import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useState, useCallback } from 'react'
import React from 'react'
import Input from '../Input';
import Modal from '../Modal';
// import {signIn} from 'next-auth/react'
import toast from 'react-hot-toast';
import axios from 'axios';
import useUser from '@/hooks/useUser';

const LoginModal = () => {

    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
   
    const userModel = useUser();

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true);

            /// todo and login
            const response = await axios.post('/api/login' , 
            {email : email,
             password : password
            })
            
            if(response.data.ok) {
                localStorage.setItem('token' , response.data.token);
                userModel.setUser();
                LoginModal.onClose();
                toast.success("successful log in");
            }else{
                toast.error("something went wrong");
                return;
            }   

        } catch (error) {
            console.log(error);
            toast.error("error in logging in");
        } finally {
            setIsLoading(false);
        }

    }, [LoginModal])

    const onSignUp = useCallback(() => {
        if(isLoading) {
           return;
        }

        LoginModal.onClose();
        RegisterModal.onOpen();
   },[isLoading, LoginModal , RegisterModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />

            <Input
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p> New to Twitter ?  &nbsp;   
             <span onClick={onSignUp} className='text-white cursor-pointer hover:underline'> 
                Sign Up
             </span>
            </p> 
        </div>
    )
 
    return (
       <Modal
          disabled={isLoading}
          body={bodyContent}
          actionLabel='Sign In'
          isOpen={LoginModal.isOpen}
          title='LogIn'
          onClose={LoginModal.onClose}
          onSubmit={onSubmit}
          footer={footerContent} 
        />
    )
}

export default LoginModal;
