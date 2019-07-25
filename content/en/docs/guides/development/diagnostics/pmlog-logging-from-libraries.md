---
title: "Logging from Libraries"
date: 2019-03-15
weight: 80
toc: false
---

The PmLogLib version 3.1.0 and submission 52 or later is recommended.

Libraries should call `PmLogGetLibContext` instead of calling `PmLogGetContext`. Libraries do not set up their own context, but make this call to invoke the context of the calling process. This makes it easier for processes to control the logging level of library messages and direct them to a specified file as needed.

{{< note >}}
Libraries that using this functionality are required to identify its messages with a pre-defined prefix. This is to identify the library from which the messages came, since the context will no longer contain the library name. For example, LS2 messages can have the message IDs prefixed with 'LS'. So that when sleepd process loads LS2, the LS2 messages will appear in the logs with sleepd's context name, but the LS prefix in the message makes it clear that the log came from LS2 library. This helps with debugging.
{{< /note >}}

``` javascript
static PmLogContext getLibCtx()
     {
          static PmLogContext _logContext = 0;
          if (0 == _logContext) {
               _logContext = PmLogGetLibContext();
     }
     return _logContext;
}

void test()
     {
          PmLogDebug(getLibCtx(), "LS: In function test");
     }
```

PmLogSetLibContext - Services, daemons or other processes can make this call to set up a context where all of its library call logs can be directed. If a process does not set up a library context with this call, the first registered context of the process will be considered as a library context by default.

``` javascript
PmLogContext libcontext;
PmLogGetContext("sleepd.lib", &libcontext);
PmLogSetLibContext(libcontext);
```
