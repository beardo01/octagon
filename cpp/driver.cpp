#include <memory>   // std::auto_ptr
#include <iostream>
#include <string>
#include <boost/regex.hpp>
#include "json.hpp"

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
using json = nlohmann::json;

json createUser(string user, string email, string password, string rpassword, string ip) {
	json response;
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
					boost::regex username_regex{"[a-zA-Z]+[a-zA-Z0-9_\\-]*"};
					boost::regex email_regex{".+@.+[.].+"};
					if (regex_match(user, username_regex) && (user.length() > 3 || user.length() < 37)) {
						if (regex_match(email, email_regex)) {
							if(password.length() > 5) {

								// Create the user object
								User *new_user = new User(user, email, password, ip);
								Timeline *new_timeline = new_user->getTimeline();

								// Commit it to the database
								db->persist(new_timeline);
								db->persist(new_user);

                                t.commit();

								response["success"] = true;
								response["message"] = "Successfully created user " + user + ".";

								return response;
							} else {
								response["message"] = "Passwords must be at least 6 characters.";
							}
						} else {
							response["message"] = "Please enter a valid email.";
						}
					} else {
						response["message"] = "Username's may only contain letters, numbers, hyphens and underscores.";
					}
				} else {
					 response["message"] = "Passwords do not match.";
				}
			} else {
				response["message"] = "A user with that username or email already exists.";
			}
		}
	} catch (const odb::exception& e) {
		response["message"] = e.what();
	}
	response["success"] = false;
	return response;
}

int main(int argc, char *argv[]) {

	string type = argv[1];
	string subtype = argv[2];

	if(type == "create") {
		
		// User
		if(subtype == "user") {
			return createUser(argv[3], argv[4], argv[5], argv[5], argv[6]);
		}

		// Event
		if(subtype == "event") {

		}

	} else if (type == "get") {
		return 0;
	} else if (type == "set") {
		return 0;
	}

    // Testing user create
    //createUser(argv[1], argv[2], argv[3], argv[3], argv[4]);
}