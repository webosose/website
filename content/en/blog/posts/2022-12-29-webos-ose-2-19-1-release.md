---
title: webOS OSE 2.19.1 Release
date: 2022-12-29
slug: webos-ose-2-19-1-release
posttype: release
toc: false
thumbnail: th-release.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.19.1.

See also the [release notes](/about/release-notes/webos-ose-2-19-1-release-notes).

## Updated Branch Policy

As one of the open source platform, webOS OSE uses many other open source projects. It leads inevitable dependency to other projects, and this dependency might cause serious errors to our platform, such as build errors. Moreover, these changes usually happen abruptly and instantly.

To resolve this issue, we introduced a new branch policy to our [GitHub repository](https://github.com/webosose/build-webos).

{{< figure src="/images/blog/news/new-branch-policy.png" caption="A new branch policy for hotfix" alt="" >}}

The previous policy (`[Before]` in the above figure) released all commits in the order of creation. This policy is useful in terms of reliable maintenance, especially in configuration management. But it cannot resolve errors instantly because every commit must pass qualification tests before releasing it. The more commits require the longer time.

A new policy creates a new branch (the `2.19` branch in the above figure) for every minor version. If some critical errors occur due to the changes from other open source projects, commits for hotfix will be released through this branch. This allows us to resolve errors quickly by reducing the number of commits to be released.

{{< figure src="/images/blog/news/webos-ose-versioning-rule.jpg" width="60%" caption="Versioning rule of webOS OSE" >}}

These hotfix commits will also be released to the `main` branch in the next minor version.

{{< note >}}
For more details on how to build webOS OSE in the new way, refer to [Building webOS OSE]({{< relref "building-webos-ose" >}}).
{{< /note >}}
