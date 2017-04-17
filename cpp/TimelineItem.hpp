#ifndef TIMELINEITEM_H
#define TIMELINEITEM_H

#include <iostream>
#include <string>
#include <ctime>
#include <vector>

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

        unsigned long timeline_id_;
        short int type_;
        time_t start_;
        time_t end_;
        string description_;
        string location_;
        vector<int> linked_;
        vector<int> linked_items_;

    // Timeline Item methods
    public:

        // Constructor
        TimelineItem(unsigned long, int, string, string, time_t, time_t, vector<int>, vector<int>);

        // Getters
        unsigned long getID();
        unsigned long getTimelineID();
        short int getType();
        time_t getStartTime();
        time_t getEndTime();
        string getDescription();
        string getLocation();
        vector<int> getLinked();
        vector<int> getLinkedItems();


        // Setters
        void setType(short int);
        void setStartTime(time_t);
        void setEndTime(time_t);
        void setDescrition(string);
        void setLinked(vector<int>);
        void setLinkedItems(vector<int>);
        void setLocation(string);
};

#endif