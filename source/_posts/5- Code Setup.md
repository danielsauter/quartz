---
title: Software Setup
date: 6/3/2016
---

# Requirements
- [McNeel Rhino](https://github.com/johnlauer/serial-port-json-server)
- [Serial Port JSON Server](https://github.com/johnlauer/serial-port-json-server)
- [TinyG - Hardware Fiddle](https://github.com/synthetos/TinyG/wiki/Chilipeppr)

* * * 

# Setup the TinyG board
- Install [FTDI Drivers](https://github.com/synthetos/TinyG/wiki/Connecting-TinyG#install-ftdi-drivers)
- Power up and connect the TinyG board using via USB to your computer.
- Run the Serial Port JSON Server and leave it running in the background. 
- Open your browser and go to [chilipeppr.com/tinyg](http://chilipeppr.com/tinyg) 
- Go to the Serial Port JSON Server fiddle in bottom right and refresh to see the TinyG listed.
- Select and connect to the board.
- **Change the following settings:**
	- Change Latch Velocity to 50
	- X and Y Travel/rev = 36.54
	- X and Y Microsteps = 8
	- Z Travel/rev =1.25
	- Z microsteps = 4

* * * 

# Workflow
- #### Generate the geometery
	- The extrusion path is first created in Rhino. All the measurememts are in millimeters unless otherwise specified.
	- Run the Python Script Editor in Rhino. Use command: **EditPythonScript** in Rhino Console.
	- Run [**this **](https://gist.github.com/jaskiratr/9baad314e0218bfb0174f3a6bb7eccc1#file-quartz-rhino-python-script-py )script to generate a G-Code file. The code has been taken and modified from [timcastelijn/gcode-generator](https://github.com/timcastelijn/gcode-generator).
	- Copy the contents of the saved file that contains the newly written G-Code. Paste it in Chilipeppr to perform the extrusion. 
	![Rhino](/images/rhino.jpg)
	
- #### Run the Extrusion
	
	- This project used browser based Chilipeppr workspace to control the machine. 
	- Open your browser and go to [chilipeppr.com/tinyg](http://chilipeppr.com/tinyg) 
	- Go to the Serial Port JSON Server fiddle in bottom right and refresh to see the TinyG listed.
	- Select and connect to the board.
	- Go to 'Workspace TinyG' fiddle on top left and click the load GCode button. Paste the contents under 'Open Gcode From Clipboard'.
	- Insert the glass rod in the extruder and zero the machine to the correct point for extrusion
	- Power on the air-compressor to start the vacuum and ignite the propane torch at low flame. Leave it on for a few seconds till the glass is in semi-liquid state.
	- Press play button in Chilipeppr GCode fiddle to initiate the movement of the machine.
	![chilipeppr](/images/chilipeppr.jpg)

**Useful Links**
- [TinyG Documentation](https://github.com/synthetos/TinyG)
- [Shapeoko TinyG Setup](https://github.com/synthetos/TinyG/wiki/TinyG-Shapeoko-Setup)
- [Chilipeppr Documentation](https://github.com/synthetos/TinyG/wiki/Chilipeppr)
- [TinyG G-Code Generator](https://github.com/timcastelijn/gcode-generator)
- [Modified G-Code Generator](https://gist.github.com/jaskiratr/9baad314e0218bfb0174f3a6bb7eccc1#file-quartz-rhino-python-script-py)

<script src="https://gist.github.com/jaskiratr/9baad314e0218bfb0174f3a6bb7eccc1.js"></script>