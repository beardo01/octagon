#include <memory>   // std::auto_ptr
#include <iostream>
#include <string>
#include <boost/regex.hpp>
#include <vector>
#include <algorithm>
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

// Create
json createUser(string user, string email, string password, string rpassword, string ip) {
	json response;
	try {

        unique_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "db.simpalapps.com", 5432));
            
        typedef odb::query<User> query;

		{
			// Start the query
			transaction t (db->begin ());

			unique_ptr<User> curr_user(db->query_one<User> (query::name == user || query::email == email));

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
								response["data"]["client_key"] = new_user->getClientKey();
								Timeline* timeline = new_user->getTimeline();
								response["data"]["colours"]["colour_one"] = timeline->getColourOne();
								response["data"]["colours"]["colour_two"] = timeline->getColourTwo();
								response["data"]["colours"]["colour_three"] = timeline->getColourThree();
								response["data"]["labels"]["label_one"] = timeline->getLabelOne();
								response["data"]["labels"]["label_two"] = timeline->getLabelTwo();
								response["data"]["labels"]["label_three"] = timeline->getLabelThree();

								return response;
							} else {
								response["data"] = "Passwords must be at least 6 characters.";
							}
						} else {
							response["data"] = "Please enter a valid email.";
						}
					} else {
						response["data"] = "Username's may only contain letters, numbers, hyphens and underscores.";
					}
				} else {
					 response["data"] = "Passwords do not match.";
				}
			} else {
				response["data"] = "A user with that username or email already exists.";
			}
		}
	} catch (const odb::exception& e) {
		response["data"] = e.what();
	}
	response["success"] = false;
	return response;
}

// void Timeline::addItem(short int type, string description, string location, time_t start, 
//     time_t end, short int frequency, time_t ends) {

json createEvent(string client_key, short int type, string description, string location, 
	time_t start, time_t end, short int frequency, time_t ends) {
	json response;
	try {

        unique_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "db.simpalapps.com", 5432));
            
        typedef odb::query<User> user_query;
		typedef odb::query<Timeline> timeline_query;
		typedef odb::query<TimelineItem> timeline_item_query;

		{
			// Start the query
			transaction t (db->begin ());

			unique_ptr<User> curr_user(db->query_one<User> (user_query::client_key == client_key));

			// Check if a user already exists
			if (curr_user.get() != 0) {

				// Timeline to update
				unsigned long tl_id = curr_user->getTimelineID();
				unique_ptr<Timeline> timeline(db->query_one<Timeline> (timeline_query::id == tl_id));

				if(timeline.get() != 0) {

					//Check if the event repeats or not
					if (frequency == -1) {
						// It doesn't have any repeats

						// Create new TimelineItem
						Event *new_event = new Event(type, description, location);
						TimelineItem *new_item = new TimelineItem(new_event, start, end);

						// Add the new item to the timeline
						timeline->addTimelineItem(new_item);
						
						// Persist TimelineItem and update Timeline
						db->persist(new_event);
						db->persist(new_item);
						db->update(*timeline);
					} else {
						// It does have repeats
						long diff = end - start;
						long seconds_day = 86400;
						long step;
						long repeats = 1;

						if(frequency == 0) {
							// Daily repeats
							step = seconds_day;
						} else if (frequency == 1) {
							// Weekly repeats
							step = (seconds_day*7);
						} else if (frequency == 2) {
							// Monthly repeats
							step = (seconds_day*30);
						}

						while(end + (step * repeats) < ends) {
							repeats += 1;
						}

						// Create intial event
						Event *new_event = new Event(type, description, location);
						TimelineItem *new_item = new TimelineItem(new_event, start, end);

						// Add the new item to the timeline
						timeline->addTimelineItem(new_item);

						// Persist TimelineItem
						db->persist(new_event);
						unsigned long update_id = db->persist(new_item);
						db->update(*timeline);

						// Declare repeated items
						vector<TimelineItem*> repeat_items;
						
						// Create repeats (repeats - 1 because we make one less repeat because of new_item)
						for(int i = 0; i < (repeats - 1); i++) {
							TimelineItem *item = new TimelineItem(new_event, start, end, new_item);
							repeat_items.push_back(item);
							db->persist(item);
						}

						// Get
						unique_ptr<TimelineItem> update_item(db->query_one<TimelineItem> (timeline_item_query::id == update_id));

						// Update initial item
						update_item->setLinkedItems(repeat_items);

						db->update(*update_item);
  
					}
					
					t.commit();

					// Build JSON
					response["success"] = true;
					response["data"] = "Timeline item(s) successfully added.";
					return response;
				} else {
					response["data"] = "Couldn't find timeline for user.";
				}
			} else {
				response["data"] = "Client authentication error. Client ID invalid.";
			}
		}
	} catch (const odb::exception& e) {
		response["data"] = e.what();
	}
	response["success"] = false;
	return response;
}

