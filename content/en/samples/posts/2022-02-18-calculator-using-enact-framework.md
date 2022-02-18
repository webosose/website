---
title: Calculator - Using Enact Framework
date: 2022-02-18
slug: calculator-using-enact-framework
posttype: app
toc: true
thumbnail: th-calculator.png
---

## Overview

This tutorial demonstrates how to use the Enact framework to create a typical calculator app for webOS OSE. Enact is a React-based JavaScript framework optimized for developing web apps for webOS OSE. 

The calculator app makes use of the Moonstone theme to compose the user interface (UI) of the app.

The calculator app provides the following features:

- Basic arithmetic functions
- Basic math functions
- Logarithmic functions
- Trigonometric functions
- Memory storage functions

You can use this calculator app in the following ways:

- Install the app as-is on a webOS OSE target device.
- Update the source code as required and then deploy on a webOS OSE target device. 
- Analyze the source code to understand the usage of different Enact components.

## Prerequisites

You must install Node.js version 10 or later. Download and install Node.js from the [Node.js](https://nodejs.org/en/download/) website.

Install the [Enact command-line interface (CLI)](https://enactjs.com/docs/tutorials/setup/#installing-enact-cli) globally by using the `npm install` command:  

``` shell
$ npm install -g @enact/cli
```

Also install the [webOS OSE CLI](https://www.webosose.org/docs/tools/sdk/cli/cli-user-guide/#installing-cli) as follows:

``` shell
$ npm install -g @webosose/ares-cli
```

## Source Code

The source code is available at the [samples](https://github.com/webosose/samples) repository. Clone this repository to download the source code on your local development system, and find the [com.reference.app.calculator](https://github.com/webosose/samples/tree/master/ref-apps/com.reference.app.calculator) directory under the `ref-apps` repository. 

Analyze the source code to get an understanding of the functionalities implemented in the calculator app. Refer to the snippets provided in this section.

### Using Enact UI Components

The below code snippet uses the Moonstone theme on the calculator app.

- `Panels` provides a way to manage the different screens of the app. Here, header and calculator components are managed by `Panels`. 
- `Button` and `Label` are mainly used for creating UI components. The calculator app is provided as a sample; it only makes use of such simple UI components.

``` js
import { Panel } from "@enact/moonstone/Panels";
...	
    <Panel {...props} style={{ backgroundColor: "black" }}>
      <Header onClose={handleClose}></Header>
      <Calculator />
    </Panel>
...
import Label from "@enact/moonstone/LabeledItem";
import Button from "@enact/moonstone/Button";
...
 <label className={css.result}> {result}</label>
 <Label className={css.history}> {history}</Label>
	...
 <Button onClick={() => onClickHandler(Numbers.ONE)}>{Numbers.ONE}</Button>
 <Button onClick={() => onClickHandler(Numbers.TWO)}>{Numbers.TWO}</Button>
 <Button onClick={() => onClickHandler(Numbers.THREE)}>{Numbers.THREE}</Button>
...
```

### Defining CSS Styles

The following CSS style defines the grid container for the keypad layout:

``` css
...	
.keypad {
  display: grid;
  background-color: rgb(172, 172, 172);
  font-family: "digital-clock-font";
  grid-template-columns: repeat(7, 6fr);
  grid-template-rows: repeat(9, 6fr);
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  border: 5px solid #f93881;
  border-radius: 12px;
  padding: 20px;
  zoom: 110%;
}
...
```

The following CSS style decorates the result and history components for the best appearance of the calculator:

``` css
...	
.history {
  .common;
  font-size: 2rem;
  background-color: rgb(153, 153, 153);
  color: whitesmoke;
  font-weight: normal;
  direction: rtl;
}
.result {
  .common;
  font-size: 2.5rem;
  background-color: seashell;
  color: black;
}
...
```

### Using Math.js library

The calculator app uses the Math.js library for parsing and evaluating mathematical expressions used in the calculator app.

``` js
import * as mathjs from "mathjs";
...	
const doEval = (expression) => {
  let answer = DISPLAY.ERROR;
  try {
    answer = mathjs.evaluate(expression);
  } catch (err) {
    answer = DISPLAY.ERROR;
  }
  return answer;
};
...
```

### Validating Syntax

The following shows a simple parsing engine that checks whether parentheses on user input are valid. The parser takes the user input and returns an error if the input is invalid.

``` js
...
const validateSyntax = (history) => {
  let leftParen = history.indexOf("(");
  let rightParen = history.indexOf(")");
  if (
    (leftParen === -1 && rightParen >= 0) ||
    (rightParen === -1 && leftParen >= 0)
  ) {
    console.log("Parenthesss missing -1 !!!!");
    return -1;
  } else {
    let counter = 0;
    let splitArr = history.split("");
    for (let i = 0; i < splitArr.length; i++) {
      if (splitArr[i] === "(") {
        counter++;
      } else if (splitArr[i] === ")") {
        counter--;
      }

      if (counter === -1) {
        console.log("Parenthesss missing -2 !!!!");
        return -1;
      }
    }
    if (counter < 0) {
      console.log("Parenthesss missing -3 !!!!");
      return -1;
    }
  }
  return 1;
};
...
const doEvalUtil = (history) => {
  if (validateSyntax(history) === -1) {
    return DISPLAY.INVALID;
  } else if (history !== undefined && history.length > 0) {
    if (history.includes("--")) {
      history = history.replace("--", "+");
    }
    if (history.includes("%")) {
      history = history.replace("%", "/100");
    }
    return doEval(history);
  }
};
...
```

## Installing the App on the Target Device

Go to the `app` directory of the downloaded source code and execute the following commands:  

1. Package the enact source code.  

    ``` shell
    $ enact pack  
    ```

    A directory named `dist` is created.  

2. Package the app to create an IPK.  

    ``` shell
    $ ares-package dist
    ```

    An IPK named `com.lgsi.app.calculator_1.0.1_all.ipk` is created.  

3. Install the IPK on the target device.  

    ``` shell
    $ ares-install --device <TARGET_DEVICE> com.lgsi.app.calculator_1.0.1_all.ipk
    ```

