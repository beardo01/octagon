#include "TimelineItem.hpp"

// Constructors
TimelineItem::TimelineItem(Event *event, time_t start, time_t end):
    event_(event),
    start_(start),
    end_(end),
    linked_(NULL)
    {}

TimelineItem::TimelineItem(Event *event, time_t start, time_t end, TimelineItem *linked):
    event_(event),
    start_(start),
    end_(end),
    linked_(linked)
    {}

// Getters
unsigned long TimelineItem::getID(){
    return id_;
}

Event* TimelineItem::getEvent() {
    return this->event_;
}

short int TimelineItem::getType(){
    return this->event_->getType();
}

time_t TimelineItem::getStartTime(){
    return this->start_;
}

time_t TimelineItem::getEndTime(){
    return this->end_;
}

string TimelineItem::getDescription(){
    return this->event_->getDescription();
}

string TimelineItem::getLocation(){
    return this->event_->getLocation();
}

TimelineItem* TimelineItem::getLinked(){
    return this->linked_;
}

vector<TimelineItem*> TimelineItem::getLinkedItems(){
    return this->linked_items_;
}

// Setters
void TimelineItem::setType(short int type){
    this->event_->setType(type);
}

void TimelineItem::setStartTime(time_t start){
    this->start_ = start;
}

void TimelineItem::setEndTime(time_t end){
    this->end_ = end;
}

void TimelineItem::setDescription(string description){
    this->event_->setDescription(description);
}

void TimelineItem::setLocation(string location){
    this->event_->setLocation(location);
}

void TimelineItem::setLinked(TimelineItem *linked){
    this->linked_ = linked;
}

void TimelineItem::setLinkedItems(vector<TimelineItem*> linked_items){
    this->linked_items_ = linked_items;
}