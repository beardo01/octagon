#!/bin/bash

echo "Compiling Timeline..."
g++ -c /Users/oreid/dev/uni/345/octagon/cpp/Timeline.cpp

echo "Compiling TimelineItem..."
g++ -c ~/dev/uni/345/octagon/cpp/TimelineItem.cpp

echo "Compiling driver..."
g++ -c ~/dev/uni/345/octagon/cpp/driver.cpp

echo "Linking files..."
g++ -o driver driver.o

echo "Doneski"
