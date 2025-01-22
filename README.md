# opensource.twitter.dev

[![status: active](https://opensource.twitter.dev/status/active.svg)](https://opensource.twitter.dev/status/#active)

This is the Twitter Open Source website at https://opensource.twitter.dev.

This site is built with [hugo], using a custom built-in theme.  Follow the
standard instructions on the hugo website to [install] and [run] hugo.  Just
make sure to use hugo-extended, which has added support for Sass/SCSS
stylesheets.

There are also some python scripts that run periodically to [update some repo
data].

[hugo]: https://gohugo.io/
[install]: https://gohugo.io/getting-started/installing/
[run]: https://gohugo.io/getting-started/usage/
[update some repo data]: ./.github/workflows/update-data.yml

# Contributing Guidelines

We welcome contributions to this project! Before getting started, please read these guidelines.

## Git and GitHub

First, it's important to understand the difference between Git and GitHub. Git is a version control system that allows you to track changes to your code over time. GitHub is a web-based platform that allows you to store and manage Git repositories, collaborate with others, and contribute to open source projects.

## Cloning and Forking

To contribute to this project, you will need to clone or fork the repository. Cloning creates a copy of the repository on your local machine, while forking creates a copy of the repository on your GitHub account. Here's how to do it:
1. To clone the repository, run the following command in your terminal :  

   `git clone https://github.com/twitter/opensource-website.git`  

2. To fork the repository, click the "Fork" button on the top right corner of the repository page on GitHub.

## Creating a Branch and Pushing Changes
Before making any changes to the code, create a new branch to work on. This keeps your changes separate from the main codebase and makes it easier to merge your changes later. Here's how to do it :
1. To create a new branch, run the following command in your terminal :

   `git checkout -b new-branch-name`  
   
   Replace "new-branch-name" with a descriptive name for your branch.  
   
2. Make your changes to the code.  

3. To push your changes to the repository, run the following command :

   `git push origin new-branch-name`  
   
   This will create a new branch on GitHub and push your changes to it.

## Creating a Pull Request
Once you've made your changes and pushed them to your branch, it's time to create a pull request (PR) to merge your changes into the main codebase. Here's how to do it:

1. Go to the repository page on GitHub.  

2. Click the "New pull request" button.

3. Select your branch as the "compare" branch and the main branch as the "base" branch.

4. Give your PR a descriptive title and description.
> Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

5. Click the "Create pull request" button.

6. Wait for a maintainer to review and merge your changes.

## Squashing Commits
If you've made multiple commits to your branch, it's a good idea to squash them into a single commit before creating a PR. This keeps the commit history clean and makes it easier to understand the changes you've made. Here's how to do it:

1. Run the following command to open the interactive rebase tool :  

   `git rebase -i HEAD~n`  
   
   Replace "n" with the number of commits you want to squash.  

2. In the editor that opens, replace "pick" with "squash" or "s" for the commits you want to squash.  

3. Save and close the file.  

4. In the editor that opens, write a new commit message for the squashed commit.  

5. Save and close the file.  

6. Run the following command to force push your changes to your branch :

   `git push --force origin new-branch-name`  

## Updating the Forked and Local Repository

As updates are made to the original codebase, it is essential to keep your forked and local repositories up-to-date. To update the forked repository, use the `git fetch` command to fetch the changes from the upstream repository. Then, use the git merge command to merge the changes into your local repository. Finally, use the `git push` command to push the changes to your forked repository.

To update the local repository, use the `git pull` command to fetch and merge the changes from the upstream repository into your local repository.
