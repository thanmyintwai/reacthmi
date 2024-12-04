import { useState, useEffect, useCallback, useMemo } from 'preact/hooks'
import { Button, Card, Navbar, Checkbox, Label, Radio } from "flowbite-react";
import { HiOutlineArrowRight, HiOutlineArrowLeft, HiOutlineArrowDown, HiOutlineArrowUp, HiHome } from "react-icons/hi";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const getFormData = async () => {
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


   const schema = {    
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
        "system": {
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
        "testSettings": {
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
            }
          }
        },
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

      return <div className="columns-1 mx-4">
        <div 
            key={index} 
            className="flex flex-row justify-between justify-items-center py-2 mx-10 border-b border-gray-200"
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
          <h2>{`${obj.title}`}</h2>
         <p
          
         >{hasNext === true ? <Button size='xs' outline>
            <HiOutlineArrowRight className="h-6 w-6" />
          </Button> :
            currentType === "boolean" ? (
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"                  
                  checked={valueToShow}
                  onChange={async (event) => {
                      console.log("Event issss ", event.target.checked);
                      console.log("Current Route is ", cleanedRouter);
                      const copiedData = JSON.parse(JSON.stringify(data));
                      console.log("Copied Data is ", copiedData);
                      const updatedData = setNestedProperty(copiedData, cleanedRouter, event.target.checked);
                      console.log("Updated Data is ", updatedData);
                      if(updatedData){
                        //Let's update the data
                        const responses = await updateFormData(updatedData);
                        console.log("Responses is ", responses);
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




  return (
    <>
      {!selectedTitle ?
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-4">
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg'>
            {mainTitles.map((item, index) => {
              const id = item[index];
              const title = schema.properties[item].title;
              const type = schema.properties[item].type;

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
                <Card key={index} className="max-w-lg justify-center items-center">
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
                  }}>
                  </Button>
                </Card>
              )
            })}
          </div>
        </div>
        :
        <>
          <Navbar fluid rounded className='bg-[#ff8000]'>
            <Navbar.Brand href="https://flowbite-react.com">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{`${selectedTitle.title}`}</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
             {/*  <Button
                color="grey"
                onClick={() => {
                  setSelectedTitle(null);
                }}
              >     
                <HiHome className="h-7 w-7" />
              </Button> */}
              <button
                className='flex items-center justify-center p-2 rounded-md hover:bg-[#ff8000] hover:bg-opacity-50 bg-transparent'
                onClick={() => {
                  setSelectedTitle(null);
                }}
              >
                <HiHome className="h-7 w-7" />
              </button>
             
            </div>
          </Navbar>
         {/*  {Object.keys(selectedTitle.subTitles).map((menu, index) => {            
            const obj = selectedTitle.subTitles[menu];
            let valueToShow = null;
            let cleanedRouter = null;
            try {
              const currentRoute = obj?.journey ? obj.journey : null;
              if (currentRoute) {
                const routeArrays = currentRoute.split('.');
                const withoutProperties = routeArrays.filter(item => item !== 'properties')
                if (withoutProperties.length > 1) {
                  withoutProperties.shift();
                }
                cleanedRouter = withoutProperties.join('.');
                console.log("Form Data is ", data);
                const value = getNestedProperty(data, cleanedRouter);
                if(value){
                  if(Array.isArray(value)){
                    valueToShow = value[0];
                  }else{
                    valueToShow = value;
                  }
                }
              }
            } catch (err) {

            }
            const { hasNext, type: currentType,  } = obj
            //if(index < start || index > end){
            //  return null;
            //}

            return <div className="columns-1 mx-4">
              <div 
                  key={index} 
                  className="flex flex-row justify-between justify-items-center py-2"
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
                      toggleDialog({ event, selected: obj })
                    }
                  }}
                  >
                <h2>{`${obj.title}`}</h2>
               <p
                
               >{hasNext === true ? <Button size='xs' outline>
                  <HiOutlineArrowRight className="h-6 w-6" />
                </Button> :
                  currentType === "boolean" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={valueToShow}
                        onChange={async (event) => {
                            console.log("Event is ", event.target.checked);
                            console.log("Current Route is ", cleanedRouter);
                            const copiedData = JSON.parse(JSON.stringify(data));
                            console.log("Copied Data is ", copiedData);
                            const updatedData = setNestedProperty(copiedData, cleanedRouter, event.target.checked);
                            console.log("Updated Data is ", updatedData);
                            

                            if(updatedData){
                              //Let's update the data

                              const responses = await updateFormData(updatedData);
                              console.log("Responses is ", responses);
                              if(responses){
                                refetch();
                              }
                            }
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                    </label>
                  ) : valueToShow ? valueToShow : "N/A"
                }</p>
              </div>
            </div>
          })} */}
          {memoedList}
           <div className="columns-1 mx-4">
           <div className="flex flex-row justify-between justify-items-center py-2">            
           <Button size='xs' className='bg-[#ff8000] hover:bg-yellow-500' outline
                onClick={() =>{
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
                }}            
            >    <HiOutlineArrowLeft className="h-6 w-6" />
                </Button>
                  <div className="flex-grow text-center">
                  <div className="flex justify-center space-x-2">
                    {/* <Button size='xs' outline 
                        disabled={selectedTitle.currentView.end === selectedTitle.subTitles.length}
                        onClick={() =>{
                          const toBeStart = selectedTitle.currentView.start + 7
                          const safeToBeEnd = toBeStart + 7
                          const total = selectedTitle.subTitles.length
                          setSelectedTitle((prev) => {
                              return{
                                ...prev, 
                                currentView: {
                                  start: toBeStart,
                                  end: safeToBeEnd > total ? total : safeToBeEnd
                                }
                              }  
                          })                        
                        }}
                    >
                      <HiOutlineArrowDown className="h-6 w-6" />
                    </Button>
                    <Button size='xs' outline 
                        disabled={selectedTitle.currentView.start === 0}
                        onClick={() =>{
                            const safeToStart = selectedTitle.currentView.start - 7
                            const safeToBeEnd = safeToStart + 7
                            const total = selectedTitle.subTitles.length
                            const lastPage = total % 7
                            setSelectedTitle((prev) =>{
                              return {
                                ...prev, 
                                currentView: {
                                  start: safeToStart < 0 ? 0 : safeToStart,
                                  end: safeToBeEnd < total ? safeToBeEnd : total
                                }
                              }
                            })
                        }}
                    >
                      <HiOutlineArrowUp className="h-6 w-6" />
                    </Button> */}
                  </div>
                </div>
                
                 
            
            </div>
          
                
          </div>
        </>
      }

      {showDialog.show == true && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full h-full flex flex-col justify-between">        
          <div className="flex justify-start items-center p-4 border-b bg-[#ff8000]">            
            <Button size='xs' onClick={toggleDialog} className='mr-3 bg-transparent'> 
              <HiOutlineArrowLeft className="h-6 w-6 text-black" />
            </Button>
            <h2 className="text-xl font-semibold">{showDialog.selected.title}</h2>
            </div>
          <div className="p-4 flex-1 overflow-y-auto">
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
                     <div className='flex justify-between mt-2'>              
                        <p>{ `${(showDialog?.dCurrentView?.currentPage + 1)} / ${showDialog?.dCurrentView?.totalPages}`}</p>
                        <button onClick={toggleDialog} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-yellow-500">
                          Cancel
                      </button>
                
                        
                      </div>
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
                        className="bg-gray-200 p-2 rounded"
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
              <button onClick={letUpdate} className="px-4 py-2 bg-[#ff8000] text-white rounded hover:bg-yellow-500">
                Update
              </button>
            </div>}


              </div>
            </div>
         
          </div>
        </div>
      </div>
      }

    </>
  );


  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-4">
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg'>
        {/*  {titles.map((item, index) => {
          const id = Object.keys(item)[0]
          const title = item[id].title;
          return (
            <Card key={index} className="max-w-lg justify-center items-center">
                <h5 className="text-2l font-light tracking-tight text-gray-900 dark:text-white">
                    {title}
            </h5>
            <Button color="grey" onClick={() =>{
                navigate(`/${item[id].key}`);
            }}>
                  {item[id].icon}

            </Button>
            </Card>
          );
        })} */}
        {
          !selectedTitle ? mainTitles.map((item, index) => {
            const id = item[index];
            const title = schema.properties[item].title;
            return (
              <Card key={index} className="max-w-lg justify-center items-center">
                <h5 className="text-2l font-light tracking-tight text-gray-900 dark:text-white">
                  {title}
                </h5>
                <Button color="grey" onClick={() => {
                  //navigate(`/${item[id].key}`);
                  //navigate(`/${item}`);                  
                  //navigate(`/parameters`);
                  setSelectedTitle({
                    key: item,
                    title: title
                  });
                }}>
                  {/* {item[id].icon} */}

                </Button>
              </Card>
            );
          })
            :
            <Navbar fluid rounded>
              <Navbar.Brand href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{selectedTitle.title}</span>
              </Navbar.Brand>
              <div className="flex md:order-2">
                <Button
                  color="grey"
                  onClick={() => {
                    //navigate("/");
                    setSelectedTitle(null);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                  </svg>
                </Button>
                <Navbar.Toggle />
              </div>
            </Navbar>
        }
      </div>
    </div>
  );
};
