# this script was created by Tim castelijn
# 30 december 2013
# www.timcastelijn.nl
# it will only work in xy space and is especially designed for a laser cutter
feedrate_cut=9
intensity_cut=255
feedrate_engrave=30
intensity_engrave=80
curve_tolerance=0.01
curve_angle_tolerance=5

import rhinoscriptsyntax as rs
import math

path = rs.GetObjects("Select Curves/polylines/arcs/circles", rs.filter.curve, True, True)
filename = rs.SaveFileName ("Save", "Toolpath Files (*.nc)|*.nc||", "/users/timcastelijn/documents")

file = open(filename, 'w')

# write header
file.write("G20\n") # Measurement units to inches
file.write("G90\n") # absolute positioning

# file.write("F"+str(feedrate_cut)+"\n") # feed rate
# file.write("S"+str(intensity_cut)+"\n") # spindle speed
# file.write("M08\n") # coolant on
for curve in path:
    
    # fast move to path start
    pt = rs.CurveStartPoint(curve)
    file.write("G00 X%0.4f"%pt.X+" Y%0.4f"%pt.Y+" F%0.4f"%feedrate_engrave+"\n")
    # file.write("M03\n") # spindle on clockwise
    
    # # change feedrate for engraving
    # if (rs.ObjectLayer(curve) == "engrave"):
    #     file.write("F%0.1f"%feedrate_engrave + "\n")
    #     file.write("S%0.1f"%intensity_engrave + "\n")
    # else:
    #     file.write("F%0.1f"%feedrate_cut + "\n")
    #     file.write("S%0.1f"%intensity_cut + "\n")
    
    # detect type of curve for different G-codes
    if (rs.IsPolyline(curve)) or rs.IsLine(curve):

        points = rs.CurvePoints(curve)
        for pt in points:
            file.write("G01 X%0.4f"%pt.X+" Y%0.4f"%pt.Y+"\n")
    
    elif rs.IsArc(curve):
        normal = rs.CurveTangent(curve, 0)
        
        # get curvepoints
        startpt     = rs.CurveStartPoint(curve)
        endpt       = rs.CurveEndPoint(curve)
        midpt       = rs.ArcCenterPoint(curve)
        
        # calc G2/G3 parameters
        x   = endpt.X
        y   = endpt.Y
        i   = -startpt.X + midpt.X
        j   = -startpt.Y + midpt.Y
        
        # make a distinction between positive and negative direction
        if ((normal[1] > 0) and (startpt.X > midpt.X)) or ((normal[1] < 0) and (startpt.X < midpt.X) or (normal[1]==0 and (normal[0]==1 or normal[0] ==-1) and startpt.X == midpt.X)):
#                file.write(";positive ARC ccw \n")
            file.write("G03 X%0.4f"%x+" Y%0.4f"%y+" I%0.4f"%i+" J%0.4f"%j +"\n")
        else:
#                file.write(";negative ARC cw \n")
            file.write("G02 X%0.4f"%x+" Y%0.4f"%y+" I%0.4f"%i+" J%0.4f"%j +"\n")

    else:
        print "curve detected, subdiv needed"
        
        #rs.ConvertCurveToPolyline(segment,angle_tolerance=5.0, tolerance=0.01, delete_input=False)
        polyLine    = rs.ConvertCurveToPolyline(curve, curve_angle_tolerance, curve_tolerance)
        points      = rs.CurvePoints(polyLine)
        
        # insert division points as line
        for pt in points:
            file.write("G01 X%0.4f"%pt.X+" Y%0.4f"%pt.Y+"\n")
        # remove objects after use
        rs.DeleteObjects(polyLine)
            
    # file.write("M05\n") # spindle stop

file.write("G00 X0.0000 Y0.0000\n")
# file.write("M09\n") # coolant off
# file.write("M30\n") # program end and reset
file.close()

# rs.MessageBox("file succesfully saved to: " + filename + ", with the following parameters:\n"+
#               "cut feedrate: %0.1f"%feedrate_cut+"\n"+
#               "cut intensity: %0.1f"%intensity_cut+"\n"+
#               "engrave feedrate: %0.1f"%feedrate_engrave+"\n"+
#               "engrave intensity: %0.1f"%intensity_engrave+"\n"
#               )
