import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useState, useCallback } from 'react'
import React from 'react'
import Input from '../Input';
import Modal from '../Modal';

const LoginModal = () => {

    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(() => {
        try {
            setIsLoading(true);

            /// todo and login

            LoginModal.onClose();

        } catch (error) {
            console.log(error);
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