// Get
json authenticateUser(string identifier, string password, string ip) {
	json response;
	try {

        unique_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "db.simpalapps.com", 5432));
            
        typedef odb::query<User> query;

		{
			// Start the query
			transaction t (db->begin ());

			unique_ptr<User> curr_user(db->query_one<User> (query::name == identifier || query::email == identifier));

			// Check if a user already exists
			if (curr_user.get() != 0) {
				// Check that password is correct
				if(BCrypt::validatePassword(password, curr_user->getPassword())) {
					// New client key
					// string key = curr_user->generateKey(20);
					// curr_user->setClientKey(key);
					// curr_user->setLastIP(ip);

					// Update user
					db->update(*curr_user);

					// Commit update
					//t.commit();

					// Build JSON
					response["data"]["id"] = curr_user->getID();
					response["data"]["username"] = curr_user->getName();
					response["data"]["email"] = curr_user->getEmail();
					response["data"]["activated"] = curr_user->getActivated();
					response["data"]["last_ip"] = curr_user->getLastIP();
					response["data"]["ones"] = curr_user->getOnes();
					response["data"]["twos"] = curr_user->getTwos();
					response["data"]["threes"] = curr_user->getThrees();
					//response["data"]["client_key"] = key;
					response["data"]["client_key"] = curr_user->getClientKey();
					Timeline* timeline = curr_user->getTimeline();
					response["data"]["colours"]["colour_one"] = timeline->getColourOne();
					response["data"]["colours"]["colour_two"] = timeline->getColourTwo();
					response["data"]["colours"]["colour_three"] = timeline->getColourThree();
					response["data"]["labels"]["label_one"] = timeline->getLabelOne();
					response["data"]["labels"]["label_two"] = timeline->getLabelTwo();
					response["data"]["labels"]["label_three"] = timeline->getLabelThree();

					response["success"] = true;
					return response;
				} else {
					response["data"] = "Username or password incorrect.";
				}
			} else {
				response["data"] = "Username doesn't exist.";
			}
		}
	} catch (const odb::exception& e) {
		response["data"] = e.what();
	}
	response["success"] = false;
	return response;
}

json getEvents(string client_key, time_t start) {
	json response;
	try {

        unique_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "db.simpalapps.com", 5432));
            
        typedef odb::query<User> query;

		{
			// Start the query
			transaction t (db->begin ());

			unique_ptr<User> curr_user(db->query_one<User> (query::client_key == client_key));

			// Check if a user already exists
			if (curr_user.get() != 0) {

				// Build JSON
				response["data"]["colours"]["colour_one"] = curr_user->getTimeline()->getColourOne();
				response["data"]["colours"]["colour_two"] = curr_user->getTimeline()->getColourTwo();
				response["data"]["colours"]["colour_three"] = curr_user->getTimeline()->getColourThree();
				response["data"]["labels"]["label_one"] = curr_user->getTimeline()->getLabelOne();
				response["data"]["labels"]["label_two"] = curr_user->getTimeline()->getLabelTwo();
				response["data"]["labels"]["label_three"] = curr_user->getTimeline()->getLabelThree();

				response["success"] = true;
				return response;
			} else {
				response["data"] = "Client authentication error. Client ID invalid.";
			}
		}
	} catch (const odb::exception& e) {
		response["data"] = e.what();
	}
	response["success"] = false;
	return response;
}

json getSettings(string client_key) {
	json response;
	try {

        unique_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "db.simpalapps.com", 5432));
            
        typedef odb::query<User> query;

		{
			// Start the query
			transaction t (db->begin ());

			unique_ptr<User> curr_user(db->query_one<User> (query::client_key == client_key));

			// Check if a user already exists
			if (curr_user.get() != 0) {

				// Build JSON
				response["data"]["colours"]["colour_one"] = curr_user->getTimeline()->getColourOne();
				response["data"]["colours"]["colour_two"] = curr_user->getTimeline()->getColourTwo();
				response["data"]["colours"]["colour_three"] = curr_user->getTimeline()->getColourThree();
				response["data"]["labels"]["label_one"] = curr_user->getTimeline()->getLabelOne();
				response["data"]["labels"]["label_two"] = curr_user->getTimeline()->getLabelTwo();
				response["data"]["labels"]["label_three"] = curr_user->getTimeline()->getLabelThree();

				response["success"] = true;
				return response;
			} else {
				response["data"] = "Client authentication error. Client ID invalid.";
			}
		}
	} catch (const odb::exception& e) {
		response["data"] = e.what();
	}
	response["success"] = false;
	return response;
}

