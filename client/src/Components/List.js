import React, { useState } from 'react'
import defaultPic from '../Assets/placeholder.png'
import schedulePic from '../Assets/schedule.svg'
import { BsFacebook, BsThreeDots  } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
import UseScheduledPosts from '../Hooks/UseScheduledPosts';
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from './Skeleton/CardSkeleton';
import { UseStateContext } from '../Context/useStateContext';


function List() {
    const { scheduledPosts, isLoading } = UseScheduledPosts();
    const [cardOptions, setCardOptions] = useState({});
    const { deletePost } = UseStateContext()

    const toggleOptions = (postId) => {
        setCardOptions((prevOptions) => ({
            ...prevOptions,
            [postId]: !prevOptions[postId]
        }));
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleString('en-US', options);
    };


    return (
        <div className='mt-6 mb-3'>
        {isLoading && <CardSkeleton cards={3} />}
            {scheduledPosts.length === 0 ? (
                <div className='flex gap-2 flex-col items-center justify-center mt-10 mb-3'>
                <img src={schedulePic} alt='No scheduled posts' className='h-64' />
                <p className='font-semibold'>No scheduled posts.</p>
                </div>
            ) : (
                <div className='flex flex-wrap gap-5'>
                {scheduledPosts.map((post) => (
                    <div className='bg-white rounded-lg shadow-md p-2.5 w-1/4 relative' key={post.id}>
                    {cardOptions[post._id] && (
                        <div className='absolute flex flex-col border rounded-lg top-0 right-0 mt-8 mr-5 p-1  bg-white'>
                        <NavLink to={`/edit/${post._id}`} className='p-2 hover:bg-red-600 hover:text-white'>
                            Edit
                        </NavLink>
        
                        <hr />
                        <button className='p-2 hover:bg-red-600 hover:text-white' onClick={() => deletePost(post._id)}>
                            Delete
                        </button>
                        </div>
                    )}
                    <div className='flex justify-end'>
                        <BsThreeDots
                        className='text-gray-600 rounded-full  hover:bg-neutral-200 hover:text-black text-xl cursor-pointer'
                        onClick={() => toggleOptions(post._id)}
                        />
                    </div>
                    <div className='flex items-center mb-4 flex-col'>
                        <img src={post.image?.url || defaultPic} alt='Post' className='object-cover w-full h-32 mb-4' />
                        <div className='w-full'>
                        <p className='overflow-hidden h-12 max-h-12 leading-snug text-gray-500'>{post.content}</p>
                        </div>
                    </div>
        
                    <hr />
        
                    <div className='mb-1 mt-2 flex justify-between'>
                        <div className='flex flex-col'>
                        <span className='text-gray-600'>Platform(s)</span>
                        <div className='flex gap-2 '>{post.platform === 'facebook' && <BsFacebook className='text-blue-600 text-xl' />}</div>
                        </div>
                        <div className='flex flex-col mr-5'>
                        <p className='text-gray-600'>Scheduled to:</p>
                        <span>{formatDate(post.scheduledAt)}</span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}

export default List
