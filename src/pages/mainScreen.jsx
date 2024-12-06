import { useState, useEffect, useCallback, useMemo } from 'preact/hooks'
import { Button, Card, Navbar, Checkbox, Label, Radio, Table, Spinner } from "flowbite-react";
import { HiOutlineArrowRight, HiOutlineArrowLeft, HiOutlineArrowDown, HiOutlineArrowUp, HiHome, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdHeatPump } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const VerticalProgressBar = ({ progress, children }) => {
        return (
                /*   <div className="relative h-32 w-3/5 bg-gray-200 rounded-full overflow-hidden"> */
                <div className="relative h-4/5 w-3/5 bg-gray-200 overflow-hidden">
                        <div
                                className="absolute bottom-0 left-0 w-full  bg-[#ff8000] transition-all duration-300 ease-in-out"
                                style={{ height: `${progress}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                                {children}
                        </div>
                </div>
        );
};


const MainScreen = () => {

        const selectedTitle = {
                title: "Main Screen"

        }


        const navigate = useNavigate();

        const [selector, setSelector] = useState({
                currentPage: 1,
                total: 5,
                totalPages: 2
        });

        const [pumps, setPumps] = useState([
                {
                        id: 1,
                        name: "Pump 1",
                        status: "Drive Fault"
                },
                {
                        id: 2,
                        name: "Pump 2",
                        status: "Loading"
                },
                {
                        id: 3,
                        name: "Pump 3",
                        status: "Drive Fault"
                },
                {
                        id: 4,
                        name: "Pump 4",
                        status: "Drive Fault",

                },


        ]);


        return(
                <div className='flex items-center justify-center h-screen bg-gray-800'>
                <div className='flex flex-col max-h-[480px] max-w-[800px] bg-gray-500 h-[480px] w-[800px] border-2 border-[#bb394e]'>
                <Navbar fluid className="bg-[#ff8000] w-full">
                                <Navbar.Brand>
                                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                                {`${selectedTitle.title}`}
                                        </span>
                                </Navbar.Brand>
                                <div className="flex md:order-2">
                                        <button
                                                onClick={() => {
                                                        navigate('/home');
                                                }}
                                                className="flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent">
                                                <RxHamburgerMenu className="h-7 w-7" />
                                        </button>
                                </div>
                        </Navbar>

                        <div className="flex justify-center space-x-4 py-2 flex-grow">
                                <button
                                        className="flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent"
                                        onClick={() => {
                                                const { currentPage, totalPages } = selector;

                                                setSelector((prev) => ({
                                                        ...prev,
                                                        currentPage: prev.currentPage - 1,
                                                }));
                                        }}
                                >
                                        <HiChevronLeft className="h-7 w-7" />
                                </button>

                                {pumps.map((pump) => (
                                        <>
                                        <Card href="#" className="max-w-xs bg-gray-800 border border-none">
                                                        <h5 className="text-2xl font-bold tracking-tight text-white">{pump.name}</h5>
                                                        <div className="flex items-center justify-center py-0 my-0">
                                                                <svg
                                                                        className="animate-spin text-blue-500 w-20 h-20"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                        <circle
                                                                                className="opacity-25"
                                                                                cx="12"
                                                                                cy="12"
                                                                                r="10"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                        ></circle>
                                                                        <path
                                                                                className="opacity-75"
                                                                                fill="currentColor"
                                                                                d="M4 12a8 8 0 018-8v8z"
                                                                        ></path>


                                                                        <path
                                                                                className="opacity-75"
                                                                                fill="currentColor"
                                                                                d="M20 12a8 8 0 01-8 8v-8z"
                                                                        ></path>
                                                                </svg>
                                                        </div>
                                                        <h8 className="text-lg font-bold tracking-tight text-white">Drive Fault</h8>
                                                </Card>
                                        </>
                                ))}

                                <button className="flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent">
                                        <HiChevronRight className="h-7 w-7" />
                                </button>
                        </div>



                        <div className='flex justify-between'>
                                        <div className="w-2/5 mr-1">
                                                <table className="w-full text-left text-sm text-white h-full table-fixed">
                                                        <thead className="bg-[#ff8000] text-black">
                                                                <tr>
                                                                        <th scope="col" className="py-1 px-2">Time</th>
                                                                        <th scope="col" className="py-1 px-2">Fault</th>
                                                                </tr>
                                                        </thead>
                                                        <tbody className="h-full">
                                                                <tr className="bg-gray-600">
                                                                        <td className="p-2">05/12/25 07:40</td>
                                                                        <td className="p-2">Pump 1 Fault</td>
                                                                </tr>
                                                                <tr className="bg-gray-600">
                                                                        <td className="p-2">05/12/24 07:40</td>
                                                                        <td className="p-2">Pump 2 Fault</td>
                                                                </tr>
                                                                <tr className="bg-gray-600 h-full">
                                                                        <td className="h-full"></td>
                                                                        <td className="h-full"></td>
                                                                </tr>
                                                        </tbody>
                                                </table>
                                        </div>

                                <div className="w-1/5 flex flex-col space-y-2 justify-between items-center my-2 mx-2">
                                        <p className='text-white'>System Mode</p>
                                        <label className="inline-flex relative items-center cursor-pointer">
                                                <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                //checked={valueToShow}
                                                />
                                                <div className="w-11 h-6 bg-blue-500 rounded-full peer peer-checked:bg-[#ff8000] peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                                        </label>
                                        <Button className='w-full bg-[#ff8000] text-black'>Mute</Button>
                                </div>
                                <div className="w-2/5 justify-between flex flex-row mx-2">
                                        <div className="w-1/2 flex flex-col space-y-0 justify-between items-center my-1 mx-2">
                                                <h1 className='text-white'>Pressure</h1>
                                                <VerticalProgressBar progress={30}>
                                                        <span className="text-black">30%</span>
                                                </VerticalProgressBar>
                                        </div>
                                        <div className="w-1/2 flex flex-col space-y-0 justify-between items-center my-1 mx-2">
                                                <h1 className='text-white'>Flow</h1>
                                                <VerticalProgressBar progress={50}>
                                                        <span className="text-black">75%</span>
                                                </VerticalProgressBar>
                                        </div>
                                        <div className="w-1/2 flex flex-col space-y-0 justify-between items-center my-1 mx-2">
                                                <h1 className='text-white'>Level</h1>
                                                <VerticalProgressBar progress={30}>
                                                        <span className="text-black">30%</span>
                                                </VerticalProgressBar>
                                        </div>
                                </div>
                        </div>




                </div>
              </div>
        )


        return <div className="flex items-center justify-center h-screen bg-gray-500">    
               <div id="content" className="bg-gray-800 space-y-1 flex flex-col justify-between">
                {/* <div id="content" className="bg-gray-800 space-y-1 flex flex-col justify-between min-h-screen">   */}                     
                <Navbar fluid className="bg-[#ff8000]">
                                <Navbar.Brand>
                                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                                {`${selectedTitle.title}`}
                                        </span>
                                </Navbar.Brand>
                                <div className="flex md:order-2">
                                        <button
                                                onClick={() => {
                                                        navigate('/home');
                                                }}
                                                className="flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent">
                                                <RxHamburgerMenu className="h-7 w-7" />
                                        </button>
                                </div>
                        </Navbar>

                        <div className="flex justify-center space-x-4 py-2 flex-grow">
                                <button
                                        className="flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent"
                                        onClick={() => {
                                                const { currentPage, totalPages } = selector;

                                                setSelector((prev) => ({
                                                        ...prev,
                                                        currentPage: prev.currentPage - 1,
                                                }));
                                        }}
                                >
                                        <HiChevronLeft className="h-7 w-7" />
                                </button>

                                {pumps.map((pump) => (
                                        <>
         

                                                <Card href="#" className="max-w-xs bg-gray-800 border border-none">
                                                        <h5 className="text-2xl font-bold tracking-tight text-white">{pump.name}</h5>
                                                        <div className="flex items-center justify-center py-0 my-0">
                                                                <svg
                                                                        className="animate-spin text-blue-500 w-20 h-20"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                        <circle
                                                                                className="opacity-25"
                                                                                cx="12"
                                                                                cy="12"
                                                                                r="10"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                        ></circle>
                                                                        <path
                                                                                className="opacity-75"
                                                                                fill="currentColor"
                                                                                d="M4 12a8 8 0 018-8v8z"
                                                                        ></path>


                                                                        <path
                                                                                className="opacity-75"
                                                                                fill="currentColor"
                                                                                d="M20 12a8 8 0 01-8 8v-8z"
                                                                        ></path>
                                                                </svg>
                                                        </div>
                                                        <h8 className="text-lg font-bold tracking-tight text-white">Drive Fault</h8>
                                                </Card>
                                        </>
                                ))}

                                <button className="flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent">
                                        <HiChevronRight className="h-7 w-7" />
                                </button>
                        </div>



                        <div className='flex justify-between flex-grow'>
                                <div className="h-1/2 w-2/5 mr-1">
                 
             <table className='w-full text-left text-sm text-white'>
              <thead className="bg-[#ff8000] text-black">
                <tr>
                  <th scope="col" className='py-1 px-2'>Time</th>
                  <th scope="col" className='py-1 px-2'>Fault</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-300 text-black">
                  <td className='p-2'>05/12/25 07:40</td>
                  <td className='p-2'>Pump 1 Fault</td>
                </tr>
                <tr className="bg-gray-300 text-black">
                  <td className='p-2'>05/12/24 07:40</td>
                  <td className='p-2'>Pump 2 Fault</td>
                </tr>
                <tr className="bg-gray-300 text-black">
                  <td className='p-3'></td>
                  <td className='p-3'></td>
                </tr>
                <tr className="bg-gray-300 text-black">
                  <td className='p-3'></td>
                  <td className='p-3'></td>
                </tr>
              </tbody>
            </table>
                                </div>
                                <div className="w-1/5 flex flex-col space-y-2 justify-between items-center my-2 mx-2">
                                        <p className='text-white'>System Mode</p>
                                        <label className="inline-flex relative items-center cursor-pointer">
                                                <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                //checked={valueToShow}
                                                />
                                                <div className="w-11 h-6 bg-blue-500 rounded-full peer peer-checked:bg-[#ff8000] peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                                        </label>
                                        <Button className='w-full bg-[#ff8000] text-black'>Mute</Button>
                                </div>
                                <div className="w-2/5 justify-between flex flex-row mx-2">
                                        <div className="w-1/2 flex flex-col space-y-0 justify-between items-center my-1 mx-2">
                                                <h1 className='text-white'>Pressure</h1>
                                                <VerticalProgressBar progress={30}>
                                                        <span className="text-black">30%</span>
                                                </VerticalProgressBar>
                                        </div>
                                        <div className="w-1/2 flex flex-col space-y-0 justify-between items-center my-1 mx-2">
                                                <h1 className='text-white'>Flow</h1>
                                                <VerticalProgressBar progress={50}>
                                                        <span className="text-black">75%</span>
                                                </VerticalProgressBar>
                                        </div>
                                        <div className="w-1/2 flex flex-col space-y-0 justify-between items-center my-1 mx-2">
                                                <h1 className='text-white'>Level</h1>
                                                <VerticalProgressBar progress={30}>
                                                        <span className="text-black">30%</span>
                                                </VerticalProgressBar>
                                        </div>
                                </div>
                        </div>



                </div>
        </div>
}

export default MainScreen;