---
title: Contributing to webOS Open Source Edition
date: 2019-04-12
weight: 10
toc: true
---

This page describes how you can contribute to the webOS Open Source Edition (OSE) project.

## Who Can Contribute?

In webOS OSE, not only developers with different interests, but also users can participate.

### System UI Developers

The webOS user experience is delivered by the System UI, based on Blink and Qt. Developers can add new features and integrate other open source technologies to enhance the user experience.

### Platform Developers

Our platform portability layer (PPL), code-named Nyx, is the basis for porting webOS OSE to new architectures and hardware.

Developers can work from the Linux kernel on up to the System UI and System Services, including enhancing the PPL itself.

### App Developers

The primary means of developing apps will be via JavaScript-based application frameworks. webOS OSE will be optimized for the [Enact](http://enactjs.com) framework, but other JavaScript frameworks can also be used. Developers can enhance our Core applications, or bring new applications for consideration.

### Users

Enthusiast users can help with documentation, help with testing and submit bugs, and discuss features.

Come discuss with us on the [forum]({{< relref "/community" >}}).

## Before You Begin Contributing

Here are a few things to do before jumping into the repositories.

### Join the Community

Joining allows you to contribute code, participate in the forums, report and track bugs, and receive updates on the latest webOS OSE developments.

### Get Familiar With the Components

Check out [our repositories](https://github.com/webosose) on GitHub to review our components and README files. If you are brand new to coding and/or to GitHub, check the [Requirements]({{< relref "system-requirements" >}}).

### Discuss Your Idea

We strongly suggest you check the [Forum]({{< relref "/community" >}}) and post your ideas before you start updating components. First of all, you can find out if someone else is working on a similar idea. Furthermore, community members can help you refine your concept.

### Review the Governance Model

Follow our process for how to get your contribution accepted as detailed under our [Governance Model]({{< relref "governance-model" >}}).

## How We Accept Contributions

We recommend that you verify your achievement before submitting a contribution. After you are convinced, we will start reviewing your request.

### Criteria for Making a Pull Request

Check the following information before you make a pull request.

  - I have verified that my changes do not break any of the builds.

  - I have provided or updated unit tests if there is an existing unit test structure for any of the components affected.

  - If there is no unit test structure, I have thoroughly tested my changes manually and can describe the results.

  - The code is in the style of the code that surrounds it.

  - I have followed the [commit guidelines](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#Commit-Guidelines).

### The Contribution Process

{{< figure src="/images/about/contribution-process.png" alt="" caption="Contribution Process" width="700px" >}}

#### What You Need to Do

1.  Before submitting code, if you think your changes affect major parts of the platform, communicate with the Project via the forum to get feedback.

2.  Make a GitHub pull request.

3.  Sign the [Contributor License Agreement (CLA)]({{< relref "developer-grant-and-cla" >}}).

      - You can proceed with the contribution after CLA signing.

      - The CLA signing is processed once in the GitHub repository upon a pull request.

      - If the CLA is changed, CLA signing is required again.

#### What Happens After You Submit a Contribution

1.  Maintainer(s) conducts a code review, verifies CLA signing, runs tests and asks for adjustments from you as necessary.

2.  They will vote on the pull request with reviewers. Once the vote is approved, they will accept the pull request.

3.  They merge the commits into the repository and closes the pull request.

#### During Review

  - Maintainer(s) looks to see that your CLA signing is in all your commit messages, including format, and presence of the real name and the real email address.

  - If you are someone entirely new to the Project, they may get in touch with you via the contact information you have provided.

  - If there are anomalies such as inconsistent name or email address, they may ask you to clarify.

  - This process may take some time, since we may conduct testing, and there may be concurrent activities which must be checked for merge conflicts, architectural issues, etc.

#### What You will See Once Your Pull Request Has Been Reviewed and Accepted

  - The maintainer's identity who accepted your pull request will be recorded in the merge.

  - The pull request will be closed.

Congrats, your contribution is in!

{{< note "If your existing pull request contains commits that don't have the CLA signing" >}}
You can fix this by the following:

1.  Assuming no one has forked from your fork, or you do not mind breaking them, use "rebase -i" to edit the existing commit messages. For more information, refer to [git-rebase](https://git-scm.com/docs/git-rebase).

2.  Open a new pull request with the fixed commits.

3.  Close the existing pull request, with a comment showing the new one that supersedes it.
{{< /note >}}
