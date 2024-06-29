# opensource.twitter.dev

[![status: active](https://opensource.twitter.dev/status/active.svg)](https://opensource.twitter.dev/status/#active)

# Twitter Open Source Website
Welcome to the GitHub repository for the Twitter Open Source Website! This website serves as a hub for all of Twitter's open source projects, providing documentation, code samples, and other resources to help developers get started with Twitter's open source tools and technologies. This is the Twitter Open Source website at https://opensource.twitter.dev.

# Getting Started
To get started with the Twitter Open Source Website, simply visit the [website](https://opensource.twitter.dev). From there, you can browse the various open source projects that Twitter has made available, contribute to those projects, or even use the website as a template for your own open source projects.

# Building the Website
The Twitter Open Source Website is built with Hugo, a popular static site generator. To build the website locally, follow these steps:

1. Install Hugo by following the standard instructions on the Hugo website. Make sure to use the extended version of Hugo, which has added support for Sass/SCSS stylesheets.
2. Clone this repository to your local machine.
3. Navigate to the root directory of the repository in your terminal.
4. Run hugo serve to start a local development server that will automatically rebuild the website whenever changes are made.
5. Updating Repo Data
6. Periodically, Python scripts are run to update some repo data. 
7. To run these scripts locally, follow these steps:

  a. Install Python 3 on your local machine if it is not already installed.
  b. Navigate to the scripts directory in your terminal. 
  c. Run pip install -r requirements.txt to install the necessary Python packages. 
  d. Run python update_repos.py to update the repo data.


# Contributing
If you're interested in contributing to the Twitter Open Source Website, you can do so by submitting a pull request to the GitHub repository. We welcome contributions from developers of all skill levels, so don't hesitate to get involved!

# License
The Twitter Open Source Website is released under the MIT License, which means that you are free to use, modify, and distribute the source code as you see fit. However, please note that some of the projects featured on the website may be released under different licenses, so be sure to check the individual project pages before using or modifying their code.

# Contact
If you have any questions or feedback about the Twitter Open Source Website, please feel free to contact us via the [website](https://opensource.twitter.dev). We look forward to hearing from you!


There are also some python scripts that run periodically to [update some repo
data].

[hugo]: https://gohugo.io/
[install]: https://gohugo.io/getting-started/installing/
[run]: https://gohugo.io/getting-started/usage/
[update some repo data]: ./.github/workflows/update-data.yml
