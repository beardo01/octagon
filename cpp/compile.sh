#!/bin/bash

echo "Compiling Timeline..."
clang -std=c++11 -c Timeline.cpp
clang -std=c++11 -c Timeline-odb.cxx

echo "Compiling Event..."
clang -std=c++11 -c Event.cpp
clang -std=c++11 -c Event-odb.cxx

echo "Compiling TimelineItem..."
clang -std=c++11 -c TimelineItem.cpp
clang -std=c++11 -c TimelineItem-odb.cxx

echo "Compiling User..."
clang -std=c++11 -c User.cpp
clang -std=c++11 -c User-odb.cxx

echo "Compiling driver..."
clang -std=c++11 -c driver.cpp

echo "Linking files..."
#clang -g -lbcrypt -lboost_regex -o driver driver.o Timeline-odb.o Event-odb.o TimelineItem-odb.o User-odb.o -lodb-pgsql -lodb
clang -o driver driver.o Timeline-odb.o Event-odb.o TimelineItem-odb.o User-odb.o -lbcrypt -lboost_regex -lodb-pgsql -lstdc++ -lodb

echo "Doneski"
