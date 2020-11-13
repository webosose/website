---
title: com.webos.service.db
date: 2020-11-09
weight: 170
toc: true
---
<div>
  <h2>API Summary</h2>
  <p>Enables apps to store persistent data.</p>
</div>
<h2>Overview of the API</h2>
<div>
  <p>
    DB8 is a user space service that provides access to the webOS
    database.&nbsp;Access to the database APIs is provided over the luna-service
    bus.
  </p>
  <p>
    Formally, a database refers to a set of related objects and the way it is
    structured or organized. Access to these objects is usually provided by a
    luna API that allows applications to interact with the database and one with
    another. It also provides access to the objects in the database (although
    there may be restrictions that grant or limit access to particular data).
    DB8 provides various functions that allow to enter, store, and retrieve
    large volumes of information as well as provides the interface to manage how
    that information is organized.
  </p>
  <p><strong>Designing a database:</strong></p>
  <p>
    The first task of a database designer is to produce a conceptual model that
    reflects the structure of data as it is going to be stored in a database. A
    common approach to this is to develop a <strong>Kind </strong>that
    implements the relevant data structures within the database.
  </p>
  <p>Example of <strong>Kind</strong> creation:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/putKind &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;owner&quot;:&quot;com.webos.service.test&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;indexes&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;testsample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;test&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
  </div>
  <p>
    In the example above, we create a <strong>Kind</strong> with an ID:
    &quot;com.webos.service.test:1&quot; (this is similar to a schema name).
  </p>
  <p>
    The owner of this <strong>Kind</strong> service is
    <strong>com.webos.service</strong><strong>.test</strong>. The owner of a
    Kind has permissions to calculate quotas, grant permissions to modify or
    delete a <strong>Kind</strong>, grant permissions to other services for
    <strong>Kind</strong> data, etc.
  </p>
  <p>
    We have also specified two indexes for the <strong>Kind</strong>. An index
    is a data structure that allows data retrieval operations on a database at
    the cost of additional writes and storage space to maintain the index data
    structure. Indexes are used to quickly locate data without having to search
    every row in a database every time a database is accessed. Indexes are
    created using one or more columns of a database object, providing the basis
    for both rapid random searches and efficient access of ordered records.
  </p>
  <p>
    The number after the colon in the ID&nbsp;is the&nbsp;<strong>Kind Revision</strong>
    number. When a service updates a <strong>Kind</strong>, the service should
    increment its revision number to indicate that the schema has changed.
  </p>
  <p><strong>Philosopher&#39;s stone (objects): </strong></p>
  <p>
    DB8 operates with objects. Objects have fields. Every object that is stored
    within DB8 always has an&nbsp;<strong>ID </strong>and
    a&nbsp;<strong>revision</strong>.
  </p>
  <p>
    An object <strong>ID </strong>uniquely identifies an object within a
    database. The object <strong>ID&nbsp;</strong>does not repeat within a
    database.
  </p>
  <p><strong>Object revisions:</strong></p>
  <p>
    Object <strong>revision </strong>is a number, that determines &quot;version
    of an object in the database&quot;. This number is required to avoid
    collisions when two or more services simultaneously try to update an object
    at the same time.
  </p>
  <p>
    For all new objects, the database will append a <strong>_rev</strong> field,
    which indicates the object revision. By default, the database will set
    object revision <strong>_rev</strong> field to Database Revision (Number,
    that atomically increments on any database modification).
  </p>
  <p>
    If an object already exists in the database, the database engine will
    automatically increment the object revision number on each
    successful&nbsp;<strong>put/merge</strong> API call for this object.
  </p>
  <p>
    Explanation by example: <em>com.</em>webos.service<em>.test</em> and
    <em>com.</em>webos.service<em>.othertest</em>&nbsp;applications have access
    for read/write to <strong>Kind</strong>
    <em>com.</em>webos.service<em>.test:1</em>. Both applications, at the same
    time, read an object from <em>com.</em>webos.service<em>.test:1</em> kind
    object with ID&nbsp;<strong>++JZk1sXYW7lCdqU</strong> and revision
    <strong>777</strong>.
  </p>
  <p>Both applications execute a merge command like the following:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/merge &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;++JZk1sXYW7lCdqU&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:777,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;I&nbsp;am&nbsp;new&nbsp;sample&nbsp;value&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;<br />
    </p>
  </div>
  <p>
    Following is the <strong>merge </strong>call response, that will be received
    by&nbsp;<strong>one of</strong>&nbsp;the applications - (may be
    <em>com.</em>webos.service<em>.test</em> or com.webos.service.othertest,
    depends who is more lucky):
  </p>
  <div class="code-bg-grey">
    <p>
      {<br />
      &nbsp; &quot;returnValue&quot;:true,<br />
      &nbsp; &quot;results&quot;:[<br />
      &nbsp;&nbsp;&nbsp; {<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &quot;id&quot;:&quot;++JZk1sXYW7lCdqU&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &quot;rev&quot;:<strong>778</strong>&nbsp; &nbsp;
      <em>&lt;--- See, the database increments the revision after a successful
        object update!</em><br />
      &nbsp;&nbsp;&nbsp; }<br />
      ]}
    </p>
  </div>
  <p>The other application will get the following error:</p>
  <div class="code-bg-grey">
    <p>
      {<br />
      &nbsp;&nbsp;&nbsp; &quot;returnValue&quot;:false,<br />
      &nbsp;&nbsp;&nbsp; &quot;errorCode&quot;:-3961,<br />
      &nbsp;&nbsp;&nbsp; &quot;errorText&quot;:&quot;db: revision mismatch -
      expected 778, got 777&quot;<br />
      }
    </p>
  </div>
  <p>
    This error indicates that someone else has already updated this object.
    After receiving this error, the application MUST execute the&nbsp;<strong>get </strong>method to get the object again with a new _rev, and then try to re-execute
    the merge query.
  </p>
  <p><strong>Create:</strong></p>
  <p>
    To store an object in the database, a client can use
    the&nbsp;<strong>put&nbsp;</strong>method.
  </p>
  <p>
    Complexity guaranteed&nbsp;for a <strong>put&nbsp;</strong>API call
    is&nbsp;<strong>log(n)</strong>.<strong>&nbsp;</strong>
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/put &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;max&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
  </div>
  <p><strong>Update (replace):</strong></p>
  <p>
    The <strong>put </strong>method updates an object. Update by default will
    replace the database object with the new one (in other words, if a new
    object does not have some fields that were present in the old database
    object, those old database fields will be removed)
  </p>
  <p>As an example, consider the following object in a database:</p>
  <div class="code-bg-grey">
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZR3hyjVyB3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_rev&quot;:12,<br />
      &nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;MAX&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample777&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test777&quot;<br />
      }
    </p>
  </div>
  <p>And the following luna call is made:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -m com.webos.service.configurator
      luna://com.webos.service.db/put &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZR3hyjVyB3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:12,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample777&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
  </div>
  <p>If the call is successful, the database will contain:</p>
  <div class="code-bg-grey">
    <p>
      {<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot;_rev&quot;: 13,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot;sample&quot;:
      &quot;sample777&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot;_id&quot;:
      &quot;JZR3hyjVyB3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot;_kind&quot;:
      &quot;com.webos.service.test:1&quot;<br />
      }
    </p>
  </div>
  <p><strong>Update (Merge):</strong></p>
  <p>
    Sometimes a service does not need to replace an object in the database, but
    simply needs to add a field to a database object. For this type of update, a
    client can call the&nbsp;<strong>merge </strong>method instead of the
    <strong>put </strong>method.
  </p>
  <p>For example, if we have an object:</p>
  <div class="code-bg-grey">
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZR3hyjVyB3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_rev&quot;:12,<br />
      &nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;MAX&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample777&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test777&quot;<br />
      }&nbsp; &nbsp;
    </p>
  </div>
  <p>And the following luna call is made:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -m com.webos.service.configurator
      luna://com.webos.service.db/merge &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZR3hyjVyB3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:12,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sername&quot;:&quot;Super&nbsp;Hero!!!&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
  </div>
  <p>If the call is successful, the database will contain:</p>
  <div class="code-bg-grey">
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZR3hyjVyB3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_rev&quot;:13,<br />
      &nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;MAX&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;sername&quot;:&quot;Super&nbsp;Hero!!!&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample777&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test777&quot;<br />
      }
    </p>
  </div>
  <p><strong>Trick with put/merge and object revision:</strong></p>
  <p>
    The <strong>_rev</strong> object field shows the revision number of an
    object. But what happens if an application wants to track updates to
    specific field/fields? DB8 can do that.
  </p>
  <p>
    The application should modify the <strong>Kind</strong> and add
    <strong>revSets</strong>.
  </p>
  <p>
    Revision set (<strong>revSets</strong>) is a set of object field names, that
    the database should track for changes. If the tracked field(s) are modified,
    the database will increment the number.
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f luna://com.webos.service.db/putKind &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.webos.service.test:2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;owner&quot;:&quot;com.webos.service.test&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;indexes&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field12&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field21&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;],<br />
      &nbsp;<strong>&nbsp;&nbsp;&quot;revSets&quot;:[&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1_rev&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;]</strong><br />
      }&#39;
    </p>
  </div>
  <p>
    The above modification to the <strong>Kind</strong> tells DB8 to do the
    following:
  </p>
  <ol>
    <li>
      Add the&nbsp;<strong>field1_rev</strong>&nbsp;field&nbsp;to each object
    </li>
    <li>
      Increase its value when the <strong>field1</strong> object&nbsp;is
      modified.
    </li>
  </ol>
  <p>The default value of field1_rev will be the same as object _rev.</p>
  <p>Example:</p>
  <p>Lets create a new object:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/put &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;a&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;a&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
  </div>
  <p>In the database, the object will be stored as:</p>
  <div class="code-bg-grey">
    <p>
      {&nbsp;<br />
      &nbsp;<strong>&nbsp;&nbsp;&quot;field1_rev&quot;</strong>:408,<br />
      &nbsp;&nbsp;&nbsp;&quot;_rev&quot;:408,<br />
      &nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;a&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;a&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;++JZlENT5FkVcjy3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      }&nbsp; &nbsp; &nbsp;
    </p>
  </div>
  <p>
    The database then adds the&nbsp;<strong>field1_rev</strong> field to the
    object.<br />
    <br />
    When an application updates&nbsp;<strong>field1</strong>, DB8 will
    automatically increment the&nbsp;<strong>field1_rev</strong> field:
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/merge &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;++JZlENT5FkVcjy3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:408,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;Join&nbsp;to&nbsp;dark&nbsp;DB8&nbsp;side,&nbsp;Luke!&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;<br />
      <br />
    </p>
  </div>
  <p>The database will contain:</p>
  <div class="code-bg-grey">
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;<strong>&quot;field1_rev&quot;:409</strong>,<br />
      &nbsp;&nbsp;&nbsp;&quot;_rev&quot;:<strong>409</strong>,<br />
      &nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;Join&nbsp;to&nbsp;dark&nbsp;DB8&nbsp;side,&nbsp;Luke!&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;c&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;++JZlENT5FkVcjy3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:2&quot;<br />
      }&nbsp; &nbsp; &nbsp;
    </p>
  </div>
  <p>
    Now, if we update the&nbsp;<strong>field2&nbsp;</strong>only, the database
    will not increment the&nbsp;<strong>field1_rev</strong> field, as it does
    not track updates to field2.
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1luna://com.webos.service.db/merge &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;++JZlENT5FkVcjy3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:409,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;Lalala&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
  </div>
  <p>The database will contain:</p>
  <div class="code-bg-grey">
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;<strong>&nbsp;&quot;field1_rev&quot;:409</strong>,<br />
      &nbsp;&nbsp;&nbsp;&quot;_rev&quot;:<strong>410</strong>,<br />
      &nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;Join&nbsp;to&nbsp;dark&nbsp;DB8&nbsp;side,&nbsp;Luke!&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;Lalala&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;++JZlENT5FkVcjy3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:2&quot;<br />
      }
    </p>
  </div>
  <p><strong>Queries:</strong></p>
  <p>
    DB8 guarantees complexity for all CRUD (create, read, update, delete) API
    calls.
  </p>
  <p>
    To retrieve data, a client can call either the&nbsp;<strong>get </strong>or
    the&nbsp;<strong>find </strong>method.
  </p>
  <ul>
    <li>
      The <strong>get </strong>method provides the ability to get an object by
      the object id.<br />
      Complexity guaranteed for <strong>get </strong>API call is&nbsp;<strong>log(n)</strong>
    </li>
    <li>
      The <strong>find </strong>method provides the ability to get objects by
      condition. The <strong>find&nbsp;</strong>query must use the index
      fields&nbsp;of an object for searching.<br />
      Complexity guaranteed for the&nbsp;<strong>find </strong>API call
      is&nbsp;<strong>log(n)</strong>
    </li>
    <li>
      The <strong>search </strong>method&nbsp;provides the ability to get
      objects by condition. The <strong>search </strong>Query uses&nbsp;any
      object field for searching.<br />
      Complexity guaranteed&nbsp;for the <strong>search&nbsp;</strong>API call
      is&nbsp;<strong>n.</strong>
    </li>
  </ul>
  <p>
    It may not be clear, why the&nbsp;<strong>find </strong>method does not
    allow operations, like filter or sub-string search. Think about it this way:
    DB8 always guarantees complexity for all&nbsp;of its API calls without
    exception. An operation like the&nbsp;filter can search by object fields
    that do not have indexes. In other words, DB8 would have to iterate over
    <strong>n</strong> objects to process the resulting set. However, since DB8
    guarantees a complexity of log(n) to the <strong>find </strong>call, it does
    not allow the filtering operation.
  </p>
  <p>Some quick examples for <strong>find </strong>(with collate and limit):</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/find &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;sample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;test1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;limit&quot;:1<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;
    </p>
  </div>
  <p>Quick example for <strong>search</strong>:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/search &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;name&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;max&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;limit&quot;:1<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;
    </p>
  </div>
  <p><strong>Pages:</strong></p>
  <p>
    Processing of result sets that contain a lot of objects (thousands,
    millions, etc) can consume all available memory. Assume that a database has
    1 million objects and we need to build a JSON representation of those
    objects on a target system that has only 1M of free RAM. How can that be
    achieved?&nbsp;To handle such a scenario, DB8 will output result sets by
    pages. Each page will have a limit on the maximum number of objects it can
    contain. If an application does not specify a limit in
    <strong>find/search</strong>, DB8 will add a default limit. On most
    platforms, the default limit value is 500 objects per page, but this can be
    reconfigured.<br />
    <br />
    For example, we retrieve data from a DB8 database on a Tamagochi device
    (each page will contain only two objects):
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -f -n 1 luna://com.webos.service.db/find &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;limit&quot;:2<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;<br />
      <br />
    </p>
  </div>
  <p>DB8 response:</p>
  <div class="code-bg-grey">
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;<strong>next</strong>&quot;:&quot;1lg403dPJY4mHMCDHJd9+F&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;max&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:3,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZQjZfgzFPw&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;max&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:8,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZR1rIsNIJJ&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }
    </p>
  </div>
  <p>
    The next parameter in the response indicates the ID of the next page in the
    result data set (internally, DB8 interprets this id as a very tricky
    offset). To get the next object in the result data set, execute query with a
    page&nbsp;parameter:
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -f -n 1 luna://com.webos.service.db/find &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;limit&quot;:2,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;page&quot;:&quot;1lg403dPJY4mHMCDHJd9+F&quot;<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;
    </p>
  </div>
  <p>And DB8 will response with next 2 objects and id of the next page:</p>
  <div class="code-bg-grey">
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;<strong>next</strong>&quot;:&quot;1lg403dPJYCcTLdLTJ7n+F&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;max&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:9,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZR1vy_Lb8c&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sername&quot;:&quot;Super&nbsp;Hero!!!&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:15,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample777&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;JZR3hyjVyB3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }
    </p>
  </div>
  <p>
    If DB8 does not have any objects in the result set and the last retrieved
    page contains the final objects from the result set, DB8 will not provide
    the next&nbsp;parameter in the response.
  </p>
  <p><strong>Complex Queries:</strong></p>
  <p>For this section we are using the following test <strong>Kind</strong>:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -a com.webos.service.configurator
      luna://com.webos.service.db/putKind &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;owner&quot;:&quot;com.webos.service.test&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;indexes&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field12&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;<br />
      <br />
    </p>
  </div>
  <p>Example database set for this documentation section:</p>
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr>
        <th scope="col">field1</th>
        <th scope="col">field2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>a</td>
        <td>a</td>
      </tr>
      <tr>
        <td>a</td>
        <td>b</td>
      </tr>
      <tr>
        <td>b</td>
        <td>a</td>
      </tr>
      <tr>
        <td>b</td>
        <td>b</td>
      </tr>
    </tbody>
  </table>
  <p>For test queries, we use these&nbsp;<strong>put </strong>API calls:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/put &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;a&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;a&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;a&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;b&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;b&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;a&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field1&quot;:&quot;b&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;field2&quot;:&quot;b&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;<br />
    </p>
  </div>
  <p>
    In the <strong>Queries</strong> section&nbsp;you can find how to create an
    index for one field and execute some trivial queries, like:
  </p>
  <div class="code-bg-grey">
    <p>
      &quot;where&quot;:[{&quot;prop&quot;:&quot;field1&quot;,&quot;op&quot;:&quot;=&quot;,
      &quot;val&quot;:&quot;a&quot; }
    </p>
  </div>
  <p>
    If an application developer tries to search using two fields at the same
    time:
  </p>
  <div class="code-bg-grey">
    <p>
      &quot;where&quot;:[{&quot;prop&quot;:&quot;field1&quot;,&quot;op&quot;:&quot;=&quot;,
      &quot;val&quot;:&quot;a&quot; },
      {&quot;prop&quot;:&quot;field2&quot;,&quot;op&quot;:&quot;=&quot;,&quot;val&quot;:&quot;b&quot;}]
    </p>
  </div>
  <p>
    DB8 will return &quot;Sorry, I don&#39;t know such index&quot;.&nbsp;This
    error is returned because the DB8 Planner is not very intelligent and will
    never try to guess the index.
  </p>
  <p>
    An application developer should provide complex indexes for such complex
    quires. To get an object using 2 fields (third object from example set):
  </p>
  <div class="code-bg-grey">
    <p>(field1 == b) &amp;&amp; (field2 == a)</p>
  </div>
  <p>
    The client should provide the <strong>Kind</strong> for such index like
    following:
  </p>
  <div class="code-bg-grey">
    <p>
      {&quot;name&quot;:&quot;field12&quot;,&quot;props&quot;:[
      {&quot;name&quot;: &quot;field1&quot;}, {&quot;name&quot; :
      &quot;field2&quot;}] }
    </p>
  </div>
  <p>
    (See at top of this documentation section for full luna comand for kind
    creation.)
  </p>
  <p>
    After modification of the <strong>Kind</strong>, an application can execute
    a query like this:
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f luna://com.webos.service.db/find &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;field1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;a&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;field2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;b&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;
    </p>
  </div>
  <p><strong>Complex Queries Tricks:</strong></p>
  <p>
    Imagine, that an application developer extends a <strong>Kind</strong> with
    a complex index like the one below, and then tries to execute it:
  </p>
  <div class="code-bg-grey">
    <p>(field1 &lt; b) &amp;&amp; (field2 == b)</p>
  </div>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f luna://com.webos.service.db/find &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;field1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;&lt;&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;a&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;field2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;b&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;
    </p>
  </div>
  <p>
    DB8 will return &quot;Index not found&quot;, even if you have created a
    complex index for <em>field1</em> and <em>field2</em>. In the example below,
    the index has the name <em>field12</em>.
  </p>
  <p>
    To work around this, you should also create a reverse index
    <em>field21</em>:
  </p>
  <div class="code-bg-grey">
    <p>
      {&quot;name&quot;:&quot;<em>field21</em>&quot;,&quot;props&quot;:[
      {&quot;name&quot;: &quot;field2&quot;}, {&quot;name&quot; :
      &quot;field1&quot;}] }
    </p>
  </div>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/putKind &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;owner&quot;:&quot;com.webos.service.test&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;indexes&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field12&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field21&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field2&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;field1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
  </div>
  <p>
    After such a tricky index creation, DB8 can successfully search for data.
  </p>
  <p>
    <br />
    <strong>Watch:</strong>
  </p>
  <p>
    Sometimes a client may want to be notified about an object in a database
    that satisfies&nbsp;some condition. For this, the client can use
    the&nbsp;<strong>watch </strong>method.
  </p>
  <p>Example:</p>
  <div class="code-bg-grey">
    <p>
      # luna-send -i -m com.webos.service.configurator
      luna://com.webos.service.db/watch &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;processed&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:false<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&quot;subscribe&quot;:true<br />
      }&#39;
    </p>
  </div>
  <p>
    If no object exists with the field <em>processed=false</em> for Kind
    <em>com.</em>webos.service<em>.test:1</em>, the client will be blocked in
    the&nbsp;<strong>watch </strong>method. The&nbsp;watch will be unblocked,
    when an object that satisfies a query will appear in a database. In the
    example above, the database will have object for
    <em>com.</em>webos.service<em>.test:1</em> with field
    <em>processed</em>=false (if someone will insert object or modify field for
    existing object).
  </p>
  <p>
    <strong>Note about blocking:</strong>&nbsp;For a blocking
    <strong>watch</strong> API call, the caller cannot do anything until the
    <strong>watch&nbsp;</strong>API call returns. It is very similar to system
    calls blocks.&nbsp;
  </p>
  <p>Example of <strong>watch </strong>response, when it is unblocked:</p>
  <div class="code-bg-grey">
    <p>
      {<br />
      &nbsp;&nbsp;&nbsp; &quot;returnValue&quot;: true,<br />
      &nbsp;&nbsp;&nbsp; &quot;fired&quot;: true<br />
      }
    </p>
  </div>
  <p>
    The fired param in the response informs the client that DB8 contains one or
    more objects that satisfy the watch query and that the client can retrieve
    those objects.<br />
    <br />
    Sample workflow for the watch method:
  </p>
  <p>
    Assume that you are developing a chat application.<br />
    The chat application creates a DB8 <strong>Kind</strong>
    <em>com.chat.messages:1</em><br />
    The chat application will have 2 independent threads: A&nbsp;<em>UI thread</em>
    that shows messages and a&nbsp;<em>reader thread</em>, that receives
    messages from the network.
  </p>
  <ol>
    <li>
      <strong>Phase</strong>: Application startup<br />
      <em>UI thread</em> reads all objects from
      <em>com.chat.messages:1</em> Kind and shows the messages to the end user.
    </li>
    <li>
      <strong>Phase</strong>: UI Blocks till new message arrive<br />
      <em>UI thread</em> calls DB8 watch method&nbsp;with query:
      <em>processed=false</em>. If the database does not have such objects,
      the&nbsp;UI thread&nbsp;is blocked in the&nbsp;<strong>watch</strong> API
      call.
    </li>
    <li>
      <strong>Phase</strong>: <em>reader thread</em> receives a new message<br />
      The<em> reader thread</em> receives messages over the network, stores
      those messages into <em>com.chat.messages:1</em> with set field
      <em>processed=false.</em>
    </li>
    <li>
      <em><strong>Phase</strong>: UI thread</em> unblocked<br />
      The Database unblocks <strong>watch</strong> API call (UI thread was
      blocked in <strong>watch </strong>API call on step 2), the UI executes the
      query <strong>find</strong> with parameter <em>processed=false</em>
    </li>
    <li>
      <strong>Phase</strong>: <em>UI thread </em>processes the new message<br />
      For each new object in the result set, the UI thread shows those object to
      the end user. To indicate, that each new object was processed and shown to
      the end user by the UI, UI thread set field <em>processed=false</em> and
      merge each object into database.
    </li>
    <li>
      <strong>Phase: </strong><em>UI thread</em>&nbsp;is blocked again<br />
      UI go to step 2.
    </li>
  </ol>
  <p><strong>Collation:</strong></p>
  <p>
    Information is displayed in sorted order to enable users to easily find the
    items they are looking for. However, users of different languages might have
    very different expectations of what a &quot;sorted&quot; list should look
    like. Not only does the alphabetical order vary from one language to
    another, but it also can vary from document to document within the same
    language. For example, phone book ordering might be different than
    dictionary ordering. String comparison is one of the basic functions most
    applications require, and yet implementations often do not match local
    conventions. Collation provides string comparison capability with support
    for appropriate sort orderings for each of the locales needed by a client.
  </p>
  <p>Collation rule:</p>
  <p>
    <span style="background-color: transparent">A RuleBasedCollator is built from a rule string that changes the</span><span style="background-color: transparent">&nbsp;sort order of some characters and strings relative to the default
      order. An empty string (or one with only white space and comments) results
      in a collator that behaves like the root collator.</span>
  </p>
  <p>
    Customization is specified via a string containing a set of
    rules.&nbsp;<span style="background-color: transparent">ICU implements the (CLDR)&nbsp;</span>For more details see
    <a href="http://www.unicode.org/reports/tr35/tr35-collation.html#Rules">LDML collation rule syntax</a>.
  </p>
  <p>
    <span style="background-color: transparent">Each rule contains a string of ordered characters that starts with an </span><strong>anchor point </strong><span style="background-color: transparent">or a </span><strong>reset value</strong><span style="background-color: transparent">.</span><span style="background-color: transparent">&nbsp;For example, &quot;&amp;a &lt; g&quot;, places &quot;g&quot; after
      &quot;a&quot; and before &quot;b&quot;, and the &quot;a&quot; does not
      change place. This rule has the following sorting consequences:</span>
  </p>
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr>
        <th scope="col">Without rule</th>
        <th scope="col">With rule</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>apple</td>
        <td>apple</td>
      </tr>
      <tr>
        <td>Abernathy</td>
        <td>Abernathy</td>
      </tr>
      <tr>
        <td>bird</td>
        <td>green</td>
      </tr>
      <tr>
        <td>Boston</td>
        <td>bird</td>
      </tr>
      <tr>
        <td>green</td>
        <td>Boston</td>
      </tr>
      <tr>
        <td>Graham</td>
        <td>Graham</td>
      </tr>
    </tbody>
  </table>
  <p>
    <strong>Note:&nbsp;</strong>Only the word that starts with &quot;g&quot; has
    changed place. All the words sorted after &quot;a&quot; and &quot;A&quot;
    are sorted after &quot;g&quot;.
  </p>
  <p>
    This is a non-complex example of a custom rule. Custom rules consist of zero
    or more rules and zero or more options. There must be at least one rule or
    at least one option. The rule syntax is discussed in more detail in the
    following sections.
  </p>
  <p>
    <strong>Note:</strong> The custom rules override the UCA ordering. In
    addition, if a character is reordered, it automatically reorders any other
    equivalent characters. For example, if the rule &quot;&amp;e&lt;a&quot; is
    used to reorder &quot;a&quot; in the list, &quot;&aacute;&quot; is also
    greater than &quot;&eacute;&quot;.
  </p>
  <p>Syntax:</p>
  <p>
    The following table summarizes the basic syntax necessary for most usages:
  </p>
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr>
        <th scope="col">Symbol</th>
        <th scope="col">Example</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>&lt;</td>
        <td>a &lt; b</td>
        <td>
          Identifies a primary (base letter) difference between &quot;a&quot;
          and &quot;b&quot;
        </td>
      </tr>
      <tr>
        <td>&lt;&lt;</td>
        <td>a &lt;&lt; &auml;</td>
        <td>
          Signifies a secondary (accent) difference between &quot;a&quot; and
          &quot;&auml;&quot;
        </td>
      </tr>
      <tr>
        <td>&lt;&lt;&lt;</td>
        <td>a&lt;&lt;&lt;A</td>
        <td>
          Identifies a tertiary difference between &quot;a&quot; and
          &quot;A&quot;
        </td>
      </tr>
      <tr>
        <td>&lt;&lt;&lt;&lt;</td>
        <td>か&lt;&lt;&lt;&lt;カ</td>
        <td>
          Identifies a quaternary difference between &quot;か&quot; and
          &quot;カ&quot;. (New in ICU 53.) ICU permits up to three quaternary
          relations in a row (except for intervening &quot;=&quot; identity
          relations).
        </td>
      </tr>
      <tr>
        <td>=</td>
        <td>x = y</td>
        <td>
          Signifies no difference between &quot;x&quot; and &quot;y&quot;.
        </td>
      </tr>
      <tr>
        <td>&amp;</td>
        <td>&amp;Z</td>
        <td>
          Instructs ICU to reset at this letter. These rules will be relative to
          this letter from here on, but will not affect the position of Z
          itself.
        </td>
      </tr>
    </tbody>
  </table>
  <p>For more information, see:</p>
  <ul>
    <li>
      <a href="http://userguide.icu-project.org/collation">http://userguide.icu-project.org/collation</a>
    </li>
    <li>
      <a href="http://userguide.icu-project.org/collation/customization">http://userguide.icu-project.org/collation/customization</a>
    </li>
  </ul>
  <p>
    Collation can be specified in the&nbsp;<strong>putKind </strong>or
    the&nbsp;<strong>find </strong>method.
  </p>
  <p>
    Example of using collator with <strong>putKind </strong>- set default
    collation for kind:
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/putKind &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;owner&quot;:&quot;com.webos.service.test&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;indexes&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;testsample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;test&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;],<br />
      &nbsp;&nbsp;&nbsp;&quot;collation&quot;:&quot;secondary&quot;<br />
      }&#39;
    </p>
  </div>
  <p>
    Internally, DB8 process strings via ICU. All ICU documentation about strings
    somewhat applies to DB8 string processing.
  </p>
  <p><strong>Permissions:</strong></p>
  <p>
    DB8 is the central storage for applications. Every application can not only
    store/retrieve data by itself, but it can also share and interact with other
    applications.
  </p>
  <p>
    Application can share kind and grant permissions for any CRUD operator. For
    more information, see
    <a href="#putpermissions">putPermissions</a> method.
  </p>
  <p><strong>Quotas:</strong></p>
  <p>
    The function of quotas is to allocate limited disk space in a reasonable way
    for target device. Those limits are set by product developers via DB8
    configuration files.
  </p>
  <p>
    In other words, quotas limit the amount of disk space that can be used by a
    certain application.<br />
    Every process can see its quota usage by using the&nbsp;<strong>quotaStats </strong>method.
  </p>
  <p><strong>Encoding:</strong></p>
  <p>
    When the DB8 daemon starts, it uses UTF8 en_US.en_US encoding which is its
    default encoding.
  </p>
  <p>
    DB8 subscribes for <em>com.webos.service.systemservice</em>/<em>getPreferences</em>
    <em>&#39;{ &quot;keys&quot; : &quot;locale&quot;}&#39;</em> . If the
    systemservice does not exist on the platform or returns an error, DB8 will
    continue use UTF8 en_US.en_US encoding by default.
  </p>
  <p><strong>Disk Storage Logic:</strong></p>
  <p>When DB8 starts, it creates 2 activities in Activity Manager:</p>
  <ul>
    <li>Scheduled space check</li>
    <li>Garbage collector (<strong>purge</strong>)</li>
  </ul>
  <p>
    Activity for space check will check for available storage space. If the free
    storage space is too low, DB8 will reject all new CRUD API calls with quota
    exceeded error. If the storage has enough free space, then on the next
    scheduled space check DB8 will continue to process CRUD API calls.<br />
    <br />
    <strong>Garbage collector:</strong>
  </p>
  <p>
    By default, DB8 does not remove objects from its database, it only marks it
    <em>for future delete</em>. DB8 use this logic, as an update operation takes
    less resources compared with delete. Physical objects are removed when
    processed by the DB8 <em>garbage collector</em>.
  </p>
  <p>
    The garbage collector can be called in 2 ways: by ActivityManager or
    directly by service.<br />
    <br />
    On startup, DB8 dynamically registers an activity to call the garbage
    collector.
  </p>
  <p>
    If the&nbsp;client wants to delete an object and immediately free storage
    space, the client can specify the&nbsp;<strong>purge</strong> option in
    the&nbsp;<strong>del </strong>method. The <strong>del</strong> API
    call<strong>&nbsp;</strong>with the <strong>purge</strong> parameter can be
    potentially slow.
  </p>
  <p>
    Complexity for garbage collector:<strong> m*log(n)</strong>, where
    <strong>m</strong> - count of objects marked for removal.
  </p>
  <p><strong>Error handling:</strong></p>
  <p>
    If DB8 cannot process method calls (internal error, bad params, no
    resources, etc) it always returns error in the following format:
  </p>
  <ul>
    <li>
      returnValue - If an error occurs, it &nbsp;will contain <em>false</em>
    </li>
    <li>errorCode - Code that indicates the cause of &nbsp;the error</li>
    <li>errorText&nbsp;&nbsp; -&nbsp; Text representation of the error code</li>
  </ul>
  <p>
    Error codes and descriptions are provided for each method call. For example,
    if the client calls the&nbsp;<strong>load </strong>method with a bad
    parameter:
  </p>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f -m com.webos.service.configurator
      luna://com.webos.service.db/load &#39;{&quot;path&quot; :
      &quot;/tmp/dump.json&quot; }&#39;
    </p>
    <p>
      {<br />
      &nbsp;&nbsp;&nbsp;&nbsp; &quot;returnValue&quot;: false,<br />
      &nbsp;&nbsp;&nbsp;&nbsp; &quot;errorCode&quot;: 2, &nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp; &quot;errorText&quot;: &quot;No such file or
      directory&quot;<br />
      }
    </p>
  </div>
  <p>The above response indicates, that:</p>
  <ul>
    <li><em>returnValue:&nbsp;false </em>- method call failed</li>
    <li>
      <em>errorCode</em>:&nbsp;<em>2</em>&nbsp;- See the&nbsp;<a href="#load">load</a> method for more details on
      error code 2
    </li>
    <li>
      <em>errorText: No such file or directory</em> - A quick textual
      explanation of the error
    </li>
  </ul>
  <p><strong>Basic API functions</strong>:</p>
  <p>It provides the following data management functions:</p>
  <ul>
    <li>Add objects</li>
    <li>Update objects</li>
    <li>Delete objects</li>
    <li>Query objects&nbsp;</li>
    <li>Manage access to objects within the database</li>
  </ul>
