---
title: Applying Localization
date: 2020-08-27
weight: 12
toc: true
---

When internationalization is done, your apps and services are ready for localization. You can extract localizable text from your code by using a localization tool and send those files to your translation team for translation into multiple languages and locales. By importing the translated files you'll get string resources for your apps and services. You can still write out string resources manually, without using the localization tool.

If you create string resources manually, they should follow the formats described in the [Resource Formats](#resource-formats) section. In other words, compose string resource files for multiple languages according to the format for the programming language of your apps and services. Refer to the [Resource Formats](#resource-formats) section for details. 

In webOS OSE, you can create string resources with the help of a localization tool, namely, loctool. See [Installing the Localization Tool](#installing-the-localization-tool) for its installation. The loctool makes use of XLIFF files to generate translation files and convert them to string resource files. See [Using the Localization Tool](#using-the-localization-tool) for more information.

## Installing the Localization Tool

webOS OSE makes use of [loctool](https://github.com/iLib-js/loctool/blob/development/README.md) in its localization process.

You need to install Node.js before using loctool. Node.js 7.0 or higher is required.

To run the localization tool, you need to check out the localization tool repository and then install the plugins. By checking out the [ilib-loctool-webos-dist](https://github.com/iLib-js/ilib-loctool-webos-dist) repository, you can download all related plugins including loctool.

{{< code "Installation" true >}}
```js
 git clone https://github.com/iLib-js/ilib-loctool-webos-dist
 cd ilib-loctool-webos-dist
 npm install
 // or to install it globally: npm install -g
```
{{< /code >}}

## Using the Localization Tool

The localization tool parses source codes along with XLIFF files and generates string resources in formats required by each programming language. Therefore, you must provide translation data in XLIFF format to use the localization tool.

The localization process using the loctool is summarized below:
1. Configure your project, extract all strings eligible for localization and export them in a set of XLIFF files with loctool.
2. Submit the raw XLIFF files to your translator. Get back the translated files and apply them into the project again.
3. Generate translated string resources by using the loctool.

Detailed explanations of the entire process are given in the [loctool guide](https://github.com/iLib-js/loctool/blob/development/README.md) page.

In addition, the loctool enables you to generate string resources files at build time. See [Generate String Resources at Build Time](#generating-string-resources-at-build-time) for details.

### Working with XLIFF Files

#### What is XLIFF?

[XLIFF](http://docs.oasis-open.org/xliff/xliff-core/v2.0/xliff-core-v2.0.html) (XML Localization Interchange File Format) is an XML format file that contains the actual translation data. An XLIFF file must exist for each locale. Note that webOS OSE uses XLIFF version 2.0.

The following shows an example of XLIFF, which represents the translation data for '*en-US*' locale of '*javascript*' application named '*sample*'.

{{< code "en-US.xliff (web)" true >}}
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

{{< note >}}
* The source language is defined as `en-KR`.
* basename :  The short name for the application. The right-most word of the dot-connected string of the application name becomes the basename.
    * If an application name is  `com.webos.app.home`, the basename is `home`.
    * If an application name is  `sample`, the basename is `sample`.
{{< /note >}}


#### How to write XLIFF files?
When writing an XLIFF file, the value of `original` attribute must match the basename. In addition, the value of `name` attribute in `group` must match the type of programming language used for developing the apps or services, as follows:

{{< code "en-US.xliff " true >}}
```xml
<?xml version="1.0"?>
<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en-KR" trgLang="en-US">
 <file id="sampleJS_f1" original="sampleJS">
  <group id="sampleJS_g1" name="javascript">
...
```
{{< /code >}}

{{< code "en-US.xliff \(c)" true >}}
```xml
<?xml version="1.0"?>
<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en-KR" trgLang="en-US">
 <file id="samplec_f1" original="samplec">
  <group id="samplec_g1" name="c">
...
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

#### Where to Put the XLIFF Files?

XLIFF files for each locale must be placed in the directory with the same name as the base name, as shown below:

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

### Preparing a Configuration File

You need to create a `project.json` configuration file for your project and configure this file as guided in the loctool guide.

For more information about configuring the loctool, please visit the [loctool project](https://github.com/iLib-js/loctool/blob/development/README.md#configuration) site.

Here's an example for a webOS application.

{{< code "project.json (Web) " true >}}
```json
{
    "name": "com.webos.app.home",
    "id": "home",
    "projectType": "webos-web",
    "sourceLocale": "en-KR",
    "pseudoLocale": ["zxx-XX", "zxx-Cyrl-XX", "zxx-Hans-XX", "zxx-Hebr-XX"],
    "resourceDirs": {
         "json":"resources"
     },
     "resourceFileTypes": {
         "json":"ilib-loctool-webos-json-resource"
     },
    "plugins": [
         "ilib-loctool-webos-javascript",
         "ilib-loctool-webos-appinfo-json"
     ],
     "excludes": [
         "*"
     ],
     "includes": [
         "src"
     ]
}
```
{{< /code >}}

{{< code "project.json (QML) " true >}}
```json
{
    "name": "ime-manager",
    "id": "imemanager",
    "projectType": "webos-qml",
    "sourceLocale": "en-KR",
    "pseudoLocale": ["zxx-XX", "zxx-Cyrl-XX", "zxx-Hans-XX", "zxx-Hebr-XX"],
    "resourceDirs": {
         "ts":"resources"
     },
     "resourceFileTypes": {
         "ts":"ilib-loctool-webos-ts-resource"
     },
    "plugins": [
         "ilib-loctool-webos-qml",
         "ilib-loctool-webos-appinfo-json"
     ],
     "excludes": [
         "*"
     ],
     "includes": [
         "src"
     ]
}
```
{{< /code >}}

{{< note >}}
The value of `id` property in `project.json` must be the same as xliff's directory name.
{{< /note >}}

#### Plugins

The loctool provides a good number of plugins for a wide variety of file types and programming languages. The following table summarizes the plugins applicable for webOS development. Plugins are node modules that can be loaded into your project. When loading the plugins to your project, specify the plugin names and the ptojectType in the `plugins` and `projectType` properties of the `project.json` file.

| type | plugins |projectType  |
| --- | --- | --- |
| javascript | [ilib-loctool-webos-javascript](https://github.com/iLib-js/ilib-loctool-webos-javascript), [ilib-loctool-webos-json-resource](https://github.com/iLib-js/ilib-loctool-webos-json-resource)  | webos-web |
| c | [ilib-loctool-webos-c](https://github.com/iLib-js/ilib-loctool-webos-c), [ilib-loctool-webos-json-resource](https://github.com/iLib-js/ilib-loctool-webos-json-resource) | webos-c |
| cpp | [ilib-loctool-webos-cpp](https://github.com/iLib-js/ilib-loctool-webos-cpp), [ilib-loctool-webos-json-resource](https://github.com/iLib-js/ilib-loctool-webos-json-resource) | webos-cpp |
| qml | [ilib-loctool-webos-qml](https://github.com/iLib-js/ilib-loctool-webos-qml), [ilib-loctool-webos-ts-resource](https://github.com/iLib-js/ilib-loctool-webos-ts-resource) | webos-qml |
| appinfo.json | [ilib-loctool-webos-appinfo-json](https://github.com/iLib-js/ilib-loctool-webos-appinfo-json) | - |

### Running the Localization Tool

The following commands show how to run the localization tool from the command line (where Node.js is installed).

{{< code "Running the Loctool" true >}}
```js
 node <path-to-the-loctool-dir>/loctool.js

 // To see the usage
 node <path-to-the-loctool-dir>/loctool.js -h

 // Example) options on webOS
 node <path-to-the-loctool-dir>/loctool.js -2 -x xliffPath --pseudo --localizeOnly -l localelist
```
{{< /code >}}

### Generating String Resources at Build Time

In order to enable the localization task during build, recipes need to be updated properly.

To use the localization tool for generating string resources at build time, add the following line to the recipe to inherit the `webos_localizable` bbclass.

{{< code "sample.bb" true >}}
```bash
inherit webos_localizable
```
{{< /code >}}

If you are working on C/C++ or Qt/QML, you need to apply some additional changes to your recipe file. See the following sections for details.

#### C/C++

Regarding C/C++ cases, the i18n library (`libwebosi18n`) needs to be built first.
In order to do that, add a dependency for the library to the recipe.

{{< code "samplecpp.bb" true >}}
```bash
...
DEPENDS="libwebosi18n"
...
inherit webos_localizable
```
{{< /code >}}

#### Qt/QML

For Qt/QML apps, the recipe must inherit `webos_qt_localization` instead of `webos_localizable`. The `webos_qt_localization` bbclass includes an additional process to convert a `.ts` file into a `.qm` file.

{{< code "sample.bb for QML" true >}}
```bash
inherit webos_qt_localization
```
{{< /code >}}

#### Changing the Location of XLIFF Directory

If necessary, you can change the location of XLIFF directory by redefining the values below:

{{< code "Default WEBOS_LOCALIZATION_DATA_PATH" true >}}
```bash
WEBOS_LOCALIZATION_DATA_PATH ?= "${S}"
```
{{< /code >}}

{{< code "Example of modified recipe" true >}}
```bash
WEBOS_LOCALIZATION_DATA_PATH = "${STAGING_DATADIR}/localization"
```
{{< /code >}}

## Resource Formats
This section explains the resource format of each supported programming language.

### JavaScript
Web apps require string resources to be written in JSON format.
If you are not using the localization tool, create a file named **`strings.json`** and write strings for translation in key-value format.

{{< code "Example of strings.json" true >}}
```json
{
  "String 1": "Translation 1",
  "String 2": "Translation 2"
}
```
{{< /code >}}

Make sure that you prepare `strings.json` files for each locale under the `resources` directory. The directory structure is shown as below:

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

### C/C++

To prepare string resources without using the localization tool and XLIFF, write them in JSON format just like in JavaScript. The format and directory structure are basically the same as what's described in the JavaScript section.

You can use a custom name for the JSON files, but it is recommended that you use **`cppstrings.json`** for C++ and **`cstrings.json`** for C.

### QML

Basically, follow the localization guidelines of Qt. For details, refer to the [Qt documentation](http://doc.qt.io/qt-5/qtquick-internationalization.html).

If you use the localization tool (loctool), `.qm` files for each locale are generated in the following file name format.

* Format: **`sampleqml_[lang]_[script]_[region].qm`**
* Examples: `sampleqml_en_GB.qm`, `sampleqml_zh_Hans_CN.qm`

## Tips

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
