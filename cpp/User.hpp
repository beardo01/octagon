#ifndef USER_H
#define USER_H

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

		string name_;
		string email_;
		string password_;
		int timeline_;
		time_t create_date_;
		short int activated_;
		string last_ip_;
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

#endif