</div>
<h2>Methods</h2>
<div>
  <h3>batch</h3>
  <div>
    <h4>Description</h4>
    <p>
      The <strong>batch</strong> method enables apps to execute multiple
      database operations in one service request. It allows only the following
      database operations:
    </p>
    <ul>
      <li>put</li>
      <li>get</li>
      <li>del</li>
      <li>find (without a watch)</li>
      <li>merge&nbsp;</li>
    </ul>
    <p>Atomicity is NOT guaranteed across batched operations.</p>
    <h4>Parameters</h4>
    <div class="table-container">
      <table class="table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th width="15%">
              <p>Name</p>
            </th>
            <th width="15%">
              <p>Required</p>
            </th>
            <th width="15%">
              <p>Type</p>
            </th>
            <th>
              <p>Description</p>
            </th>
          </tr>
          <tr>
            <td>operations</td>
            <td>Required</td>
            <td>Object array: <a href="#batchoperation"> BatchOperation</a></td>
            <td>
              <p style="text-align: left">
                The <strong>operations</strong> parameter contains the list of
                database operations to perform.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4>Call Returns</h4>
    <div class="table-container">
      <table class="table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th width="15%">
              <p>Name</p>
            </th>
            <th width="15%">
              <p>Required</p>
            </th>
            <th width="15%">
              <p>Type</p>
            </th>
            <th>
              <p>Description</p>
            </th>
          </tr>
          <tr>
            <td>batchResponse</td>
            <td>Optional</td>
            <td>Object: <a href="#batchresponse"> BatchResponse</a></td>
            <td>
              <p style="text-align: left">
                If <strong>DB8</strong> modifies any record, status of the
                executing batch will be returned in a&nbsp;<strong>BatchResponse</strong>
                object
              </p>
            </td>
          </tr>
          <tr>
            <td>errorCode</td>
            <td>Optional</td>
            <td>Number</td>
            <td>
              <p>The error code for the failed operation.</p>
            </td>
          </tr>
          <tr>
            <td>errorText</td>
            <td>Optional</td>
            <td>String</td>
            <td>
              <p>
                Indicates the reason for the failure of the operation.&nbsp;See
                the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of
                this method for details.
              </p>
            </td>
          </tr>
          <tr>
            <td>returnValue</td>
            <td>Required</td>
            <td>Boolean</td>
            <td>
              <p>
                Indicates the status of operation.&nbsp;Possible values are:
              </p>
              <ul>
                <li>
                  <strong>true&nbsp;</strong>- Indicates that the operation was
                  successful.
                </li>
                <li>
                  <strong>false&nbsp;</strong>- Indicates that the operation
                  failed. Check the&nbsp;&quot;errorCode&quot; and
                  &quot;errorText&quot; fields for details
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4>Error Codes Reference</h4>
    <div class="table-container">
      <table class="table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th width="15%">
              <p>Error Code</p>
            </th>
            <th width="30%">
              <p>Error Text</p>
            </th>
            <th width="55%">
              <p>Error Description</p>
            </th>
          </tr>
          <tr>
            <td>-3982</td>
            <td>db: invalid operation in batch</td>
            <td>
              <p style="text-align: left">
                This message implies that an incorrect or an unsupported
                database operation was specified in the
                <strong>operations</strong>&nbsp;parameter.&nbsp;<br />
              </p>
            </td>
          </tr>
          <tr>
            <td>-3984</td>
            <td>No required key: &quot;method&quot;</td>
            <td>
              <p style="text-align: left">
                This message implies that the required database operations name
                is missing.
              </p>
            </td>
          </tr>
          <tr>
            <td>-3984</td>
            <td>No required key: &quot;params&quot;</td>
            <td>
              <p style="text-align: left">
                This message implies that the required parameters for a database
                operation are missing.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4>Example</h4>
    <div class="code-bg-grey">
      <p>
        # luna-send -n 1 -f -a com.webos.service.test
        luna://com.webos.service.db/batch &#39;{<br />
        &nbsp;&nbsp;&nbsp;&quot;operations&quot;:[&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;method&quot;:&quot;put&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;params&quot;:{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;objects&quot;:[&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;method&quot;:&quot;merge&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;params&quot;:{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;sample&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;sample1&quot;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample2&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test2&quot;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;]<br />
        }&#39;
      </p>
      <p>&nbsp;</p>
      <p>Response:&nbsp;</p>
      <p>
        {&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&quot;responses&quot;:[&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;J8qx+EwdBs7&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;rev&quot;:2<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;count&quot;:1,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
        &nbsp;&nbsp;&nbsp;],<br />
        &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
        }
      </p>
    </div>
  </div>
</div>
<h3>compact</h3>
<div>
  <h4>Description</h4>
  <p style="text-align: left">
    The <strong>compact </strong>method invokes the&nbsp;low level garbage
    collector. When DB8 executes a&nbsp;<strong>del</strong> operation
    without&nbsp;<strong>Purge:True</strong> param, it only marks the object as
    to be deleted. The object will be removed by DB8, when the garbage collector
    is called. To call the garbage collector manually, the client can call the
    <strong>compact</strong> method.
  </p>
  <p style="text-align: left">
    This command is implemented only for the <strong>LevelDB</strong> and
    <strong>Sandwich</strong> engine.
  </p>
  <h4>Parameters</h4>
  <p>None</p>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation. Possible values are:</p>
            <ul>
              <li>
                <strong>true </strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false </strong>- Indicates that the operation failed.
                Check the &quot;errorCode&quot; and &quot;errorText&quot; fields
                for details.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3988</td>
          <td>db: backup file is full</td>
          <td>
            <p>
              This message implies that the storage does not have free space.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3997</td>
          <td>db: corrupt database</td>
          <td>
            <p>
              <span style="display: none">&nbsp;</span>This message implies that
              some part of the database is logically corrupted.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.db/compact &#39;{}&#39;</p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>del</h3>
<div>
  <h4>Description</h4>
  <p style="text-align: left">
    The <strong>del </strong>method deletes JSON data objects from the
    database.<br />
    <br />
    Apps can specify the objects to be deleted by providing:
  </p>
  <ul>
    <li style="text-align: left">a set of IDs to be deleted</li>
    <li style="text-align: left">a DB8 query</li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>ids</td>
          <td>Optional</td>
          <td>String array</td>
          <td>
            <p style="text-align: left">
              The <strong>ids</strong> parameter contains an array of JSON
              object ids that you wish to delete. If you do not wish to specify
              JSON object IDs, you must specify a query in the
              <strong>query</strong> parameter.
            </p>
          </td>
        </tr>
        <tr>
          <td>query</td>
          <td>Optional</td>
          <td>Object: <a href="#query"> Query</a></td>
          <td>
            <p style="text-align: left">
              The <strong>query </strong>parameter contains a query for a set of
              objects to be deleted. If you do not wish to specify a query, you
              must specify a list of JSON object ids in the
              <strong>ids </strong>parameter.
            </p>
          </td>
        </tr>
        <tr>
          <td>purge</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p style="text-align: left">
              The default value of the <strong>purge </strong>parameter is
              <strong>false</strong>.
            </p>
            <ul>
              <li style="text-align: left">
                If the <strong>purge </strong>parameter is set to
                <strong>false</strong>, the target objects will only be marked
                for deletion. Objects marked for deletion can still be restored.
                They will be purged permanently only when an administrative
                purge operation is run.​
              </li>
              <li style="text-align: left">
                If the&nbsp;<strong>purge&nbsp;</strong>parameter is set to
                <strong>true</strong>, the target objects will be deleted
                permanently immediately.&nbsp;
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>results</td>
          <td>Optional</td>
          <td>Object array: <a href="#results">Results</a></td>
          <td>
            <p>
              When the <strong>del </strong>method succeeds, and the objects to
              be deleted were specified as a list of JSON object ids, the
              <strong>del </strong>method will return a list of deleted ids.
            </p>
          </td>
        </tr>
        <tr>
          <td>count</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p style="text-align: left">
              When the <strong>del </strong>method succeeds, and the objects to
              be deleted were specified as a query, the
              <strong>del</strong> method will return a count of deleted<strong> </strong>objects.
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3963</td>
          <td>db: permission denied</td>
          <td>
            <p style="text-align: left">
              This message implies that the app does not have permission to
              delete the specified object.&nbsp;
            </p>
          </td>
        </tr>
        <tr>
          <td>-3965</td>
          <td>db: no index for query</td>
          <td>
            <p style="text-align: left">
              This message implies that the query is referring to an index that
              does not exist for the specified kind.&nbsp;<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>-3962</td>
          <td>db: quota exceeded</td>
          <td>
            <p style="text-align: left">
              This message implies that there is no space left on the device to
              complete this operation. It is recommended that the app should
              call the method again with <strong>purge </strong>set to true.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>Example 1: Using ID</p>
    <p>
      # luna-send -n 1 -f luna://com.webos.service.db/del &#39;{&quot;ids&quot;
      :[&quot;J8rBI6u7uh+&quot;]}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;J8rBI6u7uh+&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }
    </p>
    <p>&nbsp;</p>
    <p>Example 2: Using query</p>
    <p>
      # luna-send -n 1 -f -a com.webos.service.test
      luna://com.webos.service.db/del &#39;{&quot;query&quot; : {
      &quot;from&quot; : &quot;com.webos.service.test:1&quot;}}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;count&quot;:11,<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>delKind</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>delKind </strong>method deletes a Kind from the database.
    Deleting a Kind deletes ALL data objects of that Kind.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              The id parameter contains the id of the&nbsp;kind the app wants to
              delete.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3970</td>
          <td>db: kind not registered</td>
          <td>
            <p style="text-align: left">
              This message implies that the specified kind doesn't exist in the
              database.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>-3999</td>
          <td>db: access denied</td>
          <td>
            <p style="text-align: left">
              This message implies that the specified kind exists in the
              database, however the app does not have the delete
              permissions.&nbsp;<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f -a com.webos.service.configurator
      luna://com.webos.service.db/delKind &#39;{&quot;id&quot; :
      &quot;com.webos.service.test:1&quot;}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>dump</h3>
