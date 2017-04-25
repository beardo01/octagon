#ifndef TIMELINE_H
#define TIMELINE_H

#include <iostream>
#include <string>
#include <ctime>
#include <vector>

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

        unsigned long user_id_;
        vector<int> timeline_items_;
        string event_colour_;
        string meeting_colour_;
        string assignment_colour_;

    public:

        // Constructor
        Timeline(unsigned long, vector<int>, string, string, string);
        ~Timeline();

        // Getters
        unsigned long getID();
        unsigned long getUserID();
        vector<int> getTimelineItems();
        string getEventColour();
        string getMeetingColour();
        string getAssignmentColour();

        // Setters
        void setEventColour(string);
        void setMeetingColour(string);
        void setAssignmentColour(string);

        // Methods (CRUD order)
        
        // addItem(1, 1, "Meeting on Tuesday", "Owheo Building", 123, 1234)
        void addItem(unsigned long, short int, string, string, time_t, time_t);

        // getTimeline(1, 123, 1234)
        vector<TimelineItem> getTimeline(unsigned long, time_t, time_t);

        // getTimelineItem(1)
        TimelineItem getTimelineItem(unsigned long);

        // updateItem(1, 1, "Meeting on Tuesday afternoon", "Owheo, Lab A", 123, 1234)
        void updateItem(unsigned long, short int, string, string, time_t, time_t);

        // deleteItem(1)
        void deleteItem(unsigned long);

};

#endif