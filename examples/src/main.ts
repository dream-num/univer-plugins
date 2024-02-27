import './style.css'

import { LocaleType, LogLevel, Univer } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'

import { UniverUIPlugin } from '@univerjs/ui'

import { enUS } from 'univer:locales'

// univer
const univer = new Univer({
  theme: defaultTheme,
  locale: LocaleType.EN_US,
  logLevel: LogLevel.VERBOSE,
  locales: {
    [LocaleType.EN_US]: enUS,
  },
})

// core plugins
univer.registerPlugin(UniverDocsPlugin, {
  hasScroll: false,
})
univer.registerPlugin(UniverDocsUIPlugin)
univer.registerPlugin(UniverRenderEnginePlugin)
univer.registerPlugin(UniverUIPlugin, {
  container: 'app',
  header: true,
  toolbar: true,
  footer: true,
})
univer.registerPlugin(UniverSheetsPlugin)
univer.registerPlugin(UniverSheetsUIPlugin)

// sheet feature plugins
univer.registerPlugin(UniverSheetsNumfmtPlugin)
univer.registerPlugin(UniverFormulaEnginePlugin)
univer.registerPlugin(UniverSheetsFormulaPlugin)
// univer.registerPlugin(UniverSheetsZenEditorPlugin);

// create univer sheet instance
univer.createUniverSheet({})
