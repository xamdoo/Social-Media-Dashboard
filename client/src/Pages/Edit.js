import React, { useState } from 'react'
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram  } from 'react-icons/bs'
import { UseStateContext } from '../Context/useStateContext';
import { useParams } from 'react-router-dom';
import UseRetrievedPost from '../Hooks/UseRetrievedPost';
import LoadingSpinner from '../Components/Skeleton/LoadingSpinner';




function Edit() {
    const { postId } = useParams();
    const { updatePost, updatePostContent, postContent, loading, } = UseStateContext();
    const { isLoading, retrievedPostContent } = UseRetrievedPost(postId)
    const [selectedPlatform, setSelectedPlatform] = useState(retrievedPostContent.platform);

    // function to select the social media platforms for sharing
    const handlePlatformClick = (platform) => {
        if (selectedPlatform === platform) {
            setSelectedPlatform('');
        } else {
            setSelectedPlatform(platform);
        }
        updatePostContent({ ...postContent, platform });
        
    };
    
    
    return (
        <div className="w-8/12 mb-4 mx-auto bg-white p-8 rounded shadow-md mt-6">
            {isLoading && <LoadingSpinner/>}
            <form onSubmit={(e) => updatePost(postId, e)}>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                        Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        defaultValue={retrievedPostContent.image}
                        onChange={(e) => {
                            const image = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                const base64Image = reader.result.split(',')[1];
                                updatePostContent({ ...retrievedPostContent, image: base64Image });
                            };
                            reader.readAsDataURL(image);
            
                        }}
                        className="border border-gray-300 p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                        Content:
                    </label>
                    <textarea
                        placeholder='Write your post content here...' 
                        className='h-full w-full outline-none font-mono font-normal whitespace-pre-wrap mt-2 py-4 px-2 border border-gray-300'
                        id="content"
                        type='text'
                        defaultValue={retrievedPostContent.content}
                        onChange={(e) => {
                            updatePostContent({ ...retrievedPostContent, content: e.target.value });
                        }}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="platform" className="block text-gray-700 font-medium mb-2">
                        Platform:
                    </label>
                    <div className="flex gap-2 cursor-pointer">
                        <BsFacebook
                            className={`text-xl ${selectedPlatform === 'facebook' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => handlePlatformClick('facebook')}
                        />
                        <BsLinkedin
                            className={`text-xl ${selectedPlatform === 'linkedin' ? 'text-blue-800' : 'text-gray-500'}`}
                            onClick={() => handlePlatformClick('linkedin')}
                        />
                        <BsTwitter
                            className={`text-xl ${selectedPlatform === 'twitter' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => handlePlatformClick('twitter')}
                        />
                        <BsInstagram
                            className={`text-xl ${selectedPlatform === 'instagram' ? 'text-pink-600' : 'text-gray-500'}`}
                            onClick={() => handlePlatformClick('instagram')}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="scheduledDateTime" className="block text-gray-700 font-medium mb-2">
                        Scheduled Date and Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="scheduledDateTime"
                        name="scheduledDateTime"
                        onChange={(e) =>
                            updatePostContent({
                                ...retrievedPostContent,
                                scheduledAt: e.target.value
                            })
                        }
                        className="border border-gray-300 p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-stone-950 text-white px-5 py-2">
                    {loading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    )
}

export default Edit
