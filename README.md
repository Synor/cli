[![Synor CLI](https://img.shields.io/badge/synor-cli-blue?style=for-the-badge)](https://github.com/Synor)
[![Version](https://img.shields.io/npm/v/@synor/cli?style=for-the-badge)](https://npmjs.org/package/@synor/cli)
[![License](https://img.shields.io/github/license/Synor/cli?style=for-the-badge)](https://github.com/Synor/cli/blob/master/LICENSE)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=for-the-badge)](https://oclif.io)

# Synor CLI

CLI for Synor - Database Migration Tool

<!-- toc -->

- [Synor CLI](#synor-cli)
- [Installation](#installation)
- [Configuration](#configuration)
- [Commands](#commands)
  <!-- tocstop -->

# Installation

**using `yarn`**:

```sh
yarn add --dev @synor/cli
```

**using `npm`**:

```sh
npm install --save-dev @synor/cli
```

# Configuration

Synor CLI reads config file from one of the following locations:

- File path passed to `--config` or `-c` flag
- `.synorrc.js`
- `synor.config.js`

The first one found is used by Synor CLI.

Options in config file is overridden by their available command flag counterparts.

**Example**:

```js
const path = require('path')

module.exports = {
  databaseEngine: `@synor/database-mysql`,
  databaseUri: `mysql://root:root@localhost:3306/synor`,
  sourceEngine: `@synor/source-file`,
  sourceUri: `file://${path.resolve('migrations')}`,

  // Optional
  baseVersion: '0',
  recordStartId: 1,
  migrationInfoNotation: {
    do: 'do',
    undo: 'undo',
    seperator: '.'
  }
}
```

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
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI

EXAMPLE
  $ synor current
```

_See code: [src/commands/current.ts](https://github.com/Synor/cli/blob/v0.1.0/src/commands/current.ts)_

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
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI

EXAMPLE
  $ synor drop
```

_See code: [src/commands/drop.ts](https://github.com/Synor/cli/blob/v0.1.0/src/commands/drop.ts)_

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
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI
  -x, --extended                       show extra columns

ALIASES
  $ synor records

EXAMPLES
  $ synor history
  $ synor history --recordStartId=1
```

_See code: [src/commands/history.ts](https://github.com/Synor/cli/blob/v0.1.0/src/commands/history.ts)_

## `synor migrate TARGETVERSION`

migrate to targetVersion

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
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI

EXAMPLE
  $ synor migrate
```

_See code: [src/commands/migrate.ts](https://github.com/Synor/cli/blob/v0.1.0/src/commands/migrate.ts)_

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
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI
  -x, --extended                       show extra columns

EXAMPLE
  $ synor pending
```

_See code: [src/commands/pending.ts](https://github.com/Synor/cli/blob/v0.1.0/src/commands/pending.ts)_

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
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI

EXAMPLE
  $ synor repair
```

_See code: [src/commands/repair.ts](https://github.com/Synor/cli/blob/v0.1.0/src/commands/repair.ts)_

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
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI
  -x, --extended                       show extra columns

EXAMPLE
  $ synor validate
```

_See code: [src/commands/validate.ts](https://github.com/Synor/cli/blob/v0.1.0/src/commands/validate.ts)_

<!-- commandsstop -->
