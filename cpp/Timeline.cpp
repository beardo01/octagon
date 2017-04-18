#include "Timeline.hpp"

// Constructor
Timeline::Timeline(unsigned long user_id, vector<int> timeline_items, string event_colour, string meeting_colour, string assignment_colour):
    user_id_(user_id),
    timeline_items_(timeline_items),
    event_colour_(event_colour),
    meeting_colour_(meeting_colour),
    assignment_colour_(assignment_colour) {}

// Getters
unsigned long Timeline::getID(){
    return id_;
}

unsigned long Timeline::getUserID(){
    return user_id_;
}

vector<int> Timeline::getTimelineItems() {
    return timeline_items_;
}

string Timeline::getEventColour(){
    return event_colour_;
}

string Timeline::getMeetingColour(){
    return meeting_colour_;
}

string Timeline::getAssignmentColour(){
    return assignment_colour_;
}

// Setters
void Timeline::setEventColour(string event_colour) {
    this->event_colour_ = event_colour;
}

void Timeline::setMeetingColour(string meeting_colour) {
    this->meeting_colour_ = meeting_colour;
}

void Timeline::setAssignmentColour(string assignment_colour) {
    this->assignment_colour_ = assignment_colour;
}

// Methods
void addItem(unsigned long timeline_id, short int type, string description, 
    string location, time_t start, time_t end) {

}
