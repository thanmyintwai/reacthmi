import { useState, useEffect, useCallback, useMemo } from 'preact/hooks'
import { Button, Card, Navbar, Checkbox, Label, Radio } from "flowbite-react";
import { HiOutlineArrowRight, HiOutlineArrowLeft, HiOutlineArrowDown, HiOutlineArrowUp, HiHome } from "react-icons/hi";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineSettings } from "react-icons/md";

import axios from 'axios';


const getFormData = async () => {
  return {};
  try {

    const url = 'http://10.0.0.11:3001/form'
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log("Error", err);
    return {}
  }

}

export default function Home() {


  const navigate = useNavigate();


   const schemaTEst = {    
      "title": "APC9",
      "description": "APC9 v2.03",
      "version": "2.03",
      "type": "object",
      "definitions": {
        "SYSTEM_STATE": {
          "type": "integer",
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ],
          "enumNames": [
            "DISABLED",
            "INITIALISATION",
            "INITIAL STATE",
            "NORMAL MODE",
            "LOCKOUT",
            "FACTORY MODE",
            "RESET",
            "PC CONNECT MODE"
          ]
        },
        "INPUT_STATES": {
          "uniqueItems": true,
          "items": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ],
            "enumNames": [
              "Input 1",
              "Input 2",
              "Input 3",
              "Input 4",
              "Input 5",
              "Input 6",
              "Input 7",
              "Input 8"
            ]
          }
        },
        "MODE_SW_STATES": {
          "uniqueItems": true,
          "items": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7
            ],
            "enumNames": [
              "Mode 1",
              "Mode 2",
              "Mode 3",
              "Mode 4",
              "Mode 5",
              "Mode 6",
              "Mode 7",
              "Mode 8"
            ]
          }
        },
        "DUTY_PUMP": {
          "type": "integer",
          "enum": [
            1,
            2
          ],
          "enumNames": [
            "Pump 1",
            "Pump 2"
          ]
        },
        "PUMP_STATE": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "enumNames": [
            "Pump off",
            "Pump on"
          ]
        },
        "PUMP_ALARMS": {
          "uniqueItems": true,
          "items": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "enumNames": [
              "Overload",
              "Prime loss",
              "Max Run",
              "Under current",
              "Input fault",
              "Zero Current"
            ]
          }
        },
        "ALARMS": {
          "uniqueItems": true,
          "items": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ],
            "enumNames": [
              "Alarm output",
              "Low pressure",
              "High level",
              "Low level",
              "Load settings fail",
              "Pump Contact",
              "Conductivity Input",
              "Pump 1 lockout",
              "Pump 2 lockout",
              "Pump 1 alarm",
              "Pump 2 alarm",
              "System Lockout"
            ]
          }
        },
        "SILENT_ALARMS": {
          "uniqueItems": true,
          "items": {
            "type": "integer",
            "enum": [
              0
            ],
            "enumNames": [
              "Service alarm"
            ]
          }
        },
        "SCADA_COMMS_ERROR": {
          "type": "integer",
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            65535
          ],
          "enumNames": [
            "NO_ERROR",
            "UART_ERROR",
            "RX_TIMING_ERROR",
            "RX_OVERFLOW_ERROR",
            "CRC_ERROR",
            "INCORRECT_SLAVE_ERROR",
            "ILLEGAL_FUNCTION_ERROR",
            "ILLEGAL_DATA_ADDR_ERROR",
            "ILLEGAL_DATA_VALUE_ERROR",
            "SLAVE_DEVICE_FAILURE_ERROR",
            "UNKNOWN_EXCEPTION_ERROR",
            "RESPONSE_TIMEOUT_ERROR",
            "BAD_RESPONSE_ERROR",
            "COMMS_ERROR_END",
            "ERROR_SHORT"
          ]
        },
        "CT_ASSIGN": {
          "type": "integer",
          "enum": [
            0,
            1,
            2,
            3,
            4
          ],
          "enumNames": [
            "Unassigned",
            "CT 1",
            "CT 2",
            "CT 3",
            "CT 4"
          ]
        },
        "PUMP_MODE": {
          "type": "integer",
          "enum": [
            0,
            1,
            2
          ],
          "enumNames": [
            "OFF",
            "MANUAL",
            "AUTO"
          ]
        },
        "PHASE_MODE": {
          "type": "integer",
          "enum": [
            0,
            1,
            2
          ],
          "enumNames": [
            "UNASSIGNED",
            "SINGLE PHASE",
            "THREE PHASE"
          ]
        },
        "CONTROL_DIR": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "enumNames": [
            "EMPTY",
            "FILL"
          ]
        },
        "FAULT_RELAY_DIR": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "enumNames": [
            "NORMAL OPEN",
            "NORMAL CLOSE"
          ]
        },
        "INPUT_ASSIGN": {
          "type": "integer",
          "enum": [
            0,
            6,
            7,
            8
          ],
          "enumNames": [
            "UNASSIGNED",
            "INPUT 6",
            "INPUT 7",
            "INPUT 8"
          ]
        },
        "INPUT_FUNCTION": {
          "type": "integer",
          "enum": [
            0,
            1,
            2,
            3
          ],
          "enumNames": [
            "DISABLED",
            "INDICATION_ONLY",
            "CONTROL_ONLY",
            "INDICATION_AND_CONTROL"
          ]
        },
        "BMS_OUTPUT_ASSIGN": {
          "type": "integer",
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38
          ],
          "enumNames": [
            "UNASSIGNED",
            "POWER_ON",
            "PUMP_1_OVERLOAD_FAULT",
            "PUMP_1_INPUT_FAULT",
            "PUMP_1_PRIME_LOSS_FAULT",
            "PUMP_1_MAX_RUN_FAULT",
            "PUMP_1_UNDERCURRENT_FAULT",
            "PUMP_1_ZEROCURRENT_FAULT",
            "PUMP_2_OVERLOAD_FAULT",
            "PUMP_2_INPUT_FAULT",
            "PUMP_2_PRIME_LOSS_FAULT",
            "PUMP_2_MAX_RUN_FAULT",
            "PUMP_2_UNDERCURRENT_FAULT",
            "PUMP_2_ZEROCURRENT_FAULT",
            "ALARM_FAULT",
            "OUTPUT_LOW_PRESSURE_FAULT",
            "HIGH_LEVEL_FAULT",
            "LOW_LEVEL_FAULT",
            "SETTINGS_FAIL_FAULT",
            "CONTACT_FAULT",
            "OUTPUT_CONDUCTIVITY_INPUT_FAULT",
            "PUMP_1_LOCKOUT",
            "PUMP_2_LOCKOUT",
            "PUMP_1_FAULT",
            "PUMP_2_FAULT",
            "SYSTEM_LOCKOUT",
            "SERVICE_ALARM",
            "PUMP_1_RUN",
            "PUMP_2_RUN",
            "SIREN",
            "STROBE",
            "INPUT_1",
            "INPUT_2",
            "INPUT_3",
            "INPUT_4",
            "INPUT_5",
            "INPUT_6",
            "INPUT_7",
            "INPUT_8"
          ]
        },
        "BMS_RELAY_DIRECTION": {
          "uniqueItems": true,
          "items": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3,
              4,
              5,
              6
            ],
            "enumNames": [
              "BMS_OUT_1_DIR",
              "BMS_OUT_2_DIR",
              "BMS_OUT_3_DIR",
              "BMS_OUT_4_DIR",
              "BMS_OUT_5_DIR",
              "BMS_OUT_6_DIR",
              "BMS_OUT_7_DIR"
            ]
          }
        },
        "BAUD_RATE": {
          "type": "integer",
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5
          ],
          "enumNames": [
            "9600bps",
            "19200bps",
            "38400bps",
            "57600bps",
            "76800bps",
            "115200bps"
          ]
        },
        "UART_FORMAT": {
          "type": "integer",
          "enum": [
            0,
            1,
            2,
            3
          ],
          "enumNames": [
            "10 bit frame (1 start + 8 Data + 1 Stop bits)",
            "11 bit frame (1 start + 8 Data + 2 Stop bits)",
            "11 bit frame (1 start + 8 Data + 1 parity(even) + 1 Stop bits)",
            "11 bit frame (1 start + 8 Data + 1 parity (odd) + 1 Stop bits)"
          ]
        }
      },
      "properties": {
      /*   "system": {
          "title": "System Information",
          "type": "object",
          "readOnly": false,
          "backup": true,
          "group": "System",
          "properties": {
            "projectName": {
              "type": "string",
              "title": "Product"
            },
            "serial": {
              "type": "string",
              "title": "Serial Number"
            },
            "firmware": {
              "type": "string",
              "title": "Firmware Revision"
            },
            "connection": {
              "type": "string",
              "title": "Connected to"
            },
            "ipAddr": {
              "type": "string",
              "title": "IP Address"
            },
            "url": {
              "type": "string",
              "title": "URL"
            }
          }
        }, */
        "status": {
          "title": "HydroSTART Status",
          "type": "object",
          "readOnly": false,
          "backup": true,
          "group": "Controller",
          "properties": {
            "product_code": {
              "title": "0.1 - Product Code",
              "register": 1,
              "type": "string",
              "maxLength": 6,
              "description": "Controller product code/identification string packed as two ASCII characters per register. Starts from the upper byte. Value spells APC8."
            },
            "pic_current_fw_version": {
              "title": "0.4 - Pic Current Fw Version",
              "register": 4,
              "type": "string",
              "maxLength": 4,
              "description": "Firmware revision major number.Revision is in the form x.yy where x is the major number and y is the minor number."
            },
            "power_rail_ok": {
              "title": "0.6 - Power Rail Ok",
              "register": 6,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "A value of 1 indicates 12V power rail is within specifications."
            },
            "system_state": {
              "title": "1.0 - System State",
              "register": 10,
              "type": "integer",
              "$ref": "#/definitions/SYSTEM_STATE",
              "description": "Current operating state of the system."
            },
            "input_states": {
              "title": "1.1 - Input States",
              "register": 11,
              "type": "array",
              "$ref": "#/definitions/INPUT_STATES",
              "description": "Current state of the discrete inputs."
            },
            "mode_switches": {
              "title": "1.2 - Mode Switches",
              "register": 12,
              "type": "array",
              "$ref": "#/definitions/MODE_SW_STATES",
              "description": "Current state of the mode switches."
            },
            "duty_pump": {
              "title": "1.3 - Duty Pump",
              "register": 13,
              "type": "integer",
              "$ref": "#/definitions/DUTY_PUMP",
              "description": "Indicates which pump is currently the duty pump."
            },
            "pump_1_state": {
              "title": "1.4 - Pump 1 State",
              "register": 14,
              "type": "integer",
              "$ref": "#/definitions/PUMP_STATE",
              "description": "Current state of pump 1."
            },
            "pump_2_state": {
              "title": "1.5 - Pump 2 State",
              "register": 15,
              "type": "integer",
              "$ref": "#/definitions/PUMP_STATE",
              "description": "Current state of pump 2."
            },
            "pump_1_CT_assigned": {
              "title": "1.6 - Pump 1 Ct Assigned",
              "register": 16,
              "type": "boolean",
              "description": "A value of 1 indicates that current transformers(s) have been successfully assigned for Pump 1."
            },
            "pump_2_CT_assigned": {
              "title": "1.7 - Pump 2 Ct Assigned",
              "register": 17,
              "type": "boolean",
              "description": "A value of 1 indicates that current transformers(s) have been successfully assigned for Pump 2."
            },
            "conductivity_input_states": {
              "title": "1.8 - Conductivity Input States",
              "register": 18,
              "type": "array",
              "$ref": "#/definitions/INPUT_STATES",
              "description": "Current state of the conductivity probe inputs (if connected)."
            },
            "pump_1_alarms": {
              "title": "2.0 - Pump 1 Alarms",
              "register": 20,
              "type": "array",
              "$ref": "#/definitions/PUMP_ALARMS",
              "description": "Current pump 1 alarms."
            },
            "pump_2_alarms": {
              "title": "2.1 - Pump 2 Alarms",
              "register": 21,
              "type": "array",
              "$ref": "#/definitions/PUMP_ALARMS",
              "description": "Current pump 2 alarms."
            },
            "alarms": {
              "title": "2.2 - Alarms",
              "register": 22,
              "type": "array",
              "$ref": "#/definitions/ALARMS",
              "description": "Current system alarm states."
            },
            "last_alarms": {
              "title": "2.3 - Last Alarms",
              "register": 23,
              "type": "array",
              "$ref": "#/definitions/ALARMS",
              "description": "Previous system alarm states."
            },
            "silent_alarms": {
              "title": "2.4 - Silent Alarms",
              "register": 24,
              "type": "array",
              "$ref": "#/definitions/SILENT_ALARMS",
              "description": "Silent alarm states."
            },
            "SCADA_comms_error": {
              "title": "2.5 - Scada Comms Error",
              "register": 25,
              "type": "integer",
              "$ref": "#/definitions/SCADA_COMMS_ERROR",
              "description": "This shows the previous SCADA comms error to occur. It resets to NO ERROR after 60 seconds."
            },
            "SCADA_framing_error_counter": {
              "title": "2.6 - Scada Framing Error Counter",
              "register": 26,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "A count of the number of framing errors the SCADA comms has detected since last power cycle."
            },
            "SCADA_CRC_error_counter": {
              "title": "2.7 - Scada Crc Error Counter",
              "register": 27,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "A count of the number of Modbus CRC errors the SCADA comms has detected since last power cycle."
            },
            "total_modbus_packets_rcvd": {
              "title": "2.8 - Total Modbus Packets Rcvd",
              "register": 28,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "A count of the number of valid Modbus packets received since last power cycle. Note that this number will overflow to 0."
            },
            "pump1_overload_setting": {
              "title": "3.0 - Pump1 Overload Setting [Amps]",
              "register": 30,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "Current overload setting for pump 1."
            },
            "pump2_overload_setting": {
              "title": "3.1 - Pump2 Overload Setting [Amps]",
              "register": 31,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "Current overload setting for pump 2."
            },
            "pump1_current": {
              "title": "3.2 - Pump1 Current [Amps]",
              "register": 32,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "Pump 1 current reading."
            },
            "pump2_current": {
              "title": "3.3 - Pump2 Current [Amps]",
              "register": 33,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "Pump 2 current reading."
            },
            "ct1_current": {
              "title": "3.4 - Ct1 Current [Amps]",
              "register": 34,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "Ct 1 current reading."
            },
            "ct2_current": {
              "title": "3.5 - Ct2 Current [Amps]",
              "register": 35,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "Ct 2 current reading."
            },
            "ct3_current": {
              "title": "3.6 - Ct3 Current [Amps]",
              "register": 36,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "Ct 3 current reading."
            },
            "ct4_current": {
              "title": "3.7 - Ct4 Current [Amps]",
              "register": 37,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "Ct 4 current reading."
            },
            "channel_1_zero_reference": {
              "title": "3.8 - Channel 1 Zero Reference",
              "register": 38,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "The ideal zero reference value with zero noise is 2048. Due to the DC offset the zero reference value is shifted from this ideal value."
            },
            "channel_2_zero_reference": {
              "title": "3.9 - Channel 2 Zero Reference",
              "register": 39,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "The ideal zero reference value with zero noise is 2048. Due to the DC offset the zero reference value is shifted from this ideal value."
            },
            "channel_3_zero_reference": {
              "title": "4.0 - Channel 3 Zero Reference",
              "register": 40,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "The ideal zero reference value with zero noise is 2048. Due to the DC offset the zero reference value is shifted from this ideal value."
            },
            "channel_4_zero_reference": {
              "title": "4.1 - Channel 4 Zero Reference",
              "register": 41,
              "type": "integer",
              "minimum": 0,
              "maximum": 65535,
              "description": "The ideal zero reference value with zero noise is 2048. Due to the DC offset the zero reference value is shifted from this ideal value."
            },
            "pump_1_phase_1_CT_assigned": {
              "title": "4.2 - Pump 1 Phase 1 Ct Assigned",
              "register": 42,
              "type": "integer",
              "$ref": "#/definitions/CT_ASSIGN",
              "description": "The CT's for the pumps can be assigned in random order. This field indicates the CT of the pump 1 phase 1"
            },
            "pump_1_phase_2_CT_assigned": {
              "title": "4.3 - Pump 1 Phase 2 Ct Assigned",
              "register": 43,
              "type": "integer",
              "$ref": "#/definitions/CT_ASSIGN",
              "description": "The CT's for the pumps can be assigned in random order. This field indicates the CT of the pump 1 phase 2"
            },
            "pump_2_phase_1_CT_assigned": {
              "title": "4.4 - Pump 2 Phase 1 Ct Assigned",
              "register": 44,
              "type": "integer",
              "$ref": "#/definitions/CT_ASSIGN",
              "description": "The CT's for the pumps can be assigned in random order. This field indicates the CT of the pump 2 phase 1"
            },
            "pump_2_phase_2_CT_assigned": {
              "title": "4.5 - Pump 2 Phase 2 Ct Assigned",
              "register": 45,
              "type": "integer",
              "$ref": "#/definitions/CT_ASSIGN",
              "description": "The CT's for the pumps can be assigned in random order. This field indicates the CT of the pump 2 phase 2"
            }
          },
          "definitions": {
            "SYSTEM_STATE": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7
              ],
              "enumNames": [
                "DISABLED",
                "INITIALISATION",
                "INITIAL STATE",
                "NORMAL MODE",
                "LOCKOUT",
                "FACTORY MODE",
                "RESET",
                "PC CONNECT MODE"
              ]
            },
            "INPUT_STATES": {
              "uniqueItems": true,
              "items": {
                "type": "integer",
                "enum": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7
                ],
                "enumNames": [
                  "Input 1",
                  "Input 2",
                  "Input 3",
                  "Input 4",
                  "Input 5",
                  "Input 6",
                  "Input 7",
                  "Input 8"
                ]
              }
            },
            "MODE_SW_STATES": {
              "uniqueItems": true,
              "items": {
                "type": "integer",
                "enum": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7
                ],
                "enumNames": [
                  "Mode 1",
                  "Mode 2",
                  "Mode 3",
                  "Mode 4",
                  "Mode 5",
                  "Mode 6",
                  "Mode 7",
                  "Mode 8"
                ]
              }
            },
            "DUTY_PUMP": {
              "type": "integer",
              "enum": [
                1,
                2
              ],
              "enumNames": [
                "Pump 1",
                "Pump 2"
              ]
            },
            "PUMP_STATE": {
              "type": "integer",
              "enum": [
                0,
                1
              ],
              "enumNames": [
                "Pump off",
                "Pump on"
              ]
            },
            "PUMP_ALARMS": {
              "uniqueItems": true,
              "items": {
                "type": "integer",
                "enum": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  5
                ],
                "enumNames": [
                  "Overload",
                  "Prime loss",
                  "Max Run",
                  "Under current",
                  "Input fault",
                  "Zero Current"
                ]
              }
            },
            "ALARMS": {
              "uniqueItems": true,
              "items": {
                "type": "integer",
                "enum": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11
                ],
                "enumNames": [
                  "Alarm output",
                  "Low pressure",
                  "High level",
                  "Low level",
                  "Load settings fail",
                  "Pump Contact",
                  "Conductivity Input",
                  "Pump 1 lockout",
                  "Pump 2 lockout",
                  "Pump 1 alarm",
                  "Pump 2 alarm",
                  "System Lockout"
                ]
              }
            },
            "SILENT_ALARMS": {
              "uniqueItems": true,
              "items": {
                "type": "integer",
                "enum": [
                  0
                ],
                "enumNames": [
                  "Service alarm"
                ]
              }
            },
            "SCADA_COMMS_ERROR": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                65535
              ],
              "enumNames": [
                "NO_ERROR",
                "UART_ERROR",
                "RX_TIMING_ERROR",
                "RX_OVERFLOW_ERROR",
                "CRC_ERROR",
                "INCORRECT_SLAVE_ERROR",
                "ILLEGAL_FUNCTION_ERROR",
                "ILLEGAL_DATA_ADDR_ERROR",
                "ILLEGAL_DATA_VALUE_ERROR",
                "SLAVE_DEVICE_FAILURE_ERROR",
                "UNKNOWN_EXCEPTION_ERROR",
                "RESPONSE_TIMEOUT_ERROR",
                "BAD_RESPONSE_ERROR",
                "COMMS_ERROR_END",
                "ERROR_SHORT"
              ]
            },
            "CT_ASSIGN": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4
              ],
              "enumNames": [
                "Unassigned",
                "CT 1",
                "CT 2",
                "CT 3",
                "CT 4"
              ]
            }
          }
        },
        /* "testSettings": {
          "title": "HydroSTART Test Settings",
          "type": "object",
          "backup": true,
          "group": "Controller",
          "submit": "Settings applied temporarily. To save permanently, open the menu at the top right, then select Save Settings.",
          "properties": {
            "mode": {
              "title": "Mode Settings",
              "type": "object",
              "properties": {
                "pump_1_mode": {
                  "title": "5.0 - Pump 1 Mode",
                  "register": 50,
                  "type": "integer",
                  "$ref": "#/definitions/PUMP_MODE",
                  "description": "Operating mode setting for Pump 1. This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
                },
                "pump_2_mode": {
                  "title": "5.1 - Pump 2 Mode",
                  "register": 51,
                  "type": "integer",
                  "$ref": "#/definitions/PUMP_MODE",
                  "description": "Operating mode setting for Pump 2. This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
                },
                "phase_mode": {
                  "title": "5.2 - Phase Mode",
                  "register": 52,
                  "type": "integer",
                  "$ref": "#/definitions/PHASE_MODE",
                  "description": "Indicates the number of phases the system is operating with. This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
                }
              }
            },
            "inputs": {
              "title": "Input Settings",
              "type": "object",
              "properties": {
                "input_1_function": {
                  "title": "11.4 - Input 1 Function",
                  "register": 114,
                  "type": "integer",
                  "$ref": "#/definitions/INPUT_FUNCTION",
                  "description": "This digital input is used for operating pumps and LEDs (INDICATION_AND_CONTROL). One or more of these functions can be disabled using this parameter."
                },
                "input_2_function": {
                  "title": "11.5 - Input 2 Function",
                  "register": 115,
                  "type": "integer",
                  "$ref": "#/definitions/INPUT_FUNCTION",
                  "description": "This digital input is used for operating pumps and LEDs (INDICATION_AND_CONTROL). One or more of these functions can be disabled using this parameter."
                },
                "conductivity_input_en": {
                  "title": "16.0 - Conductivity Input En",
                  "register": 160,
                  "type": "boolean"
                }
              }
            },
            "relays": {
              "title": "Relay Settings",
              "type": "object",
              "properties": {
                "BMS_relay_1": {
                  "title": "16.1 - Bms Relay 1",
                  "register": 161,
                  "type": "integer",
                  "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
                },
                "BMS_relay_2": {
                  "title": "16.2 - Bms Relay 2",
                  "register": 162,
                  "type": "integer",
                  "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
                },
                "BMS_relay_direction": {
                  "title": "16.8 - Bms Relay Direction",
                  "register": 168,
                  "type": "array",
                  "$ref": "#/definitions/BMS_RELAY_DIRECTION",
                  "description": "Default state of Relay is Normally Open. Setting each bit to 1 indicates sets the corresponding output direction to Normally Closed."
                }
              }
            },
            "SCADA": {
              "title": "SCADA Settings",
              "type": "object",
              "properties": {
                "sub_scada": {
                  "title": "Sub SCADA Settings",
                  "type": "object",
                  "properties": {
                    "sub_scada_ip": {
                      "title": "17.0 - Sub Scada IP",
                      "register": 170,
                      "type": "string",
                      "format": "ipv4",
                    }
                  }
                },

                "SCADA_baud_rate": {
                  "title": "17.0 - Scada Baud Rate",
                  "register": 170,
                  "type": "integer",
                  "$ref": "#/definitions/BAUD_RATE",
                  "description": "Baud rate used for the Modbus communication."
                },
                "SCADA_parity": {
                  "title": "17.1 - Scada Parity",
                  "register": 171,
                  "type": "integer",
                  "$ref": "#/definitions/UART_FORMAT",
                  "description": "Parity and number of stop bits used for Modbus communication."
                }
              }
            },
            "SCADA1": {
              "title": "SCADA 1 Settings",
              "type": "object",
              "properties": {
                "sub_scada": {
                  "title": "Sub SCADA Settings",
                  "type": "object",
                  "properties": {
                    "sub_scada_ip": {
                      "title": "17.0 - Sub Scada IP",
                      "register": 170,
                      "type": "string",
                      "format": "ipv4",
                    }
                  }
                },

                "SCADA_baud_rate": {
                  "title": "17.0 - Scada Baud Rate",
                  "register": 170,
                  "type": "integer",
                  "$ref": "#/definitions/BAUD_RATE",
                  "description": "Baud rate used for the Modbus communication."
                },
                "SCADA_parity": {
                  "title": "17.1 - Scada Parity",
                  "register": 171,
                  "type": "integer",
                  "$ref": "#/definitions/UART_FORMAT",
                  "description": "Parity and number of stop bits used for Modbus communication."
                }
              }
            },
            "SCADA2": {
              "title": "SCADA 2 Settings",
              "type": "object",
              "properties": {
                "sub_scada": {
                  "title": "Sub SCADA Settings",
                  "type": "object",
                  "properties": {
                    "sub_scada_ip": {
                      "title": "17.0 - Sub Scada IP",
                      "register": 170,
                      "type": "string",
                      "format": "ipv4",
                    }
                  }
                },

                "SCADA_baud_rate": {
                  "title": "17.0 - Scada Baud Rate",
                  "register": 170,
                  "type": "integer",
                  "$ref": "#/definitions/BAUD_RATE",
                  "description": "Baud rate used for the Modbus communication."
                },
                "SCADA_parity": {
                  "title": "17.1 - Scada Parity",
                  "register": 171,
                  "type": "integer",
                  "$ref": "#/definitions/UART_FORMAT",
                  "description": "Parity and number of stop bits used for Modbus communication."
                }
              }
            },
           "pump_1_mode": {
                  "title": "5.0 - Pump 1 Mode",
                  "register": 50,
                  "type": "integer",
                  "$ref": "#/definitions/PUMP_MODE",
                  "description": "Operating mode setting for Pump 1. This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
                },
                "pump_2_mode": {
                  "title": "5.1 - Pump 2 Mode",
                  "register": 51,
                  "type": "integer",
                  "$ref": "#/definitions/PUMP_MODE",
                  "description": "Operating mode setting for Pump 2. This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
                },
                "phase_mode": {
                  "title": "5.2 - Phase Mode",
                  "register": 52,
                  "type": "integer",
                  "$ref": "#/definitions/PHASE_MODE",
                  "description": "Indicates the number of phases the system is operating with. This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
                }
          }
        }, */
        "settings": {
        "title": "HydroSTART Settings",
        "type": "object",
        "backup": true,
        "group": "Controller",
        "submit": "Settings applied temporarily. To save permanently, open the menu at the top right, then select Save Settings.",
        "properties": {
          "pump_1_mode": {
            "title": "5.0 - Pump 1 Mode",
            "register": 50,
            "type": "integer",
            "$ref": "#/definitions/PUMP_MODE",
            "description": "Operating mode setting for Pump 1.  This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
          },
          "pump_2_mode": {
            "title": "5.1 - Pump 2 Mode",
            "register": 51,
            "type": "integer",
            "$ref": "#/definitions/PUMP_MODE",
            "description": "Operating mode setting for Pump 2.   This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
          },
          "phase_mode": {
            "title": "5.2 - Phase Mode",
            "register": 52,
            "type": "integer",
            "$ref": "#/definitions/PHASE_MODE",
            "description": "Indicates the number of phases the system is operating with.  This is an automatic setting and will be saved to EEPROM automatically whenever the value gets updated."
          },
          "single_pump_en": {
            "title": "5.3 - Single Pump En",
            "register": 53,
            "type": "boolean",
            "description": "If set then the system will operate in single pump mode. No duty change occurs and the pump 1 output remains off."
          },
          "pump_limiting_en": {
            "title": "5.4 - Pump Limiting En",
            "register": 54,
            "type": "boolean",
            "description": "If set then the system can run at most a single pump. Duty can still alternate between the two pumps."
          },
          "level_control_direction": {
            "title": "5.5 - Level Control Direction",
            "register": 55,
            "type": "integer",
            "$ref": "#/definitions/CONTROL_DIR",
            "description": "In level mode this setting determines whether the system is emptying or filling a tank."
          },
          "manual_timeout_period": {
            "title": "5.6 - Manual Timeout Period [Mins]",
            "register": 56,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "When a pump is set to manual mode it will revert to automatic mode after the delay specified by this setting. A value of 0 will disable the manual reset feature and the pump will remain in manual mode indefinitely."
          },
          "std_alternate_period": {
            "title": "5.7 - Std Alternate Period [Mins]",
            "register": 57,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "Duty pump alternates on every start or after std_alternate_period of continuous running."
          },
          "acc_alternate_period": {
            "title": "5.8 - Acc Alternate Period [Mins]",
            "register": 58,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "Duty pump alternates on every start or after acc_alternate_period of continuous running."
          },
          "antiseize_en": {
            "title": "6.0 - Antiseize En",
            "register": 60,
            "type": "boolean",
            "description": "If set the antiseize timer functionality will be enabled."
          },
          "antiseize_period": {
            "title": "6.1 - Antiseize Period [Hours]",
            "register": 61,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If a pump sits idle for antiseize_period hours the antiseize operation will be triggered."
          },
          "antiseize_run_time": {
            "title": "6.2 - Antiseize Run Time [Secs]",
            "register": 62,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If antiseize operation is triggered the corresponding pump will run for antiseize_run_time seconds."
          },
          "staggered_start_delay": {
            "title": "6.3 - Staggered Start Delay [Secs]",
            "register": 63,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter defines the minimum delay between starting of two pumps. This minimises stress on the incoming power supply due to pump starting current."
          },
          "max_idle_period": {
            "title": "6.4 - Max Idle Period [Mins]",
            "register": 64,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If a pump is idle for max_idle_period and stop input is closed the pump will run until stop input opens again."
          },
          "pressure_start_delay": {
            "title": "7.0 - Pressure Start Delay [Secs]",
            "register": 70,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "In pressure mode the pump start input should be active for default pressure_start_delay seconds before pump turns on."
          },
          "pressure_min_run": {
            "title": "7.1 - Pressure Min Run [Secs]",
            "register": 71,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "Once the pump start is activated the duty pump will run for at least the pressure minimum run time seconds regardless of the state of the duty start and duty stop inputs."
          },
          "pressure_alarm_delay": {
            "title": "7.2 - Pressure Alarm Delay [Secs]",
            "register": 72,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "low pressure alarm fault is set if the Low Pressure Input is closed for at least pressure_alarm_delay seconds."
          },
          "service_alarm_en": {
            "title": "8.0 - Service Alarm En",
            "register": 80,
            "type": "boolean",
            "description": "If set then service alarm functionality is enabled."
          },
          "service_alarm_period": {
            "title": "8.1 - Service Alarm Period [Days]",
            "register": 81,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If the service_alarm_period is expired and the pump is not serviced (i.e reset_service_alarm) the service alarm will be active."
          },
          "max_run_fault_delay": {
            "title": "8.2 - Max Run Fault Delay [Mins]",
            "register": 82,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If the max run fault is active for max_run_fault_delay seconds the max run fault will be activated."
          },
          "prime_fault_delay": {
            "title": "8.3 - Prime Fault Delay [Secs]",
            "register": 83,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If the prime loss fault is active for prime_fault_delay seconds the prime loss fault will be activated."
          },
          "high_level_fault_delay_stormwater": {
            "title": "8.4 - High Level Fault Delay Stormwater [Secs]",
            "register": 84,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If the mode 6 DIP switch is set to High Level Storm Water the high level alarm will be triggered if the high level input is active for high_level_fault_delay_stormwater seconds."
          },
          "high_level_fault_delay_normal": {
            "title": "8.5 - High Level Fault Delay Normal [Secs]",
            "register": 85,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If the mode 6 DIP switch is set to High Level Alarm Normal the high level alarm will be triggered if the high level input is active for high_level_fault_delay_normal seconds."
          },
          "low_level_fault_delay": {
            "title": "8.6 - Low Level Fault Delay [Secs]",
            "register": 86,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If the mode 2 DIP switch is set to Low level protection mode the low level fault will be triggered if the low level input is active for low_level_fault_delay seconds."
          },
          "under_current_fault_threshold": {
            "title": "9.0 - Under Current Fault Threshold [%]",
            "register": 90,
            "type": "integer",
            "minimum": 10,
            "maximum": 90,
            "description": "The current threshold (percentage of trimpot setting) below which under current fault will be activated. Note that DIP switch has to be ON to enable undercurrent protection."
          },
          "under_current_fault_delay": {
            "title": "9.1 - Under Current Fault Delay [Secs]",
            "register": 91,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "When the DIP switch 7 is ON the under current fault can be triggered if the current on the pump's CT inputs is between zero current and under current threshold for under_current_fault_delay secs."
          },
          "zero_current_fault_en": {
            "title": "9.2 - Zero Current Fault En",
            "register": 92,
            "type": "boolean",
            "description": "The zero current fault can be triggered by setting the DIP switch 7 to ON with this parameter value set to 1."
          },
          "zero_current_fault_delay": {
            "title": "9.3 - Zero Current Fault Delay [Secs]",
            "register": 93,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "The zero current fault will be triggered if there is zero current on of the pump's CT inputs for zero_current_fault_delay secs."
          },
          "pump_fault_input_delay": {
            "title": "9.4 - Pump Fault Input Delay [Secs]",
            "register": 94,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "The pump input fault will be set after the number of seconds specifid by this setting."
          },
          "pump_fault_input_auto_reset": {
            "title": "9.5 - Pump Fault Input Auto Reset",
            "register": 95,
            "type": "boolean",
            "description": "If set the Input pump fault will be cleared if there is no fault input on of the enabled inputs (of pump1_fault_in) OR if no inputs is assigned to it."
          },
          "fault_relay_direction": {
            "title": "9.6 - Fault Relay Direction",
            "register": 96,
            "type": "integer",
            "$ref": "#/definitions/FAULT_RELAY_DIR",
            "description": "In normal open mode the relay is in its normally open state and will close on fault whereas in normal close mode the relay is in its normally closed state and will open on fault."
          },
          "siren_chirp_en": {
            "title": "10.0 - Siren Chirp En",
            "register": 100,
            "type": "boolean",
            "description": "If set the siren chirp mode will be enabled."
          },
          "siren_chirp_delay": {
            "title": "10.1 - Siren Chirp Delay [Mins]",
            "register": 101,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "If siren_chirp_en is enabled the siren will change to chirp mode after staying in continuous siren mode for siren_chirp_delay mins."
          },
          "siren_chirp_period": {
            "title": "10.2 - Siren Chirp Period [Mins]",
            "register": 102,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "In chirp mode the siren will chirp for every siren_chirp_period mins."
          },
          "siren_chirp_time": {
            "title": "10.3 - Siren Chirp Time [Secs]",
            "register": 103,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "After siren is silent for siren_chirp_period mins the siren will be active for siren_chirp_time secs."
          },
          "ext_mute_reset_en": {
            "title": "10.4 - Ext Mute Reset En",
            "register": 104,
            "type": "boolean",
            "description": "If set all the faults will be reset when external mute button is held for more than 3 seconds. Note that this is different to the mute/reset button on the keypad."
          },
          "system_enable_in": {
            "title": "11.0 - System Enable In",
            "register": 110,
            "type": "integer",
            "$ref": "#/definitions/INPUT_ASSIGN",
            "description": "System functionality (managing pumps and faults) will be enabled if (the Input is not Assigned (0)) OR (if the Input is Assigned (67 or 8 inputs) and is set to 1)."
          },
          "external_mute_in": {
            "title": "11.1 - External Mute In",
            "register": 111,
            "type": "integer",
            "$ref": "#/definitions/INPUT_ASSIGN",
            "description": "External mute functionality will be enabled if one of the Inputs(67 or 8) is Assigned  to it."
          },
          "pump1_fault_in": {
            "title": "11.2 - Pump1 Fault In",
            "register": 112,
            "type": "integer",
            "$ref": "#/definitions/INPUT_ASSIGN",
            "description": "Pump 1 Input fault functionality will be enabled if one of the Inputs(67 or 8)  is Assigned to it."
          },
          "pump2_fault_in": {
            "title": "11.3 - Pump2 Fault In",
            "register": 113,
            "type": "integer",
            "$ref": "#/definitions/INPUT_ASSIGN",
            "description": "Pump 2 Input fault functionality will be enabled if one of the Inputs(67 or 8)  is Assigned to it."
          },
          "input_1_function": {
            "title": "11.4 - Input 1 Function",
            "register": 114,
            "type": "integer",
            "$ref": "#/definitions/INPUT_FUNCTION",
            "description": "This digital input is used for operating pumps and LEDs (INDICATION_AND_CONTROL). One or more of these functions can be disabled using this parameter."
          },
          "input_2_function": {
            "title": "11.5 - Input 2 Function",
            "register": 115,
            "type": "integer",
            "$ref": "#/definitions/INPUT_FUNCTION",
            "description": "This digital input is used for operating pumps and LEDs (INDICATION_AND_CONTROL). One or more of these functions can be disabled using this parameter."
          },
          "input_3_function": {
            "title": "11.6 - Input 3 Function",
            "register": 116,
            "type": "integer",
            "$ref": "#/definitions/INPUT_FUNCTION",
            "description": "This digital input is used for operating pumps and LEDs (INDICATION_AND_CONTROL). One or more of these functions can be disabled using this parameter."
          },
          "input_4_function": {
            "title": "11.7 - Input 4 Function",
            "register": 117,
            "type": "integer",
            "$ref": "#/definitions/INPUT_FUNCTION",
            "description": "This digital input is used for operating pumps and LEDs (INDICATION_AND_CONTROL). One or more of these functions can be disabled using this parameter."
          },
          "input_5_function": {
            "title": "11.8 - Input 5 Function",
            "register": 118,
            "type": "integer",
            "$ref": "#/definitions/INPUT_FUNCTION",
            "description": "This digital input is used for operating pumps and LEDs (INDICATION_AND_CONTROL). One or more of these functions can be disabled using this parameter."
          },
          "conductivity_input_en": {
            "title": "16.0 - Conductivity Input En",
            "register": 160,
            "type": "boolean"
          },
          "BMS_relay_1": {
            "title": "16.1 - Bms Relay 1",
            "register": 161,
            "type": "integer",
            "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
          },
          "BMS_relay_2": {
            "title": "16.2 - Bms Relay 2",
            "register": 162,
            "type": "integer",
            "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
          },
          "BMS_relay_3": {
            "title": "16.3 - Bms Relay 3",
            "register": 163,
            "type": "integer",
            "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
          },
          "BMS_relay_4": {
            "title": "16.4 - Bms Relay 4",
            "register": 164,
            "type": "integer",
            "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
          },
          "BMS_relay_5": {
            "title": "16.5 - Bms Relay 5",
            "register": 165,
            "type": "integer",
            "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
          },
          "BMS_relay_6": {
            "title": "16.6 - Bms Relay 6",
            "register": 166,
            "type": "integer",
            "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
          },
          "BMS_relay_7": {
            "title": "16.7 - Bms Relay 7",
            "register": 167,
            "type": "integer",
            "$ref": "#/definitions/BMS_OUTPUT_ASSIGN"
          },
          "BMS_relay_direction": {
            "title": "16.8 - Bms Relay Direction",
            "register": 168,
            "type": "array",
            "$ref": "#/definitions/BMS_RELAY_DIRECTION",
            "description": "Default state of Relay is Normally Open. Setting each bit to 1 indicates sets the corresponding output direction to Normally Closed."
          },
          "SCADA_baud_rate": {
            "title": "17.0 - Scada Baud Rate",
            "register": 170,
            "type": "integer",
            "$ref": "#/definitions/BAUD_RATE",
            "description": "Baud rate used for the Modbus communication."
          },
          "SCADA_parity": {
            "title": "17.1 - Scada Parity",
            "register": 171,
            "type": "integer",
            "$ref": "#/definitions/UART_FORMAT",
            "description": "Parity and number of stop bits used for Modbus communication."
          },
          "SCADA_slave_address": {
            "title": "17.2 - Scada Slave Address",
            "register": 172,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "Slave address of the controller."
          }
        },
        "definitions": {
          "PUMP_MODE": {
            "type": "integer",
            "enum": [
              0,
              1,
              2
            ],
            "enumNames": [
              "OFF",
              "MANUAL",
              "AUTO"
            ]
          },
          "PHASE_MODE": {
            "type": "integer",
            "enum": [
              0,
              1,
              2
            ],
            "enumNames": [
              "UNASSIGNED",
              "SINGLE PHASE",
              "THREE PHASE"
            ]
          },
          "CONTROL_DIR": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "enumNames": [
              "EMPTY",
              "FILL"
            ]
          },
          "FAULT_RELAY_DIR": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "enumNames": [
              "NORMAL OPEN",
              "NORMAL CLOSE"
            ]
          },
          "INPUT_ASSIGN": {
            "type": "integer",
            "enum": [
              0,
              6,
              7,
              8
            ],
            "enumNames": [
              "UNASSIGNED",
              "INPUT 6",
              "INPUT 7",
              "INPUT 8"
            ]
          },
          "INPUT_FUNCTION": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3
            ],
            "enumNames": [
              "DISABLED",
              "INDICATION_ONLY",
              "CONTROL_ONLY",
              "INDICATION_AND_CONTROL"
            ]
          },
          "BMS_OUTPUT_ASSIGN": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
              32,
              33,
              34,
              35,
              36,
              37,
              38
            ],
            "enumNames": [
              "UNASSIGNED",
              "POWER_ON",
              "PUMP_1_OVERLOAD_FAULT",
              "PUMP_1_INPUT_FAULT",
              "PUMP_1_PRIME_LOSS_FAULT",
              "PUMP_1_MAX_RUN_FAULT",
              "PUMP_1_UNDERCURRENT_FAULT",
              "PUMP_1_ZEROCURRENT_FAULT",
              "PUMP_2_OVERLOAD_FAULT",
              "PUMP_2_INPUT_FAULT",
              "PUMP_2_PRIME_LOSS_FAULT",
              "PUMP_2_MAX_RUN_FAULT",
              "PUMP_2_UNDERCURRENT_FAULT",
              "PUMP_2_ZEROCURRENT_FAULT",
              "ALARM_FAULT",
              "OUTPUT_LOW_PRESSURE_FAULT",
              "HIGH_LEVEL_FAULT",
              "LOW_LEVEL_FAULT",
              "SETTINGS_FAIL_FAULT",
              "CONTACT_FAULT",
              "OUTPUT_CONDUCTIVITY_INPUT_FAULT",
              "PUMP_1_LOCKOUT",
              "PUMP_2_LOCKOUT",
              "PUMP_1_FAULT",
              "PUMP_2_FAULT",
              "SYSTEM_LOCKOUT",
              "SERVICE_ALARM",
              "PUMP_1_RUN",
              "PUMP_2_RUN",
              "SIREN",
              "STROBE",
              "INPUT_1",
              "INPUT_2",
              "INPUT_3",
              "INPUT_4",
              "INPUT_5",
              "INPUT_6",
              "INPUT_7",
              "INPUT_8"
            ]
          },
          "BMS_RELAY_DIRECTION": {
            "uniqueItems": true,
            "items": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6
              ],
              "enumNames": [
                "BMS_OUT_1_DIR",
                "BMS_OUT_2_DIR",
                "BMS_OUT_3_DIR",
                "BMS_OUT_4_DIR",
                "BMS_OUT_5_DIR",
                "BMS_OUT_6_DIR",
                "BMS_OUT_7_DIR"
              ]
            }
          },
          "BAUD_RATE": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "enumNames": [
              "9600bps",
              "19200bps",
              "38400bps",
              "57600bps",
              "76800bps",
              "115200bps"
            ]
          },
          "UART_FORMAT": {
            "type": "integer",
            "enum": [
              0,
              1,
              2,
              3
            ],
            "enumNames": [
              "10 bit frame (1 start + 8 Data + 1 Stop bits)",
              "11 bit frame (1 start + 8 Data + 2 Stop bits)",
              "11 bit frame (1 start + 8 Data + 1 parity(even) + 1 Stop bits)",
              "11 bit frame (1 start + 8 Data + 1 parity (odd) + 1 Stop bits)"
            ]
          }
        }
      },
        "actions": {
        "title": "HydroSTART Actions",
        "type": "object",
        "menu": "",
        "properties": {
          "mute_flag": {
            "title": "19.0 - Mute Flag",
            "register": 190,
            "type": "boolean",
            "description": "If set the siren sound will be muted."
          },
          "fault_reset": {
            "title": "19.1 - Fault Reset",
            "register": 191,
            "type": "boolean",
            "description": "If set all alarms will be reset."
          },
          "reset_service_alarm": {
            "title": "19.2 - Reset Service Alarm",
            "register": 192,
            "type": "boolean",
            "description": "If set service alarm timer values (service_alarm_hours. service_alarm_mins and service_alarm_secs values) will be reset to 0."
          },
          "save_settings": {
            "title": "19.3 - Save Settings",
            "register": 193,
            "type": "boolean",
            "description": "If set all the Non-Volatile settings will be saved in EEPROM."
          },
          "controller_restart": {
            "title": "19.4 - Controller Restart",
            "register": 194,
            "type": "boolean",
            "description": "If set system will be reset."
          },
          "factory_reset": {
            "title": "19.7 - Factory Reset",
            "register": 197,
            "type": "boolean",
            "description": "Eeprom settings reset and system reset."
          },
          "test1_action": {
            "title": "19.7 - Test 1 Action",
            "register": 19788,
            "type": "boolean",
            "description": "Eeprom settings reset and system reset."
          },
          "test2_action": {
            "title": "19.7 - Test 2 Action",
            "register": 19799,
            "type": "boolean",
            "description": "Eeprom settings reset and system reset."
          },
          "test3_action": {
            "title": "19.7 - Test 3 Action",
            "register": 19711,
            "type": "boolean",
            "description": "Eeprom settings reset and system reset."
          }
        },
        "definitions": {}
      },
      "logs": {
        "title": "HydroSTART Logs",
        "type": "object",
        "readOnly": false,
        "backup": true,
        "group": "Controller",
        "properties": {
          "power_cycle_count": {
            "title": "20.0 - Power Cycle Count",
            "register": 200,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total power on cycles of the controller after loading the firmware"
          },
          "system_run_hours": {
            "title": "20.1 - System Run Hours",
            "register": 201,
            "type": "string",
            "maxLength": 8,
            "description": "This parameter is the seconds field of the total system run time."
          },
          "service_alarm_hours": {
            "title": "20.5 - Service Alarm Hours",
            "register": 205,
            "type": "string",
            "maxLength": 6,
            "description": "This parameter is the seconds field of the Service Alarm."
          },
          "pump_1_run_hours": {
            "title": "21.0 - Pump 1 Run Hours",
            "register": 210,
            "type": "string",
            "maxLength": 6,
            "description": "This parameter is the seconds field of the total Pump 1 run time."
          },
          "pump_2_run_hours": {
            "title": "21.3 - Pump 2 Run Hours",
            "register": 213,
            "type": "string",
            "maxLength": 6,
            "description": "This parameter is the seconds field of the total Pump 2 run time."
          },
          "pump_1_start_count": {
            "title": "21.6 - Pump 1 Start Count",
            "register": 216,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the number of times pump 1 is started  (Lower Byte)."
          },
          "pump_2_start_count": {
            "title": "21.8 - Pump 2 Start Count",
            "register": 218,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the number of times pump 2 is started  (Lower Byte)."
          },
          "pump_1_overload_fault_count": {
            "title": "22.0 - Pump 1 Overload Fault Count",
            "register": 220,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times the pump 1 overload fault has occurred."
          },
          "pump_2_overload_fault_count": {
            "title": "22.1 - Pump 2 Overload Fault Count",
            "register": 221,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times the pump 2 overload fault has occurred."
          },
          "pump_1_undercurrent_count": {
            "title": "22.2 - Pump 1 Undercurrent Count",
            "register": 222,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times the pump 1 undercurrent fault has occurred."
          },
          "pump_2_undercurrent_count": {
            "title": "22.3 - Pump 2 Undercurrent Count",
            "register": 223,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times the pump 2 undercurrent fault has occurred."
          },
          "pump_1_prime_loss_count": {
            "title": "22.4 - Pump 1 Prime Loss Count",
            "register": 224,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times the pump 1 primeloss fault has occurred."
          },
          "pump_2_prime_loss_count": {
            "title": "22.5 - Pump 2 Prime Loss Count",
            "register": 225,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times the pump 2 primeloss fault has occurred."
          },
          "pump_1_max_run_count": {
            "title": "22.6 - Pump 1 Max Run Count",
            "register": 226,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times the pump 1 max run fault has occurred."
          },
          "pump_2_max_run_count": {
            "title": "22.7 - Pump 2 Max Run Count",
            "register": 227,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times the pump 2 max run fault has occurred."
          },
          "high_level_count": {
            "title": "23.0 - High Level Count",
            "register": 230,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times high level fault condition has occurred."
          },
          "low_level_count": {
            "title": "23.1 - Low Level Count",
            "register": 231,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times low level fault condition has occurred."
          },
          "low_pressure_count": {
            "title": "23.2 - Low Pressure Count",
            "register": 232,
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "description": "This parameter indicates the total number of times low pressure fault condition has occurred."
          }
        }
      },
      }
    }
  

    const schema = {
      "title": "HydroTOUCH",
      "description": "HydroTOUCH v0.0.0",
      "version": "0.0.0",
      "type": "object",
      "properties": {
          "system": {
              "title": "System Information",
              "type": "object",
              "readOnly": true,
              "backup": true,
              "group": "System",
              "properties": {
                  "projectName": {
                      "type": "string",
                      "title": "Product"
                  },
                  "serial": {
                      "type": "string",
                      "title": "Serial Number"
                  },
                  "firmware": {
                      "type": "string",
                      "title": "Firmware Revision"
                  },
                  "connection": {
                      "type": "string",
                      "title": "Connected to"
                  },
                  "ipAddr": {
                      "type": "string",
                      "title": "IP Address"
                  },
                  "url": {
                      "type": "string",
                      "title": "URL"
                  }
              }
          },
          "wifi": {
              "title": "Wi-Fi Connection",
              "type": "object",
              "description": "Connect to Trusted networks only as device will be accessible over it",
              "group": "System",
              "properties": {
                  "connection": {
                      "type": "string",
                      "title": "Connected to"
                  },
                  "ssid": {
                      "type": "string",
                      "title": "SSID",
                      "description": "Select your Wi-Fi network below",
                      "minLength": 0,
                      "maxLength": 31
                  },
                  "pwd": {
                      "type": "string",
                      "title": "Password",
                      "pattern": "^$|^[ -~]{8,63}$",
                      "minLength": 0,
                      "maxLength": 63
                  }
              }
          },
          "lockSettings": {
              "title": "Unlock Settings",
              "type": "object",
              "properties": {
                  "passwordUnlock": {
                      "type": "string",
                      "title": "Enter Password to unlock settings for 10 minutes",
                      "minLength": 1,
                      "maxLength": 32
                  }
              }
          },
          "updatePassword": {
              "title": "Settings Lock",
              "type": "object",
              "menu": "Change Password",
              "properties": {
                  "oldPassword": {
                      "type": "string",
                      "title": "Enter Current Password",
                      "minLength": 1,
                      "maxLength": 32
                  },
                  "newPassword": {
                      "type": "string",
                      "title": "Enter New Password",
                      "minLength": 1,
                      "maxLength": 32
                  }
              }
          },
          "status": {
              "title": "HydroTOUCH Status",
              "type": "object",
              "readOnly": true,
              "group": "Controller",
              "properties": {
                  "product_code_0": {
                      "title": "0.1 - Product Code 0",
                      "register": 1,
                      "type": "string",
                      "maxLength": 2,
                      "description": "Controller product code/identification string packed as two ASCII characters per register. Starts from the upper byte. Value spells APC8."
                  },
                  "product_code_1": {
                      "title": "0.2 - Product Code 1",
                      "register": 2,
                      "type": "string",
                      "maxLength": 2,
                      "description": "Continuation of controller product code/identification string packed as two ASCII characters per register."
                  },
                  "product_code_2": {
                      "title": "0.3 - Product Code 2",
                      "register": 3,
                      "type": "string",
                      "maxLength": 2,
                      "description": "Continuation of controller product code/identification string packed as two ASCII characters per register."
                  },
                  "revision_major": {
                      "title": "0.4 - Revision Major",
                      "register": 4,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "Firmware revision major number.\\nRevision is in the form x.yy where x is the major number and y is the minor number."
                  },
                  "revision_minor": {
                      "title": "0.5 - Revision Minor",
                      "register": 5,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "Firmware revision minor number.\\nRevision is in the form x.yy where x is the major number and y is the minor number (2 digits with zero padding)."
                  },
                  "power_rail_ok": {
                      "title": "0.6 - Power Rail Ok",
                      "register": 6,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "A value of 1 indicates 12V power rail is within specifications."
                  },
                  "system_state": {
                      "title": "1.0 - System State",
                      "register": 10,
                      "type": "integer",
                      "$ref": "#/definitions/SYSTEM_STATE",
                      "description": "Current operating state of the system."
                  },
                  "input_states": {
                      "title": "1.1 - Input States",
                      "register": 11,
                      "type": "array",
                      "$ref": "#/definitions/INPUT_STATES",
                      "description": "Current state of the discrete inputs."
                  },
                  "duty_pump": {
                      "title": "1.2 - Duty Pump",
                      "register": 12,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "Indicates which pump is currently the duty pump."
                  },
                  "pump_1_state": {
                      "title": "1.3 - Pump 1 State",
                      "register": 13,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 1."
                  },
                  "pump_2_state": {
                      "title": "1.4 - Pump 2 State",
                      "register": 14,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 2."
                  },
                  "pump_3_state": {
                      "title": "1.5 - Pump 3 State",
                      "register": 15,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 3."
                  },
                  "pump_4_state": {
                      "title": "1.6 - Pump 4 State",
                      "register": 16,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 4."
                  },
                  "pump_5_state": {
                      "title": "1.7 - Pump 5 State",
                      "register": 17,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 5."
                  },
                  "pump_6_state": {
                      "title": "1.8 - Pump 6 State",
                      "register": 18,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 6."
                  },
                  "pump_7_state": {
                      "title": "1.9 - Pump 7 State",
                      "register": 19,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 7."
                  },
                  "pump_8_state": {
                      "title": "1.10 - Pump 8 State",
                      "register": 20,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 8."
                  },
                  "pump_9_state": {
                      "title": "1.11 - Pump 9 State",
                      "register": 21,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 9."
                  },
                  "pump_10_state": {
                      "title": "1.12 - Pump 10 State",
                      "register": 22,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 10."
                  },
                  "pump_11_state": {
                      "title": "1.13 - Pump 11 State",
                      "register": 23,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 11."
                  },
                  "pump_12_state": {
                      "title": "1.14 - Pump 12 State",
                      "register": 24,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_STATE",
                      "description": "Current state of pump 12."
                  },
                  "faults": {
                      "title": "2.0 - Faults",
                      "register": 20,
                      "type": "array",
                      "$ref": "#/definitions/ALARMS",
                      "description": "Current system alarm states."
                  },
                  "SCADA_comms_error": {
                      "title": "3.5 - Scada Comms Error",
                      "register": 35,
                      "type": "integer",
                      "$ref": "#/definitions/SCADA_COMMS_ERROR",
                      "description": "This shows the previous SCADA comms error to occur. It resets to NO ERROR after 60 seconds."
                  },
                  "SCADA_framing_error_counter": {
                      "title": "3.6 - Scada Framing Error Counter",
                      "register": 36,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "A count of the number of framing errors the SCADA comms has detected since last power cycle."
                  },
                  "SCADA_CRC_error_counter": {
                      "title": "3.7 - Scada Crc Error Counter",
                      "register": 37,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "A count of the number of Modbus CRC errors the SCADA comms has detected since last power cycle."
                  },
                  "total_modbus_packets_rcvd": {
                      "title": "3.8 - Total Modbus Packets Rcvd",
                      "register": 38,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "A count of the number of valid Modbus packets received since last power cycle. Note that this number will overflow to 0."
                  },
                  "full_speed_level_units": {
                      "title": "11.25 - Full Speed Level Units",
                      "register": 135,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "standby_start_step_units": {
                      "title": "11.27 - Standby Start Step Units",
                      "register": 137,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A0_input_fail_units": {
                      "title": "12.3 - A0 Input Fail Units",
                      "register": 123,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A1_input_fail_units": {
                      "title": "12.10 - A1 Input Fail Units",
                      "register": 130,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A2_input_fail_units": {
                      "title": "12.17 - A2 Input Fail Units",
                      "register": 137,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A3_input_fail_units": {
                      "title": "12.24 - A3 Input Fail Units",
                      "register": 144,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A4_input_fail_units": {
                      "title": "12.31 - A4 Input Fail Units",
                      "register": 151,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A5_input_fail_units": {
                      "title": "12.38 - A5 Input Fail Units",
                      "register": 158,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_0_units": {
                      "title": "13.25 - Bms Analog 0 Units",
                      "register": 155,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_1_units": {
                      "title": "13.29 - Bms Analog 1 Units",
                      "register": 159,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_2_units": {
                      "title": "13.33 - Bms Analog 2 Units",
                      "register": 163,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_3_units": {
                      "title": "13.37 - Bms Analog 3 Units",
                      "register": 167,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_4_units": {
                      "title": "13.41 - Bms Analog 4 Units",
                      "register": 171,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pipe_fill_threshold_units": {
                      "title": "15.2 - Pipe Fill Threshold Units",
                      "register": 152,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "stage_min_error_units": {
                      "title": "15.11 - Stage Min Error Units",
                      "register": 161,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "destage_min_error_units": {
                      "title": "15.18 - Destage Min Error Units",
                      "register": 168,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "sleep_assist_feedback_units": {
                      "title": "15.30 - Sleep Assist Feedback Units",
                      "register": 180,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "wake_up_feedback_units": {
                      "title": "15.36 - Wake Up Feedback Units",
                      "register": 186,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "top_up_start_units": {
                      "title": "17.16 - Top Up Start Units",
                      "register": 186,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "top_up_stop_units": {
                      "title": "17.19 - Top Up Stop Units",
                      "register": 189,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_units": {
                      "title": "18.5 - Alarm 0 Units",
                      "register": 185,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_units": {
                      "title": "19.5 - Alarm 1 Units",
                      "register": 195,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  }
              },
              "definitions": {
                  "SYSTEM_STATE": {
                      "type": "integer",
                      "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                      ],
                      "enumNames": [
                          "DISABLED",
                          "INITIALISATION",
                          "INITIAL STATE",
                          "NORMAL MODE",
                          "LOCKOUT",
                          "FACTORY MODE",
                          "RESET",
                          "PC CONNECT MODE"
                      ]
                  },
                  "INPUT_STATES": {
                      "uniqueItems": true,
                      "items": {
                          "type": "integer",
                          "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7
                          ],
                          "enumNames": [
                              "Input 1",
                              "Input 2",
                              "Input 3",
                              "Input 4",
                              "Input 5",
                              "Input 6",
                              "Input 7",
                              "Input 8"
                          ]
                      }
                  },
                  "PUMP_STATE": {
                      "type": "integer",
                      "enum": [
                          0,
                          1
                      ],
                      "enumNames": [
                          "Pump off",
                          "Pump on"
                      ]
                  },
                  "ALARMS": {
                      "uniqueItems": true,
                      "items": {
                          "type": "integer",
                          "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7,
                              8,
                              9,
                              10,
                              11
                          ],
                          "enumNames": [
                              "Alarm output",
                              "Low pressure",
                              "High level",
                              "Low level",
                              "Load settings fail",
                              "Pump Contact",
                              "Conductivity Input",
                              "Pump 1 lockout",
                              "Pump 2 lockout",
                              "Pump 1 alarm",
                              "Pump 2 alarm",
                              "System Lockout"
                          ]
                      }
                  },
                  "SCADA_COMMS_ERROR": {
                      "type": "integer",
                      "enum": [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7,
                          8,
                          9,
                          10,
                          11,
                          12,
                          13,
                          65535
                      ],
                      "enumNames": [
                          "NO_ERROR",
                          "UART_ERROR",
                          "RX_TIMING_ERROR",
                          "RX_OVERFLOW_ERROR",
                          "CRC_ERROR",
                          "INCORRECT_SLAVE_ERROR",
                          "ILLEGAL_FUNCTION_ERROR",
                          "ILLEGAL_DATA_ADDR_ERROR",
                          "ILLEGAL_DATA_VALUE_ERROR",
                          "SLAVE_DEVICE_FAILURE_ERROR",
                          "UNKNOWN_EXCEPTION_ERROR",
                          "RESPONSE_TIMEOUT_ERROR",
                          "BAD_RESPONSE_ERROR",
                          "COMMS_ERROR_END",
                          "ERROR_SHORT"
                      ]
                  }
              }
          },
          "settings": {
              "title": "HydroTOUCH Settings",
              "type": "object",
              "backup": true,
              "group": "Controller",
              "properties": {
                  "system_mode": {
                      "title": "9.0 - System Mode",
                      "register": 90,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_1_manual_en": {
                      "title": "9.1 - Pump 1 Manual En",
                      "register": 91,
                      "type": "boolean"
                  },
                  "pump_2_manual_en": {
                      "title": "9.2 - Pump 2 Manual En",
                      "register": 92,
                      "type": "boolean"
                  },
                  "pump_3_manual_en": {
                      "title": "9.3 - Pump 3 Manual En",
                      "register": 93,
                      "type": "boolean"
                  },
                  "pump_4_manual_en": {
                      "title": "9.4 - Pump 4 Manual En",
                      "register": 94,
                      "type": "boolean"
                  },
                  "pump_5_manual_en": {
                      "title": "9.5 - Pump 5 Manual En",
                      "register": 95,
                      "type": "boolean"
                  },
                  "pump_6_manual_en": {
                      "title": "9.6 - Pump 6 Manual En",
                      "register": 96,
                      "type": "boolean"
                  },
                  "pump_7_manual_en": {
                      "title": "9.7 - Pump 7 Manual En",
                      "register": 97,
                      "type": "boolean"
                  },
                  "pump_8_manual_en": {
                      "title": "9.8 - Pump 8 Manual En",
                      "register": 98,
                      "type": "boolean"
                  },
                  "pump_9_manual_en": {
                      "title": "9.9 - Pump 9 Manual En",
                      "register": 99,
                      "type": "boolean"
                  },
                  "pump_10_manual_en": {
                      "title": "9.10 - Pump 10 Manual En",
                      "register": 100,
                      "type": "boolean"
                  },
                  "pump_11_manual_en": {
                      "title": "9.11 - Pump 11 Manual En",
                      "register": 101,
                      "type": "boolean"
                  },
                  "pump_12_manual_en": {
                      "title": "9.12 - Pump 12 Manual En",
                      "register": 102,
                      "type": "boolean"
                  },
                  "system_powerup_delay": {
                      "title": "10.0 - System Powerup Delay [Secs]",
                      "register": 100,
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 65535,
                      "description": "The delay upon power on after which the system operation commences."
                  },
                  "system_type": {
                      "title": "10.1 - System Type",
                      "register": 101,
                      "type": "integer",
                      "$ref": "#/definitions/SYSTEM_TYPE",
                      "description": "The primary feedback type of the system"
                  },
                  "control_input_type": {
                      "title": "10.2 - Control Input Type",
                      "register": 102,
                      "type": "integer",
                      "$ref": "#/definitions/CONTROL_INPUT_TYPE"
                  },
                  "control_output_type": {
                      "title": "10.3 - Control Output Type",
                      "register": 103,
                      "type": "integer",
                      "$ref": "#/definitions/CONTROL_OUTPUT_TYPE"
                  },
                  "control_direction": {
                      "title": "10.4 - Control Direction",
                      "register": 104,
                      "type": "integer",
                      "$ref": "#/definitions/CONTROL_DIRECTION"
                  },
                  "system_enable": {
                      "title": "10.5 - System Enable",
                      "register": 105,
                      "type": "boolean"
                  },
                  "system_enable_input": {
                      "title": "10.6 - System Enable Input",
                      "register": 106,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "enable_system_manual_option": {
                      "title": "10.7 - Enable System Manual Option",
                      "register": 107,
                      "type": "boolean"
                  },
                  "system_manual_enable_input": {
                      "title": "10.8 - System Manual Enable Input",
                      "register": 108,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "siren_mute_input": {
                      "title": "10.9 - Siren Mute Input",
                      "register": 109,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "alarm_control_override": {
                      "title": "10.10 - Alarm Control Override",
                      "register": 110,
                      "type": "boolean"
                  },
                  "PID_proportional": {
                      "title": "10.11 - Pid Proportional",
                      "register": 111,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "PID_integral": {
                      "title": "10.12 - Pid Integral",
                      "register": 112,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "PID_derivative": {
                      "title": "10.13 - Pid Derivative",
                      "register": 113,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "number_of_pumps": {
                      "title": "11.0 - Number Of Pumps",
                      "register": 110,
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 12,
                      "description": "The number of main pumps the system has installed"
                  },
                  "pump_limit": {
                      "title": "11.1 - Pump Limit",
                      "register": 111,
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 12,
                      "description": "The maximum number of main pumps that can be run at one time"
                  },
                  "pump_limit_include _aux": {
                      "title": "11.2 - Pump Limit Include  Aux",
                      "register": 112,
                      "type": "boolean"
                  },
                  "staggered_start_delay": {
                      "title": "11.3 - Staggered Start Delay [Secs]",
                      "register": 113,
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 65535
                  },
                  "staggered_stop_delay": {
                      "title": "11.4 - Staggered Stop Delay [Secs]",
                      "register": 114,
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 65535
                  },
                  "pump_select_mode": {
                      "title": "11.5 - Pump Select Mode",
                      "register": 115,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_SELECT_MODE",
                      "description": "The algorithm used to select a new pump"
                  },
                  "pump_fault_timeout": {
                      "title": "11.6 - Pump Fault Timeout [Secs]",
                      "register": 116,
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 65535
                  },
                  "pump_drive_model": {
                      "title": "11.7 - Pump Drive Model",
                      "register": 117,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "minimum_speed": {
                      "title": "11.8 - Minimum Speed",
                      "register": 118,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "maximum_speed": {
                      "title": "11.9 - Maximum Speed",
                      "register": 119,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "antiseize_en": {
                      "title": "11.10 - Antiseize En",
                      "register": 120,
                      "type": "boolean"
                  },
                  "antiseize_period": {
                      "title": "11.11 - Antiseize Period [Secs]",
                      "register": 121,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "antiseize_run_time": {
                      "title": "11.12 - Antiseize Run Time [Secs]",
                      "register": 122,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "antiseize_speed": {
                      "title": "11.13 - Antiseize Speed",
                      "register": 123,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "duty_change_period": {
                      "title": "11.14 - Duty Change Period [Secs]",
                      "register": 124,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "jacking_pump_turn_off": {
                      "title": "11.15 - Jacking Pump Turn Off",
                      "register": 125,
                      "type": "boolean"
                  },
                  "jacking_pump_off_delay": {
                      "title": "11.16 - Jacking Pump Off Delay [Secs]",
                      "register": 126,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_stop_input": {
                      "title": "11.17 - Pump Stop Input",
                      "register": 127,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_threshold_input_1": {
                      "title": "11.18 - Pump Threshold Input 1",
                      "register": 128,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_threshold_input_2": {
                      "title": "11.19 - Pump Threshold Input 2",
                      "register": 129,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_threshold_input_3": {
                      "title": "11.20 - Pump Threshold Input 3",
                      "register": 130,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_threshold_input_4": {
                      "title": "11.21 - Pump Threshold Input 4",
                      "register": 131,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_threshold_input_5": {
                      "title": "11.22 - Pump Threshold Input 5",
                      "register": 132,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_threshold_input_6": {
                      "title": "11.23 - Pump Threshold Input 6",
                      "register": 133,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "full_speed_level": {
                      "title": "11.24 - Full Speed Level",
                      "register": 134,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "standby_start_step": {
                      "title": "11.26 - Standby Start Step",
                      "register": 136,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_1_type": {
                      "title": "11.28 - Pump 1 Type",
                      "register": 138,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_2_type": {
                      "title": "11.29 - Pump 2 Type",
                      "register": 139,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_3_type": {
                      "title": "11.30 - Pump 3 Type",
                      "register": 140,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_4_type": {
                      "title": "11.31 - Pump 4 Type",
                      "register": 141,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_5_type": {
                      "title": "11.32 - Pump 5 Type",
                      "register": 142,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_6_type": {
                      "title": "11.33 - Pump 6 Type",
                      "register": 143,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_7_type": {
                      "title": "11.34 - Pump 7 Type",
                      "register": 144,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_8_type": {
                      "title": "11.35 - Pump 8 Type",
                      "register": 145,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_9_type": {
                      "title": "11.36 - Pump 9 Type",
                      "register": 146,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_10_type": {
                      "title": "11.37 - Pump 10 Type",
                      "register": 147,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_11_type": {
                      "title": "11.38 - Pump 11 Type",
                      "register": 148,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_12_type": {
                      "title": "11.39 - Pump 12 Type",
                      "register": 149,
                      "type": "integer",
                      "$ref": "#/definitions/PUMP_TYPE"
                  },
                  "pump_1_enable_input": {
                      "title": "11.40 - Pump 1 Enable Input",
                      "register": 150,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_2_enable_input": {
                      "title": "11.41 - Pump 2 Enable Input",
                      "register": 151,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_3_enable_input": {
                      "title": "11.42 - Pump 3 Enable Input",
                      "register": 152,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_4_enable_input": {
                      "title": "11.43 - Pump 4 Enable Input",
                      "register": 153,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_5_enable_input": {
                      "title": "11.44 - Pump 5 Enable Input",
                      "register": 154,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_6_enable_input": {
                      "title": "11.45 - Pump 6 Enable Input",
                      "register": 155,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_7_enable_input": {
                      "title": "11.46 - Pump 7 Enable Input",
                      "register": 156,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_8_enable_input": {
                      "title": "11.47 - Pump 8 Enable Input",
                      "register": 157,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_9_enable_input": {
                      "title": "11.48 - Pump 9 Enable Input",
                      "register": 158,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_10_enable_input": {
                      "title": "11.49 - Pump 10 Enable Input",
                      "register": 159,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_11_enable_input": {
                      "title": "11.50 - Pump 11 Enable Input",
                      "register": 160,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_12_enable_input": {
                      "title": "11.51 - Pump 12 Enable Input",
                      "register": 161,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_1_fault_input": {
                      "title": "11.52 - Pump 1 Fault Input",
                      "register": 162,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_2_fault_input": {
                      "title": "11.53 - Pump 2 Fault Input",
                      "register": 163,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_3_fault_input": {
                      "title": "11.54 - Pump 3 Fault Input",
                      "register": 164,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_4_fault_input": {
                      "title": "11.55 - Pump 4 Fault Input",
                      "register": 165,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_5_fault_input": {
                      "title": "11.56 - Pump 5 Fault Input",
                      "register": 166,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_6_fault_input": {
                      "title": "11.57 - Pump 6 Fault Input",
                      "register": 167,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_7_fault_input": {
                      "title": "11.58 - Pump 7 Fault Input",
                      "register": 168,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_8_fault_input": {
                      "title": "11.59 - Pump 8 Fault Input",
                      "register": 169,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_9_fault_input": {
                      "title": "11.60 - Pump 9 Fault Input",
                      "register": 170,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_10_fault_input": {
                      "title": "11.61 - Pump 10 Fault Input",
                      "register": 171,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_11_fault_input": {
                      "title": "11.62 - Pump 11 Fault Input",
                      "register": 172,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_12_fault_input": {
                      "title": "11.63 - Pump 12 Fault Input",
                      "register": 173,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_1_running_input": {
                      "title": "11.64 - Pump 1 Running Input",
                      "register": 174,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_2_running_input": {
                      "title": "11.65 - Pump 2 Running Input",
                      "register": 175,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_3_running_input": {
                      "title": "11.66 - Pump 3 Running Input",
                      "register": 176,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_4_running_input": {
                      "title": "11.67 - Pump 4 Running Input",
                      "register": 177,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_5_running_input": {
                      "title": "11.68 - Pump 5 Running Input",
                      "register": 178,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_6_running_input": {
                      "title": "11.69 - Pump 6 Running Input",
                      "register": 179,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_7_running_input": {
                      "title": "11.70 - Pump 7 Running Input",
                      "register": 180,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_8_running_input": {
                      "title": "11.71 - Pump 8 Running Input",
                      "register": 181,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_9_running_input": {
                      "title": "11.72 - Pump 9 Running Input",
                      "register": 182,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_10_running_input": {
                      "title": "11.73 - Pump 10 Running Input",
                      "register": 183,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_11_running_input": {
                      "title": "11.74 - Pump 11 Running Input",
                      "register": 184,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "pump_12_running_input": {
                      "title": "11.75 - Pump 12 Running Input",
                      "register": 185,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "manual_enable_input": {
                      "title": "11.76 - Manual Enable Input",
                      "register": 186,
                      "type": "integer",
                      "$ref": "#/definitions/INPUT_ASSIGN"
                  },
                  "manual_speed_source": {
                      "title": "11.77 - Manual Speed Source",
                      "register": 187,
                      "type": "integer",
                      "$ref": "#/definitions/MAN_SPEED_SOURCE"
                  },
                  "manual_mode_timeout": {
                      "title": "11.78 - Manual Mode Timeout [Secs]",
                      "register": 188,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_1_manual_speed": {
                      "title": "11.79 - Pump 1 Manual Speed",
                      "register": 189,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_2_manual_speed": {
                      "title": "11.80 - Pump 2 Manual Speed",
                      "register": 190,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_3_manual_speed": {
                      "title": "11.81 - Pump 3 Manual Speed",
                      "register": 191,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_4_manual_speed": {
                      "title": "11.82 - Pump 4 Manual Speed",
                      "register": 192,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_5_manual_speed": {
                      "title": "11.83 - Pump 5 Manual Speed",
                      "register": 193,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_6_manual_speed": {
                      "title": "11.84 - Pump 6 Manual Speed",
                      "register": 194,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_7_manual_speed": {
                      "title": "11.85 - Pump 7 Manual Speed",
                      "register": 195,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_8_manual_speed": {
                      "title": "11.86 - Pump 8 Manual Speed",
                      "register": 196,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_9_manual_speed": {
                      "title": "11.87 - Pump 9 Manual Speed",
                      "register": 197,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_10_manual_speed": {
                      "title": "11.88 - Pump 10 Manual Speed",
                      "register": 198,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_11_manual_speed": {
                      "title": "11.89 - Pump 11 Manual Speed",
                      "register": 199,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pump_12_manual_speed": {
                      "title": "11.90 - Pump 12 Manual Speed",
                      "register": 200,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A0_input_type": {
                      "title": "12.0 - A0 Input Type",
                      "register": 120,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_TYPE"
                  },
                  "A0_offset": {
                      "title": "12.1 - A0 Offset",
                      "register": 121,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A0_input_fail_threshold": {
                      "title": "12.2 - A0 Input Fail Threshold",
                      "register": 122,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A0_input_fault_delay": {
                      "title": "12.4 - A0 Input Fault Delay",
                      "register": 124,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A0_input_fault_auto_reset": {
                      "title": "12.5 - A0 Input Fault Auto Reset",
                      "register": 125,
                      "type": "boolean"
                  },
                  "A0_input_fault_reset_delay": {
                      "title": "12.6 - A0 Input Fault Reset Delay",
                      "register": 126,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A1_input_type": {
                      "title": "12.7 - A1 Input Type",
                      "register": 127,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_TYPE"
                  },
                  "A1_offset": {
                      "title": "12.8 - A1 Offset",
                      "register": 128,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A1_input_fail_threshold": {
                      "title": "12.9 - A1 Input Fail Threshold",
                      "register": 129,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A1_input_fault_delay": {
                      "title": "12.11 - A1 Input Fault Delay",
                      "register": 131,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A1_input_fault_auto_reset": {
                      "title": "12.12 - A1 Input Fault Auto Reset",
                      "register": 132,
                      "type": "boolean"
                  },
                  "A1_input_fault_reset_delay": {
                      "title": "12.13 - A1 Input Fault Reset Delay",
                      "register": 133,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A2_input_type": {
                      "title": "12.14 - A2 Input Type",
                      "register": 134,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_TYPE"
                  },
                  "A2_offset": {
                      "title": "12.15 - A2 Offset",
                      "register": 135,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A2_input_fail_threshold": {
                      "title": "12.16 - A2 Input Fail Threshold",
                      "register": 136,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A2_input_fault_delay": {
                      "title": "12.18 - A2 Input Fault Delay",
                      "register": 138,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A2_input_fault_auto_reset": {
                      "title": "12.19 - A2 Input Fault Auto Reset",
                      "register": 139,
                      "type": "boolean"
                  },
                  "A2_input_fault_reset_delay": {
                      "title": "12.20 - A2 Input Fault Reset Delay",
                      "register": 140,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A3_input_type": {
                      "title": "12.21 - A3 Input Type",
                      "register": 141,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_TYPE"
                  },
                  "A3_offset": {
                      "title": "12.22 - A3 Offset",
                      "register": 142,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A3_input_fail_threshold": {
                      "title": "12.23 - A3 Input Fail Threshold",
                      "register": 143,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A3_input_fault_delay": {
                      "title": "12.25 - A3 Input Fault Delay",
                      "register": 145,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A3_input_fault_auto_reset": {
                      "title": "12.26 - A3 Input Fault Auto Reset",
                      "register": 146,
                      "type": "boolean"
                  },
                  "A3_input_fault_reset_delay": {
                      "title": "12.27 - A3 Input Fault Reset Delay",
                      "register": 147,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A4_input_type": {
                      "title": "12.28 - A4 Input Type",
                      "register": 148,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_TYPE"
                  },
                  "A4_offset": {
                      "title": "12.29 - A4 Offset",
                      "register": 149,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A4_input_fail_threshold": {
                      "title": "12.30 - A4 Input Fail Threshold",
                      "register": 150,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A4_input_fault_delay": {
                      "title": "12.32 - A4 Input Fault Delay",
                      "register": 152,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A4_input_fault_auto_reset": {
                      "title": "12.33 - A4 Input Fault Auto Reset",
                      "register": 153,
                      "type": "boolean"
                  },
                  "A4_input_fault_reset_delay": {
                      "title": "12.34 - A4 Input Fault Reset Delay",
                      "register": 154,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A5_input_type": {
                      "title": "12.35 - A5 Input Type",
                      "register": 155,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_TYPE"
                  },
                  "A5_offset": {
                      "title": "12.36 - A5 Offset",
                      "register": 156,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A5_input_fail_threshold": {
                      "title": "12.37 - A5 Input Fail Threshold",
                      "register": 157,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A5_input_fault_delay": {
                      "title": "12.39 - A5 Input Fault Delay",
                      "register": 159,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A5_input_fault_auto_reset": {
                      "title": "12.40 - A5 Input Fault Auto Reset",
                      "register": 160,
                      "type": "boolean"
                  },
                  "A5_input_fault_reset_delay": {
                      "title": "12.41 - A5 Input Fault Reset Delay",
                      "register": 161,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "C0_output_assign": {
                      "title": "13.1 - C0 Output Assign",
                      "register": 131,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C1_output_assign": {
                      "title": "13.2 - C1 Output Assign",
                      "register": 132,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C2_output_assign": {
                      "title": "13.3 - C2 Output Assign",
                      "register": 133,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C3_output_assign": {
                      "title": "13.4 - C3 Output Assign",
                      "register": 134,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C4_output_assign": {
                      "title": "13.5 - C4 Output Assign",
                      "register": 135,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C5_output_assign": {
                      "title": "13.6 - C5 Output Assign",
                      "register": 136,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C6_output_assign": {
                      "title": "13.7 - C6 Output Assign",
                      "register": 137,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C7_output_assign": {
                      "title": "13.8 - C7 Output Assign",
                      "register": 138,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C8_output_assign": {
                      "title": "13.9 - C8 Output Assign",
                      "register": 139,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C9_output_assign": {
                      "title": "13.10 - C9 Output Assign",
                      "register": 140,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "C_output_control": {
                      "title": "13.11 - C Output Control",
                      "register": 141,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A10_output_assign": {
                      "title": "13.12 - A10 Output Assign",
                      "register": 142,
                      "type": "integer",
                      "$ref": "#/definitions/A_OUTPUT_ASSIGN"
                  },
                  "A11_output_assign": {
                      "title": "13.13 - A11 Output Assign",
                      "register": 143,
                      "type": "integer",
                      "$ref": "#/definitions/A_OUTPUT_ASSIGN"
                  },
                  "A10_output_control": {
                      "title": "13.14 - A10 Output Control",
                      "register": 144,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "A11_output_control": {
                      "title": "13.15 - A11 Output Control",
                      "register": 145,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "F0_output_assign": {
                      "title": "13.16 - F0 Output Assign",
                      "register": 146,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "F1_output_assign": {
                      "title": "13.17 - F1 Output Assign",
                      "register": 147,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "F2_output_assign": {
                      "title": "13.18 - F2 Output Assign",
                      "register": 148,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "F3_output_assign": {
                      "title": "13.19 - F3 Output Assign",
                      "register": 149,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "F4_output_assign": {
                      "title": "13.20 - F4 Output Assign",
                      "register": 150,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "F5_output_assign": {
                      "title": "13.21 - F5 Output Assign",
                      "register": 151,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "F6_output_assign": {
                      "title": "13.22 - F6 Output Assign",
                      "register": 152,
                      "type": "integer",
                      "$ref": "#/definitions/OUTPUT_ASSIGN"
                  },
                  "BMS_analog_0_channel_assign": {
                      "title": "13.23 - Bms Analog 0 Channel Assign",
                      "register": 153,
                      "type": "integer",
                      "$ref": "#/definitions/A_CHANNEL_ASSIGN"
                  },
                  "BMS_analog_0_threshold": {
                      "title": "13.24 - Bms Analog 0 Threshold",
                      "register": 154,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_0_direction": {
                      "title": "13.26 - Bms Analog 0 Direction",
                      "register": 156,
                      "type": "integer"
                  },
                  "BMS_analog_1_channel_assign": {
                      "title": "13.27 - Bms Analog 1 Channel Assign",
                      "register": 157,
                      "type": "integer",
                      "$ref": "#/definitions/A_CHANNEL_ASSIGN"
                  },
                  "BMS_analog_1_threshold": {
                      "title": "13.28 - Bms Analog 1 Threshold",
                      "register": 158,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_1_direction": {
                      "title": "13.30 - Bms Analog 1 Direction",
                      "register": 160,
                      "type": "integer"
                  },
                  "BMS_analog_2_channel_assign": {
                      "title": "13.31 - Bms Analog 2 Channel Assign",
                      "register": 161,
                      "type": "integer",
                      "$ref": "#/definitions/A_CHANNEL_ASSIGN"
                  },
                  "BMS_analog_2_threshold": {
                      "title": "13.32 - Bms Analog 2 Threshold",
                      "register": 162,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_2_direction": {
                      "title": "13.34 - Bms Analog 2 Direction",
                      "register": 164,
                      "type": "integer"
                  },
                  "BMS_analog_3_channel_assign": {
                      "title": "13.35 - Bms Analog 3 Channel Assign",
                      "register": 165,
                      "type": "integer",
                      "$ref": "#/definitions/A_CHANNEL_ASSIGN"
                  },
                  "BMS_analog_3_threshold": {
                      "title": "13.36 - Bms Analog 3 Threshold",
                      "register": 166,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_3_direction": {
                      "title": "13.38 - Bms Analog 3 Direction",
                      "register": 168,
                      "type": "integer"
                  },
                  "BMS_analog_4_channel_assign": {
                      "title": "13.39 - Bms Analog 4 Channel Assign",
                      "register": 169,
                      "type": "integer",
                      "$ref": "#/definitions/A_CHANNEL_ASSIGN"
                  },
                  "BMS_analog_4_threshold": {
                      "title": "13.40 - Bms Analog 4 Threshold",
                      "register": 170,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "BMS_analog_4_direction": {
                      "title": "13.42 - Bms Analog 4 Direction",
                      "register": 172,
                      "type": "integer"
                  },
                  "primary_feedback_assign": {
                      "title": "14.0 - Primary Feedback Assign",
                      "register": 140,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_ASSIGN"
                  },
                  "backup_feedback_assign": {
                      "title": "14.1 - Backup Feedback Assign",
                      "register": 141,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_ASSIGN"
                  },
                  "no_feedback_lockout": {
                      "title": "14.2 - No Feedback Lockout",
                      "register": 142,
                      "type": "boolean"
                  },
                  "aux_0_assign": {
                      "title": "14.3 - Aux 0 Assign",
                      "register": 143,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_ASSIGN"
                  },
                  "aux_1_assign": {
                      "title": "14.4 - Aux 1 Assign",
                      "register": 144,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_ASSIGN"
                  },
                  "aux_2_assign": {
                      "title": "14.5 - Aux 2 Assign",
                      "register": 145,
                      "type": "integer",
                      "$ref": "#/definitions/A_INPUT_ASSIGN"
                  },
                  "feedback_range": {
                      "title": "14.6 - Feedback Range",
                      "register": 146,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "backup_range": {
                      "title": "14.7 - Backup Range",
                      "register": 147,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "aux_0_range": {
                      "title": "14.8 - Aux 0 Range",
                      "register": 148,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "aux_1_range": {
                      "title": "14.9 - Aux 1 Range",
                      "register": 149,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "aux_2_range": {
                      "title": "14.10 - Aux 2 Range",
                      "register": 150,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "feedback_units": {
                      "title": "14.11 - Feedback Units",
                      "register": 151,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "aux_0_units": {
                      "title": "14.12 - Aux 0 Units",
                      "register": 152,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "aux_1_units": {
                      "title": "14.13 - Aux 1 Units",
                      "register": 153,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "aux_2_units": {
                      "title": "14.14 - Aux 2 Units",
                      "register": 154,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_0": {
                      "title": "14.15 - Setpoint 0",
                      "register": 155,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_1": {
                      "title": "14.16 - Setpoint 1",
                      "register": 156,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_2": {
                      "title": "14.17 - Setpoint 2",
                      "register": 157,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_3": {
                      "title": "14.18 - Setpoint 3",
                      "register": 158,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_4": {
                      "title": "14.19 - Setpoint 4",
                      "register": 159,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_select": {
                      "title": "14.20 - Setpoint Select",
                      "register": 160,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_0_input": {
                      "title": "14.21 - Setpoint 0 Input",
                      "register": 161,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_0_input_polarity": {
                      "title": "14.22 - Setpoint 0 Input Polarity",
                      "register": 162,
                      "type": "boolean"
                  },
                  "setpoint_1_input": {
                      "title": "14.23 - Setpoint 1 Input",
                      "register": 163,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_1_input_polarity": {
                      "title": "14.24 - Setpoint 1 Input Polarity",
                      "register": 164,
                      "type": "boolean"
                  },
                  "setpoint_2_input": {
                      "title": "14.25 - Setpoint 2 Input",
                      "register": 165,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_2_input_polarity": {
                      "title": "14.26 - Setpoint 2 Input Polarity",
                      "register": 166,
                      "type": "boolean"
                  },
                  "setpoint_3_input": {
                      "title": "14.27 - Setpoint 3 Input",
                      "register": 167,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_3_input_polarity": {
                      "title": "14.28 - Setpoint 3 Input Polarity",
                      "register": 168,
                      "type": "boolean"
                  },
                  "setpoint_4_input": {
                      "title": "14.29 - Setpoint 4 Input",
                      "register": 169,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_4_input_polarity": {
                      "title": "14.30 - Setpoint 4 Input Polarity",
                      "register": 170,
                      "type": "boolean"
                  },
                  "pipe_fill_en": {
                      "title": "15.0 - Pipe Fill En",
                      "register": 150,
                      "type": "boolean"
                  },
                  "pipe_fill_relative_threshold": {
                      "title": "15.1 - Pipe Fill Relative Threshold",
                      "register": 151,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pipe_fill_speed": {
                      "title": "15.3 - Pipe Fill Speed",
                      "register": 153,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "pipe_fill_fail_timeout": {
                      "title": "15.4 - Pipe Fill Fail Timeout",
                      "register": 154,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "setpoint_ramp_en": {
                      "title": "15.5 - Setpoint Ramp En",
                      "register": 155,
                      "type": "boolean"
                  },
                  "setpoint_ramp_rate": {
                      "title": "15.6 - Setpoint Ramp Rate",
                      "register": 156,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "maintain_min_level_en": {
                      "title": "15.7 - Maintain Min Level En",
                      "register": 157,
                      "type": "boolean"
                  },
                  "maintain_min_level_delay": {
                      "title": "15.8 - Maintain Min Level Delay",
                      "register": 158,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "stage_threshold_speed": {
                      "title": "15.9 - Stage Threshold Speed",
                      "register": 159,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "stage_min_error": {
                      "title": "15.10 - Stage Min Error",
                      "register": 160,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "stage_trigger_delay": {
                      "title": "15.12 - Stage Trigger Delay",
                      "register": 162,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "stage_bypass_en": {
                      "title": "15.13 - Stage Bypass En",
                      "register": 163,
                      "type": "boolean"
                  },
                  "stage_bypass_speed": {
                      "title": "15.14 - Stage Bypass Speed",
                      "register": 164,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "stage_bypass_period": {
                      "title": "15.15 - Stage Bypass Period",
                      "register": 165,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "destage_threshold_speed": {
                      "title": "15.16 - Destage Threshold Speed",
                      "register": 166,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "destage_min_error": {
                      "title": "15.17 - Destage Min Error",
                      "register": 167,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "destage_trigger_delay": {
                      "title": "15.19 - Destage Trigger Delay",
                      "register": 169,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "destage_bypass_en": {
                      "title": "15.20 - Destage Bypass En",
                      "register": 170,
                      "type": "boolean"
                  },
                  "destage_bypass_speed": {
                      "title": "15.21 - Destage Bypass Speed",
                      "register": 171,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "destage_bypass_period": {
                      "title": "15.22 - Destage Bypass Period",
                      "register": 172,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "bumpless_transfer_delay": {
                      "title": "15.23 - Bumpless Transfer Delay",
                      "register": 173,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "no_demand_speed": {
                      "title": "15.24 - No Demand Speed",
                      "register": 174,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "no_demand_sleep_delay": {
                      "title": "15.25 - No Demand Sleep Delay",
                      "register": 175,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "sleep_assist_mode": {
                      "title": "15.26 - Sleep Assist Mode",
                      "register": 176,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "sleep_assist_delay": {
                      "title": "15.27 - Sleep Assist Delay",
                      "register": 177,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "sleep_assist_speed_tolerance": {
                      "title": "15.28 - Sleep Assist Speed Tolerance",
                      "register": 178,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "sleep_assist_feedback_tolerance": {
                      "title": "15.29 - Sleep Assist Feedback Tolerance",
                      "register": 179,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "speed_minimise_rate": {
                      "title": "15.31 - Speed Minimise Rate",
                      "register": 181,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "sleep_boost_pressure_increase": {
                      "title": "15.32 - Sleep Boost Pressure Increase",
                      "register": 182,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "sleep_boost_timeout": {
                      "title": "15.33 - Sleep Boost Timeout",
                      "register": 183,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "sleep_speed": {
                      "title": "15.34 - Sleep Speed",
                      "register": 184,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "wakeup_feedback_change": {
                      "title": "15.35 - Wakeup Feedback Change",
                      "register": 185,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "wakeup_delay": {
                      "title": "15.37 - Wakeup Delay",
                      "register": 187,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "wakeup_duty_change_en": {
                      "title": "15.38 - Wakeup Duty Change En",
                      "register": 188,
                      "type": "boolean"
                  },
                  "SCADA_baud_rate": {
                      "title": "16.0 - Scada Baud Rate",
                      "register": 160,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "SCADA_parity": {
                      "title": "16.1 - Scada Parity",
                      "register": 161,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "SCADA_slave_address": {
                      "title": "16.2 - Scada Slave Address",
                      "register": 162,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "SCADA_watchdog_en": {
                      "title": "16.3 - Scada Watchdog En",
                      "register": 163,
                      "type": "boolean"
                  },
                  "SCADA_watchdog_period": {
                      "title": "16.4 - Scada Watchdog Period",
                      "register": 164,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "SCADA_watchdog_fault_mode": {
                      "title": "16.5 - Scada Watchdog Fault Mode",
                      "register": 165,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "SCADA_remote_control_mode": {
                      "title": "16.6 - Scada Remote Control Mode",
                      "register": 166,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "SCADA_watchdog_remote_override": {
                      "title": "16.7 - Scada Watchdog Remote Override",
                      "register": 167,
                      "type": "boolean"
                  },
                  "Drive_baud_rate": {
                      "title": "16.8 - Drive Baud Rate",
                      "register": 168,
                      "type": "integer"
                  },
                  "Drive_parity": {
                      "title": "16.9 - Drive Parity",
                      "register": 169,
                      "type": "integer"
                  },
                  "HMI_IP_0": {
                      "title": "16.10 - Hmi Ip 0",
                      "register": 170,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "HMI_IP_1": {
                      "title": "16.11 - Hmi Ip 1",
                      "register": 171,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "HMI_SUBNET_MASK_0": {
                      "title": "16.12 - Hmi Subnet Mask 0",
                      "register": 172,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "HMI_SUBNET_MASK_1": {
                      "title": "16.13 - Hmi Subnet Mask 1",
                      "register": 173,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "mixer_run_time": {
                      "title": "17.0 - Mixer Run Time",
                      "register": 170,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "mixer_turn_off": {
                      "title": "17.1 - Mixer Turn Off",
                      "register": 171,
                      "type": "boolean"
                  },
                  "mixer_off_delay": {
                      "title": "17.2 - Mixer Off Delay",
                      "register": 172,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "mixer_cycle_mode": {
                      "title": "17.3 - Mixer Cycle Mode",
                      "register": 173,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "mixer_cycle_frequency": {
                      "title": "17.4 - Mixer Cycle Frequency",
                      "register": 174,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "mixer_mode_level": {
                      "title": "17.5 - Mixer Mode Level",
                      "register": 175,
                      "type": "boolean"
                  },
                  "mixer_start_level": {
                      "title": "17.6 - Mixer Start Level",
                      "register": 176,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "mixer_stop_level": {
                      "title": "17.7 - Mixer Stop Level",
                      "register": 177,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "mixer_speed": {
                      "title": "17.8 - Mixer Speed",
                      "register": 178,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "well_wash_en": {
                      "title": "17.9 - Well Wash En",
                      "register": 179,
                      "type": "boolean"
                  },
                  "well_wash_duration": {
                      "title": "17.10 - Well Wash Duration",
                      "register": 180,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "well_wash_cycle_frequency": {
                      "title": "17.11 - Well Wash Cycle Frequency",
                      "register": 181,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "well_wash_pump_run_mode": {
                      "title": "17.12 - Well Wash Pump Run Mode",
                      "register": 182,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "well_wash_turn_off": {
                      "title": "17.13 - Well Wash Turn Off",
                      "register": 183,
                      "type": "boolean"
                  },
                  "top_up_control_en": {
                      "title": "17.14 - Top Up Control En",
                      "register": 184,
                      "type": "boolean"
                  },
                  "top_up_start_threshold": {
                      "title": "17.15 - Top Up Start Threshold",
                      "register": 185,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "top_up_start_delay": {
                      "title": "17.17 - Top Up Start Delay",
                      "register": 187,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "top_up_stop_threshold": {
                      "title": "17.18 - Top Up Stop Threshold",
                      "register": 188,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "top_up_stop_delay": {
                      "title": "17.20 - Top Up Stop Delay",
                      "register": 190,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_fault_mode": {
                      "title": "18.0 - Alarm 0 Fault Mode",
                      "register": 180,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_discrete_input": {
                      "title": "18.1 - Alarm 0 Discrete Input",
                      "register": 181,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_discrete_polarity": {
                      "title": "18.6 - Alarm 0 Discrete Polarity",
                      "register": 186,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_analog_channel": {
                      "title": "18.3 - Alarm 0 Analog Channel",
                      "register": 183,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_threshold": {
                      "title": "18.4 - Alarm 0 Threshold",
                      "register": 184,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_analog_direction": {
                      "title": "18.7 - Alarm 0 Analog Direction",
                      "register": 187,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_trigger_delay": {
                      "title": "18.8 - Alarm 0 Trigger Delay",
                      "register": 188,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_auto_reset": {
                      "title": "18.9 - Alarm 0 Auto Reset",
                      "register": 189,
                      "type": "boolean"
                  },
                  "alarm_0_reset_hysteresis": {
                      "title": "18.10 - Alarm 0 Reset Hysteresis",
                      "register": 190,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_reset_delay": {
                      "title": "18.11 - Alarm 0 Reset Delay",
                      "register": 191,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_0_name": {
                      "title": "18.12 - Alarm 0 Name",
                      "register": 192,
                      "type": "string",
                      "maxLength": 2
                  },
                  "alarm_0_activation_text": {
                      "title": "18.62 - Alarm 0 Activation Text",
                      "register": 242,
                      "type": "string",
                      "maxLength": 2
                  },
                  "alarm_0_reset_text": {
                      "title": "18.72 - Alarm 0 Reset Text",
                      "register": 252,
                      "type": "string",
                      "maxLength": 2
                  },
                  "alarm_1_fault_mode": {
                      "title": "19.0 - Alarm 1 Fault Mode",
                      "register": 190,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_discrete_input": {
                      "title": "19.1 - Alarm 1 Discrete Input",
                      "register": 191,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_discrete_polarity": {
                      "title": "19.6 - Alarm 1 Discrete Polarity",
                      "register": 196,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_analog_channel": {
                      "title": "19.3 - Alarm 1 Analog Channel",
                      "register": 193,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_threshold": {
                      "title": "19.4 - Alarm 1 Threshold",
                      "register": 194,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_analog_direction": {
                      "title": "19.7 - Alarm 1 Analog Direction",
                      "register": 197,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_trigger_delay": {
                      "title": "19.8 - Alarm 1 Trigger Delay",
                      "register": 198,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_auto_reset": {
                      "title": "19.9 - Alarm 1 Auto Reset",
                      "register": 199,
                      "type": "boolean"
                  },
                  "alarm_1_reset_hysteresis": {
                      "title": "19.10 - Alarm 1 Reset Hysteresis",
                      "register": 200,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_reset_delay": {
                      "title": "19.11 - Alarm 1 Reset Delay",
                      "register": 201,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "alarm_1_name": {
                      "title": "19.12 - Alarm 1 Name",
                      "register": 202,
                      "type": "string",
                      "maxLength": 2
                  },
                  "alarm_1_activation_text": {
                      "title": "19.62 - Alarm 1 Activation Text",
                      "register": 252,
                      "type": "string",
                      "maxLength": 2
                  },
                  "alarm_1_reset_text": {
                      "title": "19.72 - Alarm 1 Reset Text",
                      "register": 262,
                      "type": "string",
                      "maxLength": 2
                  }
              },
              "definitions": {
                  "SYSTEM_TYPE": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "CONTROL_INPUT_TYPE": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "CONTROL_OUTPUT_TYPE": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "CONTROL_DIRECTION": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "INPUT_ASSIGN": {
                      "type": "integer",
                      "enum": [
                          0,
                          6,
                          7,
                          8
                      ],
                      "enumNames": [
                          "UNASSIGNED",
                          "INPUT 6",
                          "INPUT 7",
                          "INPUT 8"
                      ]
                  },
                  "PUMP_SELECT_MODE": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "PUMP_TYPE": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "MAN_SPEED_SOURCE": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "A_INPUT_TYPE": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "OUTPUT_ASSIGN": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "A_OUTPUT_ASSIGN": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "A_CHANNEL_ASSIGN": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  },
                  "A_INPUT_ASSIGN": {
                      "type": "integer",
                      "enum": [],
                      "enumNames": []
                  }
              }
          },
          "actions": {
              "title": "HydroTOUCH Actions",
              "type": "object",
              "properties": {
                  "mute_flag": {
                      "title": "30.0 - Mute Flag",
                      "register": 300,
                      "type": "boolean",
                      "description": "If set to 1 the siren sound will be muted."
                  },
                  "fault_reset": {
                      "title": "30.1 - Fault Reset",
                      "register": 301,
                      "type": "boolean",
                      "description": "If set to 1 all alarms will be reset."
                  },
                  "reset_service_alarm": {
                      "title": "30.2 - Reset Service Alarm",
                      "register": 302,
                      "type": "boolean",
                      "description": "If set to 1 service alarm timer values (service_alarm_hours. service_alarm_mins and service_alarm_secs values) will be reset to 0."
                  },
                  "save_settings": {
                      "title": "30.3 - Save Settings",
                      "register": 303,
                      "type": "boolean",
                      "description": "If set to 1 all the Non-Volatile settings will be saved in EEPROM."
                  },
                  "controller_restart": {
                      "title": "30.4 - Controller Restart",
                      "register": 304,
                      "type": "boolean",
                      "description": "If set to 1 system will be reset."
                  },
                  "factory_reset": {
                      "title": "30.7 - Factory Reset",
                      "register": 307,
                      "type": "boolean",
                      "description": "Eeprom settings reset and system reset."
                  }
              },
              "definitions": {}
          },
          "logs": {
              "title": "HydroTOUCH Logs",
              "type": "object",
              "readOnly": true,
              "group": "Controller",
              "properties": {
                  "power_cycle_count": {
                      "title": "31.0 - Power Cycle Count",
                      "register": 310,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter indicates the total power on cycles of the controller after loading the firmware"
                  },
                  "system_run_secs": {
                      "title": "31.1 - System Run Secs",
                      "register": 311,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the seconds field of the total system run time."
                  },
                  "system_run_mins": {
                      "title": "31.2 - System Run Mins",
                      "register": 312,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the minutes field of the total system run time."
                  },
                  "system_run_hours_low": {
                      "title": "31.3 - System Run Hours Low",
                      "register": 313,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the hours field of the total system run time (Lower Byte)"
                  },
                  "system_run_hours_high": {
                      "title": "31.4 - System Run Hours High",
                      "register": 314,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the hours field of the total system run time (Upper Byte)"
                  },
                  "service_alarm_secs": {
                      "title": "31.5 - Service Alarm Secs",
                      "register": 315,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the seconds field of the Service Alarm."
                  },
                  "service_alarm_mins": {
                      "title": "31.6 - Service Alarm Mins",
                      "register": 316,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the minutes field of the Service Alarm."
                  },
                  "service_alarm_hours": {
                      "title": "31.7 - Service Alarm Hours",
                      "register": 317,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the hours field of the Service Alarm."
                  },
                  "pump_1_run_secs": {
                      "title": "32.8 - Pump 1 Run Secs",
                      "register": 328,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the seconds field of the total Pump 1 run time."
                  },
                  "pump_1_run_mins": {
                      "title": "32.9 - Pump 1 Run Mins",
                      "register": 329,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the minutes field of the total Pump 1 run time."
                  },
                  "pump_1_run_hours": {
                      "title": "32.10 - Pump 1 Run Hours",
                      "register": 330,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the hours field of the total Pump 1 run time."
                  },
                  "pump_2_run_secs": {
                      "title": "32.11 - Pump 2 Run Secs",
                      "register": 331,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the seconds field of the total Pump 2 run time."
                  },
                  "pump_2_run_mins": {
                      "title": "32.12 - Pump 2 Run Mins",
                      "register": 332,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the minutes field of the total Pump 2 run time."
                  },
                  "pump_2_run_hours": {
                      "title": "32.13 - Pump 2 Run Hours",
                      "register": 333,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter is the hours field of the total Pump 2 run time."
                  },
                  "pump_1_start_count_low": {
                      "title": "33.14 - Pump 1 Start Count Low",
                      "register": 344,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter indicates the number of times pump 1 is started  (Lower Byte)."
                  },
                  "pump_1_start_count_high": {
                      "title": "33.15 - Pump 1 Start Count High",
                      "register": 345,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter indicates the number of times pump 1 is started  (Upper Byte)."
                  },
                  "pump_2_start_count_low": {
                      "title": "33.16 - Pump 2 Start Count Low",
                      "register": 346,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter indicates the number of times pump 2 is started  (Lower Byte)."
                  },
                  "pump_2_start_count_high": {
                      "title": "33.17 - Pump 2 Start Count High",
                      "register": 347,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter indicates the number of times pump 2 is started (Upper Byte)."
                  },
                  "high_level_count": {
                      "title": "34.18 - High Level Count",
                      "register": 358,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter indicates the total number of times high level fault condition has occurred."
                  },
                  "low_level_count": {
                      "title": "34.19 - Low Level Count",
                      "register": 359,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter indicates the total number of times low level fault condition has occurred."
                  },
                  "low_pressure_count": {
                      "title": "34.20 - Low Pressure Count",
                      "register": 360,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This parameter indicates the total number of times low pressure fault condition has occurred."
                  },
                  "fault_log_0_timestamp": {
                      "title": "35.0 - Fault Log 0 Timestamp",
                      "register": 350,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This is a timestamp, in seconds, of this fault log entry"
                  },
                  "fault_log_0_alarm": {
                      "title": "35.1 - Fault Log 0 Alarm",
                      "register": 351,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535,
                      "description": "This is the particular fault of this log entry"
                  },
                  "fault_log_0_state": {
                      "title": "35.2 - Fault Log 0 State",
                      "register": 352,
                      "type": "boolean",
                      "description": "This is the state of the fault for this log entry"
                  },
                  "log_timestamp_0": {
                      "title": "36.0 - Log Timestamp 0",
                      "register": 360,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "variable_0_log_0": {
                      "title": "37.0 - Variable 0 Log 0",
                      "register": 370,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "variable_1_log_0": {
                      "title": "38.0 - Variable 1 Log 0",
                      "register": 380,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  },
                  "variable_2_log_0": {
                      "title": "39.0 - Variable 2 Log 0",
                      "register": 390,
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 65535
                  }
              },
              "definitions": {}
          }
      }
  }


  const titles = [
    {
      'main_screen': {
        'key': 'main',
        'title': "Main Screen",
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>,
      }
    },
    {
      'alarms': {
        'key': 'alarms',
        'title': "Alarms",
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
        </svg>
        ,
      }
    },
    {
      'logged_data': {
        'key': 'logged',
        'title': "Logged Data",
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>


      }
    },
    {
      'trend_plot': {
        'key': 'plot',
        'title': "Trend Plot",
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
        </svg>
        ,
      }
    },
    {
      'setup': {
        'key': 'setup',
        'title': "Setup",
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      }
    },
    {
      'data_time': {
        'key': 'time',
        'title': "Date & Time",
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
        </svg>
      }
    },
    {
      'parameters': {
        'key': 'parameters',
        'title': "All Parameters",
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
      }
    },
    {
      'diagnostics': {
        'key': 'diagnostics',
        'title': "Diagnostics",
        'icon': "home",
      }
    },

  ]



  const [mainTitles, setMainTitles] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState(null)

  const [showDialog, setShowDialog] = useState(false);

  const paginationSize = 4;

  const systemStatus = "Running";


  const { isLoading, isFetching, data, isError, error, refetch } = useQuery(['formData'], () => getFormData(), {
    enabled: true,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
     onSuccess: (data) => {
      console.log("Form data is", data);

     
        //setFormData(data);

        try{
          const { show } = showDialog

          if(show === true){
            console.log("Show Dialog is ", show);
            setShowDialog((prev) => {
              return {
               show: false
              }
            })
          }
        }catch(err){

        }
     
    },
    onError: (error) => {
      console.log("Error", error);
    }
  });



  useEffect(() => {
    console.log('Home Screen')
    const { properties } = schema;
    const keys = Object.keys(properties);
    setMainTitles(keys);
  }, [])

  const getNestedProperty = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    //return path.split('.')
  };

  const setNestedProperty = (obj, path, value) => {
    try{
      const parts = path.split('.');
      const last = parts.pop();
      const target = parts.reduce((acc, part) => {
        if (!acc[part]) {
          acc[part] = {};
        }
        console.log("Acc is ", acc[part]);
        return acc[part];
      }, obj);
      target[last] = typeof value !== 'Boolean' ? value : Boolean(value);
      console.log("Successfully set value:", value, "at path:", path);
      return obj;

    }catch(err){
      console.log("Error in setting nested property ", err);
      return undefined
    }
  
  };


  const subToogleDialog = ({data, obj}) =>{
      try{
          const selected = obj      
          let definition = null
          let min = null
          let max = null
          let description = null
          let dCurrentView = null
          let currentRoute = null;
          let value = null
          try {
            const { journey } = selected;
            currentRoute = journey;
            currentRoute = currentRoute.replace("schema.properties.", "properties.");
            const nestedValue = getNestedProperty(schema, currentRoute);
            const ref = nestedValue?.["$ref"];
            const maximum = nestedValue?.["maximum"];
            const minimum = nestedValue?.["minimum"];
            description = nestedValue?.["description"];
            const defKeyName = ref ? ref.split("/").pop() : null;
            definition = defKeyName ? schema.definitions[defKeyName] : null;
            console.log("Definition", definition);
            min = minimum;
            max = maximum;
          } catch (err) {
            console.log("Error", err);
          }


          if(currentRoute){      
              const routeArrays = currentRoute.split('.');        
              console.log("Route Arrays is ", routeArrays);
              const withoutProperties = routeArrays.filter(item => item !== 'properties')
              const cleanedRouter = withoutProperties.join('.');
              value = getNestedProperty(data, cleanedRouter);
          }
          if(definition){
            try{
              const { enumNames } = definition
              if(enumNames && enumNames.length > 0){
                //temp disabled
               /*  dCurrentView = enumNames.length > paginationSize ? {
                    start: 0,
                    end: paginationSize - 1,
                    total: enumNames.length
                  } : {
                    start: 0,
                    end: enumNames.length,
                    total: enumNames.length
                  } */
                 dCurrentView = {
                    start : 0,
                    end : paginationSize,
                    total : enumNames.length,
                    currentPage: 0,
                    totalPages : Math.ceil(enumNames.length / paginationSize)
                 }
              }else{
                dCurrentView.total = 0;
              }

          }catch(err){
              console.log("Error in getting enum values ", err);
            }
          }
         
          setShowDialog((prev) => {
            return {
              ...prev,
              selected,
              show: !prev.show,
              definition: definition,
              min: min,
              max: max,
              description: description,
              dCurrentView: dCurrentView, //temp disabled
              currentValue: "",
              data: value,        
            }
          })

        }catch(err){

            console.log("Error in subToogleDialog ", err);
        }
  }



  const toggleDialog = useCallback((event) => {
    //console.log("Passed value into toggle dialog callback is  ", event);
    const { selected } = event
    //console.log("Selected value selected is ", selected);
   
    let definition = null
    let min = null
    let max = null
    let description = null
    let dCurrentView = null
    let currentRoute = null;
    let value = null
    try {
      const { journey } = selected;
      currentRoute = journey;
      currentRoute = currentRoute.replace("schema.properties.", "properties.");
      console.log("Current Route is ---------", currentRoute);
      const nestedValue = getNestedProperty(schema, currentRoute);
      console.log("Clicked Obj details is ", nestedValue);
      const ref = nestedValue?.["$ref"];
      const maximum = nestedValue?.["maximum"];
      const minimum = nestedValue?.["minimum"];
      description = nestedValue?.["description"];
      const defKeyName = ref ? ref.split("/").pop() : null;
      definition = defKeyName ? schema.definitions[defKeyName] : null;
      console.log("Definition", definition);
      min = minimum;
      max = maximum;
    } catch (err) {
      console.log("Error", err);
    }

    if(currentRoute){      
        const routeArrays = currentRoute.split('.');        
        console.log("Route Arrays is ", routeArrays);
        const withoutProperties = routeArrays.filter(item => item !== 'properties')
        const cleanedRouter = withoutProperties.join('.');
        value = getNestedProperty(data, cleanedRouter);
    }
    if(definition){
      try{
        const { enumNames } = definition
        if(enumNames && enumNames.length > 0){
          dCurrentView = enumNames.length > 8 ? {
              start: 0,
              end: 7,
              total: enumNames.length
            } : {
              start: 0,
              end: enumNames.length,
              total: enumNames.length
            }
        }

     }catch(err){
        console.log("Error in getting enum values ", err);
      }
    }

    if(!selected){
      letUpdate(data);
    }

    setShowDialog((prev) => {
      return {
        ...prev,
        selected,
        show: !prev.show,
        definition: definition,
        min: min,
        max: max,
        description: description,
        dCurrentView: dCurrentView,
        currentValue: "",
        data: value,        
      }
    })
  }, []);


  useEffect(() =>{
    console.log("Show Dialog is xxxx", showDialog);
  },[showDialog])



  const optionSelector = async ({indexValue}) => {
    try{

      //for testing 

      setShowDialog((prev) => {
        return {
         show: false
        }
      })
      return true;
      const {selected } = showDialog
      const { journey } = selected;

      const routeArray = journey.split('.');
      const noProps = routeArray.filter(item => item !== 'properties').join('.');
      const noSchema = noProps.replace("schema.", "")
      console.log("No Schema is ", noSchema);

      const copiedData = JSON.parse(JSON.stringify(data));
      const updatedData = setNestedProperty(copiedData, noSchema, indexValue);

      console.log("Updated Data is ", updatedData);

     if(updatedData !== null && updatedData !== undefined){
         console.log("Updated Data is ", updatedData);
         const response = await updateFormData(updatedData);
         console.log("Response is ", response);
         refetch();      
      }  


    }catch(err){
      console.log("Error in option selector ", err);
    }
  }


  const letUpdate = async () => {
    console.log("I am calling to update the data ");
    console.log("Current Dialogs is ", showDialog);

  refetch();
  return true;

    try{

      const {  
          currentValue,
          max, 
          min,
          selected
       } = showDialog;

       const { journey } = selected;

       const routeArray = journey.split('.');
       const noProps = routeArray.filter(item => item !== 'properties').join('.');
       const noSchema = noProps.replace("schema.", "")
       console.log("No Schema is ", noSchema);

       const copiedData = JSON.parse(JSON.stringify(data));
       const updatedData = setNestedProperty(copiedData, noSchema, currentValue);

       console.log("Updated Data is ", updatedData);

      if(updatedData !== null && updatedData !== undefined){
          console.log("Updated Data is ", updatedData);
          const response = await updateFormData(updatedData);
          console.log("Response is ", response);
          refetch();      
       }  



    }catch(err){
      console.log("Error in let update ", err);
    }finally{
      setShowDialog((prev) => {
        return {
          ...prev,
          show: false
        }
    })
  }
}



  const handleButtonClick1 = useCallback((buttonValue) => {
    console.log("Button Value is ", buttonValue);
    try{

      let eixstingValue = showDialog?.currentValue ? showDialog.currentValue : "";

      let stringArray = eixstingValue.split("");

      if (buttonValue === 'Del' && eixstingValue.length > 0) {  

        stringArray.pop();

        //const newValue = eixstingValue.slice(0, -1);
        //eixstingValue = newValue;
      } else {
        stringArray.push(buttonValue);
        //console.log("Updted string is ", String(eixstingValue) + String(buttonValue));
        //eixstingValue = String(eixstingValue) + String(buttonValue);
      }

      console.log("Existing Value is ", eixstingValue);

      if(stringArray.length > 0){
        const newValue = stringArray.join("");
        console.log("Setting the value ", eixstingValue);
        setShowDialog((prev) => {
          return {
            ...prev,
            currentValue: newValue
          }
        })
      }


    }catch(err){
      console.log("Error in handle button click ", err);
    }
    
   /*  setValue((prevValue) => {
      if (buttonValue === 'Del') {
        return prevValue.slice(0, -1);
      }
      return prevValue + buttonValue;
    }); */
  }, []);


 const updateFormData = async (data) => {
 
  try {
    return {}
    const url = 'http://10.0.0.11:3001/form'
    const response = await axios.put(url, data);
    return response.data;
  } catch (err) {
    console.log("Error", err);
    return {}
  }

 }


  const handleButtonClick = (buttonValue) => {
    //console.log("Button Value is ", buttonValue);
    try{

      let eixstingValue = showDialog?.currentValue ? showDialog.currentValue : "";

      let stringArray = eixstingValue.split("");

      if (buttonValue === 'Del') {  
        stringArray.pop();
        //const newValue = eixstingValue.slice(0, -1);
        //eixstingValue = newValue;
      } else {
        stringArray.push(buttonValue);
        //console.log("Updted string is ", String(eixstingValue) + String(buttonValue));
        //eixstingValue = String(eixstingValue) + String(buttonValue);
      }

      //console.log("Existing Value is ", eixstingValue);

      //if(stringArray.length > 0){
        const newValue = stringArray.join("");
        //console.log("Setting the value ", eixstingValue);
        setShowDialog((prev) => {
          return {
            ...prev,
            currentValue: newValue
          }
        })
      //}


    }catch(err){
      console.log("Error in handle button click ", err);
    }
    
 
  };

  useEffect(()=>{
      console.log("Selected Title is ", selectedTitle);
  },[selectedTitle])


  /* useEffect(() =>{
      console.log("Data has changed")
     try{
      if(showDialog){
        const { show, currentValue } = showDialog;
        if(show === true && currentValue){
          setShowDialog((prev) => {
            return {
              ...prev,
              show: false
            }
          })
        }
     }

     }catch(err){
        console.log("Error in updating the data ", err);
     }
      
  },[showDialog]) */


  const memoedList = useMemo(() => {
    if(!selectedTitle){
      return null;
    }     
     return Object.keys(selectedTitle.subTitles).map((menu, index) => {            
      const obj = selectedTitle.subTitles[menu];
      let valueToShow = null;
      let cleanedRouter = null;
      let valueID = null
      let valueIDs = null
      try {
        const currentRoute = obj?.journey ? obj.journey : null;
        if (currentRoute) {
          const routeArrays = currentRoute.split('.');
          const withoutProperties = routeArrays.filter(item => item !== 'properties')
          if (withoutProperties.length > 1) {
            withoutProperties.shift();
          }
          cleanedRouter = withoutProperties.join('.');
          //console.log("Form Data is ", data);
          //console.log("........... Cleaned Router is ", cleanedRouter);
          const value = getNestedProperty(data, cleanedRouter);

          //console.log("Value is", value);

          if(value !== null && value !== undefined){
            if(Array.isArray(value)){
              console.log("Yes it is an array");       
              const doubleClened = currentRoute ? currentRoute.replace("schema.properties.", "properties.") : null;
              console.log("Double Cleaned is ", doubleClened);
              const nestedValue = doubleClened ? getNestedProperty(schema, doubleClened) : null;
              console.log("Nested Value is ", nestedValue);
              const ref = nestedValue?.["$ref"];
              console.log("Ref is ", ref);
              const defKeyName = ref ? ref.split("/").pop() : null;
              console.log("DefKeyName is ", defKeyName);
              const definition = defKeyName ? schema.definitions[defKeyName] : null;
              console.log("Definition is ", definition);
              valueToShow = value[0];
              const correspondingValue = definition?.enumNames[parseInt(valueToShow)];
              console.log("Corresponding Value is ", correspondingValue);
              valueToShow = correspondingValue ? correspondingValue : valueToShow;
              valueID = valueToShow
              valueIDs = value;
            }else{             
             // console.log("###################")
             // console.log("No it is not an array");
              const doubleClened = currentRoute ? currentRoute.replace("schema.properties.", "properties.") : null;
             // console.log("Double Cleaned is ", doubleClened);
              const nestedValue = doubleClened ? getNestedProperty(schema, doubleClened) : null;
             // console.log("Nested Value is ", nestedValue);
              const ref = nestedValue?.["$ref"];
             // console.log("Ref is ", ref);
              const defKeyName = ref ? ref.split("/").pop() : null;
             // console.log("DefKeyName is ", defKeyName);
              const definition = defKeyName ? schema.definitions[defKeyName] : null;
             // console.log("Definition is ", definition);
              const correspondingValue = definition?.enumNames[value];
            //  console.log("Corresponding Value is ", correspondingValue);
              valueToShow = correspondingValue ? correspondingValue : value;
              valueID = value;
            //  console.log("-------------------");
            }
          }
        }
      } catch (err) {
        console.log("Error in getting value ", err);
      }
      const { hasNext, type: currentType,  } = obj
      //if(index < start || index > end){
      //  return null;
      //}

      return <div className="mx-4">
        <div 
            key={index} 
            className="flex flex-row justify-between justify-items-center py-2 mx-3 border-b border-gray-200"
            onClick={(event, index) => {
              if (currentType === "boolean") {
                // Do nothing for boolean type
                return;
              }
              if (obj.type === "object") {
                let currentRoute = obj.journey;
                currentRoute = currentRoute.replace("schema.properties.", "properties.");
                const nestedValue = getNestedProperty(schema, currentRoute);
                //console.log("Clicked Obj details is ", nestedValue);
                const title = nestedValue.title;
                const type = nestedValue.type;
                const subTitles = nestedValue.properties;
                const updatedSubTitles = Object.keys(subTitles).map((subItem, index) => {
                  const title = subTitles[subItem].title;
                  const type = subTitles[subItem].type;
                  const key = subItem;
                  const journey = `${currentRoute}.properties.${subItem}`;
                  const hasNext = type === "object" ? true : false;
                  return {
                    title,
                    type,
                    key,
                    journey,
                    hasNext
                  };
                })
                setSelectedTitle((prev) => {
                  return {
                    ...prev,
                    key: obj.key,
                    title: title,
                    subTitles: updatedSubTitles,
                    type: type,
                    previous: selectedTitle.title,
                    current: obj.key,
                    hasNext: true, // This is for the back button
                    journey: currentRoute,
                  }

                })
              } else {
                console.log("Lets toggle the dialog");
                console.log("Event is ", event);
                console.log("Selected is ", obj);
                console.log("Current Data is ", data);

                //toggleDialog({ event, selected: obj })
                subToogleDialog({data, obj})
              }
            }}
            >
          <h2 className='text-white'>{`${obj.title}`}</h2>
         <p
          className='text-white'
          
         >{hasNext === true ?<>{/* <Button size='xs'>
            <HiOutlineArrowRight className="h-6 w-6" />
          </Button> */}  <button className='mr-3 bg-transparent flex items-center'> 
        <HiOutlineArrowRight className="h-6 w-6 text-white" />
      </button></>:
            currentType === "boolean" ? (
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"                  
                  checked={valueToShow}
                  onChange={async (event) => {
                      const copiedData = JSON.parse(JSON.stringify(data));
                      const updatedData = setNestedProperty(copiedData, cleanedRouter, event.target.checked);
                      if(updatedData){
                        const responses = await updateFormData(updatedData);
                        if(responses){
                          refetch();
                        }
                      }
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#ff8000] peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
              </label>
            ) : (valueToShow !== null && valueToShow !== undefined )? valueToShow : "N/A"
          }</p>
        </div>
      </div>
    })

  }, [selectedTitle, data])



  const backButtonHandlcer = () => {
    const splites = selectedTitle.journey.split('.');
    const countProperties = splites.filter(item => item === 'properties').length;
    //We can assume that if the count of properties is 1, then we are at the top level
    if(countProperties === 1){
        setSelectedTitle(null);
    }else {
      const currentRoute = selectedTitle.journey;
      const splites = currentRoute.split('.');
      const previousRoute = splites.slice(0, splites.length - 2).join('.');
      const previousValue = getNestedProperty(schema, previousRoute);
      const title = previousValue.title;
      const type = previousValue.type;
      const subTitles = previousValue.properties;
      const updatedSubTitles = Object.keys(subTitles).map((subItem, index) => {
        const title = subTitles[subItem].title;
        const type = subTitles[subItem].type;
        const key = subItem;
        const journey = `${previousRoute}.properties.${subItem}`;
        const hasNext = type === "object" ? true : false;
        return {
          title,
          type,
          key,
          journey,
          hasNext
        };
      })

      setSelectedTitle((prev) => {
        return {
          ...prev,
          key: previousValue.key,
          title: title,
          subTitles: updatedSubTitles,
          type: type,
          previous: selectedTitle.title,
          current: previousValue.key,
          hasNext: true, // This is for the back button
          journey: previousRoute
        };
      })                    
    }
}


return(
  <div className='flex items-center justify-center h-screen bg-gray-800'>
    <div className='flex flex-col max-h-[480px] max-w-[800px] bg-gray-500 h-[480px] w-[800px] border-2 border-[#bb394e]'>
    {!selectedTitle ?
      <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 bg-gray-600">
        {/*  <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-4 bg-gray-600"> */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg'>
          <Card className="max-w-lg justify-center items-center">
            <h5 className="text-2l font-light tracking-tight text-gray-900 dark:text-white">
              {"Main Screen"}
            </h5>
            <Button color="grey" onClick={() => {
              navigate("/");
            }}>
              <HiHome className="h-6 w-6" />
            </Button>
          </Card>
          {mainTitles.map((item, index) => {
            const id = item[index];
            const title = schema.properties[item].title;
            const type = schema.properties[item].type;

            let icon = null
            if (title.includes("Settings")) {
              icon = <MdOutlineSettings className="h-6 w-6" />

            }

            const subTitles = schema.properties[item].properties;

            //console.log("Subtitles are ", subTitles);

            const updatedSubTitles = Object.keys(subTitles).map((subItem, index) => {
              const title = subTitles[subItem].title;
              const type = subTitles[subItem].type;
              const key = subItem;
              const journey = `schema.properties.${item}.properties.${subItem}`;
              const hasNext = type === "object" ? true : false;
              return {
                title,
                type,
                key,
                journey,
                hasNext,
              };
            })
            //console.log("Updated Subtitles are ", updatedSubTitles);
            return (
              <Card key={index} className="max-w-md justify-center items-center">
                <h5 className="text-2l font-light tracking-tight text-gray-900 dark:text-white">
                  {title}
                </h5>
                <Button color="grey" onClick={() => {
                  setSelectedTitle({
                    key: item,
                    title: title,
                    subTitles: updatedSubTitles,
                    /*  currentView: updatedSubTitles.length > 8 ? {
                       start: 0, 
                       end: 7
                     }: {
                       start: 0,
                       end: updatedSubTitles.length
                     }, */
                    currentView: {
                      start: 0,
                      end: updatedSubTitles.length
                    },
                    type: type,
                    previous: null,
                    current: item,
                    hasNext: true, // This is for the back button
                    journey: `schema.properties.${item}`
                  });
                }}>{icon ? icon : null}
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
      : <>
          <div id="content" className="bg-gray-800 space-y-1 flex flex-col justify-start w-[100%] h-[100%] overflow-y-scroll">
          <Navbar fluid  className='bg-[#ff8000] sticky top-0 z-50'>
          <div className='flex flex-row items-center justify-center space-x-0'>
      <button onClick={backButtonHandlcer} className='mr-3 bg-transparent flex items-center'> 
        <HiOutlineArrowLeft className="h-6 w-6 text-black" />
      </button>
      <Navbar.Brand className="flex items-center">
        <span className="self-center whitespace-nowrap text-l font-semibold dark:text-white">{`${selectedTitle.title}`}</span>
      </Navbar.Brand>
    </div>
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{`${systemStatus}`}</span>
    <div className="flex md:order-2">
              <button
                className='flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent'
                onClick={() => {
                  setSelectedTitle(null);
                }}
              >
                <RxHamburgerMenu className="h-7 w-7" />
              </button>
             
            </div>
          </Navbar>        
          {memoedList}         
        </div>
      </>}
    </div>

  </div>
)



  return (
   /*  */
   <>
   <div className="flex items-center justify-center mx-auto bg-gray-500 max-w-[800px] max-h-[480px] overflow-scroll"> 
      {!selectedTitle ?
       <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 bg-gray-600">
       {/*  <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-4 bg-gray-600"> */}
          <div className='grid grid-cols-2 md:grid-cols-2 gap-4 max-w-lg'>
          <Card  className="max-w-lg justify-center items-center">
                  <h5 className="text-2l font-light tracking-tight text-gray-900 dark:text-white">
                    {"Main Screen"}
                  </h5>
                  <Button color="grey" onClick={() => {                 
                    navigate("/");
                  }}>
                    <HiHome className="h-6 w-6"/>
                  </Button>
                </Card>
            {mainTitles.map((item, index) => {
              const id = item[index];
              const title = schema.properties[item].title;
              const type = schema.properties[item].type;

              let icon = null 
              if(title.includes("Settings")){
                icon = <MdOutlineSettings className="h-6 w-6" />

              }

              const subTitles = schema.properties[item].properties;

              //console.log("Subtitles are ", subTitles);

               const updatedSubTitles = Object.keys(subTitles).map((subItem, index) => {
                   const title = subTitles[subItem].title;
                   const type = subTitles[subItem].type;
                   const key = subItem;
                   const journey = `schema.properties.${item}.properties.${subItem}`;
                   const hasNext = type === "object" ? true : false;
                   return {
                    title,
                    type,
                    key,
                    journey,
                    hasNext,                   
                  };
               })
              //console.log("Updated Subtitles are ", updatedSubTitles);
              return (
                <Card key={index} className="max-w-md justify-center items-center">
                  <h5 className="text-2l font-light tracking-tight text-gray-900 dark:text-white">
                    {title}
                  </h5>
                  <Button color="grey" onClick={() => {                 
                    setSelectedTitle({
                      key: item,
                      title: title,
                      subTitles: updatedSubTitles,
                     /*  currentView: updatedSubTitles.length > 8 ? {
                        start: 0, 
                        end: 7
                      }: {
                        start: 0,
                        end: updatedSubTitles.length
                      }, */ 
                      currentView: {
                        start: 0,
                        end: updatedSubTitles.length
                      },
                      type: type,
                      previous: null,
                      current: item,
                      hasNext: true, // This is for the back button
                      journey: `schema.properties.${item}`
                    });
                  }}>{icon ? icon : null}
                  </Button>
                </Card>
              )
            })}
          </div>
        </div>
        :
         <>   
   {/* <div id="content" className="bg-gray-800 space-y-1 flex flex-col justify-start" >  */}
      <div id="content" className="bg-gray-800 space-y-1 flex flex-col justify-start w-[100%] h-[100%]">
          <Navbar fluid  className='bg-[#ff8000] sticky top-0 z-50'>
          <div className='flex flex-row items-center justify-center space-x-0'>
      <button onClick={backButtonHandlcer} className='mr-3 bg-transparent flex items-center'> 
        <HiOutlineArrowLeft className="h-6 w-6 text-black" />
      </button>
      <Navbar.Brand className="flex items-center">
        <span className="self-center whitespace-nowrap text-l font-semibold dark:text-white">{`${selectedTitle.title}`}</span>
      </Navbar.Brand>
    </div>
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{`${systemStatus}`}</span>
    <div className="flex md:order-2">
              <button
                className='flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent'
                onClick={() => {
                  setSelectedTitle(null);
                }}
              >
                <RxHamburgerMenu className="h-7 w-7" />
              </button>
             
            </div>
          </Navbar>        
          {memoedList}         
        </div>
        </>
      }

{/* {showDialog.show1 == true && (
        <div className="absolute inset-0  bg-black bg-opacity-50 flex items-start justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Dialog Title
            </h3>
            <p className="text-gray-600 mb-6">This is the dialog content.</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}
 
       
       
      {showDialog.show == true &&  <div className="absolute inset-0  bg-black bg-opacity-50 flex items-start justify-center z-50">

        
        {/* 
          original
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
       
          <div className="bg-white w-full h-full flex flex-col justify-between">   */}    
          <div className='w-[800px] h-[470px] flex flex-col justify-between'>
          <div className="flex justify-start items-center p-4 border-b bg-[#ff8000]">            
            <Button size='xs' onClick={toggleDialog} className='mr-3 bg-transparent'> 
              <HiOutlineArrowLeft className="h-6 w-6 text-black" />
            </Button>
            <h2 className="text-xl font-semibold">{showDialog?.selected?.title}</h2>
            </div>
          <div className="p-4 flex-1 overflow-y-auto bg-gray-300">
            <div className="space-y-4">
              <div className="space-y-0">
                {showDialog?.selected?.description ?
                  <div className="m-3 border border-gray-300 text-gray-700 p-4 rounded">
                    {showDialog.selected.description}
                  </div>
                  : null}             
                {showDialog?.selected?.type === "integer" ? (
                  showDialog?.definition ? (<>
                    <div className='flex justify-between gap-5'>
                            <div className="flex w-1/2 flex-col gap-4 space-y-6" id="checkbox">
                              {
                                showDialog?.definition?.items ?
                                  showDialog?.definition?.items?.enumNames?.map((option, index) => {
                                  const { start, end } = showDialog?.dCurrentView
                                  if(start !== null && end !== null && start !== undefined && end !== undefined){
                                    if(index < start || index > end){
                                      return null;
                                    }else{
                                      return <div
                                      key={index}
                                      className="flex items-center gap-2">
                                      <Checkbox
                                        defaultChecked={showDialog.data?.includes(index)}
                                        id={`option-${index}`}

                                      />
                                      <Label
                                        htmlFor={`option-${index}`}>{showDialog?.definition?.enumNames[index]}</Label>
                                    </div>
                                    }
                                  }
                                    return <div
                                      key={index}
                                      className="flex items-center gap-2">
                                      <Checkbox
                                        defaultChecked={showDialog.data?.includes(index)}
                                        id={`option-${index}`}

                                      />
                                      <Label
                                        htmlFor={`option-${index}`}>{showDialog?.definition?.enumNames[index]}</Label>
                                    </div>
                                  })
                                  :<>      
                                      {showDialog?.definition?.enumNames?.map((option, index) => {
                                        const { start, end } = showDialog?.dCurrentView;
                                        const max = [start, end].reduce((a, b) => Math.max(a, b));
                                        const min = [start, end].reduce((a, b) => Math.min(a, b));
                                        if (start !== null && end !== null && start !== undefined && end !== undefined) {
                                          if (index < start || index > end) {
                                            return null;
                                          } else {
                                            return(
                                              <div key={index} className="flex items-center gap-2">
                                                {index === max ? (
                                                  <div className="flex space-x-2 w-full flex-grow">
                                                    <Button
                                                      className={`w-full text-white ${showDialog.data === index ? 'bg-[#ff8000]' : 'bg-slate-50 text-[#ff8000] border border-gray-500'}`}
                                                      outline={showDialog.data !== index}
                                                      key={`option-${index}`}
                                                      onClick={() => {
                                                        optionSelector({ indexValue: index })
                                                      }}
                                                    >{`${showDialog?.definition?.enumNames[index]}`}</Button>
                                                    <button 
                                                      //size='xs' 
                                                      className={(showDialog?.dCurrentView?.total !== null && showDialog?.dCurrentView?.total !== undefined) && showDialog?.dCurrentView?.total < paginationSize ?'bg-transparent invisible mx-5 border-transparent': 'bg-transparent mx-5 border-transparent'} 
                                                      //outline
                                                      disabled={showDialog?.dCurrentView?.end === showDialog?.dCurrentView?.total}
                                                      /* onClick={() => {
                                                        const toBeStart = (showDialog?.dCurrentView?.start !== null && showDialog?.dCurrentView?.start !== undefined) ? showDialog?.dCurrentView?.start + (paginationSize - 1) : null
                                                        const safeToBeEnd = toBeStart ? toBeStart + (paginationSize - 1) : null
                                                        const total = (showDialog?.dCurrentView?.total !== null && showDialog?.dCurrentView?.total !== undefined) ? showDialog?.dCurrentView?.total : 0
                                                        
                                                        const finalStart =  toBeStart
                                                        const finalEnd = safeToBeEnd > total ? total : safeToBeEnd
                                                        
                                                        const currentPage = finalStart !== null && finalStart !== undefined ? Math.floor(finalStart / paginationSize) + 1 : 1;
                                                        const totalPages = total !== null && total !== undefined ? Math.ceil(total / paginationSize) : 1;

                                                        if (total > 0) {
                                                          setShowDialog((prev) => {
                                                            return {
                                                              ...prev,
                                                              dCurrentView: {
                                                                start: finalStart === 0 ? 0 : finalStart + 1,
                                                                end: finalStart === 0 ? finalEnd : finalEnd + 1,
                                                                total: total,
                                                                currentPage: currentPage,
                                                                totalPages: totalPages
                                                              }
                                                            }

                                                          })
                                                        }
                                                      }} */

                                                        onClick={() => {
                                                          setShowDialog((prev) => {
                                                            const { currentPage, total, totalPages } = prev.dCurrentView;
                                                            if (currentPage < totalPages - 1) {
                                                              const newPage = currentPage + 1;
                                                              const toBeStart = newPage * paginationSize;
                                                              const safeToBeEnd = Math.min(toBeStart + paginationSize, total);
                                                              return {
                                                                ...prev,
                                                                dCurrentView: {
                                                                  ...prev.dCurrentView,
                                                                  start: toBeStart,
                                                                  end: safeToBeEnd,
                                                                  currentPage: newPage,
                                                                },
                                                              };
                                                            }
                                                            return prev; // No change if at last page
                                                          });
                                                        }}
                                                     
                                                    >
                                                      <HiOutlineArrowDown className="h-6 w-6 mx-2" />
                                                    </button>
                                                  </div>
                                                ) : index === min ? (
                                                  <div className="flex space-x-2 w-full flex-grow">
                                                    <Button
                                                      className={`w-full text-white ${showDialog.data === index ? 'bg-[#ff8000]' : 'bg-slate-50 text-[#ff8000] border border-gray-500'}`}
                                                      outline={showDialog.data !== index}
                                                      key={`option-${index}`}
                                                      onClick={() => {
                                                        optionSelector({ indexValue: index })
                                                      }}
                                                    >{`${showDialog?.definition?.enumNames[index]}`}</Button>
                                                    <button   
                                                    className={showDialog?.dCurrentView?.total !== null && showDialog?.dCurrentView?.total !== undefined && (showDialog?.dCurrentView?.total < paginationSize || showDialog?.dCurrentView?.start === 0)  ?'bg-transparent invisible mx-5 border-transparent': 'bg-transparent mx-5 border-transparent'}                                             
                                                    //size='xs' 
                                                    //outline
                                                      disabled={showDialog?.dCurrentView?.start === 0}
                                                      /* onClick={() => {
                                                        const safeToStart = (showDialog?.dCurrentView?.start !== null && showDialog?.dCurrentView?.start !== undefined) ? showDialog?.dCurrentView?.start - (paginationSize - 1) : null
                                                        const safeToBeEnd = (safeToStart != null) ? safeToStart + (paginationSize - 1) : null
                                                        const total = (showDialog?.dCurrentView?.total !== null && showDialog?.dCurrentView?.total !== undefined) ? showDialog?.dCurrentView?.total : 0
                                                        
                                                        const finalStart = safeToStart < 0 ? 0 : safeToStart
                                                        const finalEnd = safeToBeEnd < total ? safeToBeEnd : total

                                                        const currentPage = finalStart !== null && finalStart !== undefined ? Math.floor(finalStart / paginationSize) + 1 : 1;
                                                        const totalPages = total !== null && total !== undefined ? Math.ceil(total / paginationSize) : 1;
                                                        
                                                        if (total > 0) {
                                                          setShowDialog((prev) => {
                                                            return {
                                                              ...prev,
                                                              dCurrentView: {
                                                                start: finalStart === 0 ? 0 : finalStart + 1,
                                                                end: finalEnd === 0 ? finalEnd : finalEnd + 1,
                                                                total: total,
                                                                currentPage: currentPage,
                                                                totalPages: totalPages
                                                              }
                                                            }
                                                          })
                                                        }
                                                      }} */

                                                        onClick={() => {
                                                          setShowDialog((prev) => {
                                                            const { currentPage, total } = prev.dCurrentView;
                                                            if (currentPage > 0) {
                                                              const newPage = currentPage - 1;
                                                              const toBeStart = newPage * paginationSize;
                                                              const safeToBeEnd = Math.min(toBeStart + paginationSize, total);
                                                              return {
                                                                ...prev,
                                                                dCurrentView: {
                                                                  ...prev.dCurrentView,
                                                                  start: toBeStart,
                                                                  end: safeToBeEnd,
                                                                  currentPage: newPage,
                                                                },
                                                              };
                                                            }
                                                            return prev; // No change if at first page
                                                          });
                                                        }}
                                                    >
                                                      <HiOutlineArrowUp className="h-6 w-6 mx-2" />
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="flex space-x-2 w-full flex-grow">
                                                  <Button
                                                     className={`w-full text-white ${showDialog.data === index ? 'bg-[#ff8000]' : 'bg-slate-50 text-[#ff8000] border border-gray-500'}`}
                                                    outline={showDialog.data !== index}
                                                    key={`option-${index}`}
                                                    onClick={() => {
                                                      optionSelector({ indexValue: index })
                                                    }}
                                                  >{`${showDialog?.definition?.enumNames[index]}`}</Button>
                                                  <Button 
                                                      size='xs' 
                                                      disabled={true}        
                                                      className='invisible'                                     
                                                    >                                              
                                                    </Button>
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          }
                                        }

                                      })}
                          

                                  </>

                              }
                            </div>
                          {/*   {
                            showDialog?.dCurrentView?.total !== null && showDialog?.dCurrentView?.total !== undefined && showDialog?.dCurrentView?.total > 7 ? (
                              <div className="flex-grow text-center">
                                <div className="flex justify-center space-x-2">
                                  <Button size='xs' outline                             
                                    disabled={showDialog?.dCurrentView?.end === showDialog?.dCurrentView?.total}
                                    onClick={() => {
                                      const toBeStart = (showDialog?.dCurrentView?.start !== null &&  showDialog?.dCurrentView?.start !== undefined)? showDialog?.dCurrentView?.start + (paginationSize - 1) : null
                                      const safeToBeEnd = toBeStart ? toBeStart + (paginationSize - 1) : null
                                      const total = (showDialog?.dCurrentView?.total !== null && showDialog?.dCurrentView?.total !== undefined) ? showDialog?.dCurrentView?.total : 0
                                      if(total > 0){
                                        setShowDialog((prev) => {
                                          return {
                                            ...prev,
                                            dCurrentView: {
                                              start: toBeStart,
                                              end: safeToBeEnd > total ? total : safeToBeEnd,
                                              total: total
                                            }
                                          }

                                        })                           
                                      }                             
                                    }} 
                                  >
                                    <HiOutlineArrowDown className="h-6 w-6" />
                                  </Button>
                                  <Button size='xs' outline
                                    disabled={showDialog?.dCurrentView?.start === 0}
                                    onClick={() => {
                                      const safeToStart = (showDialog?.dCurrentView?.start !== null && showDialog?.dCurrentView?.start !== undefined) ? showDialog?.dCurrentView?.start - (paginationSize - 1) : null
                                      const safeToBeEnd = (safeToStart != null )? safeToStart + (paginationSize - 1) : null
                                      const total = (showDialog?.dCurrentView?.total !== null && showDialog?.dCurrentView?.total !== undefined)? showDialog?.dCurrentView?.total : 0
                                      if(total > 0){
                                        setShowDialog((prev) => {
                                          return {
                                            ...prev,
                                            dCurrentView: {
                                              start: safeToStart < 0 ? 0 : safeToStart,
                                              end: safeToBeEnd < total ? safeToBeEnd : total,
                                              total: total
                                            }
                                          }
                                        }) 
                                      }
                                    }} 
                                  >
                                    <HiOutlineArrowUp className="h-6 w-6" />
                                  </Button>
                                </div>
                              </div>
                              ) : null 
                            } */}
                            <div className="w-1/2 flex flex-col items-start space-y-2 px-5" id="checkbox1">
                            <p>{`${showDialog?.description ? showDialog?.description: ""}`}</p>  
                            </div>
                    </div>

                    {showDialog?.dCurrentView?.totalPages > 1 ? (<div className='flex justify-between mt-2'>      
                             
                             <p>{ `${(showDialog?.dCurrentView?.currentPage + 1)} / ${showDialog?.dCurrentView?.totalPages}`}</p>
                             <button onClick={toggleDialog} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-yellow-500">
                               Cancel
                           </button>
                     
                             
                           </div>
                    
                    ) :  <div className='flex justify-end mt-2'>      
                             
                    <button onClick={toggleDialog} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-yellow-500">
                      Cancel
                  </button>
            
                    
                  </div>
                    }


                    
                      </>
                      ) :<div className="flex justify-between">
                  <div className="w-1/2 flex flex-col items-start space-y-2">
                    <div>
                     {/*  <p className="font-bold">{`New Value:${showDialog?.currentValue}`}</p> */}
                     <p className="font-bold">
                               New Value:&nbsp;&nbsp;&nbsp;&nbsp;<span className='text-2xl text-[#ff8000]'>{showDialog?.currentValue}</span>
                    </p>
                    </div>
                    <div>
                      <p>Current:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{showDialog?.data}</p>
                    </div>
                    <div>
                     {/*  <p>{`Min:\t ${showDialog?.min}`}</p> */}
                      <p>Min:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{showDialog?.min}</p>
                    </div>
                    <div>
                    <p>Max:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{showDialog?.max}</p>
                    </div>                 
                    <div>
                      <p>{`${showDialog?.description}`}</p>                      
                    </div>
                  </div>
                
                  <div className="w-1/2 grid grid-cols-3 gap-2">                  
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9',  '.', '0','-', 'Del'].map((buttonValue) => (
                      <button
                        key={buttonValue}
                        className="bg-gray-500 p-2 rounded"
                        onClick={() => handleButtonClick(buttonValue)}
                      >
                        {buttonValue}
                      </button>
                    ))}
                   
                  </div>
                  
                </div>

                ) : null}


      {showDialog?.definition?.enumNames ? null :   
              <div className="flex justify-end space-x-2 p-4 border-b">     
              <button onClick={toggleDialog} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-yellow-500">
                Cancel
              </button>      
              <button onClick={letUpdate} className="px-4 py-2 bg-[#ff8000] text-black rounded hover:bg-yellow-500">
                Update
              </button>
            </div>}


              </div>
            </div>
         
          </div>
        </div>
      </div>
      }

   </div> 
    </>
  );


}
