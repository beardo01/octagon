#include <iostream>
#include <string>
#include <ctime>
using namespace std;

class TimelineItem {
    
    // Timeline Item data fields
    private:
        int id;
        int timeline_id;
        short int type;
        time_t start;
        time_t end;
        string description;
        unsigned int linked;
        unsigned int linked_items;

    // Timeline Item methods
    public:

        // Constructor
        TimelineItem(int, string, time_t, time_t, unsigned int, unsigned int);

        // Getters
        int getID(); //Death to
        int getTimelineID();
        short int getType();
        time_t getStartTime();
        time_t getEndTime();
        string getDescription();

        // Setters
        void setType(short int);
        void setStartTime(time_t);
        void setEndTime(time_t);
        void setDescrition(string);
};

// Constructor
TimelineItem::TimelineItem(int type, string description, time_t start, 
    time_t end, unsigned int *linked = nullptr, 
    unsigned int *linked_items = nullptr):
    type(type),
    description(description),
    start(start),
    end(end),
    linked(linked),
    linked_items(linked_items) { 

    }

// Getters
int TimelineItem::getID(){
    return id;
}

int TimelineItem::getTimelineID(){
    return timeline_id;
}

short int TimelineItem::getType(){
    return type;
}

time_t TimelineItem::getStartTime(){
    return start;
}

time_t TimelineItem::getEndTime(){
    return end;
}

string TimelineItem::getDescription(){
    return description;
}

// Setters
void TimelineItem::setType(short int type){
    this->type = type;
}

void TimelineItem::setStartTime(time_t start){
    this->start = start;
}

void TimelineItem::setEndTime(time_t end){
    this->end = end;
}

void TimelineItem::setDescrition(string description){
    this->description = description;
}
