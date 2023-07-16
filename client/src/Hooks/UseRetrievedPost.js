import { useEffect, useState } from 'react'
import { baseURL, getRequest } from '../Utils/APIRequest';

function UseRetrievedPost(postId) {
    const [retrievedPostContent, setRetrievedPostContent] = useState({
        content: '',
        scheduledAt: '',
        platform: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Retrieve the post content using the postId
        const fetchPostContent = async () => {
            try {
                
                const res = await getRequest(`${baseURL}/post/${postId}`);
                
                setRetrievedPostContent({
                    content: res.content,
                    platform: res.platform,
                    scheduledAt: res.scheduledAt
                });

                
            } catch (error) {
                console.error('Error retrieving post content:', error);
            }
        };
    
        fetchPostContent();
        setIsLoading(false)

    }, [postId]);

    return { retrievedPostContent, isLoading }
}

export default UseRetrievedPost
