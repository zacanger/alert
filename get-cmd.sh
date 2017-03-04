#!/bin/sh

if hash zenity 2>/dev/null ; then
  C=zenity
elif hash yad 2>/dev/null ; then
  C=yad
elif hash notify-send 2>/dev/null ; then
  C=notify-send
elif hash xmessage 2>/dev/null ; then
  C=xmessage
elif hash dialog 2>/dev/null ; then
  C=dialog
elif hash whiptail 2>/dev/null ; then
  C=whiptail
fi

echo $C
