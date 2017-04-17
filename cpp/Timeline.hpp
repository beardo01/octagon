#ifndef TIMELINE_H
#define TIMELINE_H

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

        // Methods
        //void deleteItem(int);
        //void getItem(int,time_t);
        //void getTimeLine(time_t,time_t);
        // updateItem(item_id);
        // addItem(timeline_id,type,start,end,description);

};

#endif