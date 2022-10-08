#!/usr/bin/env node --experimental-json-modules --no-warnings

import { Command, Option } from 'commander'
import validate from './commands/validate.js'
import deref from './commands/deref.js'
import transpile from './commands/transpile.js'
import metadata from './package.json' assert { type: 'json' }

const program = new Command()
  .name('ajv')
  .version(metadata.version)
  .description(
    'Transpile JSON-Schema (.json) files to JavaScript (.js or .mjs) using ajv'
  )

program
  .command('validate', { isDefault: true })
  .argument('<input>', 'Path to the JSON-Schema file to validate')
  .addOption(new Option('--valid', 'When not valid throw exit(1)').preset(true))
  .addOption(
    new Option('--invalid', 'When not invalid throw exit(1)').preset(true)
  )
  .addOption(
    new Option(
      '-r, --ref-schema-files <refSchemaFiles...>',
      'The schema in -s parameter can reference any of these schemas with $ref keyword.'
    )
  )
  .addOption(new Option('--strict [strict]', 'true/false/log').preset(true))
  .addOption(
    new Option('--all-errors', 'collect all validation errors').preset(true)
  )
  .addOption(
    new Option(
      '--use-defaults [useDefaults]',
      'replace missing properties/items with the values from default keyword'
    ).preset(true)
  )
  .addOption(
    new Option(
      '--coerce-types [coerceTypes]',
      'change type of data to match type keyword'
    ).preset(true)
  )
  .addOption(
    new Option('--messages', 'do not include text messages in errors').preset(
      true
    )
  )
  .addOption(
    new Option(
      '--loop-enum <loopEnum>',
      'max size of enum to compile to expression (rather than to loop)'
    )
  )
  .addOption(
    new Option(
      '-d, --test-data-files <testDataFiles...>',
      'The data files to validate against.'
    )
  )
  .action(validate)

program
  .command('transpile')
  .argument('<input>', 'Path to the JSON-Schema file to transpile')
  //.addOption(new Option('--ftl <ftl>', 'Path to ftl file')

  // Docs: https://ajv.js.org/packages/ajv-cli.html
  .addOption(
    new Option(
      '-r, --ref-schema-files <refSchemaFiles...>',
      'The schema in -s parameter can reference any of these schemas with $ref keyword.'
    )
  )
  .addOption(new Option('--strict [strict]', 'true/false/log').preset(true))
  .addOption(
    new Option('--all-errors', 'collect all validation errors').preset(true)
  )
  .addOption(
    new Option(
      '--use-defaults [useDefaults]',
      'replace missing properties/items with the values from default keyword'
    ).preset(true)
  )
  .addOption(
    new Option(
      '--coerce-types [coerceTypes]',
      'change type of data to match type keyword'
    ).preset(true)
  )
  .addOption(
    new Option('--messages', 'do not include text messages in errors').preset(
      true
    )
  )
  .addOption(
    new Option(
      '--loop-enum <loopEnum>',
      'max size of enum to compile to expression (rather than to loop)'
    )
  )
  .addOption(
    new Option(
      '-o, --output <output>',
      'Path to store the resulting JavaScript file. Will be in ESM.'
    )
  )
  .action(transpile)

program
  .command('deref')
  .argument('<input>', 'Path to the JSON-Schema file to deref relative $ref')
  // .addOption(
  //   new Option(
  //     '-r, --schemas <schemas...>',
  //     'The schema in -s parameter can reference any of these schemas with $ref keyword.'
  //   )
  // )
  .addOption(
    new Option(
      '-o, --output <output>',
      'Path to store the resulting JSON-Schema file.'
    )
  )
  .action(deref)

program.parse()
