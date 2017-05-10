#ifndef TIMELINEITEM_H
#define TIMELINEITEM_H

#include <iostream>
#include <string>
#include <ctime>
#include <vector>
#include <sstream>

// ODB database include
#include <odb/core.hxx>

#include "Event.hpp"

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

        Event *event_;
        time_t start_;
        time_t end_;
        TimelineItem *linked_;
        vector<TimelineItem> linked_items_;

    // Timeline Item methods
    public:

        // Constructor
        TimelineItem(Event*, time_t, time_t);
        TimelineItem(Event*, time_t, time_t, TimelineItem*);
        TimelineItem(Event*, time_t, time_t, vector<TimelineItem>);

        // toString
        string toString() {
            std::stringstream ss;
            ss << this->getID() << " " << this->getDescription() << " " << 
                this->getStartTime() << " " << this->getEndTime() << " " << 
                this->getLinkedItems().size() << endl;
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
        TimelineItem *getLinked();
        vector<TimelineItem> getLinkedItems();

        // Setters
        void setType(short int);
        void setStartTime(time_t);
        void setEndTime(time_t);
        void setDescription(string);
        void setLocation(string);
        void setLinked(TimelineItem*);
        void setLinkedItems(vector<TimelineItem>);
};

#endif