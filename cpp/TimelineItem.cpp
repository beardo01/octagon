#include <iostream>
#include <string>
#include <ctime>
using namespace std;

class TimelineItem {
    
    // Timeline Item data fields
    private:
        int id_;
        int timeline_id_;
        short int type_;
        time_t start_;
        time_t end_;
        string description_;
        string location_;
        unsigned int linked_;
        unsigned int linked_items_;

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
    type_(type),
    description_(description),
    location_(location),
    start_(start),
    end_(end),
    linked_(linked),
    linked_items_(linked_items) { 

    }

// Getters
int TimelineItem::getID(){
    return id_;
}

int TimelineItem::getTimelineID(){
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

unsigned int TimelineItem::getLinked(){
    return linked_;
}
unsigned int TimelineItem::getLinkedItems(){
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

void TimelineItem::setLinked(unsigned int linked){
    this->linked_ = linked;
}

void TimelineItem::setLinkedItems(unsigned int linked_items){
    this->linked_items_ = linked_items;
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