<div>
  <h4>Description</h4>
  <p style="text-align: left">
    The&nbsp;<strong>dump </strong>method&nbsp;is used to backup a database. The
    file created by the
    <strong>dump</strong> method<strong>&nbsp;</strong>typically contains JSON
    statements to recreate all of the Kinds and data of the database from which
    they have been dumped.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>path</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Path to the dump file</p>
          </td>
        </tr>
        <tr>
          <td>incDel</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>If <strong>true</strong>, also include deleted objects.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>count</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p style="text-align: left">
              The total number of objects stored if the <b>dump</b>&nbsp;method
              succeeds.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3998</td>
          <td>db: backup file is full</td>
          <td>
            <p style="text-align: left">
              This message implies that there is insufficient space to create a
              backup file or that the backup file size exceeds COUNT limit.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f -a com.webos.service.configurator
      luna://com.webos.service.db/dump
      &#39;{&quot;path&quot;:&quot;/tmp/dump.json&quot;}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;count&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>find</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>find</strong> method returns a set of objects that match the
    query specified in the&nbsp;<strong>query</strong>&nbsp;parameter.
  </p>
  <p>
    The app can specify the number of results to return. However, if the app
    does not want to specify a limit, it can set
    the&nbsp;<strong>count</strong>&nbsp;parameter to <strong>true</strong>.
    This will cause the&nbsp;<strong>find</strong>&nbsp;method to return the
    total number of results.
  </p>
  <p>
    The app can also request to be notified if any of the returned results from
    the query change in the future. In order to receive change notifications,
    set the&nbsp;<strong>watch</strong>&nbsp;parameter to <strong>true</strong>.
  </p>
  <p>
    The <strong>find</strong>&nbsp;method supports distinct groups enabling the
    app to remove duplicate objects.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>query</td>
          <td>Required</td>
          <td>Object: <a href="#query"> Query</a></td>
          <td>
            <p style="text-align: left">DB8 query for retrieving results.</p>
          </td>
        </tr>
        <tr>
          <td>count</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p style="text-align: left">
              The default value of
              the&nbsp;<strong>count</strong>&nbsp;parameter is
              <strong>false</strong>.
            </p>
            <p style="text-align: left">
              If the app did not specify a limit on the number of results to
              return, and wants to know the total number of results returned,
              the app should set the&nbsp;<strong>count</strong>&nbsp;parameter
              to <strong>true</strong>.
            </p>
          </td>
        </tr>
        <tr>
          <td>watch</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p style="text-align: left">
              The default value of
              the&nbsp;<strong>watch&nbsp;</strong>parameter is
              <strong>false</strong>.&nbsp;
            </p>
            <p style="text-align: left">
              If an app wants to be notified about any change in the returned
              results, the app should set the
              <strong>watch</strong>&nbsp;parameter to
              <strong>true</strong>.&nbsp;
            </p>
          </td>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Subscription is enabled if true.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>results</td>
          <td>Required</td>
          <td>Object array</td>
          <td>
            <p>
              Array of db8 kind data objects. What is returned depends on the
              query and what is stored.
            </p>
          </td>
        </tr>
        <tr>
          <td>count</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>
              Number of results that would have been returned if a limit had not
              been specified.
            </p>
          </td>
        </tr>
        <tr>
          <td>next</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Key to pass as query&#39;s &quot;page&quot; property when
              retrieving next page of results.
            </p>
          </td>
        </tr>
        <tr>
          <td>fired</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Change notification flag.</p>
            <p>
              <strong>Note:</strong> Returned only if
              the&nbsp;<strong>watch</strong>&nbsp;parameter is set
              to&nbsp;<strong>true</strong>&nbsp;by the app.
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3970</td>
          <td>db: kind not registered</td>
          <td>
            <p style="text-align: left">
              This message implies that the specified kind is not registered in
              the database.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3978</td>
          <td>db: invalid query</td>
          <td>
            <p style="text-align: left">
              This message implies that the query syntax is correct, but
              contains misspelled commands or logical errors.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>-3965</td>
          <td>db: no index for query</td>
          <td>
            <p style="text-align: left">
              This message implies that the SELECT query contains field name(s)
              that do not exist for the selected kind.&nbsp;
            </p>
          </td>
        </tr>
        <tr>
          <td>-3963</td>
          <td>db: permission denied</td>
          <td>
            <p style="text-align: left">
              This message implies that the specified kind exists in the
              database, however the app does not have permissions to read the
              data for the specified kind.<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      Note:&nbsp;Should execute putKind, put APIs before calling find API. To
      get the below result, 2 entries should be added using put API.
    </p>
    <p>
      # luna-send -n 1 -f -a com.webos.service.test
      luna://com.webos.service.db/find &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;sample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;sample1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:19,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;J8rKQDOvxdF&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:21,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;J8rKTaBClIo&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }
    </p>
  </div>
