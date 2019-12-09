# @synor/cli

Database Migration Tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@synor/cli.svg)](https://npmjs.org/package/@synor/cli)
[![Codecov](https://codecov.io/gh/Synor/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/Synor/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@synor/cli.svg)](https://npmjs.org/package/@synor/cli)
[![License](https://img.shields.io/npm/l/@synor/cli.svg)](https://github.com/Synor/cli/blob/master/package.json)

<!-- toc -->

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

- [`synor hello [FILE]`](#synor-hello-file)
- [`synor help [COMMAND]`](#synor-help-command)

## `synor hello [FILE]`

describe the command here

```
USAGE
  $ synor hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ synor hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Synor/cli/blob/v0.0.0/src/commands/hello.ts)_

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
