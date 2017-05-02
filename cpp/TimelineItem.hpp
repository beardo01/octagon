#ifndef TIMELINEITEM_H
#define TIMELINEITEM_H

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
class TimelineItem {
    
    // Timeline Item data fields
    private:
        // Default constructor for ODB
        TimelineItem() {}

        friend class odb::access;

        #pragma db id auto
        unsigned long id_;

        short int type_;
        time_t start_;
        time_t end_;
        string description_;
        string location_;
        long linked_;
        vector<TimelineItem> linked_items_;

    // Timeline Item methods
    public:

        // Constructor
        TimelineItem(short int, string, string, time_t, time_t, long linked = -1, 
            vector<TimelineItem> linked_items = vector<TimelineItem>());

        // toString
        string toString() {
            std::stringstream ss;
            ss << this->getID() << " " << this->getDescription() << " " << 
                this->getStartTime() << " " << this->getEndTime() << " " << 
                this->getLinkedItems().size() << endl;
            std::string s = ss.str();
            return s;
        }

        // Getters
        unsigned long getID();
        short int getType();
        time_t getStartTime();
        time_t getEndTime();
        string getDescription();
        string getLocation();
        long getLinked();
        vector<TimelineItem> getLinkedItems();

        // Setters
        void setType(short int);
        void setStartTime(time_t);
        void setEndTime(time_t);
        void setDescrition(string);
        void setLocation(string);
        void setLinked(long);
        void setLinkedItems(vector<TimelineItem>);
};

#endif