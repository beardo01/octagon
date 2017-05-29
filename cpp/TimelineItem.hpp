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

#include "Event.hpp"
class Event;

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

        #pragma db not_null
        shared_ptr<Event> event_;

        time_t start_;
        time_t end_;

        shared_ptr<TimelineItem> linked_;
        #pragma db value_not_null
        vector<shared_ptr<TimelineItem> > linked_items_;

    // Timeline Item methods
    public:

        // Constructor
        TimelineItem(shared_ptr<Event>, time_t, time_t);
        TimelineItem(shared_ptr<Event>, time_t, time_t, shared_ptr<TimelineItem>);

        // toString
        string toString() {
            std::stringstream ss;
            ss << this->getID() << " desc:" << this->getDescription() << " start: " << 
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
        shared_ptr<Event> getEvent();
        time_t getStartTime();
        time_t getEndTime();
        string getDescription();
        string getLocation();
        shared_ptr<TimelineItem> getLinked();
        vector<shared_ptr<TimelineItem> > getLinkedItems();

        // Setters
        void setType(short int);
        void setEvent(shared_ptr<Event>);
        void setStartTime(time_t);
        void setEndTime(time_t);
        void setDescription(string);
        void setLocation(string);
        void setLinked(shared_ptr<TimelineItem>);
        void setLinkedItems(vector<shared_ptr<TimelineItem> >);
};

#endif
