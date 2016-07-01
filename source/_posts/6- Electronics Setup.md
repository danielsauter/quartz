---
title: Electronics Setup
date: 6/2/2016
---

The electronics are fairly easy to setup. The X-Carve may come bundled with Grbl Shield that drives the motors. You'll need to drive 4 motors : X,Y,Z axis stepper motors and A axis, a rotational axis for the extruder motor. TinyG board is a good alternative that is compatible with Chilipeppr. It has 4 motor drivers on-board.

![Tinyg](/images/tinyg2.jpg)

#### Stepper Motor Wiring
- Simply connect the stepper motors to the respective axis on the controller board. More details [here](https://github.com/synthetos/TinyG/wiki/Connecting-TinyG#wire-your-motors).
- Connect the limit switches.
- You can run the wiring to the extruder through [drag chain](https://www.inventables.com/technologies/drag-chain) already present on the board. 

#### Reference Links
- [TinyG Wiring](https://github.com/synthetos/TinyG/wiki/Connecting-TinyG)
- [X Carve Wiring](http://x-carve-instructions.inventables.com/step10/)
