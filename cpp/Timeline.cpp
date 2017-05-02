#include "Timeline.hpp"

// Constructor
Timeline::Timeline(unsigned long user_id, vector<TimelineItem> timeline_items, 
string event_colour, string meeting_colour, string assignment_colour) {

    user_id_ = user_id;
    timeline_items_ = timeline_items;
    event_colour_ = event_colour;
    meeting_colour_ = meeting_colour;
    assignment_colour_ = assignment_colour;
}

Timeline::~Timeline(void) {
   //cout << "Timeline " << this->getID() << " is being deleted." << endl;
}

// Getters
unsigned long Timeline::getID(){
    return id_;
}

unsigned long Timeline::getUserID(){
    return user_id_;
}

vector<TimelineItem> Timeline::getTimelineItems() {
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
void Timeline::printTimeline() {
    for(std::vector<int>::size_type i = 0; i != this->getTimelineItems().size(); i++) {
        if (this->getTimelineItems()[i].getLinkedItems().size() > 0) {
            for(std::vector<int>::size_type j = 0; j != this->getTimelineItems()[i].getLinkedItems().size(); j++) {
                std::cout << this->getTimelineItems()[i].getLinkedItems()[j].toString();
            }
        }
        std::cout << this->getTimelineItems()[i].toString();
    }
}

void Timeline::addItem(short int type, string description, string location, time_t start, 
    time_t end, short int frequency, time_t ends) {

    //Check if the event repeats or not
    if (frequency == -1) {
        // It doesn't have any repeats

        //Create new TimelineItem
        TimelineItem new_item(type, description, location, start, end);

        // Add the new item to the timeline
        this->timeline_items_.push_back(new_item);
    } else {
        // It does have repeats
        time_t now = time_t(time);
        long diff = ends - now;
        long seconds_day = 86400;
        int repeats;
        
        if(frequency == 0) {
            // Daily repeats
            repeats = diff/seconds_day;
        } else if (frequency == 1) {
            // Weekly repeats
            repeats = diff/(seconds_day*7);
        } else if (frequency == 2) {
            // Monthly repeats
            repeats = diff/(seconds_day*30);
        }
        
         // Declare repeated items
        vector<TimelineItem> repeat_items;

        // Create intial event
        TimelineItem new_item(type, description, location, start, end, -1, repeat_items); 

        // Create repeats (repeats - 1 because we make one less repeat because of new_item)
        for(int i = 0; i < (repeats - 1); i++) {
            TimelineItem item(type, description, location, start, end, new_item.getID());
            repeat_items.push_back(item);
        }

        // Update initial item
        new_item.setLinkedItems(repeat_items);

        // Add the new item to the timeline
        this->timeline_items_.push_back(new_item);
    }
}

