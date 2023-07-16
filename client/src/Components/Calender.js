import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import UseScheduledPosts from '../Hooks/UseScheduledPosts';
import { BsFacebook } from 'react-icons/bs';
import FullCalendar from '@fullcalendar/react';

function Calender() {
    const { scheduledPosts } = UseScheduledPosts();

    const events = scheduledPosts.map((post) => ({
        title: post.platform === 'facebook' ? 'Facebook' : '',
        date: post.scheduledAt,
    }));
    return (
        <div className='mt-8 bg-slate-50 p-5 mb-5 rounded-lg'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={{
                    start: 'today prev,next',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                height={'90vh'}
                events={events}
                eventContent={(eventInfo) => (
                    <div className='text-center ml-2'>
                        {eventInfo.event.title === 'Facebook' && (
                            <BsFacebook className='text-blue-600 text-xl cursor-pointer' />
                        )}
                    </div>
                )}
            />
        </div>
    )
}

export default Calender
