
import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Parameters = () => {

        const navigate = useNavigate()

        const menus = [
                "Basic Settings",
                "Advanced Settings",
                "Pump Settings",
                "Controller Settings",
                "Blower Settings",
                "Valve Settings",
                "Alarm Settings",
                "Logging Settings",
                "Plot Settings",
                "User Settings",
                "System Settings",
                "Network Settings",
                "Security Settings",
        ]

        return (
                <>
                        <Navbar fluid rounded>
                                <Navbar.Brand href="https://flowbite-react.com">
                                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Parameters</span>
                                </Navbar.Brand>
                                <div className="flex md:order-2">
                                        <Button
                                                color="grey"
                                                onClick={() => {
                                                        navigate("/");
                                                }}                        >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                                </svg>

                                        </Button>

                                        <Navbar.Toggle />
                                </div>

                        </Navbar>

                        <div class="columns-2 mx-4">
                                {menus.map((menu, index) => (
                                        <div className="flex flex-row justify-between items-center" >

                                                <h2 key={index}>{`${index} : ${menu}`}</h2>
                                                <Button
                                                        key={menu}
                                                        color="grey"
                                                        onClick={() => {
                                                                if(menu === 'Advanced Settings') {
                                                                        navigate(`/settings`);
                                                                }else{
                                                                        navigate(`/basic`);
                                                                }
                                                             
                                                        }}
                                                >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                                        </svg>

                                                </Button>
                                        </div>


                                ))}
                        </div>
                        {/* <div className="container mx-auto p-4 flex flex-col items-center">
                <div className="grid grid-cols-3 gap-4 max-w-xs">
                        {menus.map((menu) => (
                                <Button
                                        key={menu}
                                        color="grey"
                                        onClick={() => {
                                                navigate(`/${menu}`);
                                        }}
                                >
                                        {menu}
                                </Button>
                        ))}
                </div>
                </div> */}


                </>
        );
}

export default Parameters;