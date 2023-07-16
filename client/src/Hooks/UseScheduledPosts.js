import { useEffect, useState } from 'react'
import { baseURL, getRequest } from '../Utils/APIRequest';

function UseScheduledPosts() {
    const [scheduledPosts, setScheduledPosts] = useState([]);
    const token = localStorage.getItem('token')
    const user = JSON.parse(token);
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const fetchScheduledPosts = async () => {
            try {
                const res = await getRequest(`${baseURL}/post/scheduled/${user?._id}`);
                
                setScheduledPosts(res);
            } catch (error) {
                console.error('Error retrieving scheduled posts:', error);
            }
        };
    
        fetchScheduledPosts();
        setIsLoading(false)
    }, [user]);
    
    return { scheduledPosts, isLoading }
}

export default UseScheduledPosts
