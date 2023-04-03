# Contributing Guidelines

Looking to contribute something? Here's how you can help.

## Bugs reports

A bug is a _demonstrable problem_ that is caused by the code in the
repository. Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `main` or development branch in the repository.

3. **Isolate the problem** &mdash; ideally create a reduced test
   case and a live example.

4. Please try to be as detailed as possible in your report. Include specific
   information about the environment - operating system and version, browser
   and version... and steps required to reproduce the issue.

## Making Changes

If you'd like to contribute please follow these instructions.

[Fork this repo on GitHub](https://github.com/twitter/opensource-website/fork)

### Setup

1. Clone your fork

```bash
git clone https://github.com/$YOUR_USERNAME/opensource-website/
cd opensource-website
```

2. Install Hugo

[Install Hugo](https://gohugo.io/getting-started/installing/)

3. Start Hugo server

[Hugo Server](https://gohugo.io/commands/hugo_server/)

```bash
hugo server
```
## GIT vs. GITHUB

Before diving into the details of how to contribute to our repository, let's clarify the difference between GIT and GITHUB. GIT is a version control system that allows you to track changes made to your code over time. GITHUB is a web-based platform that provides a hosting service for GIT repositories. Essentially, GIT is the tool that manages the version control of your code, while GITHUB is a platform where you can store and share your GIT repositories.

## Cloning and Forking a Repository

The first step to contributing to a repository is to clone or fork the repository. Cloning a repository means creating a copy of the repository on your local machine, whereas forking a repository means creating a copy of the repository on your GITHUB account.

To clone a repository, navigate to the repository's page on GITHUB, and click on the green "Code" button. Copy the URL provided and use the `git clone` command in your terminal to clone the repository.

To fork a repository, navigate to the repository's page on GITHUB, and click on the "Fork" button located on the top-right corner of the page. This will create a copy of the repository on your GITHUB account.

## Creating a Branch and Pushing Changes

Before making any changes to the code, it is essential to create a new branch. This will ensure that the changes you make do not affect the original codebase. To create a new branch, use the `git branch` command followed by the name of the new branch. To switch to the new branch, use the `git checkout` command followed by the name of the new branch.

Once you have made changes to the code, you can use the git add command to add the changes to the staging area. Then, use the `git commit` command to commit the changes to the local repository. Finally, use the `git push` command to push the changes to the remote repository.

## Pull requests

After pushing the changes to the remote repository, you can create a pull request to merge the changes with the original codebase. To create a pull request, navigate to the repository's page on GITHUB, and click on the "Pull Requests" tab. Then, click on the green "New Pull Request" button. Select the branch that contains your changes and the branch that you want to merge your changes into. Add a title and description to your pull request and click on the "Create Pull Request" button.

> Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

1. Push your topic branch up to your fork: `git push origin my-feature-branch`

2. [Open a Pull Request](http://help.github.com/send-pull-requests/) with a
   clear title and description. One for your changes in `main`.
   
   
## Squashing Commits

When making multiple commits in a single issue, it is recommended to squash the commits into a single commit before creating a pull request. This will ensure that the commit history remains clean and concise. To squash commits, use the `git rebase -i HEAD~N` command, where N is the number of commits you want to squash. Then, follow the instructions provided to squash the commits into a single commit.
Updating the Forked and Local Repository

As updates are made to the original codebase, it is essential to keep your forked and local repositories up-to-date. To update the forked repository, use the `git fetch` command to fetch the changes from the upstream repository. Then, use the git merge command to merge the changes into your local repository. Finally, use the `git push` command to push the changes to your forked repository.

To update the local repository, use the `git pull` command to fetch and merge the changes from the upstream repository into your local repository.
