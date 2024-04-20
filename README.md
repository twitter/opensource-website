# opensource.twitter.dev

[![status: active](https://opensource.twitter.dev/status/active.svg)](https://opensource.twitter.dev/status/#active)

Forked Twitter Open Source Website - Huy Nguyen

This repository contains a fork of the Twitter Open Source website (https://opensource.twitter.dev) built with Hugo. I'm collaborating on this project to contribute...

Current Status:

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


## Development/Contributions:
### Andrew T. Pipo

4/19/2024 - 3 hours

Started on Update to reflect name change - Twitter to X #5

- Started on removing all instances of Twitter and replace with X within the text - content of the main, projects, and memberships pages
- Replaced the logo with the X logo in the header of the main, projects, and memberships pages
- Removed instances of @TwitterOSS twitter handle as that is no longer an active twitter/X account
- Changed instances of Twitter to X in the footer of the main, projects, and memberships pages

Started on Projects: Improve outlook of each project section #4

- Experimented with SCSS
- Implemented background color to each Project card, discovering inconsistencies with the layout
