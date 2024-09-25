// TODO
// Future feature -TermConn
// I'd like to revisit the terminal handling.
// It's not in a good state currently in v.3.01
// Make it a 1-1 as it would be on any os
// Future Feature -> Multi terminals on different systems.

// import React, { useState, useEffect } from 'react';
// import { useSystem } from 'contexts/Systems/SystemContext';
// import { TbMoodEmpty } from "react-icons/tb";
// import { PiTerminalWindowThin } from "react-icons/pi";
// import Connecting from './Connecting';

// const TerminalSelect = ({ activeTerminal, setActiveTerminal }) => {
//     const { getAllTerminals } = useSystem();
//     const [terminals, setTerminals] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         (async () => {
//             const availableTerminals = await getAllTerminals();
//             setTerminals(() => {
//                 return availableTerminals?.data?.split('\n').map((item) => {
//                     return {
//                         name: item?.split(':')[0],
//                         date: item?.split('created')[1]?.split(')')[0]
//                     }
//                 }).filter(item => item?.date)
//             });
//             setIsLoading(false)
//         })()
//     }, [])

//     return (
//         <div className='min-w-full min-h-full flex flex-wrap align-center items-center'>
//             <div
// className='min-w-full px-4 min-h-full pb-6 max-h-full
// w-full overflow-scroll module-content scrollbar-hide'>
//                 {terminals && terminals?.map((term) => {
//                     return (
//                         <div className='flex flex-wrap justify-center p-2 py-4
//                     cursor-pointer'>
//                             <PiTerminalWindowThin
//                             className='text-white mr-2 text-[50px]
// cursor-pointer hover:text-brand-400 w-full'
//                             onClick={()=>setActiveTerminal(term.name)}
//                             />
//                             <p className='text-center text-gray-400 overflow-hidden
// text-sm'>{term?.name}</p>
//                             <p className='text-center text-gray-400 overflow-hidden
// text-sm w-full'>{term?.date}</p>
//                         </div>
//                     )
//                 })}
//             </div>
//             {terminals?.length === 0 && !isLoading ? (
//                 <div className='flex flex-wrap items-center justify-center w-full'>
//                     <TbMoodEmpty className='text-gray-400 text-[40px] text-green-400 mr-2' />
//                     <p className='text-gray-400 text-xl mr-4'>No terminals available.</p>
//                 </div>
//             ) : (
//                 ''
//             )}
//             {isLoading ? (
//                 <Connecting message="Loading..." />
//             ) : ''}
//         </div>
//     )
// }

// export default TerminalSelect;
