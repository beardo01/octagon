#!/bin/bash

echo "Compiling Timeline..."
g++ -c ~/dev/uni/345/octagon/cpp/Timeline.cpp

echo "Compiling Event..."
g++ -c ~/dev/uni/345/octagon/cpp/Event.cpp

echo "Compiling TimelineItem..."
g++ -c ~/dev/uni/345/octagon/cpp/TimelineItem.cpp

echo "Compiling User..."
g++ --std=c++11 -c ~/dev/uni/345/octagon/cpp/User.cpp

echo "Linking files..."
g++ --std=c++11 -lbcrypt driver.cpp -o driver

echo "Doneski"
