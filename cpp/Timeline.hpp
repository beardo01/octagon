#ifndef TIMELINE_H
#define TIMELINE_H

#include <cstddef>
#include <iostream>
#include <string>
#include <ctime>
#include <vector>
#include <algorithm>
#include <memory>

// ODB database include
#include <odb/core.hxx>

#include "TimelineItem.hpp"

// String declaration for ODB persistence
#pragma db value(std::string) type("VARCHAR(128)")

using namespace std;

#pragma db object
class Timeline {

    private:
        // Default constructor for ODB
        Timeline() {}

        friend class odb::access;

        #pragma db id auto
        unsigned long id_;

        #pragma db value_not_null
        vector<shared_ptr<TimelineItem> > timeline_items_;

        string colour_one_;
        string colour_two_;
        string colour_three_;
        string label_one_;
        string label_two_;
        string label_three_;

    public:

        // Constructor
        Timeline(vector<shared_ptr<TimelineItem> >, string, string, string, string, string, string);
        //Timeline(string, string, string, string, string, string);
        //~Timeline();

        // Getters
        unsigned long getID();
        vector<shared_ptr<TimelineItem> > getTimelineItems();
        string getColourOne();
        string getColourTwo();
        string getColourThree();
        string getLabelOne();
        string getLabelTwo();
        string getLabelThree();

        // Setters
        void setColourOne(string);
        void setColourTwo(string);
        void setColourThree(string);
        void setLabelOne(string);
        void setLabelTwo(string);
        void setLabelThree(string);

        // Methods (CRUD order)
        void printTimeline();
        
        void addTimelineItem(shared_ptr<TimelineItem>);

        // addItem(type, description, location, start date, end date, frequency, end date)
        // addItem(1, "Meeting on Tuesday", "Owheo Building", 123, 1234, 0, 0)
        /*void addItem(short int, string, string, time_t, time_t, 
            short int frequency = -1, time_t ends = 0);*/

        // getTimelineItem(1)
        shared_ptr<TimelineItem> getTimelineItem(unsigned long);

        // updateItem(1, 1, "Meeting on Tuesday afternoon", "Owheo, Lab A", 123, 1234)
        void updateTimelineItem(unsigned long, short int, string, string, time_t, time_t,
            short int frequency = -1, time_t ends = 0);

        // deleteItem(1)
        void deleteTimelineItem(unsigned long);

};

#endif
