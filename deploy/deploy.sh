#!/bin/bash
echo "======== COMPILING ========\n\n"

echo "Compiling Timeline..."
g++ -c ../cpp/Timeline.cpp
g++ -c ../cpp/Timeline-odb.cxx

echo "Compiling Event..."
g++ -c ../cpp/Event.cpp
g++ -c ../cpp/Event-odb.cxx

echo "Compiling TimelineItem..."
g++ -c ../cpp/TimelineItem.cpp
g++ -c ../cpp/TimelineItem-odb.cxx

echo "Compiling User..."
g++ -std=c++11 -c ../cpp/User.cpp
g++ -std=c++11 -c ../cpp/User-odb.cxx

echo "Compiling driver..."
g++ -std=c++11 -c ../cpp/driver.cpp

echo "Linking files..."
g++ -lbcrypt -o driver ../cpp/driver.o ../cpp/Timeline-odb.o ../cpp/Event-odb.o ../cpp/TimelineItem-odb.o ../cpp/User-odb.o -lodb-pgsql -lodb

echo "Doneski"


echo "\n\n======== ODB ========\n\n"
odb -d pgsql --generate-query --generate-schema --std c++11 ../cpp/*.hpp


echo "\n\n======== MOVING TO LIVE ========"
cp -f ../cpp/driver /var/www/html/api/
