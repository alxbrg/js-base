# js-base
This is a simple generator for bootstrapping JS projects and saving time on setting up boilerplate code, dev environments and downloading dependencies (e.g. linter rules, Babel presets, Webpack config, etc.)


## Requirements
You must have `node`, `yarn` and `git` installed.


## Usage
Install using `yarn global add @alxbrg/js-base`.

You can initialize a project in an empty directory by simply doing `js-base -t <template>`. You can also specify the name and directory of your project by doing `js-base my-project`. By default, `js-base` will abort if the targeted dir is not empty. To force the creation of the project, use the `--force` or `-f` flag.


## Templates
Pick the template you want to use with the `--template` or `-t` option:
- `library` - *library boilerplate setup with Babel (for browser support)*;
- `node` - *Node.js service base, setup with Winston, Nodemon and Ramda* (default);
- `webpack` - *bare-bones front-end Webpack project with HMR*;

Docs for each template can be found in the templates' `README`s.


## TODO
- Add tests
- Add templates:
  - `express` - *simple Express server which builds upon the `node` base*;
  - `cli` - *base for a Node.Js CLI library*;
  - `graphql` - *GraphQL server based on the `express` template*;
  - `react` - *very minimalist but opinionated React setup*;
  - `fullstack` - *more elaborate project combining the `graphql` and `react` bases*.
- Add create tools:
  Create simple template scripts for common modules, e.g.:
  - Express routers
  - React components and containers