</div>
<h3>get</h3>
<div>
  <h4>Description</h4>
  <p style="text-align: left">
    The&nbsp;​<strong>get</strong>&nbsp;method retrieves&nbsp;JSON data objects
    by ids. This is the fastest way to retrieve data.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>ids</td>
          <td>Required</td>
          <td>String array</td>
          <td>
            <p>Ids of the JSON data objects to retrieve.<br /></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>results</td>
          <td>Required</td>
          <td>Object array</td>
          <td>
            <p style="text-align: left">
              Returns an array of stored db8 data objects.
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3999</td>
          <td>db: access denied</td>
          <td>
            <p style="text-align: left">
              This message implies that the specified object exists in the
              database, but the app does not have permissions to access the
              object.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3950</td>
          <td>db: I/O error</td>
          <td>
            <p style="text-align: left">
              This message implies that it is not possible to read from the
              database and that this is a critical error.&nbsp;<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f luna://com.webos.service.db/get &#39;{&quot;ids&quot;
      : [&quot;J8rKTaBClIo&quot;]}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_rev&quot;:21,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:&quot;J8rKTaBClIo&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }
    </p>
  </div>
</div>
<h3>getProfile</h3>
<div>
  <h4>Description</h4>
  <p>
    Get profiling data for applications. Profile data includes the queries made
    and related information such as&nbsp;request time and response time.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>application</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Name of application for which to get profile data.</p>
            <ul>
              <li>
                If no name is specified, returns the profile data for the
                current application.
              </li>
              <li>
                If name is given as *, returns profile data for all
                applications. The caller application must have admin
                permissions.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>query</td>
          <td>Optional</td>
          <td>Object: <a href="#query"> Query</a></td>
          <td>
            <p>Additional filters for retrieving profile data.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of the operation.</p>
            <ul>
              <li>True - Indicates success of the operation.</li>
              <li>
                False - Indicates failure in the operation. The details of the
                failure are provided in the errorCode and errorText fields of
                the response.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>results</td>
          <td>Optional</td>
          <td>Object array</td>
          <td>
            <p>
              If the&nbsp;method succeeds, the relevant details are returned in
              the response.
            </p>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>Indicates the error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation. See the
              <strong>&quot;Error Codes&quot;</strong> section of this method
              for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3970</td>
          <td>db: kind not registered</td>
          <td>
            <p>The specified kind is not registered in the database.</p>
          </td>
        </tr>
        <tr>
          <td>-3978</td>
          <td>db: invalid query</td>
          <td>
            <p>
              The query syntax is correct&nbsp;but contains misspelled commands
              or logical errors.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3965</td>
          <td>db: no index for query</td>
          <td>
            <p>
              The SELECT query contains field name(s) that do not exist for the
              selected kind.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3963</td>
          <td>db: permission denied</td>
          <td>
            <p>
              The specified kind exists in the database, but the app does not
              have permissions to read the data for the specified kind.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3946</td>
          <td>db: profiling not enabled for this application</td>
          <td>
            <p>
              Application profiling is disabled. Enable it by using the
              &quot;profile&quot; method.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3947</td>
          <td>db: profiling feature is not supported</td>
          <td>
            <p>DB8 profiling feature is not supported.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      Example 1:&nbsp;Get profile data for application
      &quot;com.webos.service.test:3&quot;
    </p>
    <p>
      # luna-send -n 1 -a com.webos.service.test:3
      luna://com.webos.service.db/getProfile &#39;{ }&#39; -f
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {<br />
      &nbsp; &nbsp; &quot;returnValue&quot;: true,<br />
      &nbsp; &nbsp; &quot;results&quot;: [<br />
      &nbsp; &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;memory_info&quot;:
      &quot;%MEM=1.01, VSS=70104, RSS=7888, SHR=6264&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;application&quot;:
      &quot;com.webos.service.test:3&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;category&quot;:
      &quot;/&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;method&quot;:
      &quot;get&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_rev&quot;: 5366,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;payload&quot;: {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;ids&quot;:
      [<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &quot;J8rKTaBClIo&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_kind&quot;:
      &quot;com.webos.service.test:3.profile:1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_id&quot;:
      &quot;&plus;&plus;&plus;11eN6jck&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;time&quot;:
      &quot;0.083334&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;memory_info&quot;:
      &quot;%MEM=1.01, VSS=70104, RSS=7888, SHR=6264&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;application&quot;:
      &quot;com.webos.service.test:3&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;category&quot;:
      &quot;/&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;method&quot;:
      &quot;put&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_rev&quot;: 5368,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;payload&quot;: {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &quot;objects&quot;: [<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &quot;sample&quot;: &quot;sample1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &quot;test&quot;: &quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &quot;_id&quot;: &quot;14f9&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &quot;_kind&quot;:
      &quot;com.webos.service.tes:3t.profile:1&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_kind&quot;:
      &quot;com.webos.service.test:3.profile:1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_id&quot;:
      &quot;&plus;&plus;&plus;19DpixTc&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;time&quot;:
      &quot;0.066458&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_rev&quot;: 5370,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;sample&quot;:
      &quot;sample1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;test&quot;:
      &quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_id&quot;:
      &quot;&plus;&plus;&plus;1BZDmwCg&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_kind&quot;:
      &quot;com.webos.service.test:3.profile:1&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;memory_info&quot;:
      &quot;%MEM=1.01, VSS=70104, RSS=7888, SHR=6264&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;application&quot;:
      &quot;com.webos.service.test:3&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;category&quot;:
      &quot;/&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;method&quot;:
      &quot;put&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_rev&quot;: 5371,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;payload&quot;: {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &quot;objects&quot;: [<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &quot;sample&quot;: &quot;sample1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &quot;test&quot;: &quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &quot;_id&quot;: &quot;14fc&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &quot;_kind&quot;:
      &quot;com.webos.service.test:3.profile:1&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_kind&quot;:
      &quot;com.webos.service.test:3.profile:1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_id&quot;:
      &quot;&plus;&plus;&plus;1BZHnhrV&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;time&quot;:
      &quot;0.321958&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp; ]<br />
      }
    </p>
    <p>&nbsp;</p>
    <p>
      Example 2:&nbsp;Get profile data for an application for only get commands.
    </p>
    <p>
      # luna-send -n 1 -a com.webos.service.test:3
      &nbsp;luna://com.webos.service.db/getProfile &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;application&quot;:&quot;com.webos.service.test:3&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;method&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;get&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;&nbsp;&nbsp;-f
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {<br />
      &nbsp; &nbsp; &quot;returnValue&quot;: true,<br />
      &nbsp; &nbsp; &quot;results&quot;: [<br />
      &nbsp; &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;memory_info&quot;:
      &quot;%MEM=1.01, VSS=70104, RSS=7888, SHR=6264&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;application&quot;:
      &quot;com.webos.service.test:3&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;category&quot;:
      &quot;/&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;method&quot;:
      &quot;get&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_rev&quot;: 5366,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;payload&quot;: {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;ids&quot;:
      [<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &quot;J8rKTaBClIo&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_kind&quot;:
      &quot;com.webos.service.test:3.profile:1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;_id&quot;:
      &quot;&plus;&plus;&plus;11eN6jck&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &quot;time&quot;:
      &quot;0.083334&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp; ]<br />
      }
    </p>
  </div>
</div>
<h3>load</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>load</strong> method restores a database from a dumped JSON
    file.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>path</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>
              The complete path of the JSON dump file. For example:
              /tmp/dump.json
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>count</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p>Count of objects loaded from the dump file</p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-987</td>
          <td>path too long</td>
          <td>
            <p>
              This message implies that the&nbsp;path provided for the dump file
              is too long
            </p>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>No such file or directory</td>
          <td>
            <p>
              File specified in <u>path</u> parameter not found or DB8
              doesn&#39;t have permissions to read it
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f luna://com.webos.service.db/load
      &#39;{&quot;path&quot;: &quot;/tmp/dump.json&quot;}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;count&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>merge</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>merge</strong>&nbsp;method updates the properties of existing
    objects.
  </p>
  <p>The objects can be specified in one of the following ways:</p>
  <ul>
    <li>A query</li>
    <li>An array of IDs</li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>objects</td>
          <td>Optional</td>
          <td>Object array</td>
          <td>
            <p style="text-align: left">
              The <strong>object</strong> parameter is an array of objects, each
              object will have an id and key/value pairs that represent&nbsp;the
              object properties the app needs to merge.&nbsp;The
              <strong>objects </strong>parameter is required if
              the&nbsp;<strong>query</strong>​ parameter is not specified.
            </p>
          </td>
        </tr>
        <tr>
          <td>query</td>
          <td>Optional</td>
          <td>Object: <a href="#query"> Query</a></td>
          <td>
            <p style="text-align: left">
              The <strong>query</strong> parameter is a
              <strong>Query</strong> object specifying the set of objects whose
              properties the app wants to update.
            </p>
            <p style="text-align: left">
              The&nbsp;<strong>query</strong>&nbsp;parameter is required if
              the&nbsp;<strong>object</strong>&nbsp;parameter is not specified.
            </p>
          </td>
        </tr>
        <tr>
          <td>props</td>
          <td>Optional</td>
          <td>Object</td>
          <td>
            <p style="text-align: left">
              The <strong>props</strong> parameter is an object with key/value
              pairs that specify the set of properties to be merged into the
              existing object(s) specified in the
              <strong>query&nbsp;</strong>parameter. If the app specifies the
              properties in the&nbsp;<strong>prop</strong>&nbsp;parameter,
              the&nbsp;<strong>query</strong>​ is required.
            </p>
          </td>
        </tr>
        <tr>
          <td>ignoreMissing</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Ignore if any key is missing</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>results</td>
          <td>Optional</td>
          <td>Object array: <a href="#results">Results</a></td>
          <td>
            <p style="text-align: left">
              If the objects parameter was specified, and the
              <strong>merge</strong>&nbsp;method succeeds,
              <strong>merge </strong>will return the ids and revisions of the
              updated object.
            </p>
          </td>
        </tr>
        <tr>
          <td>count</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p style="text-align: left">
              If the&nbsp;<strong>query</strong>&nbsp;parameter was specified,
              and the <strong>merge </strong>method succeeds,
              <strong>merge </strong>will return the <strong>count</strong> of
              updated objects.
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3961</td>
          <td>db: quota exceeded</td>
          <td>
            <p style="text-align: left">
              <span style="display: none">&nbsp;</span>This message implies that
              the app has exceeded its quota or there is no free space available
              on the device.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3963</td>
          <td>db: permission denied</td>
          <td>
            <p style="text-align: left">
              This message implies that the app does not have permission to
              modify the specified objects.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>-3965</td>
          <td>db: no index for query</td>
          <td>
            <p style="text-align: left">
              This message implies that the query contains a SELECT for object
              properties that do not have an index associated with them.&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>Example 1: How to update similar objects</p>
    <p>
      # luna-send -n 1 -f -a com.webos.service.configurator
      luna://com.webos.service.db/merge &#39;{<br />
      &nbsp; &nbsp; &nbsp; &nbsp;&quot;objects&quot;:[<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_id&quot;:&quot;J8rKTaBClIo&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;sample&quot;:&quot;sample_updated_value&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}<br />
      &nbsp; &nbsp; &nbsp; &nbsp;]<br />
      }&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;J8rKTaBClIo&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;rev&quot;:23<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }
    </p>
    <p>&nbsp;</p>
    <p>
      Example 2:&nbsp;How to update in all object with filed &quot;sample&quot;
      and value &quot;sample1&quot; to value &quot;sample_updated_value&quot;
    </p>
    <p>
      # luna-send -n 1 -f -a com.webos.service.configurator
      luna://com.webos.service.db/merge &#39;{<br />
      &nbsp; &nbsp; &nbsp;&quot;query&quot;:{<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&quot;where&quot;:[<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;{<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;prop&quot;:&quot;sample&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;val&quot;:&quot;sample1&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;]<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;},<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;props&quot;:{<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;sample&quot;:&quot;sample_updated_value&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;}<br />
      &nbsp;}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;count&quot;:2,<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>mergePut</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>mergePut</strong> method updates the properties of existing
    objects. If an object doesn&#39;t exist, a new one&nbsp;will be created in
    the database.
  </p>
  <p>
    The object&nbsp;to be updated can be specified in one of the following ways:
  </p>
  <ul>
    <li>A query</li>
    <li>An array of IDs</li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>objects</td>
          <td>Optional</td>
          <td>Object array</td>
          <td>
            <p>
              The <strong>object</strong> parameter is an array of objects, each
              object will have an id and key/value pairs that represent&nbsp;the
              object properties the app needs to merge.&nbsp;
            </p>
            <p>
              <strong>This is required if the&nbsp;query​ parameter is not
                specified.</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td>query</td>
          <td>Optional</td>
          <td>Object: <a href="#query"> Query</a></td>
          <td>
            <p style="text-align: left">
              The <strong>query</strong> parameter is a
              <strong>Query</strong> object specifying the set of objects whose
              properties the app wants to update.
            </p>
            <p style="text-align: left">
              The&nbsp;<strong>query</strong>&nbsp;parameter is required if
              the&nbsp;<strong>object</strong>&nbsp;parameter is not specified.
            </p>
          </td>
        </tr>
        <tr>
          <td>props</td>
          <td>Optional</td>
          <td>Object</td>
          <td>
            <p>
              The <strong>props</strong> parameter is an object with key/value
              pairs that specify the set of properties to be merged into the
              existing object(s) specified in the
              <strong>query&nbsp;</strong>parameter. If the app specifies the
              properties in the&nbsp;<strong>prop</strong>&nbsp;parameter,
              the&nbsp;<strong>query</strong>​ is required.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>results</td>
          <td>Optional</td>
          <td>Object array: <a href="#results"> Results</a></td>
          <td>
            <p>
              If the objects parameter was specified, and the
              <strong>merge</strong>&nbsp;method succeeds,
              <strong>merge </strong>will return the ids and revisions of the
              updated object.
            </p>
          </td>
        </tr>
        <tr>
          <td>count</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>
              If the&nbsp;<strong>query</strong>&nbsp;parameter was specified,
              and the <strong>merge </strong>method succeeds,
              <strong>merge </strong>will return the <strong>count</strong> of
              updated objects.
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3961</td>
          <td>db: quota exceeded</td>
          <td>
            <p>
              This message implies that the app has exceeded its quota or there
              is no free space available on the device.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3963</td>
          <td>db: permission denied</td>
          <td>
            <p>
              This message implies that the app does not have permission to
              modify the specified objects.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3965</td>
          <td>db: no index for query</td>
          <td>
            <p>
              This message implies that the query contains a SELECT for object
              properties that do not have an index associated with them.&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      Example 1: How to an insert object, if it doesn&#39;t exist&nbsp;in the
      database
    </p>
    <p>
      # luna-send -n 1 -f -a com.webos.service.configurator
      luna://com.webos.service.db/mergePut &#39;{<br />
      &nbsp; &nbsp; &nbsp;&nbsp;&quot;objects&quot;:[<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;{<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;_id&quot;:&quot;J8rKTaBClIo&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;sample&quot;:&quot;sample_updated_value&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;]<br />
      &nbsp;}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;J8rKTaBClIo&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;rev&quot;:23<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }
    </p>
  </div>
</div>
<h3>profile</h3>
<div>
  <h4>Description</h4>
  <p>
    Enables or disables DB8 profiling for an application. When enabled,
    profiling data is stored for the&nbsp;application.
  </p>
  <p>You can enable DB8 profiling using one of the following approaches:</p>
  <p>
    - Self enabling: In this approach, the 3rd-party application enables
    profiling on itself (see example 1).
  </p>
  <p>
    - Enable profiling using admin-privileged applications: In the approach, an
    admin-privileged application controls DB8 profiling for 3rd-party
    applications. Use this approach when you want the admin to control the
    profiling of 3rd-party applications. You can choose to enable profiling for
    a single application or for all 3rd-party applications. See example 2 and 3.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>enable</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Status of DB8 profiling.</p>
            <p>Possible values:&nbsp;TRUE,&nbsp;FALSE</p>
            <p><span style="line-height: 1.6">Default value: TRUE</span></p>
          </td>
        </tr>
        <tr>
          <td>application</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Name of application to be profiled.</p>
            <ul>
              <li>
                If no name is specified, the current/caller application is
                profiled.
              </li>
              <li>
                If name is given as *, all applications are profiled. The caller
                application must have admin permissions.
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3947</td>
          <td>db: profiling feature is not supported</td>
          <td>
            <p>Profiling feature is not supported.</p>
          </td>
        </tr>
        <tr>
          <td>-3963</td>
          <td>db: permission denied</td>
          <td>
            <p>
              The application does not have permission to
              enable/disable&nbsp;profiles for other applications.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3945</td>
          <td>db: profiling restricted by admin for this application</td>
          <td>
            <p>Profiling restricted by admin for this application.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      Example 1: 3rd-party application &quot;com.webos.testApp&quot; enables
      profiling for itself.
    </p>
    <p>
      # luna-send -f -a&nbsp;com.webos.testApp -n 1
      luna://com.webos.service.db/profile &#39;{&quot;enable&quot;:true}&#39;
    </p>
    <p>&nbsp;</p>
    <p>
      Example 2: Admin-privileged application (com.webos.service.configurator)
      enables&nbsp;profiling for all 3rd-party&nbsp;applications.
    </p>
    <p>
      # luna-send -n 1 -a com.webos.service.configurator
      luna://com.webos.service.db/profile &#39;{&quot;enable&quot;:true,
      &quot;application&quot;:&quot;*&quot;}&#39;
    </p>
    <p>&nbsp;</p>
    <p>
      Example 3: Admin-privileged application (com.webos.service.configurator)
      enables&nbsp;profiling for the &quot;com.webos.testApp&quot;
      3rd-party&nbsp;application.
    </p>
    <p>
      # luna-send -n 1 -a com.webos.service.configurator
      luna://com.webos.service.db/profile &#39;{&quot;enable&quot;:true,
      &quot;application&quot;:&quot;com.webos.testApp&quot;}&#39;
    </p>
  </div>
</div>
<h3>purge</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>purge </strong>method invokes the garbage collector. The purge
    method will:
  </p>
  <ul>
    <li>Remove all objects that were marked for deletion</li>
    <li>Perform a space check, and remove all temporary data</li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>window</td>
          <td>Optional</td>
          <td>Number (int32_t)</td>
          <td>
            <p>purge window size</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>
              If the <strong>purge</strong>&nbsp; method succeeds,
              <strong>returnValue</strong> will contain true.<br />
              If the <strong>purge</strong>&nbsp; method fails,
              <strong>returnValue</strong> will contain <strong>false</strong>.
              The <strong>purge</strong> method may fail because of:
            </p>
            <ul>
              <li>Insufficient disk space</li>
              <li>I/O error</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>count</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p style="text-align: left">
              <strong>count </strong>contains the total number of objects that
              were permanently deleted by the
              <strong>purge</strong>&nbsp;method.<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      Note: Should execute putKind, put, del (to delete some of entries added
      using put) APIs before calling purge API
    </p>
    <p>
      # luna-send -n 1 -f&nbsp;-a com.palm.configurator
      luna://com.webos.service.db/purge &#39;{}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;count&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>purgeStatus</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>purgeStatus </strong>method returns the status of the last run
    <strong>purge </strong>command. If the last run
    <strong>purge </strong>command was successful, the objects were permanently
    deleted, and the <strong>purgeStatus </strong>method will return the updated
    database revision number.
  </p>
  <h4>Parameters</h4>
  <p>None</p>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>
              If the <strong>purgeStatus</strong>&nbsp; method succeeds,
              <strong>returnValue</strong> will contain true.
            </p>
            <p>
              If the <strong>purgeStatus</strong>&nbsp; method fails,
              <strong>returnValue</strong> will contain <strong>false</strong>.
            </p>
          </td>
        </tr>
        <tr>
          <td>rev</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p style="text-align: left">
              If the <strong>purgeStatus </strong>method is successful,
              <strong>rev </strong>will contain the updated&nbsp;database
              revision number.
            </p>
            <p style="text-align: left">
              If the&nbsp;<strong>purgeStatus</strong>&nbsp;method
              fails,&nbsp;<strong>rev</strong>&nbsp;will contain database
              revision number before the purge.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>Note: Should execute purge API before purgeStatus, refer purge API</p>
    <p>
      #luna-send -n 1 -f -a com.palm.configurator
      luna://com.webos.service.db/purgeStatus &#39;{}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {<br />
      &nbsp; &nbsp; &quot;rev&quot;: -1,<br />
      &nbsp; &nbsp; &quot;returnValue&quot;: true<br />
      }
    </p>
  </div>
</div>
<h3>put</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>put </strong>method stores JSON data objects of a particular
    Kind into the database. The <strong>put </strong>method will:
  </p>
  <ul>
    <li>
      Assign an <strong>id</strong> field to each object, if it was not set.
    </li>
    <li>
      Return the <strong>id</strong>&nbsp;and&nbsp;<strong>rev</strong>&nbsp;for
      each stored object.
    </li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>objects</td>
          <td>Required</td>
          <td>Object array</td>
          <td>
            <p style="text-align: left">
              List of JSON data objects of a particular kind that the app wants
              to store in the database.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>shardId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Id of shard info</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>results</td>
          <td>Required</td>
          <td>Object array: <a href="#results">Results</a></td>
          <td>
            <p>
              If the object was inserted, <strong>results</strong> will contain
              <u><strong>id</strong></u> and <u><strong>revision</strong></u> of
              the inserted object
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p style="text-align: left">
              Indicates the status of operation.&nbsp;Possible values are:
            </p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3962</td>
          <td>db: quota exceeded</td>
          <td>
            <p style="text-align: left">
              <span style="display: none">&nbsp;</span>This message implies that
              the app has exceeded its quota or there is no free space available
              on the device.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3970</td>
          <td>db: kind not registered</td>
          <td>
            <p style="text-align: left">
              This message implies that the kind for the specified object is not
              registered with the database.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>-3963</td>
          <td>db: permission denied</td>
          <td>
            <p style="text-align: left">
              This message implies that the app does not have permission to save
              objects of a specified kind.<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f -a com.webos.service.configurator
      luna://com.webos.service.db/put &#39;{<br />
      &nbsp; &nbsp;&quot;objects&quot;:[<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp;&quot;test&quot;:&quot;test1&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}<br />
      &nbsp; &nbsp; &nbsp; &nbsp; ]<br />
      }&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;J8rTIa65u++&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;rev&quot;:27<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }
    </p>
  </div>
