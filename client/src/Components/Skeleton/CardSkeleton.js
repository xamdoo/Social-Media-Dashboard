import React from 'react'
import Skeleton from 'react-loading-skeleton'

function CardSkeleton({ cards }) {
    
    return (
        Array(cards).fill(0).map((item, i)=>(
            <div key={i} className=' flex flex-col mr-4 w-1/4 p-2 border border-gray-300 rounded-lg'>
                <div className='flex-1 mt-5'>
                    <Skeleton count={4}/>
                </div>
                
                <div className='flex flex-1 ml-2 mr-2'>
                    <div className='flex-1'>
                        <Skeleton circle width={40} height={40}/>
                    </div>
                    <div className='flex-1'>
                        <Skeleton count={2}/>
                    </div>
                </div>
            </div>
        ))
        
    )
}

export default CardSkeleton
