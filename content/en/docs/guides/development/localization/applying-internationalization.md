---
title: Applying Internationalization
date: 2022-03-02
weight: 20
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

#### Making and Importing Your Own iLib

First, make your own iLib build version and import it into your app as follows:

1. Extract iLib features in your app.
    
    1. iLib-js provides [ilib-scanner](https://github.com/iLib-js/ilib-scanner). This utility generates webpack metafiles, and the metafiles include only those iLib classes that your code actually needs.

        {{< code "Example for executing ilib-scanner" true >}}
        ``` shell
        $ npm install ilib-scanner
        $ ilib-scanner [options] outputFile

        # example
        $ ilib-scanner --assembly=assembled --locales=ko-KR,es-ES ilib-include.js
        ```
        {{< /code >}}

    2. After running ilib-scanner, webpack metafiles (`ilib-include.js`, `webpack.config.js`) will be created.

2. Generate a iLib file for your app.

    1. With the metafiles from step 1-b, run webpack to get the iLib output file properly. ([Webpack](https://webpack.js.org/guides/installation/) must be installed in your machine first.)

        Also in order to generate the iLib file, `ilib-webpack-plugin` is required as a dependent package.

        {{< code "Example for executing webpack" true >}}
        ``` shell
        $ npm install webpack
        $ npm install ilib-webpack-plugin
        $ webpack
        ```
        {{< /code >}}

    2. After running webpack, the iLib file (`ilib.js`) is generated in the current directory.

3. Convert translation resources.

    1. iLib-js provides [ilib-resbundler](https://github.com/iLib-js/ilib-resbundler) that helps to convert JSON files into JS files.

        {{< code "Example for executing ilib-resbundler" true >}}
        ``` shell
        $ npm install ilib-resbundler
        $ ilib-resbundler [options]

        # example
        1) ilib-resbundler --assembly=assembled --resDir=resources --outDir=outResDir
        2) ilib-resbundler --assembly=dynamic --resDir=resources --outDir=outResDir --locales=ko-KR,es-ES
        ```
        {{< /code >}}

        In the above example:

        - example 1) Output file (`ilib-translations.js`) is created in `./outResDir`.
        - example 2) Output files (`ko-KR.js` and `es-ES.js`) are created in `./outResDir`.

4. Import output files from the step 2 and 3 into your app.

    {{< note >}}
    For more details on how it works, visit our [sample app repository](https://github.com/iLib-js/ilib-samples/tree/main/html).
    {{< /note >}}

    {{< code "Example for index.html" true>}}
    ``` html
    <!DOCTYPE html>
    <html>
        <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>iLib Test Sample</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <script src="./ilib.js"></script>
        <script src="./outResDir/ko-KR.js"></script>
        <script src="./outResDir/es-ES.js"></script>
        <script src="./lib/localize.js"></script>
        </head>
    .....
    ```
    {{< /code >}}

#### Using the ResBundle.getString() method

After making and importing iLib, use the [`ResBundle.getString()`](https://ilib-js.github.io/iLib/docs/api/jsdoc/symbols/ResBundle.html#getString) method of iLib as follows:

{{< code "Example for a non-Enact web app" true >}}
```js
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