#include <memory>   // std::auto_ptr
#include <iostream>
#include <string>

// ODB includes
#include <odb/database.hxx>
#include <odb/transaction.hxx>
#include <odb/pgsql/database.hxx>

#include "Event.hpp"
#include "Event.cpp"
#include "Event-odb.hxx"
#include "Timeline.hpp"
#include "Timeline.cpp"
#include "Timeline-odb.hxx"
#include "TimelineItem.hpp"
#include "TimelineItem.cpp"
#include "TimelineItem-odb.hxx"
#include "User.hpp"
#include "User.cpp"
#include "User-odb.hxx"

using namespace std;
using namespace odb::core;

void createUser(string user, string email, string password, string rpassword, string ip) {
	try {

        auto_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "104.197.11.127", 5432));
            
        typedef odb::query<User> query;
        typedef odb::result<User> result;

		{
			// Start the query
			transaction t (db->begin ());
			//auto_ptr<User> curr_user(db->query_one<User> (query::name_ == user));

			auto_ptr<User> curr_user(db->query_one<User> (query::name == user || query::email == email));
			//unique_pointer<User> user = db.query_one<User> (query::name_ == user || query::email_ == email))

			// Check if a user already exists
			if (curr_user.get() == 0) {
				
				// Check that the passwords match
				if (password == rpassword) {

					// Check that the username, email and password are valid.
					regex username_regex("[a-zA-Z]+[a-zA-Z0-9-_]*");
					regex email_regex(".+@.+[.].+");
					if (regex_match(user, username_regex) && (user.length() > 3 || user.length() < 37)) {
						if (regex_match(email, email_regex)) {
							if(password.length() > 5) {
                                cout << "Got in here!";

								// Create the user object
								User *new_user = new User(user, email, password, ip);
								Timeline *new_timeline = new_user->getTimeline();

								// Commit it to the database
								db->persist(new_timeline);
								db->persist(new_user);

                                t.commit();
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


int main(int argc, char *argv[]) {

    // Testing user create
    createUser(argv[1], argv[2], argv[3], argv[3], "127.0.0.1");
}