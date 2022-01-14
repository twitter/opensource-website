---
title: Project Status
---

Open source projects come in all shapes and sizes, and Twitter's projects are no
exception. Sometimes we publish projects that are highly experimental or are in
very early stages of development. Other times we publish some of the core
infrastructure that is used to serve hundreds of millions of tweets every day.

These project status labels, which you'll find attached to various Twitter
projects, are designed to help indicate how stable a project is and where it is
in its development lifecycle. These are neither statements of value nor
guarantees of support or future development. They are merely designed to provide
transparency.

Questions about the status of individual projects are generally best directed to
the project discussion forum or issue tracker. If those are unavailable, you can
also email opensource@twitter.com.


**Project Statuses:**
 - [Idea](#idea)
 - [Experimental](#experimental)
 - [Active](#active)
 - [Stable](#stable)
 - [Unmaintained](#unmaintained)
 - [Deprecated](#deprecated)
 - [Retired](#retired)
 - [Static](#static)

Idea
----

![status: idea](idea.svg)

### Expectations

This code is in the scoping or specification phase and may be accepting feedback or proposals. May not have active maintainers.

### Requirements

- Complies with Twitter's legal and security requirements for open source software
- Contains the appropriate Twitter open source category header in the repository's README file
- Typically hosted in the [Twitter Incubator](https://github.com/twitter-incubator) GitHub org
- (Optional) Issues at the project owner's discretion

### Markdown

```markdown
[![status: idea](https://opensource.twitter.dev/status/idea.svg)](https://opensource.twitter.dev/status/#idea)
````

Experimental
------------

![status: experimental](experimental.svg)

### Expectations

This code is not yet ready for prime time and may be actively seeking feedback. May not have active maintainers.

### Requirements

- Complies with Twitter's legal and security requirements for open source software
- Contains the appropriate Twitter open source category header in the repository's README file
- Typically hosted in the Twitter Incubator GitHub org
- (Optional) Issues at the project owner's discretion

### Markdown

```markdown
[![status: experimental](https://opensource.twitter.dev/status/experimental.svg)](https://opensource.twitter.dev/status/#experimental)
````

Active
------

![status: active](active.svg)

### Expectations

This code is actively maintained and supported.

### Requirements

- Complies with Twitter's legal and security requirements for open source software
- Contains the appropriate Twitter open source category header in the repository's README file
- Is maintained by a Twitter engineering team
- Issues and PR's managed in GitHub
- For additional details on support options, see the Open Source Support Policy
- An automated release pipeline

### Markdown

```markdown
[![status: active](https://opensource.twitter.dev/status/active.svg)](https://opensource.twitter.dev/status/#active)
````

Stable
------

![status: stable](stable.svg)

### Expectations

This code is stable and not necessarily open to new features or functionality. Is actively maintained and supported.

### Requirements

- Complies with Twitter's legal and security requirements for open source software
- Contains the appropriate Twitter open source category header in the repository's README file
- Is maintained by a Twitter engineering team
- Issues and PR’s managed in GitHub
- For additional details on support options, see the Open Source Support Policy
- An automated release pipeline

### Markdown

```markdown
[![status: stable](https://opensource.twitter.dev/status/stable.svg)](https://opensource.twitter.dev/status/#stable)
````

Unmaintained
------------

![status: unmaintained](unmaintained.svg)

### Expectations

This code is no longer actively maintained nor supported. Possibly actively searching for another maintainer inside or outside of Twitter.

### Requirements

- Complies with Twitter's legal and security requirements for open source software
- Contains the appropriate Twitter open source category header in the repository's README file
- Previous references to Support should be modified or removed from the README
- May be transitioned to new maintainers
- (Optional) Issues and PR's at the project owner's discretion

### Markdown

```markdown
[![status: unmaintained](https://opensource.twitter.dev/status/unmaintained.svg)](https://opensource.twitter.dev/status/#unmaintained)
````

Deprecated
----------

![status: deprecated](deprecated.svg)

### Expectations

This code has been identified to transition to RETIRED at some point in the future. No longer supported and possibly has no active maintainers.

### Requirements

- Complies with Twitter's legal and security requirements for open source software
- Contains the appropriate Twitter open source category header in the repository's README file
- Previous references to Support should be modified or removed from the README
- Will be transitioned to RETIRED in the future
- (Optional) Issues and PR's at the project owner's discretion

### Markdown

```markdown
[![status: deprecated](https://opensource.twitter.dev/status/deprecated.svg)](https://opensource.twitter.dev/status/#deprecated)
````

Retired
-------

![status: retired](retired.svg)

### Expectations

This code is read-only. There is neither a maintainer nor any support.

### Requirements

- Complies with Twitter's legal and security requirements for open source software
- Contains the appropriate Twitter open source category header in the repository's README file
- Previous references to Support should be modified or removed from the README
- Project is read-only and available for cloning only

### Markdown

```markdown
[![status: retired](https://opensource.twitter.dev/status/retired.svg)](https://opensource.twitter.dev/status/#retired)
````

Static
------

![status: static](static.svg)

### Expectations

This code is not expected to be updated after publication. Most often, this is
code published alongside a research paper, a blog post, or for demonstration
purposes.

### Requirements

- Complies with Twitter's legal and security requirements for open source software
- Contains the appropriate Twitter open source category header in the repository's README file
- (Optional) Issues at the project owner's discretion
- (Optional) Project may be archived as read-only and only available for cloning

### Markdown

```markdown
[![status: static](https://opensource.twitter.dev/status/static.svg)](https://opensource.twitter.dev/status/#static)
````

---
Thanks to [repostatus.org](https://www.repostatus.org/) and [New
Relic](https://opensource.newrelic.com/oss-category/) for the inspiration, and
[shields.io](https://shields.io/) for the badges.
