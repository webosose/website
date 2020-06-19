---
title: Localization-String Guide
date: 2020-06-19
weight: 10
toc: true
---

In order for the translations to be successful, Strings need to be wrapped with a function appropriate to the file type. 
webOS localization supports JavaScript, C/C++ and QML types.

## JavaScript

For web apps developed in JavaScript, use [iLib](https://github.com/iLib-js/iLib) to write code for localization.

{{< note >}}
For more information about iLib, refer to the [iLib documentation](https://github.com/iLib-js/iLib/blob/development/docs/index.md).
{{< /note >}}

### Enact Apps

Enact framework offers [`$L`](https://enactjs.com/docs/modules/i18n/$L/) component as part of its i18n library, which provides functions to map to translated strings.

{{< code "Example for $L usage" true >}}
``` js
import $L, {toIString} from '@enact/i18n/$L';

$L('Close'); // => "Close" in the current locale
toIString('Close'); // => an ilib IString representing "Close" in the current locale
```
{{< /code >}}

{{< note >}}
For more information on the functions above, refer to the [Enact documentation](https://enactjs.com/docs/modules/i18n/$L/).
{{< /note >}}

### Non-Enact Apps

For web apps that do not utilize Enact framework, use [`getString()`](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/ResBundle.html#getString) API of [ResBundle](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/ResBundle.html) feature in iLib.

1.  First, load the iLib library (`ilib-web.js`) through the `<script>` tag.

    {{< code "Example for loading ilib-web.js" true >}}
    ``` html
    <html>
    <head>
    <script src=<path-to-ilib>/lib/ilib-web.js type="text/javascript"></script>
    ...
    </head>
    </html>
    ```
    {{< /code >}}

    For instance, if you're developing a built-in web app, the iLib library can be loaded as follows:

    ``` html
    <script src=file://usr/share/javascript/ilib/lib/ilib-web.js type="text/javascript"></script>
    ```

2.  After that, use [`ResBundle.getString()`](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/ResBundle.html#getString) method of iLib as shown in the example below.

    {{< code "Example for a non-Enact web app" true >}}
    ```js
    var ResBundle = require("ResBundle.js");
    var rb = new ResBundle({locale: "en-US"});
    var str = rb.getString("String 1"); // str is iLib string object
    var jsStr = str.toString(); // jsStr is js string object
    ```
    {{< /code >}}


## C++/C

If you are developing apps or services in C++/C, use [libwebosi18n](https://github.com/webosose/libwebosi18n) to write code for localization.

The following shows an example that uses `getLocString()` API of libwebosi18n in C++ and C.

{{< code "Using getLocString() in C++" true >}}
```cpp
#include <webosi18n.h>

std::string locale = "en-US";
const std::string file = "cppstrings.json";
const std::string resources_path = "/usr/share/localization/samplecpp";
ResBundle* resBundle = new ResBundle(locale, file, resources_path);

resBundle->getLocString("String 1");
```
{{< /code >}}

{{< code "Using getLocString() in C" true >}}
```c
#include <webosi18n_C.h>

const char* locale = "en-US";
const char* file = "cstrings.json";
const char* resources_path = "/usr/share/localization/sample_c";
ResBundleC* resBundle = resBundle_createWithRootPath(locale, file, resources_path);

resBundle_getLocString(resBundle, "String 1");
```
{{< /code >}}

When writing an XLIFF file, the value of `original` attribute must match the basename. In addition, the value of `name` attribute in `group` must match the type of programming language used for developing the apps or services, as follows:

{{< code "en-US.xliff (cpp)" true >}}
```cpp
<?xml version="1.0"?>
<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en-KR" trgLang="en-US">
 <file id="samplecpp_f1" original="samplecpp">
  <group id="samplecpp_g1" name="cpp">
...
```
{{< /code >}}

{{< code "en-US.xliff \(c)" true >}}
```c
<?xml version="1.0"?>
<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en-KR" trgLang="en-US">
 <file id="samplec_f1" original="samplec">
  <group id="samplec_g1" name="c">
...
```
{{< /code >}}

To prepare string resources without using the localization tool and XLIFF, write them in JSON format just like in JavaScript. The format and directory structure are basically the same as what's described above.

You can also specify the name of the JSON file, but it is recommended that you use **`cppstrings.json`** for C++ and **`cstrings.json`** for C.

## Qt/QML


Basically, you can follow the localization guidelines of Qt. For details, refer to the [Qt documentation](http://doc.qt.io/qt-5/qtquick-internationalization.html).