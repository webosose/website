---
title: Using Node.js Modules
date: 2020-03-10
weight: 50
toc: true
---

This page shows you how to use Node.js modules inside your service.

## Using Node.js Core Modules

webOS Open Source Edition supports all the Node.js core modules provided by Node.js v8.12.0. For the list of core modules and API details, see [Node.js v8.12.0 Manual & Documentation](https://nodejs.org/docs/v8.12.0/api/).

To use Node.js core module, add the module with the top-level identifier to your service as the following code.

``` javascript
var Service = require('webos-service');
var fs = require('fs');

var service = new Service("com.mycom.service.helloworld");

service.register("writeFile", function(message) {
  fs.writeFileSync('/media/internal/foobar.txt', 'sample text', "utf8");
  message.respond({
    reply: "write complete"
  });
});

service.register("readFile", function(message) {
  fs.readFileSync('/media/internal/foobar.txt', "utf8");
  message.respond({
    reply: "read complete"
  });
});
```

## Using Third-party Modules

There are many third-party modules for Node.js. To use the third-party modules, take the following steps.

1.  Use NPM (Node Package Manager) tool in your computer to install the third-party module. The module will be installed in the `node_modules` directory under the `node.js installation` directory.

    See [Node Packaged Modules (NPM)](https://www.npmjs.org) for search and installation of these modules.

2.  Create a `node_modules` directory in your service's root directory.

3.  Copy modules from the `node_modules` directory under the `node.js` directory to `node_modules` under your service's root directory.

Now, add the third-party module to your service as the following code. The node will find the module from `node_modules` directory first.

``` javascript
var md = require('md5');
```

{{< note >}}
You cannot use modules including C/C++ add-ons. You must use modules implemented with JavaScript only.
{{< /note >}}
