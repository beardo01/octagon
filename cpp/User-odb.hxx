// This file was generated by ODB, object-relational mapping (ORM)
// compiler for C++.
//

#ifndef USER_ODB_HXX
#define USER_ODB_HXX

#include <odb/version.hxx>

#if (ODB_VERSION != 20400UL)
#error ODB runtime version mismatch
#endif

#include <odb/pre.hxx>

#include "User.hpp"

#include "Timeline-odb.hxx"
#include "TimelineItem-odb.hxx"

#include <memory>
#include <cstddef>
#include <utility>

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
  // User
  //
  template <>
  struct class_traits< ::User >
  {
    static const class_kind kind = class_object;
  };

  template <>
  class access::object_traits< ::User >
  {
    public:
    typedef ::User object_type;
    typedef ::User* pointer_type;
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
  // User
  //
  template <typename A>
  struct pointer_query_columns< ::User, id_pgsql, A >
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

    // name
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    name_type_;

    static const name_type_ name;

    // email
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    email_type_;

    static const email_type_ email;

    // password
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    password_type_;

    static const password_type_ password;

    // timeline
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        long unsigned int,
        pgsql::id_bigint >::query_type,
      pgsql::id_bigint >
    timeline_type_;

    static const timeline_type_ timeline;

    // create_date
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::time_t,
        pgsql::id_bigint >::query_type,
      pgsql::id_bigint >
    create_date_type_;

    static const create_date_type_ create_date;

    // activated
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        short int,
        pgsql::id_smallint >::query_type,
      pgsql::id_smallint >
    activated_type_;

    static const activated_type_ activated;

    // last_ip
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    last_ip_type_;

    static const last_ip_type_ last_ip;

    // ones
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        unsigned int,
        pgsql::id_integer >::query_type,
      pgsql::id_integer >
    ones_type_;

    static const ones_type_ ones;

    // twos
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        unsigned int,
        pgsql::id_integer >::query_type,
      pgsql::id_integer >
    twos_type_;

    static const twos_type_ twos;

    // threes
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        unsigned int,
        pgsql::id_integer >::query_type,
      pgsql::id_integer >
    threes_type_;

    static const threes_type_ threes;

    // client_key
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    client_key_type_;

    static const client_key_type_ client_key;
  };

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::id_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  id (A::table_name, "\"id\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::name_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  name (A::table_name, "\"name\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::email_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  email (A::table_name, "\"email\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::password_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  password (A::table_name, "\"password\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::timeline_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  timeline (A::table_name, "\"timeline\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::create_date_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  create_date (A::table_name, "\"create_date\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::activated_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  activated (A::table_name, "\"activated\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::last_ip_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  last_ip (A::table_name, "\"last_ip\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::ones_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  ones (A::table_name, "\"ones\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::twos_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  twos (A::table_name, "\"twos\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::threes_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  threes (A::table_name, "\"threes\"", 0);

  template <typename A>
  const typename pointer_query_columns< ::User, id_pgsql, A >::client_key_type_
  pointer_query_columns< ::User, id_pgsql, A >::
  client_key (A::table_name, "\"client_key\"", 0);

  template <>
  class access::object_traits_impl< ::User, id_pgsql >:
    public access::object_traits< ::User >
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

      // name_
      //
      details::buffer name_value;
      std::size_t name_size;
      bool name_null;

      // email_
      //
      details::buffer email_value;
      std::size_t email_size;
      bool email_null;

      // password_
      //
      details::buffer password_value;
      std::size_t password_size;
      bool password_null;

      // timeline_
      //
      long long timeline_value;
      bool timeline_null;

      // create_date_
      //
      long long create_date_value;
      bool create_date_null;

      // activated_
      //
      short activated_value;
      bool activated_null;

      // last_ip_
      //
      details::buffer last_ip_value;
      std::size_t last_ip_size;
      bool last_ip_null;

      // ones_
      //
      int ones_value;
      bool ones_null;

      // twos_
      //
      int twos_value;
      bool twos_null;

      // threes_
      //
      int threes_value;
      bool threes_null;

      // client_key_
      //
      details::buffer client_key_value;
      std::size_t client_key_size;
      bool client_key_null;

      std::size_t version;
    };

    struct extra_statement_cache_type;

    struct timeline_tag;

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

    static const std::size_t column_count = 12UL;
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
  class access::object_traits_impl< ::User, id_common >:
    public access::object_traits_impl< ::User, id_pgsql >
  {
  };

  // User
  //
  template <>
  struct alias_traits<
    ::Timeline,
    id_pgsql,
    access::object_traits_impl< ::User, id_pgsql >::timeline_tag>
  {
    static const char table_name[];
  };

  template <>
  struct query_columns_base< ::User, id_pgsql >
  {
    // timeline
    //
    typedef
    odb::alias_traits<
      ::Timeline,
      id_pgsql,
      access::object_traits_impl< ::User, id_pgsql >::timeline_tag>
    timeline_alias_;
  };

  template <typename A>
  struct query_columns< ::User, id_pgsql, A >:
    query_columns_base< ::User, id_pgsql >
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

    // name
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    name_type_;

    static const name_type_ name;

    // email
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    email_type_;

    static const email_type_ email;

    // password
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    password_type_;

    static const password_type_ password;

    // timeline
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        long unsigned int,
        pgsql::id_bigint >::query_type,
      pgsql::id_bigint >
    timeline_column_type_;

    typedef
    odb::query_pointer<
      odb::pointer_query_columns<
        ::Timeline,
        id_pgsql,
        timeline_alias_ > >
    timeline_pointer_type_;

    struct timeline_type_: timeline_pointer_type_, timeline_column_type_
    {
      timeline_type_ (const char* t, const char* c, const char* conv)
        : timeline_column_type_ (t, c, conv)
      {
      }
    };

    static const timeline_type_ timeline;

    // create_date
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::time_t,
        pgsql::id_bigint >::query_type,
      pgsql::id_bigint >
    create_date_type_;

    static const create_date_type_ create_date;

    // activated
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        short int,
        pgsql::id_smallint >::query_type,
      pgsql::id_smallint >
    activated_type_;

    static const activated_type_ activated;

    // last_ip
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    last_ip_type_;

    static const last_ip_type_ last_ip;

    // ones
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        unsigned int,
        pgsql::id_integer >::query_type,
      pgsql::id_integer >
    ones_type_;

    static const ones_type_ ones;

    // twos
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        unsigned int,
        pgsql::id_integer >::query_type,
      pgsql::id_integer >
    twos_type_;

    static const twos_type_ twos;

    // threes
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        unsigned int,
        pgsql::id_integer >::query_type,
      pgsql::id_integer >
    threes_type_;

    static const threes_type_ threes;

    // client_key
    //
    typedef
    pgsql::query_column<
      pgsql::value_traits<
        ::std::string,
        pgsql::id_string >::query_type,
      pgsql::id_string >
    client_key_type_;

    static const client_key_type_ client_key;
  };

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::id_type_
  query_columns< ::User, id_pgsql, A >::
  id (A::table_name, "\"id\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::name_type_
  query_columns< ::User, id_pgsql, A >::
  name (A::table_name, "\"name\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::email_type_
  query_columns< ::User, id_pgsql, A >::
  email (A::table_name, "\"email\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::password_type_
  query_columns< ::User, id_pgsql, A >::
  password (A::table_name, "\"password\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::timeline_type_
  query_columns< ::User, id_pgsql, A >::
  timeline (A::table_name, "\"timeline\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::create_date_type_
  query_columns< ::User, id_pgsql, A >::
  create_date (A::table_name, "\"create_date\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::activated_type_
  query_columns< ::User, id_pgsql, A >::
  activated (A::table_name, "\"activated\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::last_ip_type_
  query_columns< ::User, id_pgsql, A >::
  last_ip (A::table_name, "\"last_ip\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::ones_type_
  query_columns< ::User, id_pgsql, A >::
  ones (A::table_name, "\"ones\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::twos_type_
  query_columns< ::User, id_pgsql, A >::
  twos (A::table_name, "\"twos\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::threes_type_
  query_columns< ::User, id_pgsql, A >::
  threes (A::table_name, "\"threes\"", 0);

  template <typename A>
  const typename query_columns< ::User, id_pgsql, A >::client_key_type_
  query_columns< ::User, id_pgsql, A >::
  client_key (A::table_name, "\"client_key\"", 0);
}

#include "User-odb.ixx"

#include <odb/post.hxx>

#endif // USER_ODB_HXX
