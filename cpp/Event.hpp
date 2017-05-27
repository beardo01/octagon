#ifndef EVENT_H
#define EVENT_H

#include <iostream>
#include <string>
#include <ctime>
#include <vector>
#include <sstream>

// ODB database include
#include <odb/core.hxx>

// String declaration for ODB persistence
#pragma db value(std::string) type("VARCHAR(128)")

using namespace std;

#pragma db object
class Event {
    private:
        // Default constructor for ODB
        Event() {}

        friend class odb::access;

        #pragma db id auto
        unsigned long id_;

        short int type_;
        string description_;
        string location_;

    public:

        // Constructor
        Event(short int, string, string);

        // toString
        string toString() {
            std::stringstream ss;
            ss << this->getID() << " " << this->getType() << " " << 
                this->getDescription() << " " << this->getLocation() << endl; 
            std::string s = ss.str();
            return s;
        }

        // Getters
        unsigned long getID();
        short int getType();
        string getDescription();
        string getLocation();

        // Setters
        void setType(short int);
        void setDescription(string);
        void setLocation(string);
};

#endif
