#include <memory>   // std::auto_ptr
#include <iostream>
#include <string>
#include <vector>

#include <odb/database.hxx>
#include <odb/transaction.hxx>

#include <odb/pgsql/database.hxx>

#include "Timeline.hpp"
#include "Timeline.cpp"
//#include "Timeline-odb.hxx"
#include "TimelineItem.hpp"
#include "TimelineItem.cpp"
//#include "TimelineItem-odb.hxx"

using namespace std;
using namespace odb::core;

int main(int argc, char *argv[]) {

    /*try
    {
        // Create database connection
        auto_ptr<odb::database> db(new odb::pgsql::database("postgres", "39HjaJPnMpta9WDu", "postgres", "104.197.11.127", 5432));

        unsigned long tl_id;

        // Create a few persistent person objects.
        {
            vector<int> items;
            items.push_back(2);
            string colour1 = "FF0000";
            string colour2 = "00FF00";
            string colour3 = "0000FF";
            unsigned long some_id = 1;
            Timeline tl(some_id, items, colour1, colour2, colour3);

            transaction t(db->begin());

            // Make objects persistent and save their ids for later use.
            tl_id = db->persist(tl);

            t.commit();
        }
    }
    catch (const odb::exception &e)
    {
        cerr << e.what() << endl;
        return 1;
    }*/

    Timeline timeline(1, vector<TimelineItem> (), "FF0000", "00FF00", "0000FF");

    for(std::vector<int>::size_type i = 0; i != timeline.getTimelineItems().size(); i++) {
        std::cout << timeline.getTimelineItems()[i].toString();
    }
    
    timeline.addItem(1, "Meeting with Sam", "11 Wharf Street", time_t(time), time_t(time) + 600);

    timeline.printTimeline();

    std::cout << endl;

    timeline.addItem(2, "Meeting with Charlie", "11 Dock Street", time_t(time), 
        time_t(time) + 600, 1, time_t(time) + (86400 * 21));

    timeline.printTimeline();

}