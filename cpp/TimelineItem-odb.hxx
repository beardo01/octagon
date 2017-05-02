// This file was generated by ODB, object-relational mapping (ORM)
// compiler for C++.
//

#ifndef TIMELINE_ITEM_ODB_HXX
#define TIMELINE_ITEM_ODB_HXX

#include <odb/version.hxx>

#if (ODB_VERSION != 20400UL)
#error ODB runtime version mismatch
#endif

#include <odb/pre.hxx>

#include "TimelineItem.hpp"

#include <memory>
#include <cstddef>

#include <odb/core.hxx>
#include <odb/traits.hxx>
#include <odb/callback.hxx>
#include <odb/wrapper-traits.hxx>
#include <odb/pointer-traits.hxx>
#include <odb/container-traits.hxx>
#include <odb/no-op-cache-traits.hxx>
#include <odb/result.hxx>
#include <odb/simple-object-result.hxx>

#include <odb/details/unused.hxx>
#include <odb/details/shared-ptr.hxx>

namespace odb
{
  // TimelineItem
  //
  template <>
  struct class_traits< ::TimelineItem >
  {
    static const class_kind kind = class_object;
  };

  template <>
  class access::object_traits< ::TimelineItem >
  {
    public:
    typedef ::TimelineItem object_type;
    typedef ::TimelineItem* pointer_type;
    typedef odb::pointer_traits<pointer_type> pointer_traits;

    static const bool polymorphic = false;

    typedef long unsigned int id_type;

    static const bool auto_id = true;

    static const bool abstract = false;

    static id_type
    id (const object_type&);

    typedef
    no_op_pointer_cache_traits<pointer_type>
    pointer_cache_traits;

    typedef
    no_op_reference_cache_traits<object_type>
    reference_cache_traits;

    static void
    callback (database&, object_type&, callback_event);

    static void
    callback (database&, const object_type&, callback_event);
  };
}

#include <odb/details/buffer.hxx>

#include <odb/pgsql/version.hxx>
#include <odb/pgsql/forward.hxx>
#include <odb/pgsql/binding.hxx>
#include <odb/pgsql/pgsql-types.hxx>
#include <odb/pgsql/query.hxx>

namespace odb
{
  // TimelineItem
  //
  template <typename A>
  struct query_columns< ::TimelineItem, id_pgsql, A >
  {
    // id
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        long unsigned int,
        pgsql::id_bigint >::query_type,
      pgsql::id_bigint >
    id_type_;

    static const id_type_ id;

    // type
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        short int,
        pgsql::id_smallint >::query_type,
      pgsql::id_smallint >
    type_type_;

    static const type_type_ type;

    // start
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::time_t,
        pgsql::id_bigint >::query_type,
      pgsql::id_bigint >
    start_type_;

    static const start_type_ start;

    // end
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::time_t,
        pgsql::id_bigint >::query_type,
      pgsql::id_bigint >
    end_type_;

    static const end_type_ end;

    // description
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    description_type_;

    static const description_type_ description;

    // location
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    location_type_;

    static const location_type_ location;

    // linked
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        long int,
        pgsql::id_bigint >::query_type,
      pgsql::id_bigint >
    linked_type_;

    static const linked_type_ linked;
  };

  template <typename A>
  const typename query_columns< ::TimelineItem, id_pgsql, A >::id_type_
  query_columns< ::TimelineItem, id_pgsql, A >::
  id (A::table_name, "\"id\"", 0);

  template <typename A>
  const typename query_columns< ::TimelineItem, id_pgsql, A >::type_type_
  query_columns< ::TimelineItem, id_pgsql, A >::
  type (A::table_name, "\"type\"", 0);

  template <typename A>
  const typename query_columns< ::TimelineItem, id_pgsql, A >::start_type_
  query_columns< ::TimelineItem, id_pgsql, A >::
  start (A::table_name, "\"start\"", 0);

  template <typename A>
  const typename query_columns< ::TimelineItem, id_pgsql, A >::end_type_
  query_columns< ::TimelineItem, id_pgsql, A >::
  end (A::table_name, "\"end\"", 0);

  template <typename A>
  const typename query_columns< ::TimelineItem, id_pgsql, A >::description_type_
  query_columns< ::TimelineItem, id_pgsql, A >::
  description (A::table_name, "\"description\"", 0);

  template <typename A>
  const typename query_columns< ::TimelineItem, id_pgsql, A >::location_type_
  query_columns< ::TimelineItem, id_pgsql, A >::
  location (A::table_name, "\"location\"", 0);

  template <typename A>
  const typename query_columns< ::TimelineItem, id_pgsql, A >::linked_type_
  query_columns< ::TimelineItem, id_pgsql, A >::
  linked (A::table_name, "\"linked\"", 0);

  template <typename A>
  struct pointer_query_columns< ::TimelineItem, id_pgsql, A >:
    query_columns< ::TimelineItem, id_pgsql, A >
  {
  };

