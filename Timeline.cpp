#include <iostream>
#include <string>
#include <ctime>
using namespace std;

class Timeline {

    private:
        int id;
        int user_id;
        int timeline_items;
        char event_colour;
        char meeting_colour;
        char assignment_colour;

    public:

        // Constructor
        Timeline(int,char,char,char);

        // Getters
        int getID();
        int getUserID();
        char getEventColour();
        char getMeetingColour();
        char getAssignmentColour();

        // Setters
        void setEventColour(char);
        void setMeetingColour(char);
        void setAssignmentColour(char);

        // Methods
        void deleteItem(int);
        //void getItem(int,time_t);
        void getTimeLine(time_t,time_t);
        // updateItem(item_id);
        // addItem(timeline_id,type,start,end,description);

};

// Constructor
Timeline:Timeline(int id, char event_colour, char meeting_colour, 
    char assignment_colour):
    id(id),
    event_colour(event_colour),
    meeting_colour(meeting_colour),
    assignment_colour(assignment_colour){

    }

// Getters
int Timeline::getID(){
    return id;
}

int Timeline::getUserID(){
    return user_id;
}

char Timeline::getEventColour(){
    return event_colour;
}

char Timeline::getMeetingColour(){
    return meeting_colour;
}

char Timeline::getAssignmentColour(){
    return assignment_colour;
}

