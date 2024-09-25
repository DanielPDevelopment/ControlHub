// TODO
// Future Feature -TermConn
// Root docs for feature TerminalSelect.js

// import { useState } from 'react';
// import { connectHelpGeneral } from 'hooks/InfoAndMeta/useSystems';
// import { useSystem } from 'contexts/Systems/SystemContext';
// import InputField from 'components/fields/InputField';

// const TerminalConnect = () => {
//     const initialData = {
//         terminalName: ''
//     }
//     const { createNewTerminal } = useSystem();
//     const [formData, setFormData] = useState(initialData);
//     const [isLoading, setIsLoading] = useState(false);

//     const [errors, setErrors] = useState('');

//     const handleConnect = async (e) => {
//         e.preventDefault();
//         const results = await createNewTerminal(formData.terminalName);

//         if (results?.errors || results?.errors?.length) {
//             setErrors(() => results.errors.msg || results.errors[0].msg)
//             console.log('errors')
//         }
//     }

//     return (
//         <div className=''>
//             {/* help section */}
//             <div className='w-full'>
//                 {connectHelpGeneral({ CallOut: 'Terminal name must be unique' })}
//             </div>
//             <div className='w-full flex '>
//                 {/* <p className='text-white mr-2'>System name: </p> */}
//                 <p className='text-gray-400'>Terminal Creation</p>
//             </div>

//             <InputField
//                 variant="auth"
//                 extra=" mb-4 min-w-[400px]"
//                 height={'50px'}
//                 label=""
//                 placeholder="[ Terminal Name ]"
//                 id="ass"
//                 type="text"
//                 value={formData.terminalName}
//                 hasLabel={false}
//                 autocomplete="off"
//                 // hasBorder={false}
//                 onChange={(e) => setFormData({ ...formData, terminalName: e.target.value })}
//             />

//             <button
//                 className='linear w-[130px] rounded-xl bg-brand-400 py-[10px] text-sm text-white
// transition duration-200 hover:bg-brand-600 active:bg-brand-700 '
//                 disabled={isLoading}
//                 onClick={handleConnect}
//             >
//                 Create
//             </button>
//             <p className="mt-2 mb-2 text-base text-red-600">
//                 {errors ? `${errors} ☝` : ''}
//             </p>

//         </div>
//     )
// }

// export default TerminalConnect;
