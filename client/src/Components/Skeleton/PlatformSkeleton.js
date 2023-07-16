import React from 'react'
import Skeleton from 'react-loading-skeleton'

function PlatformSkeleton() {
    return (
        <div className=' flex bg-white w-full flex-col mr-4 p-5 border border-gray-300 rounded-lg'>
            <div className='flex-1'>
                <Skeleton count={2}/>
            </div>
        </div>
    )
}

export default PlatformSkeleton
