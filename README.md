# Woozy

Project for University of Michigan EECS 480 by Shameek Ray, Rosie Wilson, Aditi Krishnan, Sahil Patel, Michael Wilson, and Sydnie Bodzianowski.

[![Build Status](https://travis-ci.org/mewil/woozy.svg?branch=master)](https://travis-ci.org/mewil/woozy)

## Setup

1. Install [Docker](https://docs.docker.com/engine/getstarted/step_one/#/step-1-get-docker) and [Docker Compose](https://docs.docker.com/compose/install/). For active development, also install [yarn](https://yarnpkg.com/lang/en/docs/install/).
2. Clone this repo: `git clone https://github.com/mewil/woozy`
3. Change directory to the deploy repo: `cd woozy/deploy/`
4. Start whatever environment you want
    - Development
        - Run `docker-compose up -d` to start all containers
        - To view the container logs, run `docker-compose logs` (add the `-f` flag to follow their output, use Crtl-C to escape)
        - To stop and remove the containers, run `docker-compose down`
    - Production (env data required)
        - `docker-compose -f production.yml up -d`
5. Access `http://localhost:3000` to start developing!

## Contributing

1. Clone the repository: `git clone https://github.com/mewil/woozy`
2. Create a branch locally for your feature: `git branch my-new-feature-branch`
3. Checkout your branch: `git checkout my-new-feature-branch`
   ----- _to branch and checkout in one command:_ `git checkout -b my-new-feature-branch`
4. Implement your feature with as many commits as you'd like
5. Push your branch to GitHub: `git push -u origin my-new-feature-branch`
6. On GitHub click "Open Pull Request"
7. Open a [Merge Request](https://gitlab.eecs.umich.edu/mxl/software/merge_requests)
8. Assign your pull request to 1-2 reviewers and make sure it passes the [Travis CI pipeline](https://travis-ci.org/github/mewil/woozy). This pipeline runs the command `yarn test` on your project, so make sure to run this command before pushing your changes to avoid errors.
9. Get feedback, talk about the feedback, implement any agreed changes, commit them and push, repeat until your changes are approved
10. Merge!
