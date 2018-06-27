# frontendLogger
[![npm version](https://badge.fury.io/js/%40bananakun%2Fsentry-frontend-logger.svg)](https://badge.fury.io/js/%40bananakun%2Fsentry-frontend-logger)
[![Build Status](https://travis-ci.org/akgw/sentry-frontend-logger.svg?branch=master)](https://travis-ci.org/rcmdnk/travis-test)
[![Coverage Status](https://coveralls.io/repos/github/akgw/sentry-frontend-logger/badge.svg?branch=master)](https://coveralls.io/github/akgw/sentry-frontend-logger?branch=master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Logging library for SPA and SSR

## Getting Started
### Install npm package
#### yarn
```
yarn add --dev @bananakun/sentry-frontend-logger
```
#### npm
``` 
npm install -save @bananakun/sentry-frontend-logger
```

### How To Use
please set configuration values for sentry.  

https://docs.sentry.io/learn/cli/configuration/

#### TypeScript
``` typescript
import { SentryLogger, IOptional } from 'sentry-frontend-logger';  
  
const sendError = (e: Error): void => {
  const optional: IOptional = {
    traceId: <TRACE ID>,
    serviceName: <SERVICE NAME>,
    environment: <ENVIRONMENT>,
  };

  const instance = new SentryLogger(<SENTRY DSN>, optional);
  instance.error(e);
};

```
You set `<TRACE ID>`, will be trace error with tags on sentry.  
The errors are divided name of `<ENVIRONMENT>-<SERVICE NAME>` on sentry

# License
MIT
