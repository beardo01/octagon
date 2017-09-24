#include "TimelineItem.hpp"

// Constructors
TimelineItem::TimelineItem(short int type, string description, string location, time_t start, time_t end):
    type_(type),
    description_(description),
    location_(location),
    start_(start),
    end_(end)
    {}

// Getters
unsigned long TimelineItem::getID(){
    return this->id_;
}

short int TimelineItem::getType(){
    return this->type_;
}

string TimelineItem::getDescription(){
    return this->description_;
}

string TimelineItem::getLocation(){
    return this->location_;
}

time_t TimelineItem::getStartTime(){
    return this->start_;
}

time_t TimelineItem::getEndTime(){
    return this->end_;
}

// Setters
void TimelineItem::setType(short int type){
    this->type_ = type;
}

void TimelineItem::setDescription(string description){
    this->description_ = description;
}

void TimelineItem::setLocation(string location){
    this->location_ = location;
}

void TimelineItem::setStartTime(time_t start){
    this->start_ = start;
}

void TimelineItem::setEndTime(time_t end){
    this->end_ = end;
}
