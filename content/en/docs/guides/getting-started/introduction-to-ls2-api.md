---
title: Introduction to LS2 API
date: 2019-03-05
weight: 30
toc: true
---

**LS2 API** is a JSON-based API provided by webOS platform services. You can use LS2 API to create apps or services that use webOS platform features.

This page explains the basic concepts of LS2 API using the example of [com.webos.service.systemservice]({{< relref "com-webos-service-systemservice" >}}), which provides access to system settings such as preferences and time/time zone information.

## Key Terminology

The following outlines the key terms and concepts that you will come across while using LS2 API.

### Service URI

A service URI is a unique address that makes each platform service accessible via [Luna Bus]({{< relref "architecture-overview#ls2" >}}). A service URI follows the format of `luna://<service name>`.

Therefore, the clients (other apps or services) can make a request to `com.webos.service.systemservice` using the address `luna://com.webos.service.systemservice`.

### Method

Each service provides one or more methods that are categorized by the feature they provide. Methods common to the service are grouped under the root category, whereas methods related to a specific feature are grouped under the relevant category.

`com.webos.service.systemservice` provides the following methods to retrieve or set system preference values, which are grouped under the root category.

* `getPreferences`
* `setPreferences`

In addition, `com.webos.service.systemservice` provides time-based methods, which are grouped under the `time` category. For instance, you can retrieve or set the system time using the following methods:

* `time/getSystemTime`
* `time/setSystemTime`

### Parameter

Parameters are service request options and are passed as a JSON object. Parameters consist of a set of properties required for the service request as well as a few reserved properties that are common to all service requests.

One example of such reserved properties is the `subscribe` property, which can be sent to services that allow subscriptions. If the subscription is successful, the service will return subscription responses either at periodic intervals or when its data is updated.

The following describes the parameters for time-based methods of `com.webos.service.systemservice`.

* `time/getSystemTime`
    - The method does not require any input parameters.
    - As an optional parameter, `subscribe` property can be sent.
* `time/setSystemTime`
    - The method requires `utc` (Coordinated Universal Time) as an input parameter.
    - As an optional parameter, `timestamp` object can be sent.

### Call Response

A call response is a JSON object containing the service's response data to a method call. It has a reserved property `returnValue` to indicate the success or failure of a call.

* If `returnValue` is true, the call is a success and the response object might have additional properties depending on the API call being made.
    - If the `subscribe` property in the parameters was set to true, the response object will return a property `subscribed` to indicate the success or failure of the subscription. If `subscribed` is `true`, it indicates that the subscription was a success.
* If `returnValue` is false, it means the call failed and the response object might contain further properties such as `errorCode` and `errorText` that give more information about the error.

### Subscription Response

A subscription response is a JSON object containing the service's response data to a subscription. It has two reserved properties `subscribed` and `returnValue`, where `subscribed` indicates the status of subscription and `returnValue` indicates the status of operation.

## Basics of Using LS2 API

This section explains the basics of how to use LS2 API.

### Invoking a Method

Clients can make a request to a platform service using methods. In return to the request, the service provides a call response in JSON format.

The following shows an example of calling the `time/getSystemTime` method, using the [`luna-send`]({{< relref "luna-send" >}}) command. The `luna-send` command accepts the complete method URI as its argument, which follows the format of `<service URI>/<method name>`. In case of the `time/getSystemTime` method, the method URI becomes `luna://com.webos.service.systemservice/time/getSystemTime`.

``` bash
$ luna-send -n 1 -f luna://com.webos.service.systemservice/time/getSystemTime '{}'

Call response:
{
    "timezone": "Asia/Seoul",
    "returnValue": true,
    "utc": 1557280839,
    "localtime": {
        "month": 5,
        "day": 8,
        "hour": 11,
        "minute": 0,
        "year": 2019,
        "second": 39
    },
    "TZ": "KST",
    "systemTimeSource": "ntp",
    "timestamp": {
        "source": "monotonic",
        "sec": 730,
        "nsec": 472935963
    },
    "timeZoneFile": "/var/luna/preferences/localtime",
    "offset": 540,
    "isDST": false
}
```

{{< note >}}
* Empty curly braces (`'{}'`) after the method URI indicate that no parameters are passed to the method.
{{< /note >}}

### Subscribing for Notifications

Clients can subscribe for notifications of some methods. In this case, the client makes a subscription request for the method and gets notified when any updates are available. This works well for operations where the information is likely to change and where the client needs the latest information.

{{< note >}}
In most cases, subscription is only supported on methods that accept the `subscribe` parameter. However, some methods are subscription-only, meaning that they are automatically subscribed and do not have the `subscribe` parameter.
{{< /note >}}

The following shows an example of subscribing to the `time/getSystemTime` method, using the `luna-send` command. To test subscription with the `luna-send` command, use `-i` option for interactive mode.

{{< highlight bash "hl_lines=16" >}}
$ luna-send -i -f luna://com.webos.service.systemservice/time/getSystemTime '{"subscribe": true}'

Call response:
{
    "timezone": "Asia/Seoul",
    "returnValue": true,
    "utc": 1561617075,
    "localtime": {
        "month": 6,
        "day": 27,
        "hour": 15,
        "minute": 31,
        "year": 2019,
        "second": 15
    },
    "subscribed": true,
    "TZ": "KST",
    "systemTimeSource": "ntp",
    ...
}
{{< /highlight >}}

By setting the `subscribe` parameter to `true`, the client subscribes to the `time/getSystemTime` method in order to get notifications in the following situations:

* When the system time changes by more than the system-defined threshold (5 minutes)
* When the time zone changes

If you make one of the above changes in the Settings app, subscription responses will be received as follows:

{{< code "System time changed" >}}
{{< highlight bash "hl_lines=9-10" >}}
Subscription response:
{
    "timezone": "Asia/Seoul",
    "NITZValidZone": false,
    "utc": 1561614000,
    "localtime": {
        "month": 6,
        "day": 27,
        "hour": 14,
        "minute": 40,
        "year": 2019,
        "second": 0
    },
    "TZ": "KST",
    "systemTimeSource": "manual",
    ...
}
{{< /highlight >}}
{{< /code >}}


{{< code "Time zone changed" >}}
{{< highlight bash "hl_lines=3" >}}
Subscription response:
{
    "timezone": "Asia/Dubai",
    "NITZValidZone": false,
    "utc": 1561617502,
    "localtime": {
        "month": 6,
        "day": 27,
        "hour": 10,
        "minute": 38,
        "year": 2019,
        "second": 22
    },
    "TZ": "+04",
    "systemTimeSource": "ntp",
    ...
}
{{< /highlight >}}
{{< /code >}}

{{< note >}}
To exit the interactive mode of `luna-send`, input **Ctrl+C**.
{{< /note >}}

## What's Next

* To find out how to use LS2 API in your apps or services, see the following pages:
  - [Using LS2 API in Web Apps]({{< relref "using-ls2-api-in-web-apps" >}})
* To view the details of LS2 API, refer to [LS2 API reference]({{< relref "ls2-api-index" >}}).
