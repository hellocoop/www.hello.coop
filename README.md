# www.hello.coop

This repo contains the source code and documentation powering [https://www.hello.coop/](https://www.hello.coop/).

## Getting started

### Prerequisites

1. Git
1. Node (>=16.0.0), npm (>=7.0.0)
1. A fork of the repo (for any contributions)
1. A clone of the [www.hello.coop repo](https://github.com/hellocoop/www.hello.coop) on your local machine

### Installation

1. `cd www.hello.coop` to go into the project root
1. `npm i` to install the npm dependencies

### Running locally
Hellō Pages: `npm run dev:pages`

Hellō Architecture `npm run dev:arch`

### Building for production
`npm run build`

### Prevewing the built files
`npm run preview` #This needs to be run after `npm run build`

### Testing for dead links
`npm run test`
> Ignores LinkedIn links (returns 999 for bad requests) and script.hash.js (does not exist in this repo)

## Contributing

### Guidelines

The documentation is divided into several sections with a different tone and purpose. If you plan to write more than a few sentences, you might find it helpful to get familiar with the [contributing guidelines]() for the appropriate sections. Also make sure to go through our [Code Of Conduct](https://github.com/hellocoop/www.hello.coop/blob/main/CODE_OF_CONDUCT.md).

### Create a branch

1. `git checkout main` from any folder in your local `www.hello.coop` repository
1. `git pull origin main` to ensure you have the latest main code
1. `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch` with a suitable name) to create a branch

### Make the change

1. Follow the ["Running locally"](#running-locally) instructions
1. Save the files and check in the browser
  1. Changes to markdown files in `src` will hot-reload

### Test the change

If possible, test any visual changes in all latest versions of common browsers, on both desktop and mobile.

### Push it

1. `git add -A && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fix navbar height on mobile`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [www.hello.coop repo](https://github.com/hellocoop/www.hello.coop) and you should see recently pushed branches.
1. Follow GitHub's instructions.
1. If possible, include screenshots of visual changes. A preview build is triggered after your changes are pushed to GitHub.


## License

<a href="LICENSE">![CC0](https://cdn.hello.coop/images/cc-zero.svg)</a>