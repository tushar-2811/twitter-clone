import React from 'react'
import { useState, useCallback } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';

const RegisterModal = () => {
  
  const LoginModal = useLoginModal();
  const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(() => {
        try {
            setIsLoading(true);

            /// todo and register and login

            RegisterModal.onClose();

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }, [RegisterModal])

    const onSignIn = useCallback(() => {
         if(isLoading) {
            return;
         }

         RegisterModal.onClose();
         LoginModal.onOpen();
    },[isLoading, LoginModal , RegisterModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
          <Input
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            
            <Input
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading}
        />
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
            <p> Already have an Account ?  &nbsp;
             <span onClick={onSignIn} className='text-white cursor-pointer hover:underline'> 
                Sign In
             </span>
            </p> 
        </div>
    )
  return (
   <Modal 
     disabled={isLoading}
     body={bodyContent}
     actionLabel='Register'
     isOpen={RegisterModal.isOpen}
     title='Create an Account'
     onClose={RegisterModal.onClose}
     onSubmit={onSubmit}
     footer={footerContent}
   />
  )
}

export default RegisterModal;
