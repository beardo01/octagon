#!/bin/bash

echo "Compiling Timeline..."
g++ -c Timeline.cpp
g++ -c Timeline-odb.cxx

echo "Compiling Event..."
g++ -c Event.cpp
g++ -c Event-odb.cxx

echo "Compiling TimelineItem..."
g++ -c TimelineItem.cpp
g++ -c TimelineItem-odb.cxx

echo "Compiling User..."
g++ -std=c++11 -c User.cpp
g++ -std=c++11 -c User-odb.cxx

echo "Compiling driver..."
g++ -std=c++11 -c driver.cpp

echo "Linking files..."
g++ -lbcrypt -lboost_regex -o driver driver.o Timeline-odb.o Event-odb.o TimelineItem-odb.o User-odb.o -lodb-pgsql -lodb

echo "Doneski"
