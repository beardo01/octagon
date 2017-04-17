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
        string location;
        unsigned int linked;
        unsigned int linked_items;

    // Timeline Item methods
    public:

        // Constructor
        TimelineItem(int, string, string, time_t, time_t, unsigned int, unsigned int);

        // Getters
        int getID();
        int getTimelineID();
        short int getType();
        time_t getStartTime();
        time_t getEndTime();
        string getDescription();
        string getLocation();
        unsigned int getLinked();
        unsigned int getLinkedItems();


        // Setters
        void setType(short int);
        void setStartTime(time_t);
        void setEndTime(time_t);
        void setDescrition(string);
        void setLinked(unsigned int);
        void setLinkedItems(unsigned int);
        void setLocation(string);
};

// Constructor
TimelineItem::TimelineItem(int type, string description, string location, 
    time_t start, time_t end, unsigned int linked, unsigned int linked_items):
    type(type),
    description(description),
    location(location),
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

string TimelineItem::getLocation(){
    return location;
}

unsigned int TimelineItem::getLinked(){
    return linked;
}
unsigned int TimelineItem::getLinkedItems(){
    return linked_items;
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

void TimelineItem::setLocation(string location){
    this->location = location;
}

void TimelineItem::setLinked(unsigned int linked){
    this->linked = linked;
}

void TimelineItem::setLinkedItems(unsigned int linked_items){
    this->linked_items = linked_items;
}





int main() {

    //Testing code
    TimelineItem item(1,"A Test Item","Lab A",time(0),time(0),-1,-1);

    cout << item.getID() << endl;
    cout << item.getTimelineID() << endl;
    cout << item.getType() << endl;
    cout << item.getStartTime() << endl;
    cout << item.getEndTime() << endl;
    cout << item.getDescription() << endl;
    cout << item.getLocation() << endl;
    cout << item.getLinked() << endl;
    cout << item.getLinkedItems() << endl;
}