#include "Timeline.hpp"

// Constructor
Timeline::Timeline(vector<TimelineItem> timeline_items, string colour_one, 
    string colour_two, string colour_three, string label_one, string label_two, 
    string label_three) {
        timeline_items_ = timeline_items;
        colour_one_ = colour_one;
        colour_two_ = colour_two;
        colour_three_ = colour_three;
        label_one_ = label_one;
        label_two_ = label_two;
        label_three_ = label_three;
}

Timeline::~Timeline(void) {
   //cout << "Timeline " << this->getID() << " is being deleted." << endl;
}

// Getters
unsigned long Timeline::getID(){
    return id_;
}

vector<TimelineItem> Timeline::getTimelineItems() {
    return timeline_items_;
}

string Timeline::getColourOne(){
    return colour_one_;
}

string Timeline::getColourTwo(){
    return colour_two_;
}

string Timeline::getColourThree(){
    return colour_three_;
}

string Timeline::getLabelOne(){
    return label_one_;
}

string Timeline::getLabelTwo(){
    return label_two_;
}

string Timeline::getLabelThree(){
    return label_three_;
}

// Setters
void Timeline::setColourOne(string colour_one) {
    this->colour_one_ = colour_one;
}

void Timeline::setColourTwo(string colour_two) {
    this->colour_two_ = colour_two;
}

void Timeline::setColourThree(string colour_three) {
    this->colour_three_ = colour_three;
}

void Timeline::setLabelOne(string label_one) {
    this->label_one_ = label_one;
}

void Timeline::setLabelTwo(string label_two) {
    this->label_two_ = label_two;
}

void Timeline::setLabelThree(string label_three) {
    this->label_three_ = label_three;
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
        Event *new_event = new Event(type, description, location);
        TimelineItem new_item(new_event, start, end);

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
        Event *new_event = new Event(type, description, location);
        TimelineItem new_item(new_event, start, end, repeat_items); 

        // Create repeats (repeats - 1 because we make one less repeat because of new_item)
        for(int i = 0; i < (repeats - 1); i++) {
            TimelineItem item(new_event, start, end, &new_item);
            repeat_items.push_back(item);
        }

        // Update initial item
        new_item.setLinkedItems(repeat_items);

        // Add the new item to the timeline
        this->timeline_items_.push_back(new_item);
    }

    // Sort the timeline items
    std::sort(this->timeline_items_.begin(), this->timeline_items_.end());
}
