# Changelog

## [2.0.0](https://github.com/node-modules/jsonp-body/compare/v1.1.0...v2.0.0) (2025-01-11)


### ⚠ BREAKING CHANGES

* drop Node.js < 18.19.0 support

part of https://github.com/eggjs/egg/issues/3644

https://github.com/eggjs/egg/issues/5257

<!-- This is an auto-generated comment: release notes by coderabbit.ai
-->

## Summary by CodeRabbit

- **Configuration Updates**
  - Updated ESLint configuration to improve code quality and consistency
  - Removed legacy configuration files (JSHint, Travis CI)
  - Added TypeScript configuration with strict type checking

- **CI/CD Improvements**
  - Replaced Travis CI with GitHub Actions workflows
  - Added automated testing and release processes
  - Configured Node.js version support (18.19.0, 20, 22)

- **Project Maintenance**
  - Updated README with modern badges and documentation
  - Simplified package configuration
  - Removed outdated contributor information

- **Development Environment**
  - Updated `.gitignore` to reflect current project structure
  - Added coverage and build-related ignore rules

<!-- end of auto-generated comment: release notes by coderabbit.ai -->

### Features

* support cjs and esm both by tshy ([#5](https://github.com/node-modules/jsonp-body/issues/5)) ([fa2f0ff](https://github.com/node-modules/jsonp-body/commit/fa2f0ffa04c7f2aad3e9a3e298bb9ed87fdd2982))

1.1.0 / 2024-01-11
==================

 * feat: add TypeScript declaration file

1.0.0 / 2014-08-19
==================

 * add options in readme
 * add options.space and options.replacer

0.2.0 / 2014-07-22
==================

 * limit callback length, default is 512
 * add unsafe characters test case

0.1.0 / 2014-07-17
==================

 * init
