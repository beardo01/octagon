#include <iostream>
#include <string>
#include <ctime>
using namespace std;

class User {

	// User data fields
	private:
		int id;
		string name;
		string email;
		string password;
		int timeline;
		time_t create_date;
		short int activated;
		string last_ip;
		unsigned int meetings;
		unsigned int events;
		unsigned int assignments;

	// User methods
	public:
		// Constructor
		User(string, string, string, string);

		// Getters
		int getID();
		string getName();
		string getEmail();
		string getPassword();
		int getTimeline();
		time_t getCreate();
		short int getActivated();
		string getLastIP();
		unsigned int getMeetings();
		unsigned int getEvents();
		unsigned int getAssignments();

		// Setters
		void setName(string);
		void setEmail(string);
		void setPassword(string);
		void setTimeline(int);
		void setCreate(time_t);
		void setActivated(short int);
		void setLastIP(string);
		void setMeetings(unsigned int);
		void setEvents(unsigned int);
		void setAssignments(unsigned int);

};

// User contrsuctor
User::User(string name, string email, string password, string ip): 
	name(name), 
	email(email), 
	password(password), 
	last_ip(ip) {
	create_date = time(0);
	timeline = 1;
	activated, meetings, events, assignments = 0;
}

// Getters
int User::getID() {
	return id;
}

string User::getName() {
	return name;
}

string User::getEmail() {
	return email;
}

string User::getPassword() {
	return password;
}

int User::getTimeline() {
	return timeline;
}

time_t User::getCreate() {
	return create_date;
}

short int User::getActivated() {
	return activated;
}

string User::getLastIP() {
	return last_ip;
}

unsigned int User::getMeetings() {
	return meetings;
}

unsigned int User::getEvents() {
	return events;
}

unsigned int User::getAssignments() {
	return assignments;
}

// Setters
void User::setName(string name) {
	this->name = name;
}

void User::setEmail(string email) {
	this->email = email;
}

void User::setPassword(string password) {
	this->password = password;
}

void User::setTimeline(int timeline) {
	this->timeline = timeline;
}

void User::setCreate(time_t create) {
	this->create_date = create;
}

void User::setActivated(short int activated) {
	this->activated = activated;
}

void User::setLastIP(string ip) {
	this->last_ip = ip;
}

void User::setMeetings(unsigned int meetings) {
	this->meetings = meetings;
}

void User::setEvents(unsigned int events) {
	this->events = events;
}

void User::setAssignments(unsigned int assignments) {
	this->assignments = assignments;
}

int main() {

	// Testing code

	User user("Bob", "bob@xtra.co.nz", "123", "127.0.0.1");
	cout << user.getName() << endl;
	cout << user.getEmail() << endl;
	user.setEmail("tony@xtra.co.nz");
	cout << user.getEmail() << endl;
	cout << user.getPassword() << endl;
	cout << user.getTimeline() << endl;
	cout << user.getCreate() << endl;
	cout << user.getActivated() << endl;
	cout << user.getLastIP() << endl;
	cout << user.getMeetings() << endl;
	cout << user.getEvents() << endl;
	cout << user.getAssignments() << endl;


}