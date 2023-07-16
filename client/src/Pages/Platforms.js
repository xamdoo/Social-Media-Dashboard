import React from 'react';
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram  } from 'react-icons/bs'
import { UseStateContext } from '../Context/useStateContext';
import UseUserSocialMedia from '../Hooks/UseUserSocialMedia';
import PlatformSkeleton from '../Components/Skeleton/PlatformSkeleton';

const Platforms = () => {
    const { addFacebookAccount } = UseStateContext();
    const { isFacebookConnected, isLoading } = UseUserSocialMedia();
    
    return (
        <div className="min-h-screen p-6 mt-5">
            <div className="max-w-3xl mx-auto">
                {isLoading && <PlatformSkeleton/>}
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Connect New Platform:</h2>
                    <div className='flex text-gray-500 cursor-pointer text-5xl justify-evenly w-96'>
                        <BsFacebook
                            onClick={addFacebookAccount}
                            className={isFacebookConnected ? 'text-blue-500' : ''}
                        />
                        <BsLinkedin />
                        <BsTwitter />
                        <BsInstagram />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Platforms;