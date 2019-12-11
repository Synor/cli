# @synor/cli

Database Migration Tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@synor/cli.svg)](https://npmjs.org/package/@synor/cli)
[![Codecov](https://codecov.io/gh/Synor/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/Synor/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@synor/cli.svg)](https://npmjs.org/package/@synor/cli)
[![License](https://img.shields.io/npm/l/@synor/cli.svg)](https://github.com/Synor/cli/blob/master/package.json)

<!-- toc -->

- [@synor/cli](#synorcli)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @synor/cli
$ synor COMMAND
running command...
$ synor (-v|--version|version)
@synor/cli/0.0.0 linux-x64 node-v10.15.1
$ synor --help [COMMAND]
USAGE
  $ synor COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`synor current`](#synor-current)
- [`synor help [COMMAND]`](#synor-help-command)

## `synor current`

Get current database migration version

```
USAGE
  $ synor current

OPTIONS
  -D, --databaseEngine=databaseEngine  Database Engine
  -S, --sourceEngine=sourceEngine      Source Engine
  -b, --baseVersion=baseVersion        Version of the Base Migration
  -c, --config=config                  Configuration file path
  -d, --databaseUri=databaseUri        Database URI
  -h, --help                           show help
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI

EXAMPLE
  $ synor current
  Current Version: 0
```

_See code: [src/commands/current.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/current.ts)_

## `synor help [COMMAND]`

display help for synor

```
USAGE
  $ synor help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.2/src/commands/help.ts)_

<!-- commandsstop -->