</div>
<h3>putKind</h3>
<div>
  <h4>Description</h4>
  <p>The <strong>putKind </strong>method registers a kind with the database.</p>
  <p>
    Kinds define the owner, and the indexes for a JSON data object. Indexes can
    be composed of single or multiple properties. When you create your index, be
    aware that queries can only return results that are indexed, and are
    contiguously ordered.
  </p>
  <p>
    If your app or service wants to be notified only when a subset of an
    object&#39;s properties are updated, then you can use revision sets.
  </p>
  <p>
    If your app or service creates objects that other apps or services need to
    access, then see the <a href="#putpermissions">putPermissions</a> method for more information.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              Id of the kind to be registered with the database.
            </p>
          </td>
        </tr>
        <tr>
          <td>owner</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              Owner of the kind, can be any one of the following values:
            </p>
            <ul>
              <li style="text-align: left">The service&#39;s bus address</li>
              <li style="text-align: left">The app&#39;s app ID</li>
            </ul>
            <p style="text-align: left">
              Only the owner has permission to modify the kind.
            </p>
          </td>
        </tr>
        <tr>
          <td>schema</td>
          <td>Optional</td>
          <td>Object</td>
          <td>
            <p style="text-align: left">
              JSON Syntax for data objects of a specific kind. If set, this
              kind&#39;s data objects are validated before being stored. For
              details refer to
              <a href="http://json-schema.org/documentation.html">http://json-schema.org/documentation.html</a>
            </p>
          </td>
        </tr>
        <tr>
          <td>sync</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p style="text-align: left">
              The&nbsp;<strong>sync</strong>&nbsp;parameter allows apps to
              enable backing up and restoring specific kinds of objects.&nbsp;
            </p>
            <p style="text-align: left">
              The default value for
              the&nbsp;<strong>sync</strong>&nbsp;parameter
              is&nbsp;<strong>false</strong>.
            </p>
            <p style="text-align: left">
              If the user moves to another device, the saved app data can be
              restored.
            </p>
          </td>
        </tr>
        <tr>
          <td>extends</td>
          <td>Optional</td>
          <td>String array</td>
          <td>
            <p style="text-align: left">
              List of ids of parent kinds from which the kind has been derived.
            </p>
          </td>
        </tr>
        <tr>
          <td>indexes</td>
          <td>Optional</td>
          <td>Object: <a href="#indexclause"> IndexClause</a></td>
          <td>
            <p style="text-align: left">
              The <strong>indexes&nbsp;</strong>parameter contains indexes for
              the kind.
            </p>
          </td>
        </tr>
        <tr>
          <td>revsets</td>
          <td>Optional</td>
          <td>Object array: <a href="#revsetclause"> RevSetClause</a></td>
          <td>
            <p style="text-align: left">
              List of database revision sets.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>private</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Enable private data for putKind</p>
          </td>
        </tr>
        <tr>
          <td>assignId</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Enable assign id for putKind if true</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation. Possible values are:</p>
            <ul>
              <li>
                <strong>true </strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false </strong>- Indicates that the operation failed.
                Check the &quot;errorCode&quot; and &quot;errorText&quot; fields
                for details.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation. See the
              <strong>&quot;Error Codes&quot;</strong> section of this method
              for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3981</td>
          <td>db: invalid owner for kind</td>
          <td>
            <p style="text-align: left">
              This message implies that the specified owner does not have
              permissions to add or modify the specified kind.&nbsp;<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>-3962</td>
          <td>db: quota exceeded</td>
          <td>
            <p style="text-align: left">
              This message implies that app has exceeded its quota or does not
              have enough disk space available to create the specified kind.<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f -a com.webos.service.test
      luna://com.webos.service.db/putKind &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;id&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;owner&quot;:&quot;com.webos.service.test&quot;,<br />
      &nbsp;&nbsp;&nbsp;&quot;indexes&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;testsample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;props&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;test&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&quot;sample&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>putPermissions</h3>
