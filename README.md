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
- [`synor drop`](#synor-drop)
- [`synor help [COMMAND]`](#synor-help-command)
- [`synor history`](#synor-history)
- [`synor migrate TARGETVERSION`](#synor-migrate-targetversion)
- [`synor pending`](#synor-pending)
- [`synor repair`](#synor-repair)
- [`synor validate`](#synor-validate)

## `synor current`

show current migration record

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
```

_See code: [src/commands/current.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/current.ts)_

## `synor drop`

drop database

```
USAGE
  $ synor drop

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
  $ synor drop
```

_See code: [src/commands/drop.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/drop.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `synor history`

show migration history

```
USAGE
  $ synor history

OPTIONS
  -D, --databaseEngine=databaseEngine  Database Engine
  -S, --sourceEngine=sourceEngine      Source Engine
  -b, --baseVersion=baseVersion        Version of the Base Migration
  -c, --config=config                  Configuration file path
  -d, --databaseUri=databaseUri        Database URI
  -h, --help                           show help
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI
  -x, --extended                       show extra columns

ALIASES
  $ synor records

EXAMPLES
  $ synor history
  $ synor history --recordStartId=1
```

_See code: [src/commands/history.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/history.ts)_

## `synor migrate TARGETVERSION`

run migrations

```
USAGE
  $ synor migrate TARGETVERSION

ARGUMENTS
  TARGETVERSION  target version for migration

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
  $ synor migrate
```

_See code: [src/commands/migrate.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/migrate.ts)_

## `synor pending`

show pending migrations

```
USAGE
  $ synor pending

OPTIONS
  -D, --databaseEngine=databaseEngine  Database Engine
  -S, --sourceEngine=sourceEngine      Source Engine
  -b, --baseVersion=baseVersion        Version of the Base Migration
  -c, --config=config                  Configuration file path
  -d, --databaseUri=databaseUri        Database URI
  -h, --help                           show help
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI
  -x, --extended                       show extra columns

EXAMPLE
  $ synor pending
```

_See code: [src/commands/pending.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/pending.ts)_

## `synor repair`

repair mismatched hashes and delete dirty records

```
USAGE
  $ synor repair

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
  $ synor repair
```

_See code: [src/commands/repair.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/repair.ts)_

## `synor validate`

validate applied migrations

```
USAGE
  $ synor validate

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
  $ synor validate
```

_See code: [src/commands/validate.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/validate.ts)_

<!-- commandsstop -->
