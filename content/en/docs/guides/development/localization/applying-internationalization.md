---
title: Applying Internationalization
date: 2023-08-17
weight: 20
toc: true
---

To successfully localize your apps and services, you need to internationalize them first.

Internationalization mainly carries out the following two tasks: marking text strings for translation and formatting locale-sensitive data. Text strings of your apps and services need to be marked for translation. Formatting locale-sensitive data, such as dates, times, numbers, or currency, for different locales and cultural conventions is also required. These are done by using an external internationalization library for each supported programming language. 

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

{{< code "Example of $L usage" true >}}
``` js
import $L, {toIString} from '@enact/i18n/$L';

$L('Close'); // => "Close" in the current locale
toIString('Close'); // => an ilib IString representing "Close" in the current locale
```
{{< /code >}}

{{< note >}}
For more information about the [`$L`](https://enactjs.com/docs/modules/i18n/$L/) component, refer to the [Enact documentation](https://enactjs.com/docs/modules/i18n/$L/).
{{< /note >}}

### Node.js

For the Node.js service, use the [`getString()`](https://ilib-js.github.io/iLib/docs/api/jsdoc/ResBundle.html#getString) API of [ResBundle](https://ilib-js.github.io/iLib/docs/api/jsdoc/ResBundle.html) feature in iLib. In webOS, iLib is installed in `/usr/share/javascript/ilib`.

After making and importing iLib, use the [`ResBundle.getString()`](https://ilib-js.github.io/iLib/docs/api/jsdoc/ResBundle.html#getString) method of iLib as follows:

{{< code "Example of Node.js service" true >}}
```js
var ResBundle = require('/usr/share/javascript/ilib/lib/ResBundle');

var rb = new ResBundle({locale: "en-US"});
var str = rb.getString("String 1"); // str is iLib string object
var jsStr = str.toString(); // jsStr is js string object
```
{{< /code >}}

## C++/C

If you are developing apps or services in C++/C, use [libwebosi18n](https://github.com/webosose/libwebosi18n) to internationalize your code.

The following shows an example that uses the `getLocString()` API of libwebosi18n in C++ and C:

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

For Qt/QML apps, follow Qt's internationalization guidelines. For details, refer to the [Qt documentation](http://doc.qt.io/qt-5/qtquick-internationalization.html).