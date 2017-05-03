#include "User.hpp"

// User contrsuctor
User::User(string name, string email, string password, string ip) {
	name_ = name;
	email_ = email; 
	password_ = password; 
	last_ip_ = ip;
	create_date_ = time(0);
	timeline_ = new Timeline(vector<TimelineItem> (), "#3498DB", "#2ECC71", "#F1C40F", "Meeting", "Assignment", "Event");
	activated_, ones_, twos_, threes_ = 0;
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

Timeline* User::getTimeline() {
	return this->timeline_;
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

unsigned int User::getOnes() {
	return ones_;
}

unsigned int User::getTwos() {
	return twos_;
}

unsigned int User::getThrees() {
	return threes_;
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

void User::setCreate(time_t create) {
	this->create_date_ = create;
}

void User::setActivated(short int activated) {
	this->activated_ = activated;
}

void User::setLastIP(string ip) {
	this->last_ip_ = ip;
}

void User::setOnes(unsigned int ones) {
	this->ones_ = ones;
}

void User::setTwos(unsigned int twos) {
	this->twos_ = twos;
}

void User::setThrees(unsigned int threes) {
	this->threes_ = threes;
}