<div>
  <h4>Description</h4>
  <p style="text-align: left">
    The <strong>putPermissions </strong>method enables other apps or services to
    access an app&#39;s stored DB8 data. The app can give permissions to access
    data objects of a specific Kind.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>type</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              Must be set to&nbsp;<strong>db.kind</strong>.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>object</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>
              The DB8 kind of the object for which the app wants to provide
              access.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>caller</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              The id of the app or service that the app is granting permission
              to access its data.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>operations</td>
          <td>Required</td>
          <td>Object: <a href="#operation"> operation</a></td>
          <td>
            <p style="text-align: left">
              Database operations the app is granting permissions for.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>create</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              To grant create permission, set the&nbsp;<strong>create </strong>parameter to&nbsp;<strong>allow</strong>.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>read</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              To grant read permission, set the&nbsp;<strong>read </strong>parameter to&nbsp;<strong>allow</strong>.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>update</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              To grant update permission, set
              the&nbsp;<strong>update</strong>&nbsp;parameter
              to&nbsp;<strong>allow</strong>.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>delete</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              To grant delete permission, set
              the&nbsp;<strong>delete&nbsp;</strong>parameter
              to&nbsp;<strong>allow</strong>.<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3999</td>
          <td>db: access denied</td>
          <td>
            <p style="text-align: left">
              This message implies that the app cannot modify the permissions of
              the specified kind.&nbsp;<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f -a com.webos.service.test
      luna://com.webos.service.db/putPermissions &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;permissions&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;operations&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;read&quot;:&quot;allow&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;create&quot;:&quot;allow&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;update&quot;:&quot;allow&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;delete&quot;:&quot;allow&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;object&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;:&quot;db.kind&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;caller&quot;:&quot;com.webos.service.testapp&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>putQuotas</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>putQuotas</strong> method provides the ability to update a
    quota&#39;s current service limits at runtime. This service is used by
    private webOS services to increase/decrease quotas for critical webOS
    services.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>quotas</td>
          <td>Required</td>
          <td>Object array: <a href="#putquotas"> putQuotas</a></td>
          <td>
            <p style="text-align: left">
              <span style="text-align: justify"></span>List of quotas
            </p>
          </td>
        </tr>
        <tr>
          <td>owner</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Name of service</p>
          </td>
        </tr>
        <tr>
          <td>size</td>
          <td>Optional</td>
          <td>Number (int32_t)</td>
          <td>
            <p>quota size in bytes</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>
              If the <strong>putQuotas</strong>&nbsp; method succeeds,
              <strong>returnValue</strong> will contain true.
            </p>
            <p>
              If the <strong>putQuotas</strong>&nbsp; method fails,
              <strong>returnValue</strong> will contain <strong>false</strong>.
              The <strong>putQuotas</strong>&nbsp; method may fail because of:
            </p>
            <ul>
              <li>Insufficient free disk space</li>
              <li>Disk I/O</li>
              <li>Not found kind</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -f -n 1 -a com.webos.service.configurator
      luna://com.webos.service.db/putQuotas &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;quotas&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;owner&quot;:&quot;com.test&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:1000000<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;]<br />
      }&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
    <p>&nbsp;</p>
    <p>And after executing of this command, quotas will be:</p>
    <p>
      # luna-send -f -n 1 -a com.webos.service.configurator
      luna://com.webos.service.db/quotaStats &#39;{}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;com.test&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:1000000,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;used&quot;:0<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }
    </p>
  </div>
</div>
<h3>quotaStats</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>quotaStats </strong>method returns information about a
    service&#39;s used limits.
  </p>
  <h4>Parameters</h4>
  <p>None</p>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation. Possible values are:</p>
            <ul>
              <li>
                <strong>true </strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false </strong>- Indicates that the operation failed. A
                possible reason for failure is &quot;Internal db8 logic
                broken&quot;.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>results</td>
          <td>Required</td>
          <td>Object: <a href="#quotastatsresult"> quotaStatsResult</a></td>
          <td>
            <p style="text-align: left">
              Returns information about a service&#39;s quota.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f -a com.palm.configurator
      luna://com.webos.service.db/quotaStats &#39;{}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;*&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:10485760,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;used&quot;:1371<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;com.webos.*&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:10485760,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;used&quot;:0<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;com.webos.testapp&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:52428800,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;used&quot;:0<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }
    </p>
  </div>
