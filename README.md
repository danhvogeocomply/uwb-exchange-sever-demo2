<p align="center">
  <img src="https://user-images.githubusercontent.com/90378572/147431930-3ec0751d-f17e-4b1d-aa09-45b5cf84bbe6.png" width="320" alt="Exchange server - PinPoint" />
</p>

<p align="center">This server is used to exchange the ACD and ASCD among the iOS devices and UWB Modules (AKA Accessories).</p>
<p align="center">
    <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
    <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is the second demo of UWB that shows the flow of the UWB application. We target to showcase the many-to-many connectivities among the iOS devices and UWB anchors through an exchange server. Also, we want to evaluation the Pub-Sub server to push notifications to embedded accessories. In this demo, the hardware is still MK Kit, not PinPoint hardware. 

## Installation

```bash
$ yarn install
```

## Running the app

### Docker
There is a docker-compose.yml file for starting Docker.
```bash
$ docker-compose up
```
After running the sample, you can stop the Docker container with
```bash
$ docker-compose down
```

### Run the app
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

