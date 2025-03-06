
# Contributing Guidelines

  

Looking to contribute something? Here's how you can help.

  

## Bugs reports

  

A bug is a _demonstrable problem_ that is caused by the code in the

repository. Good bug reports are extremely helpful - thank you!

  

Guidelines for bug reports:

  

1.  **Use the GitHub issue search**  &mdash; check if the issue has already been

reported.

  

2.  **Check if the issue has been fixed**  &mdash; try to reproduce it using the

latest `main` or development branch in the repository.

  

3.  **Isolate the problem**  &mdash; ideally create a reduced test

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

git  clone  https://github.com/$YOUR_USERNAME/opensource-website/

cd  opensource-website

```

  

2. Install Hugo

  

[Install Hugo](https://gohugo.io/getting-started/installing/)

  

3. Start Hugo server

  

[Hugo Server](https://gohugo.io/commands/hugo_server/)

  

```bash

hugo  server

``` 
 

### FORK A PROJECT -

  

You can use github explore - https://github.com/explore to find a project that interests you and match your skills. Once you find your cool project to workon, you can make a copy of project to your account. This process is called forking a project to your Github account. On Upper right side of project page on Github, you can see the same . The bar should look like this -

  

<p  align="center"> <img  src="https://i.imgur.com/P0n6f97.png"> </p>

  

Click on fork to create a copy of project to your account. This creates a separate copy for you to workon.

  

### FINDING A FEATURE OR BUG TO WORKON -

  

Open Source projects always have something to workon and improves with each new release. You can see the issues section to find something you can solve or report a bug. The project managers always welcome new contributors and can guide you to solve the problem. You can find issues in the right section of project page.

  

<p  align="center"> <img  src="https://i.imgur.com/czVjpS7.png"> </p>

  

### CLONE THE FORKED PROJECT -

  

You have forked the project you want to contribute to your github account. To get this project on your development machine we use clone command of git.

  

```git clone https://github.com/<your-account-username>/<your-forked-project>.git```

Now you have the project on your local machine.

### ADD A REMOTE (UPSTREAM) TO ORIGINAL PROJECT REPOSITORY

Remote means the remote location of project on Github. By cloning, we have a remote called origin which points to your forked repository. Now we will add a remote to the original repository from where we had forked.

```bash
cd <your-forked-project-folder>

git remote add upstream https://github.com/<author-account-username>/<project>.git
```

You will see the benefits of adding remote later.

### SYNCHRONIZING YOUR FORK -

Open Source projects have a number of contributors who can push code anytime. So it is necessary to make your forked copy equal with the original repository. The remote added above called Upstream helps in this.

```bash

git checkout main

git fetch upstream

git merge upstream/main

git push origin main
```

The last command pushes the latest code to your forked repository on Github. The origin is the remote pointing to your forked repository on github.

### CREATE A NEW BRANCH FOR A FEATURE OR BUGFIX -

Normally, all repositories have a master branch which is considered to remain stable and all new features should be made in a separate branch and after completion merged into master branch. So we should create a new branch for our feature or bugfix and start working on the issue.

```git checkout -b <feature-branch>```

This will create a new branch out of master branch. Now start working on the problem and commit your changes.

```bash
git add --all

git commit -m "<commit  message>"
```
The first command adds all the files or you can add specific files by removing -a and adding the file names. The second command gives a message to your changes so you can know in future what changes this commit makes. If you are solving an issue on original repository, you should add the issue number like #35 to your commit message. This will show the reference to commits in the issue.

### REBASE YOUR FEATURE BRANCH WITH UPSTREAM-

It can happen that your feature takes time to complete and other contributors are constantly pushing code. After completing the feature your feature branch should be rebase on latest changes to upstream master branch.
```bash
git checkout <feature-branch>

git pull --rebase upstream main
```

Now you get the latest commits from other contributors and check that your commits are compatible with the new commits. If there are any conflicts solve them.

### SQUASHING YOUR COMMITS-

You have completed the feature, but you have made a number of commits which make less sense. You should squash your commits to make good commits.

```git rebase -i HEAD~5```

This will open an editor which will allow you to squash the commits.

### PUSH CODE AND CREATE A PULL REQUEST -

Till this point you have a new branch with the feature or bugfix you want in the project you had forked. Now push your new branch to your remote fork on github.

```git push origin <feature-branch>```

Now you are ready to help the project by opening a pull request means you now tell the project managers to add the feature or bugfix to original repository. 

Remember your upstream base branch should be master and source should be your feature branch. Click on create pull request and add a name to your pull request. You can also describe your feature.

Awesome! You have made your first contribution.

#### BE OPEN!
