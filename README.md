# www.hello.coop

This repo contains the source code and documentation powering [https://www.hello.coop/](https://www.hello.coop/).

## Getting started

### Prerequisites

1. Git
1. Node (~18), npm (~9)
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

## License

<a href="LICENSE">![CC0](https://cdn.hello.coop/images/cc-zero.svg)</a>
