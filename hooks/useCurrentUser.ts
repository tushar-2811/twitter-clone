import useSWR from "swr";;
import axios from "axios";

const fetcherfxn = async(url:string) => {
    const {data} = await axios.get(url , {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
       })
       return data.user;
}

const useCurrentUser = (url:string) => {
    const {data , isLoading  } = useSWR(url , fetcherfxn);
    console.log("inside useCurrentUser---->" + data);

    return {
        data,
        isLoading,       
    }
}

export default useCurrentUser;