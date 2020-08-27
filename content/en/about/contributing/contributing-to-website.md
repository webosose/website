---
title: Contributing to Website
date: 2020-08-26
weight: 20
toc: true
---

This page describes how to contribute to the content of webOS Open Source Edition (OSE) website.

## Who Can Contribute?

Anyone who is interested in webOS OSE website content can contribute.

## Step-by-step Guide

We will use GitHub standard Fork & Pull Request workflow.

1. Visit the [webOS OSE website repository](https://github.com/webosose/website) and fork it to your personal GitHub account.
2. Clone the forked repository.

    ``` bash
    git clone https://forked-git-repository-url.git
    ```

3. Checkout to `develop` branch, and then create a new branch based on `develop` branch.  This branch will be your working branch.

    {{< note >}}
    We strongly recommend that you use a self-explanatory name for the branch.
    {{< /note >}}

    ``` bash
    git checkout develop
    git checkout -b <your-working-branch-name>
    ```

4. Do your work and push it to your forked repository.

    ``` bash
    git push origin <your-working-branch-name>
    ```

5. Create a pull request from your working branch.
    
    1. base branch: `webosose/website > develop`
    2. compare branch: your working branch in the forked repository

        {{< figure src="/images/about/create-a-pull-request.png" alt="" caption="Pull request example">}}

6. Review your pull request with webOS OSE documentation team. The documentation team will review your pull request. If necessary, you may make additional commits to the pull request branch you've created.

7. Done! Your contribution will be reflected on the webOS OSE website.
