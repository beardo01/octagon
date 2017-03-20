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
		unsigned int linked_int
		unsigned int linked_items

	// Timeline Item methods
	public:

		// Constructor
		TimelineItem();

		// Getters
		int getID();
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