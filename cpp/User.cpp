#include <iostream>
#include <string>
#include <ctime>

// ODB database include
#include <odb/core.hxx>

// String declaration for ODB persistence
#pragma db value(std::string) type("VARCHAR(128)")

using namespace std;

#pragma db object
class User {

	// User data fields
	private:

		// Default constructor for ODB
		User () {}
		
		friend class odb::access;

		#pragma db id auto
		unsigned long id_;

		std::string name_;
		std::string email_;
		std::string password_;
		int timeline_;
		time_t create_date_;
		short int activated_;
		std::string last_ip_;
		unsigned int meetings_;
		unsigned int events_;
		unsigned int assignments_;

	// User methods
	public:
		// Constructor
		User(string, string, string, string);

		// Getters
		unsigned long getID();
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
	name_(name), 
	email_(email), 
	password_(password), 
	last_ip_(ip) {
	create_date_ = time(0);
	timeline_ = 1;
	activated_, meetings_, events_, assignments_ = 0;
}

// Getters
unsigned long User::getID() {
	return id_;
}

string User::getName() {
	return name_;
}

string User::getEmail() {
	return email_;
}

string User::getPassword() {
	return password_;
}

int User::getTimeline() {
	return timeline_;
}

time_t User::getCreate() {
	return create_date_;
}

short int User::getActivated() {
	return activated_;
}

string User::getLastIP() {
	return last_ip_;
}

unsigned int User::getMeetings() {
	return meetings_;
}

unsigned int User::getEvents() {
	return events_;
}

unsigned int User::getAssignments() {
	return assignments_;
}

// Setters
void User::setName(string name) {
	this->name_ = name;
}

void User::setEmail(string email) {
	this->email_ = email;
}

void User::setPassword(string password) {
	this->password_ = password;
}

void User::setTimeline(int timeline) {
	this->timeline_ = timeline;
}

void User::setCreate(time_t create) {
	this->create_date_ = create;
}

void User::setActivated(short int activated) {
	this->activated_ = activated;
}

void User::setLastIP(string ip) {
	this->last_ip_ = ip;
}

void User::setMeetings(unsigned int meetings) {
	this->meetings_ = meetings;
}

void User::setEvents(unsigned int events) {
	this->events_ = events;
}

void User::setAssignments(unsigned int assignments) {
	this->assignments_ = assignments;
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