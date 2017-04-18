#include "TimelineItem.hpp"

// Constructor
TimelineItem::TimelineItem(unsigned long timeline_id, int type, string description, 
    string location, time_t start, time_t end, vector<int> linked, vector<int> linked_items):
    timeline_id_(timeline_id),
    type_(type),
    description_(description),
    location_(location),
    start_(start),
    end_(end),
    linked_(linked),
    linked_items_(linked_items) {}

// Getters
unsigned long TimelineItem::getID(){
    return id_;
}

unsigned long TimelineItem::getTimelineID(){
    return timeline_id_;
}

short int TimelineItem::getType(){
    return type_;
}

time_t TimelineItem::getStartTime(){
    return start_;
}

time_t TimelineItem::getEndTime(){
    return end_;
}

string TimelineItem::getDescription(){
    return description_;
}

string TimelineItem::getLocation(){
    return location_;
}

vector<int> TimelineItem::getLinked(){
    return linked_;
}

vector<int> TimelineItem::getLinkedItems(){
    return linked_items_;
}

// Setters
void TimelineItem::setType(short int type){
    this->type_ = type;
}

void TimelineItem::setStartTime(time_t start){
    this->start_ = start;
}

void TimelineItem::setEndTime(time_t end){
    this->end_ = end;
}

void TimelineItem::setDescrition(string description){
    this->description_ = description;
}

void TimelineItem::setLocation(string location){
    this->location_ = location;
}

void TimelineItem::setLinked(vector<int> linked){
    this->linked_ = linked;
}

void TimelineItem::setLinkedItems(vector<int> linked_items){
    this->linked_items_ = linked_items;
}