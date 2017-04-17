#include <iostream>
#include <string>
#include <ctime>
#include <vector>

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
        vector<int> linked_;
        vector<int> linked_items_;

    // Timeline Item methods
    public:

        // Constructor
        TimelineItem(int, string, string, time_t, time_t, vector<int>, vector<int>);

        // Getters
        int getID();
        int getTimelineID();
        short int getType();
        time_t getStartTime();
        time_t getEndTime();
        string getDescription();
        string getLocation();
        vector<int> getLinked();
        vector<int> getLinkedItems();


        // Setters
        void setType(short int);
        void setStartTime(time_t);
        void setEndTime(time_t);
        void setDescrition(string);
        void setLinked(vector<int>);
        void setLinkedItems(vector<int>);
        void setLocation(string);
};

// Constructor
TimelineItem::TimelineItem(int type, string description, string location, 
    time_t start, time_t end, vector<int> linked, vector<int> linked_items):
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


int main() {
    int i = 0;

    //Testing code
    vector<int> linked;
    linked.push_back(-1);
    linked.push_back(10);
    vector<int> linked_items;
    TimelineItem item(1,"A Test Item","Lab A",time(0),time(0), linked, linked_items);

    cout << item.getID() << endl;
    cout << item.getTimelineID() << endl;
    cout << item.getType() << endl;
    cout << item.getStartTime() << endl;
    cout << item.getEndTime() << endl;
    cout << item.getDescription() << endl;
    cout << item.getLocation() << endl;
    while(i < item.getLinked().size()) {
        cout << item.getLinked().at(i) << endl;
        i++;
    }
}