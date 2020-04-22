---
title: Release Notes
display_title: Beanviser Release Notes
date: 2020-01-08
weight: 20
toc: true
---

This page provides the summary of each Beanviser release for webOS Open Source Edition (OSE).

## v2.0.2 (October 31, 2019)

### Changed features

  - Supports webOS Open Source Edition v2.0.0 and CLI v1.10.1.

## v2.0.1 (June 17, 2019)

### What's new

  - Enabled ACG service permission for webOS OSE.

  - Removed deprecated luna-send-pub usage.

## v2.0.0 (February 15, 2019)

### What's new

  - Provides logs from GStreamer, along with metadata (from webOS media server) and dot graph.

  - Added warning and error indicators for System CPU, System memory, Process CPU, and Process Memory.

  - Provides sequence diagram for ls-monitor.

  - Provides the list of processes that are currently running in Process CPU and Process Memory tabs. Processes can be filtered from this list.

### Known Issues

  - Beanviser can display a wrong pop-up message if network gets disconnected while the GStreamer is running.

    **Workaround:** Reload or relaunch the tool for using the GStreamer function.

  - Beanviser does not allow you to disconnect the device when GStreamer is running.

    **Workaround:** Stop the GStreamer operation to disconnect the device.

  - GStreamer **Save** button gets disabled when you start the operation without clearing the existing data.

  - After launching media apps continuously, Beanviser can get slow and may freeze its operations.

    **Workaround:** Stop ls-monitor to use media apps continuously.

## v1.0.0 (August 16, 2018)

This is the first official release of Beanviser Open Source Edition. For a detailed list of features, see [key features]({{< relref "/beanviser-user-guide#key-features">}}).

### Known Issues

  - Log viewer filter buttons are enabled even while the page is still loading.

  - The "$" character is accepted in the device name. However, on Linux it gets converted to numbers.
