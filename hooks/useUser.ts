import {create} from 'zustand'

interface userModalStore {
    user : boolean;
    setUser : () => void;
    removeUser : ()=> void;
}

const useUser = create<userModalStore>((set) => ({
     user : false,
     setUser : () => set({user : true}),
     removeUser : () => set({user : false})

}))

export default useUser;