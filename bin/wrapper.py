#!/usr/bin/env python
# encoding: utf-8
# Author: Linus Boyle <linusboyle@gmail.com> 

import sys
import os
import subprocess

argv = sys.argv
scriptpath = os.path.dirname(argv[0]) 
main_program_name = scriptpath + "/main"

if len(argv) != 3:
    print "Argument error"
    exit()

inputfilename = argv[1]
outputfilename = argv[2]

inputfile = open(inputfilename, "r")
outputfile = open(outputfilename, "w")

for line in inputfile:
    args = line.split()
    args.insert(0, main_program_name)
    retval = subprocess.check_output(args)
    outputfile.write(retval)
