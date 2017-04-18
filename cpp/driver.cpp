#include <memory>   // std::auto_ptr
#include <iostream>

#include <odb/database.hxx>
#include <odb/transaction.hxx>

#include <odb/pgsql/database.hxx>

#include "Timeline.hpp"
#include "Timeline-odb.hxx"

using namespace std;
using namespace odb::core;
int main() {

    try
    {
        // Create database connection
        auto_ptr<odb::database> db(new odb::pgsql::database("postgres",
        "39HjaJPnMpta9WDu", "postgres", "104.197.11.127", 5432));

        unsigned long tl_id;

        // Create a few persistent person objects.
        //
        {
            vector<int> items;
            items.push_back(-1);
            Timeline tl(1, items, "FF0000", "00FF00", "0000FF");

            transaction t(db->begin());

            // Make objects persistent and save their ids for later use.
            //
            tl_id = db->persist(tl);

            t.commit();
        }
    }
    catch (const odb::exception &e)
    {
        cerr << e.what() << endl;
        return 1;
    }
}