</div>
<h3>removeAppData</h3>
<div>
  <h4>Description</h4>
  <p>
    The <strong>removeAppData</strong> method removes all data&nbsp;associated
    with the given owner. In other words, the method removes all
    <strong>Kinds&nbsp;</strong>that have specified&nbsp;<strong>owner</strong>.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>owners</td>
          <td>Required</td>
          <td>String array</td>
          <td>
            <p>
              Owner(s) of kinds to delete.&nbsp;Kinds having given
              <strong>owners</strong> will be removed from the database.&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3980</td>
          <td>db: invalid owner for kind</td>
          <td>
            <p>
              The value specified in&nbsp;<strong>owners</strong> input
              parameter is invalid or Kinds associated with the owners do not
              exist.&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 luna://com.webos.service.db/removeAppData
      &#39;{&quot;owners&quot; : [ &quot;com.webos.service.test:1&quot; ]}&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>reserveIds</h3>
<div>
  <h4>Description</h4>
  <p>
    When a client service creates objects that have references between each
    other, the service can ask the database through the
    <strong>reserveIds</strong> method to regenerate ids of objects.&nbsp;The
    client service can use such ids as objects, and DB8 will use those ids when
    objects are inserted into the database.
  </p>
  <p>
    By default, DB8 configured to reserve maximum [0:1000] ids, but this limit
    can vary depending on the platform.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>count</td>
          <td>Required</td>
          <td>Number</td>
          <td>Number of Ids to reserve.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>ids</td>
          <td>Required</td>
          <td>String array</td>
          <td>
            <p style="text-align: left">Array of reserved db8 IDs.</p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3968</td>
          <td>db: malformed id</td>
          <td>
            <p style="text-align: left">
              This message implies that the specified count contains an invalid
              value.&nbsp;
            </p>
          </td>
        </tr>
        <tr>
          <td>-3967</td>
          <td>cannot reserve more than 1000 ids</td>
          <td>
            <p>
              Client tries to reserve too many object ids. By default, DB8 is
              configured to reserve maximum [0:1000] ids, but this limit can
              vary depending on the platform.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -i -f luna://com.webos.service.db/reserveIds &#39;{
      &quot;count&quot; : 3 }&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;ids&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;J9FJ12j0Usk&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;J9FJ12j18hJ&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;J9FJ12j1Mic&quot;<br />
      &nbsp;&nbsp;&nbsp;],<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true<br />
      }
    </p>
  </div>
</div>
<h3>search</h3>
<div>
  <h4>Description</h4>
  <p style="text-align: left">
    Unlike the <strong>find </strong>method, the
    <strong>search</strong>&nbsp;method supports the
    <strong>&quot;?&quot; </strong>(question mark) operator.
    The&nbsp;<strong>?&nbsp;</strong>operator&nbsp;can be used for full-text
    searching.&nbsp;However, the <strong>search </strong>method is significantly
    slower, and should only be used for full-text type-down search. The
    <strong>search</strong>&nbsp;method should not be used for&nbsp;retrieving
    results that are going to be scrolled in a list.
  </p>
  <p style="text-align: left">The&nbsp;search&nbsp;method supports:</p>
  <ul>
    <li style="text-align: left">Ordering by any property.</li>
    <li style="text-align: left">
      <em>Distinct method</em> to remove duplicate objects.
    </li>
    <li style="text-align: left">
      <strong>%% </strong>operator in filter to search in a sub-string.
    </li>
    <li style="text-align: left">
      Canceling the search mid-way (using the &#39;cancelable&#39;
      parameter).&nbsp;
    </li>
  </ul>
  <p style="text-align: left">
    The <strong>search</strong> method has some limitations:
  </p>
  <ul>
    <li style="text-align: left">
      ​There must be an index for the field you are searching on.
    </li>
    <li style="text-align: left">
      The search operation looks for words beginning with the search string.
    </li>
  </ul>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>query</td>
          <td>Required</td>
          <td>Object: <a href="#query"> Query</a></td>
          <td>
            <p>Query for search.<br /></p>
          </td>
        </tr>
        <tr>
          <td>watch</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>
              Indicates if the app&nbsp;must be notified of any changes in the
              search results. This&nbsp;notification is sent only once (the
              first time when there is a change in the result).
            </p>
            <p>Possible values are:</p>
            <ul>
              <li><strong>true </strong>- Notifies the changes.</li>
              <li><strong>false </strong>- No notifications.&nbsp;</li>
            </ul>
            <p><strong>Default value</strong>:<strong> </strong>false</p>
            <p>
              <strong>Note: ​</strong>The &#39;watch&#39; and
              &#39;subscribe&#39; parameters must not be used in the same call.
            </p>
          </td>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>
              Subscribe to get notified when there are changes in search
              results.&nbsp;Possible values are:
            </p>
            <ul>
              <li><strong>true&nbsp;</strong>- Subscribe for changes.</li>
              <li><strong>false&nbsp;</strong>- Not subscribed.</li>
            </ul>
            <p><strong>Note</strong>:</p>
            <ul>
              <li style="text-align: justify">
                It is mandatory to set &#39;subscribe&#39; to
                <strong>true </strong>when&nbsp;&#39;cancelable&#39; is set to
                <strong>true</strong>.
              </li>
              <li>
                The &#39;watch&#39; and &#39;subscribe&#39; parameters must not
                be used in the same call.
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>results</td>
          <td>Required</td>
          <td>Object array</td>
          <td>
            <p style="text-align: left">
              Returns an&nbsp;<strong>array</strong> of<strong> </strong>objects
              if the <strong>search()</strong> method succeeds.&nbsp;What is
              returned depends on the query and what is stored.
            </p>
          </td>
        </tr>
        <tr>
          <td>count</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p>
              The number of objects returned in the&nbsp;<strong>results</strong>
              array.
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
        <tr>
          <td>taskId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Unique identifier of the search operation (only when
              &#39;cancelable&#39; is set to true).&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Subscription Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>results</td>
          <td>Required</td>
          <td>Object array</td>
          <td>
            <p>
              Returns
              an&nbsp;<strong>array</strong>&nbsp;of<strong>&nbsp;</strong>objects
              if the&nbsp;<strong>search()</strong>&nbsp;method
              succeeds.&nbsp;What is returned depends on the query and what is
              stored.
            </p>
          </td>
        </tr>
        <tr>
          <td>count</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p>
              The number of objects returned in
              the&nbsp;<strong>results</strong>&nbsp;array.
            </p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
        <tr>
          <td>taskId</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Unique identifier of the search operation (only when
              &#39;cancelable&#39; is set to true).&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3987</td>
          <td>db: invalid filter op</td>
          <td>
            <p style="text-align: left">
              This message implies that an invalid operation was specified in
              the&nbsp;filter.
            </p>
          </td>
        </tr>
        <tr>
          <td>-3978</td>
          <td>db: invalid query</td>
          <td>
            <p style="text-align: left">
              This message implies that there was a syntax error in the
              query.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>-3977</td>
          <td>db: collations on property do not match</td>
          <td>
            <p style="text-align: left">
              This message implies that the collation sequence of a property
              &nbsp;across different objects do not match.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>-3975</td>
          <td>db: invalid combination of query operations</td>
          <td>
            <p style="text-align: left">
              This message implies that the query syntax is correct, but
              contains logical errors.
            </p>
          </td>
        </tr>
        <tr>
          <td>-992</td>
          <td>
            db : cannot use both &#39;watch&#39; and &#39;cancelable&#39;
            simultaneously
          </td>
          <td>
            <p>
              The &#39;watch&#39; and &#39;cancelable&#39; parameters must not
              be used in the same call.
            </p>
          </td>
        </tr>
        <tr>
          <td>-986</td>
          <td>
            db : &#39;cancelable&#39; property must be used with
            &#39;subscribe&#39;
          </td>
          <td>
            <p>
              &#39;subscribe&#39; parameter is mandatory when
              &#39;cancelable&#39; parameter is passed to search() method.&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -n 1 -f -a com.webos.service.test
      luna://com.webos.service.db/search &#39;{<br />
      &nbsp; &nbsp;&quot;query&quot;:{<br />
      &nbsp; &nbsp; &nbsp;&nbsp;
      &quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp; &nbsp; &nbsp;&nbsp; &quot;where&quot;:[<br />
      &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
      &quot;prop&quot;:&quot;sample&quot;,<br />
      &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
      &nbsp;&quot;op&quot;:&quot;?&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;val&quot;:&quot;sample&quot;<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}<br />
      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; ]<br />
      &nbsp; &nbsp; }<br />
      }&#39;
    </p>
    <p>Response:&nbsp;</p>
    <p>
      {<br />
      &nbsp; &nbsp;&quot;count&quot;:4,<br />
      &nbsp; &nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp; &nbsp;&quot;results&quot;:[<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;_rev&quot;:22,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;sample&quot;:&quot;sample_updated_value&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_id&quot;:&quot;J8rKQDOvxdF&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;_rev&quot;:23,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;sample&quot;:&quot;sample_updated_value&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_id&quot;:&quot;J8rKTaBClIo&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;_rev&quot;:26,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_id&quot;:&quot;J8rTH76hfcB&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp; &nbsp; &nbsp; },<br />
      &nbsp; &nbsp; &nbsp; {<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;_rev&quot;:27,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;sample&quot;:&quot;sample1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;test&quot;:&quot;test1&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_id&quot;:&quot;J8rTIa65u++&quot;,<br />
      &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp;&quot;_kind&quot;:&quot;com.webos.service.test:1&quot;<br />
      &nbsp; &nbsp; &nbsp; }<br />
      &nbsp; &nbsp;]<br />
      }
    </p>
  </div>
</div>
<h3>stats</h3>
<div>
  <h4>Description</h4>
  <p>
    The stats method returns detailed information about the storage space used
    by every service.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>kind</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>Identifier of kind</p>
          </td>
        </tr>
        <tr>
          <td>verify</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>Verify kindkey if it is true</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation. Possible values are:</p>
            <ul>
              <li>
                <strong>true </strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false </strong>- Indicates that the operation failed. A
                possible reason for failure is &quot;Internal DB8 error
                (internal stat doesn&#39;t exist)&quot;.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>results</td>
          <td>Required</td>
          <td>Object array: <a href="#statskindresult"> statsKindResult</a></td>
          <td>
            <p>Information about resource usage per kind.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p># luna-send -n 1 -f luna://com.webos.service.db/stats &#39;{}&#39;</p>
    <p>&nbsp;</p>
    <p>Response:&nbsp;</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;results&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;com.webos.service.test:1&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;indexes&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;barfoo&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;delmisses&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;count&quot;:0<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;foo&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;delmisses&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;count&quot;:0<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;_id&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;delmisses&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;count&quot;:0<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;objects&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;size&quot;:0,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;count&quot;:0<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }
    </p>
  </div>
</div>
<h3>watch</h3>
<div>
  <h4>Description</h4>
  <p style="text-align: left">
    The <strong>watch </strong>method watches for&nbsp;updates to the database
    that would change the results of a query.
  </p>
  <h4>Parameters</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>query</td>
          <td>Required</td>
          <td>Object: <a href="#query"> Query</a></td>
          <td>
            <p>Query whose results the app wants to watch.</p>
          </td>
        </tr>
        <tr>
          <td>subscribe</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>subscription is enabled if it&nbsp;true</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Call Returns</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>fired</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>
              If the <strong>watch</strong> method found any object by query,
              <strong>fired</strong> will contain true.&nbsp;
            </p>
            <p><strong>Fired</strong>&nbsp;will never return false.&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <p>Indicates the status of operation.&nbsp;Possible values are:</p>
            <ul>
              <li>
                <strong>true&nbsp;</strong>- Indicates that the operation was
                successful.
              </li>
              <li>
                <strong>false&nbsp;</strong>- Indicates that the operation
                failed. Check the&nbsp;&quot;errorCode&quot; and
                &quot;errorText&quot; fields for details
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>The error code for the failed operation.</p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the reason for the failure of the operation.&nbsp;See
              the &quot;<strong>Error Codes&quot;</strong>&nbsp;section of this
              method for details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Error Codes Reference</h4>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Error Code</p>
          </th>
          <th width="30%">
            <p>Error Text</p>
          </th>
          <th width="55%">
            <p>Error Description</p>
          </th>
        </tr>
        <tr>
          <td>-3999</td>
          <td>db: access denied</td>
          <td>
            <p style="text-align: left">
              <span data-cke-bookmark="1" style="display: none">&nbsp;</span>This message implies that the app does not have permissions to
              monitor the database.<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Example</h4>
  <div class="code-bg-grey">
    <p>
      # luna-send -i -f -a com.webos.service.configurator
      luna://com.webos.service.db/watch &#39;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;query&quot;:{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;from&quot;:&quot;com.webos.service.test:1&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;where&quot;:[&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;prop&quot;:&quot;sample&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;op&quot;:&quot;=&quot;,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;val&quot;:&quot;sample1&quot;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
      &nbsp;&nbsp;&nbsp;}<br />
      }&#39;
    </p>
    <p>&nbsp;</p>
    <p>Response: When object is found with such criteria</p>
    <p>
      {&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&quot;returnValue&quot;:true,<br />
      &nbsp;&nbsp;&nbsp;&quot;fired&quot;:true<br />
      }
    </p>
  </div>
