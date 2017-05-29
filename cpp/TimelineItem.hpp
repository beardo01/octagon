#ifndef TIMELINEITEM_H
#define TIMELINEITEM_H

#include <cstddef>
#include <iostream>
#include <string>
#include <ctime>
#include <vector>
#include <sstream>
#include <memory>

// ODB database include
#include <odb/core.hxx>

// String declaration for ODB persistence
#pragma db value(std::string) type("VARCHAR(128)")

using namespace std;

#pragma db object
class TimelineItem {
    
    // Timeline Item data fields
    private:
        // Default constructor for ODB
        TimelineItem() {}

        friend class odb::access;

        #pragma db id auto
        unsigned long id_;

        short int type_;
        string description_;
        string location_;
        time_t start_;
        time_t end_;

    public:

        // Constructor
        TimelineItem(short int, string, string, time_t, time_t);

        // toString
        string toString() {
            std::stringstream ss;
            ss << this->getID() << " " << this->getDescription() << " " << 
                this->getStartTime() << " " << this->getEndTime() << endl;
            std::string s = ss.str();
            return s;
        }

        // Comparator
        friend bool operator<(TimelineItem l, TimelineItem r) {
            return l.start_ > r.start_;
        }


        // Getters
        unsigned long getID();
        short int getType();
        time_t getStartTime();
        time_t getEndTime();
        string getDescription();
        string getLocation();

        // Setters
        void setType(short int);
        void setStartTime(time_t);
        void setEndTime(time_t);
        void setDescription(string);
        void setLocation(string);
 
};

#endif
