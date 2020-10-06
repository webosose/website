---
title: Applying Internationalization
date: 2020-08-27
weight: 11
toc: true
---

To successfully localize your apps and services, you need to internationalize them first.

Internationalization mainly carries out the following two tasks: marking text strings for translation and formatting locale-sensitive data. Text strings of your apps and services need to be marked for translation. Formatting locale-sensitive data, such as dates, times, numbers or currency, for different locales and cultural conventions are also required. These are done by using an external internationalization library for each supported programming language. 

Internationalization in webOS OSE is available for different programming languages.  See [Overview](/docs/guides/development/localization/localization-guide#overview) for the list of supported programming languages.

{{< note >}}
This page only provides guides for marking strings for translation. For more information about formatting locale-sensitive data, please refer to the user guide of the provided internationalization library for each programming language.
{{< /note >}}

## JavaScript

For web apps developed in JavaScript, use [iLib](https://github.com/iLib-js/iLib) to internationalize your code.

{{< note >}}
For more information about iLib, refer to the [iLib documentation](https://github.com/iLib-js/iLib/blob/development/docs/index.md).
{{< /note >}}

### Enact Apps

Enact framework offers the [`$L`](https://enactjs.com/docs/modules/i18n/$L/) component as part of its i18n library, which provides functions to map to translated strings.

{{< code "Example for $L usage" true >}}
``` js
import $L, {toIString} from '@enact/i18n/$L';

$L('Close'); // => "Close" in the current locale
toIString('Close'); // => an ilib IString representing "Close" in the current locale
```
{{< /code >}}

{{< note >}}
For more information about the [`$L`](https://enactjs.com/docs/modules/i18n/$L/) component, refer to the [Enact documentation](https://enactjs.com/docs/modules/i18n/$L/).
{{< /note >}}

### Non-Enact Apps

For web apps that do not utilize Enact framework, use the [`getString()`](https://ilib-js.github.io/iLib/docs/api/jsdoc/symbols/ResBundle.html#getString) API of [ResBundle](https://ilib-js.github.io/iLib/docs/api/jsdoc/symbols/ResBundle.html) feature in iLib.

1.  First, load the iLib library [ilib-web.js](https://github.com/iLib-js/iLib/blob/development/js/lib/ilib-web.js) through the `<script>` tag.

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

2.  After that, use the [`ResBundle.getString()`](https://ilib-js.github.io/iLib/docs/api/jsdoc/symbols/ResBundle.html#getString) method of iLib as shown in the example below:

    {{< code "Example for a non-Enact web app" true >}}
    ```js
    var ResBundle = require("ResBundle.js");
    var rb = new ResBundle({locale: "en-US"});
    var str = rb.getString("String 1"); // str is iLib string object
    var jsStr = str.toString(); // jsStr is js string object
    ```
    {{< /code >}}


## C++/C

If you are developing apps or services in C++/C, use [libwebosi18n](https://github.com/webosose/libwebosi18n) to internationalize your code.

The following shows an example which uses the `getLocString()` API of libwebosi18n in C++ and C:

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

## Qt/QML

For Qt/QML apps, follow Qt's internationalization guideline. For details, refer to the [Qt documentation](http://doc.qt.io/qt-5/qtquick-internationalization.html).