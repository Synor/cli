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
yarn add --dev @synor/cli @synor/core
```

**using `npm`**:

```sh
npm install --save-dev @synor/cli @synor/core
```

# Configuration

Synor CLI reads config file from one of the following locations:

- File path passed to `--config` or `-c` flag
- `.synorrc.js`
- `synor.config.js`

The first one found is used by Synor CLI.

Options in config file is overridden by their available command flag counterparts.

**Required Options**:

| Name             | Description                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| `databaseEngine` | Database Engine function / [package name](https://www.npmjs.com/search?q=keywords:synor-database) / module path |
| `databaseUri`    | Database Engine URI                                                                                             |
| `sourceEngine`   | Source Engine function / [package name](https://www.npmjs.com/search?q=keywords:synor-source) / module path     |
| `sourceUri`      | Source Engine URI                                                                                               |

**Other Options**:

You can also specify other [configuration options](https://github.com/Synor/core/blob/0.4.0/src/index.ts#L36-L45) that [Synor Core](https://github.com/Synor/core) accepts.

**Example**:

```js
const path = require('path')

module.exports = {
  databaseEngine: `@synor/database-mysql`,
  databaseUri: `mysql://root:root@localhost:3306/synor`,
  sourceEngine: `@synor/source-file`,
  sourceUri: `file://${path.resolve('migrations')}`,

  baseVersion: '0',
  recordStartId: 1,
  migrationInfoNotation: {
    do: 'do',
    undo: 'undo',
    separator: '.',
    extension: 'sql'
  }
}
```

# Commands

<!-- commands -->

- [`synor current`](#synor-current)
- [`synor drop`](#synor-drop)
- [`synor help [COMMAND]`](#synor-help-command)
- [`synor info`](#synor-info)
- [`synor migrate [TARGETVERSION]`](#synor-migrate-targetversion)
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
  --no-header                          hide table header from output

DESCRIPTION
  This record indicates the current migration version for the database.

EXAMPLE
  $ synor current
```

_See code: [src/commands/current.ts](https://github.com/Synor/cli/blob/v0.4.0/src/commands/current.ts)_

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

DESCRIPTION
  This command is DANGEROUS.
  Drops everything in the database.
  It should only be used for development purposes.

EXAMPLE
  $ synor drop
```

_See code: [src/commands/drop.ts](https://github.com/Synor/cli/blob/v0.4.0/src/commands/drop.ts)_

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

## `synor info`

show migration information

```
USAGE
  $ synor info

OPTIONS
  -D, --databaseEngine=databaseEngine  Database Engine
  -S, --sourceEngine=sourceEngine      Source Engine
  -b, --baseVersion=baseVersion        Version of the Base Migration
  -c, --config=config                  Configuration file path
  -d, --databaseUri=databaseUri        Database URI
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI
  -x, --extended                       show extra columns
  -z, --outOfOrder                     include out of order pending migrations
  --no-header                          hide table header from output

DESCRIPTION
  Shows detailed information about schema migrations.

EXAMPLES
  $ synor info
  $ synor info --outOfOrder
```

_See code: [src/commands/info.ts](https://github.com/Synor/cli/blob/v0.4.0/src/commands/info.ts)_

## `synor migrate [TARGETVERSION]`

migrate database to specific version

```
USAGE
  $ synor migrate [TARGETVERSION]

ARGUMENTS
  TARGETVERSION  target migration version

OPTIONS
  -D, --databaseEngine=databaseEngine  Database Engine
  -S, --sourceEngine=sourceEngine      Source Engine
  -b, --baseVersion=baseVersion        Version of the Base Migration
  -c, --config=config                  Configuration file path
  -d, --databaseUri=databaseUri        Database URI
  -f, --from=from                      from migration version
  -i, --recordStartId=recordStartId    Migration Record Start ID
  -s, --sourceUri=sourceUri            Source URI
  -t, --to=to                          to migration version
  -z, --outOfOrder                     include out of order pending migrations

DESCRIPTION
  Runs necessary migrations to reach the target migration version.

EXAMPLES
  $ synor migrate 42
  $ synor migrate --from=00 --to=42
  $ synor migrate --outOfOrder 42
```

_See code: [src/commands/migrate.ts](https://github.com/Synor/cli/blob/v0.4.0/src/commands/migrate.ts)_

## `synor repair`

repair migration records

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

DESCRIPTION
  - Updates the mismatched hashes
  - Deletes the dirty records

EXAMPLE
  $ synor repair
```

_See code: [src/commands/repair.ts](https://github.com/Synor/cli/blob/v0.4.0/src/commands/repair.ts)_

## `synor validate`

validate migration records

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

DESCRIPTION
  Validates the records for migrations that are currently applied.

EXAMPLE
  $ synor validate
```

_See code: [src/commands/validate.ts](https://github.com/Synor/cli/blob/v0.4.0/src/commands/validate.ts)_

<!-- commandsstop -->
