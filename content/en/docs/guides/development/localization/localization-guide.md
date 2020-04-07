---
title: Localization Guide
date: 2019-03-15
weight: 10
toc: true
---

To reach out to the users in the global market, it is essential to provide your apps and services in many different languages. There are a few things to keep in mind when you localize your apps or services for webOS Open Source Edition (OSE).

* Write code using the internationalization (i18n) library provided by webOS OSE.
    * This page provides the links to external pages with detailed information on libraries and coding rules for each programming language.
* Prepare multi-language string resources in the guided format.
    * You can prepare string resources yourself, or use the localization tool to make string resources generated at build time.

{{< note "Locale identification in webOS OSE" >}}
Locales in webOS OSE follow the BCP 47 standard. A locale is represented as a language tag, typically in *language*-[*script*]-[*region*] format, where the language code is a required field. For example,

* *ko*: Korean
* *fr-FR*: French - France
* *fr-CA*: French - Canada
* *zh-Hant-HK*: Chinese - Chinese Traditional - Hong Kong

For more information about BCP 47 and the language tag, refer to the following:

* [BCP 47 Format](https://tools.ietf.org/html/bcp47)
* [Language Tag](http://en.wikipedia.org/wiki/IETF_language_tag)
{{< /note >}}

## Localization Tool

The localization tool parses source code along with XLIFF files, and generates string resources in formats required by each programming language. Therefore, you must provide a translation data in XLIFF format to use the localization tool.

### XLIFF

[XLIFF](http://docs.oasis-open.org/xliff/xliff-core/v2.0/xliff-core-v2.0.html) (XML Localization Interchange File Format) is an XML format file that contains the actual translation data. XLIFF must exist for each locale.

The following shows an example of XLIFF, which represents the translation data for '*en-US*' locale of '*javascript*' application named '*sample*'. The localization tool of webOS OSE is based on XLIFF version 2.0.

{{< code "en-US.xliff" true >}}
```xml
<?xml version="1.0"?>
<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en-KR" trgLang="en-US">
 <file id="sample_f1" original="sample">
  <group id="sample_g1" name="javascript">
   <unit id="sample_1">
    <segment>
     <source>String 1</source>
     <target>Translation 1</target>
    </segment>
   </unit>
   <unit id="sample_2">
    <segment>
     <source>String 2</source>
     <target>Translation 2</target>
    </segment>
   </unit>
  </group>
 </file>
</xliff>
```
{{< /code >}}

The following table describes the key elements and attributes of XLIFF.

| Element/Attribute | Description |
| --- | --- |
| `<xliff> - srcLang` | Source language - the code of the language, in which *the text to be translated* is expressed |
| `<xliff> - trgLang` | Target language - the code of the language, in which *the translated text* is expressed |
| `<group> - name` | Programming language type - "javascript", "c", "cpp", "x-qml" (for Qt/QML) |
| `<source>` | Source string - *the text to be translated* |
| `<target>` | Target string - *the translated text* |

XLIFF files for each locale must be placed in the directory with the same name as the module name, as shown below.

{{< code "XLIFF Directory Structure" true >}}
```bash
com.webos.app.sample
├── sample
     ├── af-ZA.xliff
     │── ar-SA.xliff
...
     │── en-GB.xliff
     │── en-US.xliff
...
     └── zh-Hans-CN.xliff
```
{{< /code >}}

### Writing the Recipe to Use the Localization Tool

To use the localization tool for generating string resources at build time, add a line to inherit `webos_localizable` bbclass to the recipe.

{{< code "sample.bb" true >}}
```bash
inherit webos_localizable
```
{{< /code >}}

For Qt/QML app, the recipe must inherit `webos_qt_localization` instead of `webos_localizable`. `webos_qt_localization` bbclass includes an additional process to convert a `.ts` file into a `.qm` file.

{{< code "sample.bb for QtQml" true >}}
```bash
inherit webos_qt_localization
```
{{< /code >}}

If necessary, you can change the location of XLIFF directory or XLIFF basename by redefining the values below.

{{< code "Default WEBOS_LOCALIZATION_DATA_PATH and WEBOS_LOCALIZATION_XLIFF_BASENAME" true >}}
```bash
WEBOS_LOCALIZATION_DATA_PATH ?= "${S}"

#The default is the value of the last dot-separated field of PN.
WEBOS_LOCALIZATION_XLIFF_BASENAME ?= "${@ '${BPN}'.split('.')[-1] }"
```
{{< /code >}}

For example, if the package name of an application is "com.webos.app.sample", the basename is "sample". This value must match the value of `original` attribute and the name of the directory where XLIFF files are located.

{{< code "Example of modified recipe" true >}}
```bash
WEBOS_LOCALIZATION_DATA_PATH = "${S}"

WEBOS_LOCALIZATION_XLIFF_BASENAME = "sample"
```
{{< /code >}}

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

### Resource Format

iLib requires string resources in JSON format.

If you are not using the localization tool, create a file named **`strings.json`** and write strings for translation in key-value format.

{{< code "Example of strings.json" true >}}
```json
{
  "String 1": "Translation 1",
  "String 2": "Translation 2"
}
```
{{< /code >}}

Make sure that you prepare `strings.json` files for each locale under the `resources` directory. The directory structure is as below.

{{< code "Locale Resource Structure" true >}}
```bash
com.webos.app.sample
├── resources
│   └── <language>
│       ├── <script>
│       │   ├── <region>
│       │   │   └── strings.json
│       │   └── strings.json
│       └── strings.json
├── src
│
```
{{< /code >}}

For example, the strings for French-language speakers in France need to be stored in `resources/fr/FR/strings.json`, while the strings for French-speaking residents of Canada stored in `resources/fr/CA/strings.json`.

### Preventing the Use of Duplicate Data

If you consider preventing the use of duplicate data, configure the structure of string resources as follows. Let's take an example of English where there may be other translation terms by region.

| Term | en-US (English - USA) | en-GB (English - United Kingdom) |
| --- | --- | --- |
| All | All | All |
| Hello | Hi | Hi |
| Color | Color | Colour |
| Subway | Subway | Underground |

To avoid duplicates, configure directories and files as follows:

* All: If the original term and translated strings are the same, there is no need to write translations in the resource file.
* Hello: If the strings for en-US and en-GB are the same, write them in `en/strings.json`.
* Color, Subway: If the translations for US and UK English are different, write them in `en/US/strings.json` and `en/GB/strings.json` respectively.

```bash
com.webos.app.sample
└── resources
    └── en
        ├── GB
        │   └── strings.json              : Colour, Underground
        ├── US
        │   └── strings.json              : Color, Subway
        └── strings.json                  : Hi
```

## C++/C

If you are developing apps or services in C++/C, use [libwebosi18n](https://github.com/webosose/libwebosi18n) to write code for localization.

To make the libwebosi18n library built first, add a dependency for the library to the recipe. Even for C++/C apps or services, add a line to inherit `webos_localizable` bbclass.

{{< code "samplecpp.bb" true >}}
```bash
...
DEPENDS="libwebosi18n"
...
inherit webos_localizable
```
{{< /code >}}

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

For Qt/QML apps, the recipe must inherit `webos_qt_localization` instead of `webos_localizable`. `webos_qt_localization` bbclass includes an additional process to convert a `.ts` file into a `.qm` file.

{{< code "sample.bb for QtQml" true >}}
```bash
inherit webos_qt_localization
```
{{< /code >}}

For Qt/QML apps, the group name is "x-qml".

{{< code "en-US.xliff (qml)" true >}}
```xml
<?xml version="1.0"?>
<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en-KR" trgLang="en-US">
 <file id="sampleqml_f1" original="sampleqml">
  <group id="sampleqml_g1" name="x-qml">
...
```
{{< /code >}}

Basically, you can follow the localization guidelines of Qt. For details, refer to the [Qt documentation](http://doc.qt.io/qt-5/qtquick-internationalization.html).

If you use the localization tool, `.qm` files for each locale are generated in the following file name format.

* Format: **`sampleqml_[lang]_[script]_[region].qm`**
* Examples: `sampleqml_en_GB.qm`, `sampleqml_zh_Hans_CN.qm`

## Pseudo-Localization

{{< note >}}
For the definition of pseudo-localization, refer to the [Wikipedia page](https://en.wikipedia.org/wiki/Pseudolocalization).
{{< /note >}}

When you use the localization tool, it generates the string resources for pseudo locale by default. (You do not need to add an XLIFF file for this locale.)

A pseudo string is generated by processing the source string. For hard-coded strings, however, a pseudo string is not generated.

The pseudo locales defined in webOS OSE are as follows. The character set differs per locale. Therefore, you can check the localization issue even before the actual translation data is updated.

| Pseudo Locale | Description |
| --- | --- |
| **zxx-XX** | Includes accented Latin characters |
| **zxx-Hans-XX** | Includes Chinese characters |
| **zxx-Hebr-XX** | Includes Hebrew characters |
