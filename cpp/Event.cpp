#include "Event.hpp"

// Constructor
Event::Event(short int type, string description, string location) :
    type_(type),
    item_(NULL),
    description_(description),
    location_(location)
    {}

// Getters
unsigned long Event::getID() {
    return this->id_;
}

short int Event::getType() {
    return this->type_;
}

string Event::getDescription() {
    return this->description_;
}

string Event::getLocation() {
    return this->location_;
}

// Setters
void Event::setType(short int type) {
    this->type_ = type;
}

void Event::setTimelineItem(shared_ptr<TimelineItem> item) {
    this->item_ = item;
}

void Event::setDescription(string description) {
    this->description_ = description;
}

void Event::setLocation(string location) {
    this->location_ = location;
}