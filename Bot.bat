@echo off
color 4 
:loop:
title Alt Manager
color c
node AFK.js
timeout /t 0 >null
goto loop
