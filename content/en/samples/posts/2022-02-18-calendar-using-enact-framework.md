---
title: Calendar - Using Enact Framework
date: 2022-02-18
slug: calendar-using-enact-framework
posttype: app
toc: true
thumbnail: th-calendar.png
---

## Overview

This tutorial demonstrates how to use the Enact framework to create a typical calendar app for webOS OSE. Enact is a React-based JavaScript framework optimized for developing web apps for webOS OSE.

The calendar app makes use of the Moonstone theme to compose the user interface (UI) of the app.

The calendar app provides the following features:

- Displays monthly calendar.
- Creates a new event with a specific date.
- Highlights the current date to the user.
- Displays the list of events when the user selected on the same date.
- Creates Multiple events on the same date.

You can use this calendar app in the following ways:

- Install the app as-is on a webOS OSE target device.
- Update the source code as required and then deploy on a webOS OSE target device. 
- Analyze the source code to understand the usage of the different Enact components.

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

The source code is available at the [samples](https://github.com/webosose/samples) repository. Clone this repository to download the source code on your local development system, and find the [com.reference.app.familyeventplanner](https://github.com/webosose/samples/tree/master/ref-apps/com.reference.app.familyeventplanner) directory under the `ref-apps` repository.  

Analyze the source code to get an understanding of the functionalities implemented in the calendar app. Refer to the snippets provided in this section.

### Using Enact UI Components

The below code snippet uses the Moonstone theme on the calendar app. The following UI components are used in the app:

- `Dialog`: A modal dialog component, ready to use in Moonstone applications. This component is used for creating events and displaying event lists to the user.
- `Scroller`: This scroll bar is visible when many events are present in the list. 
- `Notification`: This triggers the user to set the event name and description if it's missing.

``` js
import Dialog from '@enact/moonstone/Dialog';
import Scroller from '@enact/moonstone/Scroller';
import Notification from '@enact/moonstone/Notification';
...	
	<Dialog
		className="dialog-popup"
		open={this.state.dailog}
		onClose={() => {
			this.onDailogClose();
		}}
		showCloseButton
		title={formatedDate}
		titleBelow={this.state.dailogSubTitle}
	 >
		<Scroller>
			<div className={"scrollbar"}>
				{
					this.state.dailogType === 'form' ?
						<CreateForm
							currentSelectedDate={currentSelectedDate}
							postObj={this.postObj}
							triggerNotification={this.triggerNotification}
						/> :
						<EventsList
							deleteEvent={this.deleteEvent}
							year={currentYear}
							date={currentDate}
							month={currentMonth}
							createNewEvent={this.createNewEvent}
							events={this.state.monthsData[currentYear][currentMonth.toString()][currentDate]}
						/>
				}
			</div>
		</Scroller>
	</Dialog>
	<Notification open={this.state.notification}>
		{this.state.notificationMsg}
	</Notification>
...
```

### Using LS2 API

The application uses the `com.webos.service.db` LS2 API for finding, creating, and deleting events on devices. 

The API calls are as follows:

- `putKind`
    - Creates the DB for the application if it does not exist on the system.  
    - Registers a kind with the database.
    - Kinds define the owner, and the indexes for a JSON data object.
    - Indexes can be composed of single or multiple properties.
    - When you create your index, be aware that queries can only return results that are indexed, and are contiguously ordered.
- `put`
    - Stores JSON data objects of a particular Kind into the database. 
    - Assigns an ID field to each object, if it was not set.
    - Returns the ID and rev for each stored object.
- `find`
    - Returns a set of objects that match the query specified in the query parameter.
- `del`
    - Deletes JSON data objects from the database.

``` js
import LS2Request from '@enact/webos/LS2Request';

export const dbServices = {
	createKind : (cb) => {
		return new LS2Request().send({
			service: 'luna://com.webos.service.db',
			method: 'putKind',
			parameters: {
				'id':'com.domain.app.service.familyeventplanner:4',
				'owner':'com.domain.app.familyeventplanner',
				'indexes':[
					{'name':'year', 'props':[{'name':'year'}]},
					{'name':'month', 'props':[{'name':'month'}]},
					{'name':'date', 'props':[{'name':'date'}]},
					{'name':'fullDate', 'props':[{'name':'year'}, {'name':'month'}, {'name':'date'}]}
				]
			},
...
		});
	},
	putData : (obj, cb) => {
		return new LS2Request().send({
			service: 'luna://com.webos.service.db',
			method: 'put',
			parameters: {
				'objects':[
					obj
				]
			},
...
		});
	},
	findData : (queryObj, cb) => {
		return new LS2Request().send({
			service: 'luna://com.webos.service.db',
			method: 'find',
			parameters: {
				'query': queryObj
			},
...
		});
	},
	deleteEvent: (id) => {
		return new LS2Request().send({
			service: 'luna://com.webos.service.db',
			method: 'del',
			parameters: {
				'ids' : [id]
			},
...
		});
	}
};
...
```

### Custom Components Used in the App

#### Calendar Header

This component populates the UI with the year and month selection by using dropdown and arrows. 

``` js
import Icon from '@enact/moonstone/Icon';
import Dropdown from '@enact/moonstone/Dropdown';
import EditableIntegerPicker from '@enact/moonstone/EditableIntegerPicker';

const CalendarHeader = (props) => {
	return (
		<tr className="calendar-header">
			<td colSpan="1">
				<Icon
					onClick={() => {
						props.prevMonth();
					}}
				>arrowsmallleft</Icon>
			</td>
			<td colSpan="5" className="nav-content">
				<Dropdown
					selected={props.months.indexOf(props.month())}
					width="medium"
					onSelect={(d) => {
						props.onSelectChange(d);
					}}
				>
					{props.months}
				</Dropdown>

				{' '}
				<EditableIntegerPicker
					editMode
					max={3000}
					min={1000}
					value={parseInt(props.year())}
					onChange={(d) => {
						props.onYearChange(d);
					}}
					width="small"
				/>
			</td>
			<td colSpan="1" className="nav-month">
				<Icon
					onClick={() => {
						props.nextMonth();
					}}
				>arrowsmallright</Icon>
			</td>
		</tr>
	);
};

export default CalendarHeader;
```

#### Days

This component displays the days of the selected month along with an event list that was created for the specific date in order.

If more events are present on the day, The **Click to view more** option is displayed to the user.

Highlights the current day to the user.

``` js
import LabeledIcon from '@enact/moonstone/LabeledIcon';

const Days = (props) => {
	let blanks = [];
	for (let i = 0; i < props.firstDayOfMonth(); i++) {
		blanks.push(<td key={i * 80} className="emptySlot">
			{''}
		</td>
		);
	}
	let daysInMonth = [];
	const getEvents = (d) => {
		let events = null;
		if (props.monthsData[props.month][d.toString()]) {
			let daysData = props.monthsData[props.month][d.toString()];
			if (daysData.length > 3) {
				events = [];
				events[0] = <div key="0" className="event-element">{daysData[0].title}</div>;
				events[1] = <div key="1" className="event-element">{daysData[1].title}</div>;
				events[2] = <LabeledIcon key="2" className="more-event-element" icon="arrowsmallright" labelPosition="before">Click to view more</LabeledIcon>;
			} else {
				events = daysData.map((ev, i) => {
					return (
						<div key={i} className="event-element">{ev.title}</div>
					);
				} );
			}
		}

		return events;
	};
	...	
};
```

### Utilities for Find Query & Filter Data

- `findQuery`: This utility is a helper method for preparing event lists and deleting events.
- `filterData`: This utility prepares the data for the current year/month and date, and filters the data to display for the specific month.

``` js
export const generateQuery = {
	findQuery : (obj) => {
		let query = {
			'from':_kind,
			'where':[]
		};
		for (let key in obj) {
			query['where'].push({
				'prop' : key,
				'op': '=',
				'val': obj[key]
			});
		}
		return query;
	},
	filterData : (arr) => {
		let filteredData = {};

		for (let i = 0; i < arr.length; i++) {
...
			let temp = {};
			temp['title'] = arr[i]['event']['title'];
			temp['description'] = arr[i]['event']['description'];
			temp['image'] = arr[i]['image'];

			filteredData[arr[i].year][arr[i].month][arr[i].date].push(temp);
		}

		return filteredData;
	}
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

    An IPK named `com.domain.app.familyeventplanner_1.0.4_all.ipk` is created.  

3. Install the IPK on the target device.  

    ``` shell
    $ ares-install --device <TARGET_DEVICE> com.domain.app.familyeventplanner_1.0.4_all.ipk
    ```
