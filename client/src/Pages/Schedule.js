import React, { useState } from 'react'
import Calender from '../Components/Calender'
import List from '../Components/List';


function Schedule() {
  const [activeButton, setActiveButton] = useState('list');
  const [filterOption, setFilterOption] = useState('all');
  

  const renderContent = () => {
    if (activeButton === 'calendar') {
      return <Calender filterOption={filterOption} />;
    } else if (activeButton === 'list') {
      return <List filterOption={filterOption} />;
    } else {
      return null;
    }
  };

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  };

    
    return (
        <div className="mt-8 ml-10 mr-10">
            <div className="flex items-center justify-between">
                <div className="border border-gray-300 rounded-lg flex">
                    <button
                        className={`py-2 px-4 rounded-l ${
                        activeButton === 'calendar' ? 'bg-stone-950 text-white font-bold' : 'bg-gray-300 text-gray-700'
                        }`}
                        onClick={() => setActiveButton('calendar')}
                    >
                        Calendar
                    </button>
                    <button
                        className={`py-2 px-4 rounded-r ${
                        activeButton === 'list' ? 'bg-stone-950 text-white font-bold' : 'bg-gray-300 text-gray-700'
                        }`}
                        onClick={() => setActiveButton('list')}
                    >
                        List
                    </button>
                </div>
                <div className='flex items-center gap-10 mr-8'>
                    <div className=" flex items-center gap-1">
                        <span className='font-semibold'>Filters:</span>
                        <select
                            className="py-2 px-2 rounded-md bg-stone-950 text-white"
                            value={filterOption}
                            onChange={handleFilterOptionChange}
                        > 
                        <option value="all">All</option>
                        <option value="completed">Posted</option>
                        <option value="pending">Pending</option>
                        </select>
                    </div>

                </div>
            </div>
            <div>{renderContent()}</div>
        </div>
    )
}

export default Schedule
