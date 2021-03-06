#ifndef USER_H
#define USER_H

#include <cstddef>
#include <iostream>
#include <string>
#include <ctime>
#include <limits>
#include <regex>
#include <random>
#include <memory>

// ODB database include
#include <odb/core.hxx>

#include "bcrypt/BCrypt.hpp"
#include "Timeline.hpp"
#include "TimelineItem.hpp"

// String declaration for ODB persistence
#pragma db value(std::string) type("VARCHAR(128)")

using namespace std;
using namespace odb::core;

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

		#pragma db not_null
		shared_ptr<Timeline> timeline_;

		time_t create_date_;
		short int activated_;
		string last_ip_;
		unsigned int ones_;
		unsigned int twos_;
		unsigned int threes_;
		string client_key_;

	// User methods
	public:
		// Constructor
		User(string, string, string, string);

		// Getters
		unsigned long getID();
		string getName();
		string getEmail();
		string getPassword();
		shared_ptr<Timeline> getTimeline();
		unsigned long getTimelineID();
		time_t getCreate();
		short int getActivated();
		string getLastIP();
		unsigned int getOnes();
		unsigned int getTwos();
		unsigned int getThrees();
		string getClientKey();

		// Setters
		void setName(string);
		void setEmail(string);
		void setPassword(string);
		void setCreate(time_t);
		void setActivated(short int);
		void setLastIP(string);
		void setOnes(unsigned int);
		void setTwos(unsigned int);
		void setThrees(unsigned int);
		void setClientKey(string);

		// Methods
		string generateKey(int);
};

#endif
