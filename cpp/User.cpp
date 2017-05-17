#include "User.hpp"

// User contrsuctor
User::User(string name, string email, string password, string ip) {
	BCrypt bcrypt;
	name_ = name;
	email_ = email; 
	password_ = bcrypt.generateHash(password);
	last_ip_ = ip;
	create_date_ = time(0);
	timeline_ = new Timeline(vector<TimelineItem*> (), "#3498DB", "#2ECC71", "#F1C40F", "Meeting", "Assignment", "Event");
	activated_ = 0;
	ones_ = 0;
	twos_ = 0;
	threes_ = 0;
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

// Methods
void User::createUser(string user, string email, string password, string rpassword, string ip) {
	try {
		// Create database connection
        auto_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "104.197.11.127", 5432));

		{
			// Start the query
			transaction t (db->begin());

			auto_ptr<User> curr_user(db->query_one<User> (query::name_ == user || query::email_ == email));
			//unique_pointer<User> user = db.query_one<User> (query::name_ == user || query::email_ == email))

			// Check if a user already exists
			if (curr_user.get() == 0) {
				
				// Check that the passwords match
				if (password == rpassword) {

					// Check that the username, email and password are valid.
					regex username_regex("[a-ZA-Z]+[a-zA-Z0-9-_]*");
					regex email_regex(".+@.+[.].+");
					if (regex_match(user, username_regex) && user.length() > 3 && user.length() < 37) {
						if (regex_match(email, email_regex)) {
							if(password.length() > 5) {

								// Create the user object
								User * new_user = new User(user, email, password, ip);

								// Commit it to the database
								db->persist(new_user);
							} else {
								cerr << "Passwords must be at least 6 characters." << endl;
							}
						} else {
							cerr << "Please enter a valid email." << endl;
						}
					} else {
						cerr << "Username's may only contain letters, numbers, hyphens and underscores"
							<< endl;
						cerr << "Username's must be between 4 and 36 characters." << endl;
					}
				} else {
					cerr << "Passwords do not match." << endl;
				}
			} else {
				cerr << "A user with that username or email already exists." << endl;
			}
		}
	} catch (const odb::exception& e) {
		cerr << e.what () << endl;
	}
}