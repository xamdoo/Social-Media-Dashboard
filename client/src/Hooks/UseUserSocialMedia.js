import { useEffect, useState } from 'react'
import { baseURL, getRequest } from '../Utils/APIRequest';


function UseUserSocialMedia() {
    const [isFacebookConnected, setIsFacebookConnected] = useState(null);
    const token = localStorage.getItem('token')
    const user = JSON.parse(token);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSocialMediaAccount = async () => {
            try {
                const res = await getRequest(`${baseURL}/auth/account/${user?._id}`);
                const userAccount = res._id;
                
                if (userAccount) {
                    setIsFacebookConnected(true);
                    
                } else {
                    setIsFacebookConnected(false);
                }
            } catch (error) {
                console.error('Error retrieving social media account:', error);
            }
            
        };
    
        fetchSocialMediaAccount();
        setIsLoading(false)
    }, [user]);
    
    return { isFacebookConnected, isLoading }
}

export default UseUserSocialMedia