  template <>
  class access::object_traits_impl< ::TimelineItem, id_pgsql >:
    public access::object_traits< ::TimelineItem >
  {
    public:
    struct id_image_type
    {
      long long id_value;
      bool id_null;

      std::size_t version;
    };

    struct image_type
    {
      // id_
      //
      long long id_value;
      bool id_null;

      // type_
      //
      short type_value;
      bool type_null;

      // start_
      //
      long long start_value;
      bool start_null;

      // end_
      //
      long long end_value;
      bool end_null;

      // description_
      //
      details::buffer description_value;
      std::size_t description_size;
      bool description_null;

      // location_
      //
      details::buffer location_value;
      std::size_t location_size;
      bool location_null;

      // linked_
      //
      long long linked_value;
      bool linked_null;

      std::size_t version;
    };

    struct extra_statement_cache_type;

    // linked_items_
    //
    struct linked_items_traits
    {
      static const char select_name[];
      static const char insert_name[];
      static const char delete_name[];

      static const unsigned int insert_types[];

      static const std::size_t id_column_count = 1UL;
      static const std::size_t data_column_count = 3UL;

      static const bool versioned = false;

      static const char insert_statement[];
      static const char select_statement[];
      static const char delete_statement[];

      typedef ::std::vector< int > container_type;
      typedef
      odb::access::container_traits<container_type>
      container_traits_type;
      typedef container_traits_type::index_type index_type;
      typedef container_traits_type::value_type value_type;

      typedef ordered_functions<index_type, value_type> functions_type;
      typedef pgsql::container_statements< linked_items_traits > statements_type;

      struct data_image_type
      {
        // index
        //
        long long index_value;
        bool index_null;

        // value
        //
        int value_value;
        bool value_null;

        std::size_t version;
      };

      static void
      bind (pgsql::bind*,
            const pgsql::bind* id,
            std::size_t id_size,
            data_image_type&);

      static void
      grow (data_image_type&,
            bool*);

      static void
      init (data_image_type&,
            index_type*,
            const value_type&);

      static void
      init (index_type&,
            value_type&,
            const data_image_type&,
            database*);

      static void
      insert (index_type, const value_type&, void*);

      static bool
      select (index_type&, value_type&, void*);

      static void
      delete_ (void*);

      static void
      persist (const container_type&,
               statements_type&);

      static void
      load (container_type&,
            statements_type&);

      static void
      update (const container_type&,
              statements_type&);

      static void
      erase (statements_type&);
    };

    using object_traits<object_type>::id;

    static id_type
    id (const id_image_type&);

    static id_type
    id (const image_type&);

    static bool
    grow (image_type&,
          bool*);

    static void
    bind (pgsql::bind*,
          image_type&,
          pgsql::statement_kind);

    static void
    bind (pgsql::bind*, id_image_type&);

    static bool
    init (image_type&,
          const object_type&,
          pgsql::statement_kind);

    static void
    init (object_type&,
          const image_type&,
          database*);

    static void
    init (id_image_type&, const id_type&);

    typedef pgsql::object_statements<object_type> statements_type;

    typedef pgsql::query_base query_base_type;

    static const std::size_t column_count = 7UL;
    static const std::size_t id_column_count = 1UL;
    static const std::size_t inverse_column_count = 0UL;
    static const std::size_t readonly_column_count = 0UL;
    static const std::size_t managed_optimistic_column_count = 0UL;

    static const std::size_t separate_load_column_count = 0UL;
    static const std::size_t separate_update_column_count = 0UL;

    static const bool versioned = false;

    static const char persist_statement[];
    static const char find_statement[];
    static const char update_statement[];
    static const char erase_statement[];
    static const char query_statement[];
    static const char erase_query_statement[];

    static const char table_name[];

    static void
    persist (database&, object_type&);

    static pointer_type
    find (database&, const id_type&);

    static bool
    find (database&, const id_type&, object_type&);

    static bool
    reload (database&, object_type&);

    static void
    update (database&, const object_type&);

    static void
    erase (database&, const id_type&);

    static void
    erase (database&, const object_type&);

    static result<object_type>
    query (database&, const query_base_type&);

    static unsigned long long
    erase_query (database&, const query_base_type&);

    static const char persist_statement_name[];
    static const char find_statement_name[];
    static const char update_statement_name[];
    static const char erase_statement_name[];
    static const char query_statement_name[];
    static const char erase_query_statement_name[];

    static const unsigned int persist_statement_types[];
    static const unsigned int find_statement_types[];
    static const unsigned int update_statement_types[];

    public:
    static bool
    find_ (statements_type&,
           const id_type*);

    static void
    load_ (statements_type&,
           object_type&,
           bool reload);
  };

  template <>
  class access::object_traits_impl< ::TimelineItem, id_common >:
    public access::object_traits_impl< ::TimelineItem, id_pgsql >
  {
  };

  // TimelineItem
  //
}

#include "TimelineItem-odb.ixx"

#include <odb/post.hxx>

#endif // TIMELINE_ITEM_ODB_HXX
