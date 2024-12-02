import { Button, Navbar, Dropdown, Modal, Checkbox, Label,Radio } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, useEffect } from 'preact/hooks';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import axios from "axios";
import { useQuery } from 'react-query';
import '../styles.css';

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


const Settings = () => {
  const navigate = useNavigate();
  const [showKeypad, setShowKeypad] = useState(false);
  const [value, setValue] = useState(0);

  const [showDialog, setShowDialog] = useState(false);

  const [showDialog1, setShowDialog1] = useState(false);

  const [formData, setFormData] = useState({
    "BMS_relay_direction": [
      0,
      1,
      6
    ],
    "pump_1_mode": 1,
    "pump_2_mode": 1,
    "phase_mode": 0,
    "single_pump_en": true,
    "pump_limiting_en": true,
    "level_control_direction": 0,
    "manual_timeout_period": 4,
    "std_alternate_period": 3,
    "acc_alternate_period": 2,
    "antiseize_en": true,
    "antiseize_period": 2,
    "antiseize_run_time": 3,
    "staggered_start_delay": 3,
    "max_idle_period": 2,
    "pressure_start_delay": 2,
    "pressure_min_run": 2,
    "pressure_alarm_delay": 3,
    "service_alarm_en": true,
    "service_alarm_period": 3,
    "max_run_fault_delay": 3,
    "prime_fault_delay": 3,
    "high_level_fault_delay_stormwater": 1,
    "high_level_fault_delay_normal": 3,
    "low_level_fault_delay": 2,
    "under_current_fault_threshold": 11,
    "under_current_fault_delay": 2,
    "zero_current_fault_en": true,
    "zero_current_fault_delay": 2,
    "pump_fault_input_delay": 3,
    "pump_fault_input_auto_reset": true,
    "fault_relay_direction": 0,
    "siren_chirp_en": true,
    "siren_chirp_delay": 1,
    "siren_chirp_period": 3,
    "siren_chirp_time": 2,
    "ext_mute_reset_en": true,
    "system_enable_in": 6,
    "external_mute_in": 7,
    "pump1_fault_in": 0,
    "pump2_fault_in": 7,
    "input_1_function": 2,
    "input_2_function": 2,
    "input_3_function": 1,
    "input_4_function": 2,
    "input_5_function": 1,
    "conductivity_input_en": true,
    "BMS_relay_1": 2,
    "BMS_relay_2": 11,
    "BMS_relay_3": 13,
    "BMS_relay_4": 4,
    "BMS_relay_5": 3,
    "BMS_relay_6": 15,
    "BMS_relay_7": 4,
    "SCADA_baud_rate": 1,
    "SCADA_parity": 0,
    "SCADA_slave_address": 2
  });

  const toggleDialog = useCallback((event) => {
    console.log("Passed value is ", event);
    const { selected } = event
    console.log(selected); // You can use these parameters as needed
    const selectedObject = schema.properties[selected];

    const data = formData?.[selected];

    

    let definition = null
    try {
      const defKeyName = selectedObject["$ref"].split("/").pop();
      definition = schema.definitions[defKeyName];
      console.log("Definition", definition);
    } catch (err) {
      console.log("Error", err);
    }

    console.log(selectedObject);

    console.log("Form data is ", data);
    //setShowKeypad((prev) => !prev);
    setShowDialog((prev) => {
      return {
        ...prev,
        selected: selectedObject,
        show: !prev.show,
        definition: definition,
        id: selected,
        data
      }
    })
  }, []);


  useEffect(() => {
    console.log("showDialog", showDialog);
  }, [showDialog]);


  const schema = {
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
  }

  const uiSchema = {
    "BMS_relay_direction": {
      "ui:widget": "checkboxes"
    }
  }




/*   const { isLoading, isFetching, data, isError, error, refetch } = useQuery(['formData'], () => getFormData(), {
    enabled: true,
    //enabled: selectedSchemaRedux ? true : false,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    //retry: 1,//2, // Retry twice before failing
    //retryDelay: 10, //5000, // Wait for 5 second before retrying
    onSuccess: (data) => {
      console.log("Form data is", data);

     
        setFormData(data);
     
    },
    onError: (error) => {
      console.log("Error", error);
    }
  });
 */

  const submitHandler = async (data) => {
    let updatedFormData = data?.formData;

    console.log("submitHandler", updatedFormData);
    const url = 'http://10.0.0.11:3001/form'
    const response = await axios.put(url, updatedFormData);
    console.log("response", response);

    try {
      setFormData((prev) => ({ ...prev, ...updatedFormData }));
    } catch (err) {
      console.log("Error", err);
    }
  };


  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RSJS Settings</span>
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
        {Object.keys(schema.properties).map((menu, index) => (
          <div key={index} className="flex flex-row justify-between justify-items-center py-2">
            <h2>{`${schema.properties[menu].title}`}</h2>
            {/*  {(index % 2 == 0 )? (
              <p onClick={(event, index) => toggleKeypad({event, selected: menu})}>{menu.value}</p>
            ): (              
              <p onClick={(event, index) => toggleKeypad({event, selected: menu})}>{menu.value}</p>
            )} */}
            <p onClick={(event, index) => toggleDialog({ event, selected: menu })}>{formData?.[menu] && Array.isArray(formData[menu]) ? formData[menu][0] : formData[menu]}</p>
          </div>
        ))}
      </div>

 
      {showDialog.show &&  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{showDialog?.selected?.title}</h2>
          <button onClick={toggleDialog} className="text-gray-500 hover:text-gray-800 text-2xl">
            &times;
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-4">
            <div className="space-y-0">

              <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-col items-center">
                  <p>Current : {"10"}</p>
                  {/*  <p>{"10"}</p> */}
                </div>
                <div className="flex flex-col items-center">
                  <p>New : {"100"}</p>
                  {/*  <p>{"100"}</p> */}
                </div>
              </div>
              {showDialog?.selected?.type === "integer" && "minimum" in showDialog?.selected && "maximum" in showDialog?.selected && (
                <div className="flex flex-row justify-between items-center py-2">

                  <div className="flex flex-col items-center">
                    <p>Min</p>
                    <p>{showDialog?.selected?.minimum}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Max</p>
                    <p>{showDialog?.selected?.maximum}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Unit</p>
                    <p>100</p>
                  </div>
                </div>
              )}
            </div>

            {showDialog?.selected?.type === "array" ? (
              showDialog?.definition ? (
                <div className="flex max-w-md flex-col gap-4" id="checkbox">
                  {
                    showDialog?.definition?.items ?             
                        showDialog?.definition?.items?.enumNames?.map((option, index) => (
                          <div 
                              key={index} 
                              className="flex items-center gap-2">
                            <Checkbox 
                                defaultChecked={showDialog.data?.includes(index)}
                                id={`option-${index}`} />
                            <Label 
                                  htmlFor={`option-${index}`}>{showDialog?.definition?.items?.enumNames[index]}</Label>
                          </div>
                        )
                      ) :
                       showDialog?.definition?.enumNames?.map((option, index) => (
                          <div 
                              key={index} 
                              className="flex items-center gap-2">
                            <Radio 
                                defaultChecked={showDialog.data === index}
                                id={`option-${index}`} 
                                name={`${showDialog.id}_radio`} 
                                value={showDialog?.definition?.enumNames[index]} 
                                />
                            <Label 
                                htmlFor={`option-${index}`}>{showDialog?.definition?.enumNames[index]}</Label>
                          </div>
                        )) 

                  }
                </div>
              ) : <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Del'].map((buttonValue) => (
                  <button
                    key={buttonValue}
                    className="bg-gray-200 p-4 rounded"
                  //onClick={() => handleButtonClick(buttonValue)}
                  >
                    {buttonValue}
                  </button>
                ))}
              </div>

            ) : null}
          
            {showDialog?.selected?.type === "integer" ? (
              showDialog?.definition ? (
                <div className="flex max-w-md flex-col gap-4" id="checkbox">
                  {
                    showDialog?.definition?.items ?                    
                        showDialog?.definition?.items?.enumNames?.map((option, index) => (
                          <div 
                                key={index} 
                                className="flex items-center gap-2">
                            <Checkbox
                                defaultChecked={showDialog.data?.includes(index)} 
                                id={`option-${index}`} 
                                
                                />
                            <Label 
                                htmlFor={`option-${index}`}>{showDialog?.definition?.enumNames[index]}</Label>
                          </div>
                        ))
                       :
                        showDialog?.definition?.enumNames?.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Radio 
                                defaultChecked={showDialog.data === index}
                                id={`option-${index}`} 
                                name={`${showDialog.id}_radio`} 
                                value={showDialog?.definition?.enumNames[index]} 
                                />
                            <Label 
                                htmlFor={`option-${index}`}>{showDialog?.definition?.enumNames[index]}</Label>
                          </div>
                        ))

                  }
                </div>
              ) : <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Del'].map((buttonValue) => (
                  <button
                    key={buttonValue}
                    className="bg-gray-200 p-4 rounded"
                  //onClick={() => handleButtonClick(buttonValue)}
                  >
                    {buttonValue}
                  </button>
                ))}
              </div>

            ) : null}


            {showDialog?.selected?.type === "boolean" ? (
              <div className="flex items-center gap-2">
                <Checkbox id="selection" />
                <Label htmlFor="selection" className="flex">
                  Enable
                </Label>
              </div>
            ) : null}

          </div>
        </div>
        <div className="flex justify-end space-x-2 p-4 border-t">
          <button onClick={toggleDialog} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={toggleDialog} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Confirm
            Confirm
          </button>
        </div>
      </div>
    </div> }


      <Modal
        show={showDialog1.show}
        onClose={toggleDialog}
        className="modal-fullscreen"
      >
        <Modal.Header>{showDialog?.selected?.title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="space-y-0">

              <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-col items-center">
                  <p>Current : {"10"}</p>
                  {/*  <p>{"10"}</p> */}
                </div>
                <div className="flex flex-col items-center">
                  <p>New : {"100"}</p>
                  {/*  <p>{"100"}</p> */}
                </div>
              </div>
              {showDialog?.selected?.type === "integer" && "minimum" in showDialog?.selected && "maximum" in showDialog?.selected && (
                <div className="flex flex-row justify-between items-center py-2">

                  <div className="flex flex-col items-center">
                    <p>Min</p>
                    <p>{showDialog?.selected?.minimum}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Max</p>
                    <p>{showDialog?.selected?.maximum}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Unit</p>
                    <p>100</p>
                  </div>
                </div>
              )}
            </div>
          
            {showDialog?.selected?.type === "integer" ? (
              showDialog?.definition ? (
                <div className="flex max-w-md flex-col gap-4" id="checkbox">
                  {
                    showDialog?.definition?.enumNames?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox id={`option-${index}`} defaultChecked />
                        <Label htmlFor={`option-${index}`}>{showDialog?.definition?.enumNames[index]}</Label>
                      </div>
                    ))

                  }
                </div>
              ) : <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Del'].map((buttonValue) => (
                  <button
                    key={buttonValue}
                    className="bg-gray-200 p-4 rounded"
                  //onClick={() => handleButtonClick(buttonValue)}
                  >
                    {buttonValue}
                  </button>
                ))}
              </div>

            ) : null}


            {showDialog?.selected?.type === "boolean" ? (
              <div className="flex items-center gap-2">
                <Checkbox id="selection" />
                <Label htmlFor="selection" className="flex">
                  Enable
                </Label>
              </div>
            ) : null}

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleDialog}>I accept</Button>
          <Button color="gray" onClick={toggleDialog}>
            Decline
          </Button>
        </Modal.Footer>

      </Modal>

    </>
  );
};

export default Settings;