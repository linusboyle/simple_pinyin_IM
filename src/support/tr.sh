#!/usr/bin/env bash
#Author: Linus Boyle <linusboyle@gmail.com> 

# 该脚本是对旧有程序的包装，以达到数字id到汉字的转换
./main $@ | xargs node translation.js
