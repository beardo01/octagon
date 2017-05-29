#include "Timeline.hpp"

// Constructor
Timeline::Timeline(vector<shared_ptr<TimelineItem> > timeline_items, string colour_one, 
    string colour_two, string colour_three, string label_one, string label_two, string label_three) {
        timeline_items_ = timeline_items;
        colour_one_ = colour_one;
        colour_two_ = colour_two;
        colour_three_ = colour_three;
        label_one_ = label_one;
        label_two_ = label_two;
        label_three_ = label_three;
}

// Getters
unsigned long Timeline::getID(){
    return id_;
}

vector<shared_ptr<TimelineItem> > Timeline::getTimelineItems() {
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
        std::cout << this->getTimelineItems()[i]->toString();
    }
}

void Timeline::addTimelineItem(shared_ptr<TimelineItem> item) {
    this->timeline_items_.push_back(item);
}

shared_ptr<TimelineItem> Timeline::getTimelineItem(unsigned long id) {
    for(int i = 0; i < this->timeline_items_.size(); i++) {
        if (this->timeline_items_[i]->getID() == id) {
            return this->timeline_items_[i];
        }
    }

    // Temp solution
    auto not_found = make_shared<TimelineItem>(0, "Not found", "Not found", time_t(0), time_t(0));
    return not_found;
}

void Timeline::deleteTimelineItem(unsigned long id) {
    for(int i = 0; i < this->timeline_items_.size(); i++) {
        if (this->timeline_items_[i]->getID() == id) {
            this->timeline_items_.erase(this->timeline_items_.begin() + i);
        }
     }
}