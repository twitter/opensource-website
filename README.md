# opensource.twitter.dev

[![status: active](https://opensource.twitter.dev/status/active.svg)](https://opensource.twitter.dev/status/#active)

Forked Twitter Open Source Website - Huy Nguyen

This repository contains a fork of the Twitter Open Source website (https://opensource.twitter.dev) built with Hugo. I'm collaborating with Andrew Pipo and Sam Winkelmann to work on this project to improve front-end/back-end functionalities, and animations throughout the web pages.

Current Status: Under development

Forked from official repository on February 20th, 2024.

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

Disclaimer:

This is a personal fork and not an official Twitter project.


# Development/Contributions:
## Andrew T. Pipo
### Prior to 4/19/2024 - 2 hours
- Brainstorming/Researching Project Selection and Issues
- Establishing Local Environment

---

### 4/19/2024 - 3 hours

Started on Update to reflect name change - Twitter to X #5

- Started on removing all instances of Twitter and replace with X within the text - content of the main, projects, and memberships pages
- Replaced the logo with the X logo in the header of the main, projects, and memberships pages
- Removed instances of @TwitterOSS twitter handle as that is no longer an active twitter/X account
- Changed instances of Twitter to X in the footer of the main, projects, and memberships pages

Started on Projects: Improve outlook of each project section #4

- Experimented with SCSS
- Implemented background color to each Project card, discovering inconsistencies with the layout

---

### 4/20/2024 - 2 hours
Continued on Update to reflect name change - Twitter to X #5

- Replace the twitter logo with the X logo in the Year In Review Page
- Continued to remove instances of @TwitterOSS twitter handle as that is no longer an active twitter/X account
- Replaced the .ico file from the twitter logo to the X logo

Continued on Projects: Improve outlook of each project section #4

- Adjusted layout of card to be more consistent
- Applied same style to all buttons/links within card

Implemented Projects: Display project counts next to Projects title #8

- Added counted below the title of the projects page
- Implemented JavaScript to count the number of project-cards to indicate total projects on page

### 4/20/2024 - 0.5 hours
Working on Final Report

---

### 4/21/2024 - 4 hours
Started on Projects: Project counts should be updated and associate to search bar #9

- Investigated current search bar integration on Project page
- Removed original counter and replaced with existing counter that displayed the number results after a search inquiry
- Currently developing to have it display total projects if search bar query is blank

Aided in Alignment/layout adjustments throughout website #7
- Fixed the home page layout to remove unneccesary spacing and remove dead links
- Centered the title/subtitles in the projects and membership pages

Implemented Add Navigation Bar to Year in Review Page #6
- Implemented the navigation bar that is found on the other pages to be consistent with the rest of the website

Implemented Main: Improve the 3 icons in Our Philosophy section #13
- Added animations to the icons on the main page under the Philosophy section


### 4/21/2024 - 0.5 hours
Reviewed proposed changes to Projects: Improve outlook of each project section #4
- Accepted incoming changes and proposed aligning everything to the center

---