// Set
json setColours(string client_key, string colour_one, string colour_two, string colour_three) {
	json response;
	try {

        unique_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "db.simpalapps.com", 5432));
            
        typedef odb::query<User> user_query;
		typedef odb::query<Timeline> timeline_query;

		{
			// Start the query
			transaction t (db->begin ());

			unique_ptr<User> curr_user(db->query_one<User> (user_query::client_key == client_key));

			// Check if a user already exists
			if (curr_user.get() != 0) {

				// Timeline to update
				unsigned long tl_id = curr_user->getTimelineID();

				unique_ptr<Timeline> curr_timeline(db->query_one<Timeline> (timeline_query::id == tl_id));

				if(curr_timeline.get() != 0) {
					// Basic validation
					vector<string> colours = {"red", "green", "yellow", "purple", "blue", "grey"};
					if(colour_one == colour_two || colour_one == colour_three || colour_two == colour_three) {
						response["data"] = "Colours cannot be the same.";
					} else if(find(colours.begin(), colours.end(), colour_one) != colours.end() == false) {
						response["data"] = "Colour one is invalid.";
					} else if(find(colours.begin(), colours.end(), colour_two) != colours.end() == false) {
						response["data"] = "Colour two is invalid.";
					} else if(find(colours.begin(), colours.end(), colour_three) != colours.end() == false) {
						response["data"] = "Colour three is invalid.";
					} else {
						// Data fine, update
						curr_timeline->setColourOne(colour_one);
						curr_timeline->setColourTwo(colour_two);
						curr_timeline->setColourThree(colour_three);

						db->update(*curr_timeline);
						
						t.commit();

						// Build JSON
						response["success"] = true;
						response["data"] = "Colours successfully updated.";
						return response;
					}
				} else {
					response["data"] = "Couldn't find timeline for user.";
				}
			} else {
				response["data"] = "Client authentication error. Client ID invalid.";
			}
		}
	} catch (const odb::exception& e) {
		response["data"] = e.what();
	}
	response["success"] = false;
	return response;
}

json setLabels(string client_key, string label_one, string label_two, string label_three) {
	json response;
	try {

        unique_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", 
			"postgres", "db.simpalapps.com", 5432));
            
        typedef odb::query<User> user_query;
		typedef odb::query<Timeline> timeline_query;

		{
			// Start the query
			transaction t (db->begin ());

			unique_ptr<User> curr_user(db->query_one<User> (user_query::client_key == client_key));

			// Check if a user already exists
			if (curr_user.get() != 0) {

				// Timeline to update
				unsigned long tl_id = curr_user->getTimelineID();

				unique_ptr<Timeline> curr_timeline(db->query_one<Timeline> (timeline_query::id == tl_id));

				if(curr_timeline.get() != 0) {
					// Basic validation
					if(label_one.length() > 15 || label_one.length() < 3) {
						response["data"] = "Label one is invalid.";
					} else if(label_two.length() > 15 || label_two.length() < 3) {
						response["data"] = "Label two is invalid.";
					} else if(label_three.length() > 15 || label_three.length() < 3) {
						response["data"] = "Label three is invalid.";
					} else {
						// Data fine, update
						curr_timeline->setLabelOne(label_one);
						curr_timeline->setLabelTwo(label_two);
						curr_timeline->setLabelThree(label_three);

						db->update(*curr_timeline);
						
						t.commit();

						// Build JSON
						response["success"] = true;
						response["data"] = "Labels successfully updated.";
						return response;
					}
				} else {
					response["data"] = "Couldn't find timeline for user.";
				}
			} else {
				response["data"] = "Client authentication error. Client ID invalid.";
			}
		}
	} catch (const odb::exception& e) {
		response["data"] = e.what();
	}
	response["success"] = false;
	return response;
}

int main(int argc, char *argv[]) {

	string type = argv[1];
	string subtype = argv[2];

	if(argc > 2) {
		if(type == "create") {
		
			// User
			if(subtype == "user" && argc == 8) {
				cout << createUser(argv[3], argv[4], argv[5], argv[6], argv[7]) << endl;
				return 0;
			}

			// Event
			if(subtype == "event" && argc == 11) {
				cout << createEvent(argv[3], stoi(argv[4]), argv[5], argv[6], stol(argv[7]), 
					stol(argv[8]), stoi(argv[9]), stol(argv[10])) << endl;
				return 0;
			}

		} else if (type == "get") {
			
			// User
			if(subtype == "user" && argc == 6) {
				cout << authenticateUser(argv[3], argv[4], argv[5]) << endl;
				return 0;
			}

			// Settings
			if(subtype == "settings" && argc == 4) {
				cout << getSettings(argv[3]) << endl;
				return 0;
			}

			// Events
			if(subtype == "events" && argc == 5) {
				cout << getEvents(argv[3], stol(argv[4])) << endl;
				return 0;
			}

		} else if (type == "set") {

			// Colours
			if(subtype == "colours" && argc == 7) {
				cout << setColours(argv[3], argv[4], argv[5], argv[6]) << endl;
				return 0;
			}
			
			if(subtype == "labels" && argc == 7) {
				cout << setLabels(argv[3], argv[4], argv[5], argv[6]) << endl;
				return 0;
			}
		}
	}

	json response;
	response["success"] = false;
	response["data"] = "Incorrect driver call.";
	cerr << response << endl;
	return 1;
}