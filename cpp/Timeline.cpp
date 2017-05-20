#include "Timeline.hpp"

// Constructor
Timeline::Timeline(vector<TimelineItem*> timeline_items, string colour_one, 
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

// Timeline::~Timeline(void) {
//    //cout << "Timeline " << this->getID() << " is being deleted." << endl;
// }

// Getters
unsigned long Timeline::getID(){
    return id_;
}

vector<TimelineItem*> Timeline::getTimelineItems() {
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
        if (this->getTimelineItems()[i]->getLinkedItems().size() > 0) {
            for(std::vector<int>::size_type j = 0; j != this->getTimelineItems()[i]->getLinkedItems().size(); j++) {
                std::cout << this->getTimelineItems()[i]->getLinkedItems()[j]->toString();
            }
        }
        std::cout << this->getTimelineItems()[i]->toString();
    }
}

void Timeline::addItem(short int type, string description, string location, time_t start, 
    time_t end, short int frequency, time_t ends) {

    //Check if the event repeats or not
    if (frequency == -1) {
        // It doesn't have any repeats

        //Create new TimelineItem
        Event *new_event = new Event(type, description, location);
        TimelineItem *new_item = new TimelineItem(new_event, start, end);

        // Add the new item to the timeline
        this->timeline_items_.push_back(new_item);
    } else {
        // It does have repeats
        time_t now = time_t(time);
        long diff = ends - start;
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
        vector<TimelineItem*> repeat_items;

        // Create intial event
        Event *new_event = new Event(type, description, location);
        TimelineItem *new_item = new TimelineItem(new_event, start, end, repeat_items); 

        // Create repeats (repeats - 1 because we make one less repeat because of new_item)
        for(int i = 0; i < (repeats - 1); i++) {
            TimelineItem* item = new TimelineItem(new_event, start, end, new_item);
            repeat_items.push_back(item);
        }

        // Update initial item
        new_item->setLinkedItems(repeat_items);

        // Add the new item to the timeline
        this->timeline_items_.push_back(new_item);
    }

    // Sort the timeline items
    std::sort(this->timeline_items_.begin(), this->timeline_items_.end());
}

TimelineItem* Timeline::getTimelineItem(unsigned long id) {
    for(int i = 0; i < this->timeline_items_.size(); i++) {
        if (this->timeline_items_[i]->getID() == id) {
            return this->timeline_items_[i];
        }
    }

    // Temp solution
    Event *event = new Event(0, "Not found", "Not found");
    TimelineItem *not_found = new TimelineItem(event, time_t(0), time_t(0));
    return not_found;
}

void Timeline::updateTimelineItem(unsigned long id, short int type, string description,
    string location, time_t start, time_t end, short int frequency, time_t ends) {
        TimelineItem *item = getTimelineItem(id);

        item->setType(type);
        item->setDescription(description);
        item->setLocation(location);
        
        if (frequency != -1) {
            // Get the OG item
            if(item->getLinkedItems().size() == 0) {
                item = item->getLinked();
            }

            // Update its times
            item->setStartTime(start);
            item->setEndTime(end);

            // Delete the repeating items
            for(int i = 0; i != item->getLinkedItems().size(); i++) {
                this->deleteTimelineItem(item->getLinkedItems()[i]->getID());
            }

            // Recreate them
            time_t now = time_t(time);
            long diff = ends - start;
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
            vector<TimelineItem*> repeat_items;

            // Create repeats (repeats - 1 because we make one less repeat because of new_item)
            for(int i = 0; i < (repeats - 1); i++) {
                TimelineItem *repeat_item = new TimelineItem(item->getEvent(), start, end, item);
                repeat_items.push_back(repeat_item);
            }

            // Update initial item
            item->setLinkedItems(repeat_items);
        }
}

void Timeline::deleteTimelineItem(unsigned long id) {
    for(int i = 0; i < this->timeline_items_.size(); i++) {
        if (this->timeline_items_[i]->getID() == id) {
            this->timeline_items_.erase(this->timeline_items_.begin() + i);
        }
     }
}