</div>
<h2>Objects</h2>
<div>
  <h3>BatchOperation</h3>
  <p>Method and params for batch operation.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>method</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              <span style="text-align: justify">Database operation to perform. </span><br />
            </p>
            <p style="text-align: left">
              <span style="text-align: justify">Allowed values are:</span><br />
            </p>
            <ul>
              <li style="text-align: left">
                <span style="text-align: justify">del</span><br />
              </li>
              <li style="text-align: left">
                <span style="text-align: justify">find</span><br />
              </li>
              <li style="text-align: left">
                <span style="text-align: justify">get</span><br />
              </li>
              <li style="text-align: left">
                <span style="text-align: justify">merge</span><br />
              </li>
              <li style="text-align: left">
                <span style="text-align: justify">put</span><br />
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>params</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              List of parameters for the database operation.<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>BatchResponse</h3>
  <p>Response to batch operation.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>returnValue</td>
          <td>Required</td>
          <td>Boolean</td>
          <td>
            <ul>
              <li>
                If the&nbsp;method
                succeeds,&nbsp;<strong>returnValue&nbsp;</strong>will contain
                true.
              </li>
              <li>
                If the&nbsp;method
                fails,&nbsp;<strong>returnValue</strong>&nbsp;will
                contain&nbsp;false.&nbsp;
              </li>
            </ul>
            <p style="margin-left: 0in">
              The&nbsp;method may fail because of one of the error conditions
              described in the&nbsp;<strong>Error Codes Reference</strong>&nbsp;table of this method. See the&nbsp;<strong>Error Code Reference&nbsp;table</strong>
              for more information.
            </p>
          </td>
        </tr>
        <tr>
          <td>responses</td>
          <td>Required</td>
          <td>Array</td>
          <td>
            <p style="text-align: left">
              Array of responses for each of the operations in the batch.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>errorCode</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p>
              <strong>errorCode </strong>contains the error code if
              the&nbsp;method fails. The&nbsp;method will
              return&nbsp;<strong>errorCode</strong>&nbsp;only if it fails.
            </p>
            <p>
              See the&nbsp;<strong>Error Codes Reference</strong>&nbsp;of this
              method for more details.
            </p>
          </td>
        </tr>
        <tr>
          <td>errorText</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              <strong>errorText </strong>contains the error text if
              the&nbsp;method fails. The&nbsp;method will
              return&nbsp;<strong>errorText&nbsp;</strong>only if it fails.
            </p>
            <p>
              See the&nbsp;<strong>Error Codes Reference</strong>&nbsp;of this
              method for more details.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>Query</h3>
  <p>Defines a db8 query.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>select</td>
          <td>Optional</td>
          <td>String array</td>
          <td>Array of property names to return.</td>
        </tr>
        <tr>
          <td>from</td>
          <td>Required</td>
          <td>String</td>
          <td>Name of kind to retrieve results from.</td>
        </tr>
        <tr>
          <td>where</td>
          <td>Optional</td>
          <td>Object array: <a href="#whereclause"> WhereClause</a></td>
          <td>
            <p>Array of clauses to test.<br /></p>
          </td>
        </tr>
        <tr>
          <td>orderBy</td>
          <td>Optional</td>
          <td>String</td>
          <td>Order results on this property.</td>
        </tr>
        <tr>
          <td>desc</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>
              To display query results in descending order, set
              <strong>desc</strong> to <strong>true</strong>.<br />
              To display query results in ascending order, set
              <strong>desc</strong> to <strong>false</strong>.
            </p>
            <p>The default value of desc is <strong>false</strong>.</p>
          </td>
        </tr>
        <tr>
          <td>incDel</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>
              To display query results with deleted objects, set
              <strong>incDel</strong> to <strong>true</strong>.<br />
              To display query as is, set <strong>incDel</strong> to
              <strong>false</strong>.
            </p>
            <p>
              The default value of <strong>incDel</strong> is
              <strong>false</strong>.
            </p>
            <p>
              <strong>Note:</strong> You can only request this if the
              <strong>incDel</strong>&nbsp;field was true when you created your
              indexes during a <strong>putKind</strong> operation. Otherwise,
              the query fails with a &quot;no index for this query&quot;
              message.
            </p>
          </td>
        </tr>
        <tr>
          <td>limit</td>
          <td>Optional</td>
          <td>Number</td>
          <td>
            <p style="text-align: left">
              Specifies maximum number of results to return (0-500). Default is
              500<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>page</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p style="text-align: left">
              Page key returned by previous query.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>filter</td>
          <td>Optional</td>
          <td>Object array: <a href="#filterclause"> FilterClause</a></td>
          <td>
            <p style="text-align: left">
              Array of clauses - works only in the search method - identical to
              WhereClause. Can be used along with where to perform a range
              search.<br />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>IndexClause</h3>
  <p>
    Used in the putKind call for creating kind object indexes. Note that indexes
    determine the type of queries your app can make. See Queries and Indexing
    for more information. Set the <strong>incDel </strong>flag to true if you
    want future queries to return marked as deleted objects. Objects are not
    completely deleted until an administrative purge operation takes place.
  </p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>name</td>
          <td>Required</td>
          <td>String</td>
          <td>Index name</td>
        </tr>
        <tr>
          <td>props</td>
          <td>Required</td>
          <td>Object array: <a href="#indexpropclause"> IndexPropClause</a></td>
          <td>
            <p style="text-align: left">
              Array of properties to index together.<br />
            </p>
          </td>
        </tr>
        <tr>
          <td>incDel</td>
          <td>Optional</td>
          <td>Boolean</td>
          <td>
            <p>
              To display query results with deleted objects, set
              <strong>incDel</strong> to <strong>true</strong>.<br />
              To display query results without deleted objects, set incDel
              to<strong> false</strong>.
            </p>
            <p>The default value of <strong>incDel</strong> is false.</p>
            <p>
              Note: You can only request this if
              the&nbsp;<strong>incDel</strong>&nbsp;field was true when you
              created your indexes during
              a&nbsp;<strong>putKind</strong>&nbsp;operation. Otherwise, the
              query fails with a &quot;no index for this query&quot; message.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>RevSetClause</h3>
  <p>
    Defines a revision set - subset of an object&#39;s properties that your app
    can be notified about when one of the properties is modified.
  </p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>name</td>
          <td>Required</td>
          <td>String</td>
          <td>Name of the revision set (unique to this kind).</td>
        </tr>
        <tr>
          <td>props</td>
          <td>Required</td>
          <td>
            Object array: <a href="#revsetpropclause"> RevSetPropClause</a>
          </td>
          <td>
            <p>Array of properties to include in revision set.<br /></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>operation</h3>
  <p>Object used to represent a batch operation to run.</p>
  <p>
    Note: This object has different format as target. Following object example
    is for the target.
  </p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>method</td>
          <td>Required</td>
          <td>String</td>
          <td>operation being requested.</td>
        </tr>
        <tr>
          <td>params</td>
          <td>Required</td>
          <td>Any array</td>
          <td>Params will depend on the type of operation being requested.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>putQuotas</h3>
  <p>Represent Kind owner and maximum allowed DB8 storage usage.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>owner</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Name of service</p>
          </td>
        </tr>
        <tr>
          <td>size</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p>Size in bytes of allowed quota</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>quotaStatsResult</h3>
  <p>Information about used quotas.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>size</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p>Size of quotas in bytes</p>
          </td>
        </tr>
        <tr>
          <td>used</td>
          <td>Required</td>
          <td>Number</td>
          <td>
            <p>Used quotas by service in bytes</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>statsKindResult</h3>
  <p>Information about kind usage.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>indexes</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Statistic for each index, created for kind</p>
          </td>
        </tr>
        <tr>
          <td>_id</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Statistic for each id, created for kind</p>
          </td>
        </tr>
        <tr>
          <td>objects</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Statistic about objects, relative to kind</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>WhereClause</h3>
  <p>Defines a SQL-like JSON where clause for a db8 Query.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>prop</td>
          <td>Required</td>
          <td>String</td>
          <td>Name of property to test.</td>
        </tr>
        <tr>
          <td>op</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Test operator. Must be one of the following:</p>
            <ul>
              <li>&quot;&lt;&quot; : Less than</li>
              <li>&quot;&lt;=&quot; : Less than or equal</li>
              <li>&quot;=&quot; : Equals</li>
              <li>&quot;&gt;=&quot; : Greater than or equal</li>
              <li>&quot;&gt;&quot; : Greater than</li>
              <li>&quot;!=&quot; : Not equal</li>
              <li>&quot;?&quot; : Wildcard</li>
              <li>
                &quot;%&quot; : Full-text. This operator (aka - the prefix
                operator) will return all matches beginning with the value
                specified.
              </li>
              <li>
                &quot;%%&quot; : Partial-text. This operator is used to locate
                sub-strings or partial string matches.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>val</td>
          <td>Required</td>
          <td>Any</td>
          <td>Value to test against.</td>
        </tr>
        <tr>
          <td>collate</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            Indicates the string comparison routine used to order the results.
            See the collate field in the IndexPropClause data structure for more
            information.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>FilterClause</h3>
  <p>Definition of the Filter clause that is part of the Query object.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>prop</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Name of property to test.<br /></p>
          </td>
        </tr>
        <tr>
          <td>op</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Test operator. Must be one of the following:</p>
            <ul>
              <li>&quot;&lt;&quot; : Less than</li>
              <li>&quot;&lt;=&quot; : Less than or equal</li>
              <li>&quot;=&quot; : Equals</li>
              <li>&quot;&gt;=&quot; : Greater than or equal</li>
              <li>&quot;&gt;&quot; : Greater than</li>
              <li>&quot;!=&quot; : Not equal</li>
              <li>&quot;?&quot; : Wildcard</li>
              <li>
                &quot;%&quot; : Full-text. This operator (aka - the prefix
                operator) will return all matches beginning with the value
                specified.
              </li>
              <li>
                &quot;%%&quot; : Partial-text. This operator is used to locate
                sub-strings or partial string matches.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>val</td>
          <td>Required</td>
          <td>Any</td>
          <td>Value to test against.</td>
        </tr>
        <tr>
          <td>collate</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            Indicates the string comparison routine used to order the results.
            See the collate field in the IndexPropClause data structure for more
            information.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>Results</h3>
  <p>
    Contains &quot;id&quot; and &quot;rev&quot; fields for the JSON data object.
  </p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>id</td>
          <td>Required</td>
          <td>Any</td>
          <td>
            <p>ID of the object.</p>
          </td>
        </tr>
        <tr>
          <td>rev</td>
          <td>Required</td>
          <td>Any</td>
          <td>
            Object's revision ID. Every db8 object has this ID field. db8
            maintains a global rev id counter that is incremented every time a
            db8 object is created or updated.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>IndexPropClause</h3>
  <p>Defines index property for IndexClause</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>name</td>
          <td>Required</td>
          <td>String</td>
          <td>
            <p>Name of property being indexed.<br /></p>
          </td>
        </tr>
        <tr>
          <td>collate</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates the string comparison routine used to order the index.
              Must be one of the following:
            </p>
            <ul>
              <li>default: Does binary comparison.</li>
              <li>
                primary: Compares base characters (for example, &quot;a&quot;
                &lt; &quot;b&quot;) without considering accents, case, or tone
                marks.
              </li>
              <li>
                secondary: Accents in the characters are considered secondary
                differences (for example, &quot;as&quot; &lt;
                &quot;&agrave;s&quot; &lt; &quot;at&quot;). Other differences
                between letters can also be considered secondary differences,
                depending on the language. A secondary difference is ignored
                when there is a primary difference anywhere in the strings.
              </li>
              <li>
                tertiary: Upper and lower case differences in characters are
                distinguished at the tertiary level (for example, &quot;ao&quot;
                &lt; &quot;Ao&quot; &lt; &quot;a&ograve;&quot;). In addition, a
                variant of a letter differs from the base form on the tertiary
                level (such as &quot;A&quot; and &quot;?&quot;). A tertiary
                difference is ignored when there is a primary or secondary
                difference anywhere in the strings.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>default</td>
          <td>Optional</td>
          <td>Any</td>
          <td>
            Default value to set for this property at insertion time, if not
            present.
          </td>
        </tr>
        <tr>
          <td>tokenize</td>
          <td>Optional</td>
          <td>String</td>
          <td>
            <p>
              Indicates if words in strings should be broken up, i.e., should
              &quot;Hello World&quot; become &quot;Hello&quot; and
              &quot;World&quot; for purposes of indexing. Must be one of the
              following:
            </p>
            <ul>
              <li>none: Does not tokenize.</li>
              <li>
                default: Use the default for the locale (which may strip
                stop-words). Stop-words are common words that are stripped for
                purposes of indexing, i.e., &quot;the&quot;, &quot;a&quot;,
                &quot;an&quot;, &quot;is&quot;, etc.
              </li>
              <li>all: Tokenizes all words.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>type</td>
          <td>Required</td>
          <td>String</td>
          <td>"single" or "multi". Single property or multiple properties.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>RevSetPropClause</h3>
  <p>A property in a RevSetClause.</p>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth">
      <tbody>
        <tr>
          <th width="15%">
            <p>Name</p>
          </th>
          <th width="15%">
            <p>Required</p>
          </th>
          <th width="15%">
            <p>Type</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        <tr>
          <td>name</td>
          <td>Required</td>
          <td>String</td>
          <td>Name of property to include in revision set.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
