import { Button, Navbar, Dropdown, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback } from 'preact/hooks';
import '../styles.css';

const Basic = () => {
  const navigate = useNavigate();
  const [showKeypad, setShowKeypad] = useState(false);
  const [value, setValue] = useState(0);

  const menus = useMemo(() =>[
    {
            "id": "0",
            "name": "System powerup delay",
            "value": "3",
            "multiple": [], 
            "editable": true,
            "units": "secs",
            "type": "number",
            "range" : {
              "min": 100,
              "max": 1000000,                          
            }
    },
    {
            "id": "1",
            "name": "Number of pumps",
            "value": "4",
            "multiple": [],
            "editable": true, 
            "units": null,
            "type": "number",
            "range" : {
              "min": 0,
              "max": 10,                          
            }
    }, 
    {
            "id": "2",
            "name": "Pump Limit",
            "value": "12",
            "multiple": [],
            "editable": true, 
            "units": null,
            "type": "number",
            "range" : {
              "min": 0,
              "max": 10,                        
            }
    },
    {
            "id": "3",
            "name": "System type",
            "value": "",
            multiple: [],
            /* "multiple": [
                    {
                            "id": "0",
                            "name": "Pressure",
                            "value": "Pressure"
                    },
                    {
                            "id": "1",
                            "name": "Blower",
                            "value": "Blower"
                    },
                    {
                            "id": "2",
                            "name": "High",
                            "value": "High"
                    }
            ], */
            "range": null, 
            "editable": false,  
            "units": null,
            "type": "string"
    },
    {
            "id": "4",
            "name": "Pump select mode",
            "value": "",
            "multiple": [
                    {
                            "id": "0",
                            "name": "Pressure",
                            "value": "Pressure"
                    },
                    {
                            "id": "1",
                            "name": "Blower",
                            "value": "Blower"
                    },
                    {
                            "id": "2",
                            "name": "High",
                            "value": "High"
                    }
            ],
            "range" : null,
            "editable": false,
            "units": null,
            "type": "string"
    },
    {
            "id": "5",
            "name": "Duty change period",
            "value": "60",
            "multiple": [],
            "editable": true, 
            "units": "Mins",
            "type": "number",
            "range" : {
              "min": 1,
              "max": 100,                          
            }
    },
    {
            "id": "6",
            "name": "Bumpless transfer delay",
            "value": "0",
            "multiple": [],                        
            "editable": true,
            "units": "secs",
            type: "number",
            "range" : {
              "min": 0,
              "max": 100                          
            }
    },
    {
            "id": "7",
            "name": "Drive model",
            "value": "0",
            "multiple": [],
            "editable": true,
            "units": "secs",
            "type": "number",
            "range" : {
              "min": 0,
              "max": 100
            }
    },
    {
            "id": "8",
            "name": "Manual Lockout Override Period",
            "value": 0,
            "multiple": [],
            "editable": true,
            "units": null,
            "type": "boolean",
            "range" : {
              "min": "Disabled",
              "max": "Enabled"

            }
    },
    {
            "id": "9",
            "name": "Manual Lockout Override Period",
            "value": 0,
            "multiple": [],
            "editable": true,
            "units": null,
            "type": "boolean",
            "range" : {
              "min": "Disabled",
              "max": "Enabled"

            }
    },
    {
            "id": "10",
            "name": "Manual Lockout Override Period",
            "value": 0,
            "multiple": [],
            "editable": true,
            "units": null,
            "type": "boolean",
            "range" : {
              "min": "Disabled",
              "max": "Enabled"

            }
    },
   
], []);

const toggleKeypad = useCallback((event) => {
  console.log("Passed value is ", event);
  const { selected } = event
  console.log(selected); // You can use these parameters as needed
  //setShowKeypad((prev) => !prev);
  setShowKeypad((prev) =>{
    return{
      ...prev,
      selected: selected,
      show: !prev.show
    }
  })
}, []);

  const handleSetValue = useCallback((newValue) => {
    console.log("Set is pressed");
    setValue(newValue);
    setShowKeypad(false); // Close keypad after setting value
  }, []);

  const handleInputChange = useCallback((event) => {
    const value = parseInt(event.target.value, 10); // Convert input to an integer
    setValue(isNaN(value) ? 0 : value); // Update value, setting to 0 if input is empty or invalid
  }, []);

   const handleButtonClick = useCallback((buttonValue) => {
    setValue((prevValue) => {
      if (buttonValue === 'Del') {
        return prevValue.slice(0, -1);
      }
      return prevValue + buttonValue;
    });
  }, []);

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Basic Settings</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button
            color="grey"
            onClick={() => {
              navigate("/");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </Button>
          <Navbar.Toggle />
        </div>
      </Navbar>

      <div className="columns-1 mx-4">
        {menus.map((menu, index) => (
          <div key={index} className="flex flex-row justify-between justify-items-center py-2">
            <h2>{`${index} : ${menu.name}`}</h2>
            {(index % 2 == 0 )? (
              <p onClick={(event, index) => toggleKeypad({event, selected: menu})}>{menu.value}</p>
            ): (              
              <p onClick={(event, index) => toggleKeypad({event, selected: menu})}>{menu.value}</p>
            )}
          </div>
        ))}
      </div>

      <Modal show={showKeypad.show} onClose={toggleKeypad}>
        <Modal.Header>  <Modal show={showKeypad.show} onClose={toggleKeypad}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
        <div className="space-y-4">
      <div className="space-y-0">
        <div className="flex flex-row justify-between items-center py-2">
          <p>Current Value</p>
          <p>100</p>
        </div>
        <div className="flex flex-row justify-between items-center py-2">
          <p>New Value</p>
          <input
            onChange={handleInputChange}
            type="number"
            className="input-custom"
            value={value}
            placeholder="Tap button to open keypad"
          />
        </div>
        <div className="flex flex-row justify-between items-center py-2">
          <p>Min</p>
          <p>100</p>
        </div>
        <div className="flex flex-row justify-between items-center py-2">
          <p>Max</p>
          <p>100</p>
        </div>
        <div className="flex flex-row justify-between items-center py-2">
          <p>Unit</p>
          <p>100</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Del'].map((buttonValue) => (
                <button
                  key={buttonValue}
                  className="bg-gray-200 p-4 rounded"
                  onClick={() => handleButtonClick(buttonValue)}
                >
                  {buttonValue}
                </button>
              ))}
            </div>
    
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleKeypad}>I accept</Button>
          <Button color="gray" onClick={toggleKeypad}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>Terms of Service</Modal.Header>
        <Modal.Body>
        <div className="space-y-0">
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>Current Value</p>
               <p>100</p>
             </div>
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>New Value</p>
               <input
                 onChange={handleInputChange}
                 type="number"
                 className="input-custom"
                 value={value}
                 placeholder="Tap button to open keypad"
               />
             </div>
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>Min</p>
               <p>100</p>
             </div>
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>Max</p>
               <p>100</p>
             </div>
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>Unit</p>
               <p>100</p>
             </div>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleKeypad}>I accept</Button>
          <Button color="gray" onClick={toggleKeypad}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {showKeypad?.show && (
       <div className="modal-overlay-custom">
       <div className="modal-container-custom">
         <div className="modal-header-custom">
           <h3 className="modal-title-custom">{showKeypad?.selected?.name}</h3>
           <button onClick={toggleKeypad} className="modal-close">
             &times;
           </button>
         </div>
         <div className="modal-body-custom">
           <div className="space-y-0">
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>Current Value</p>
               <p>100</p>
             </div>
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>New Value</p>
               <input
                 onChange={handleInputChange}
                 type="number"
                 className="input-custom"
                 value={value}
                 placeholder="Tap button to open keypad"
               />
             </div>
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>Min</p>
               <p>100</p>
             </div>
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>Max</p>
               <p>100</p>
             </div>
             <div className="flex flex-row justify-between justify-items-center py-2">
               <p>Unit</p>
               <p>100</p>
             </div>
           </div>
         </div>
         <div className="modal-footer-custom">
           <button onClick={toggleKeypad} className="button-custom button-gray-custom">
             Cancel
           </button>
           <button onClick={toggleKeypad} className="button-custom button-blue-custom">
             Apply
           </button>
         </div>
       </div>
     </div>
      )} */}
    </>
  );
};

export default Basic;