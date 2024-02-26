import { autoImportCss } from '@univerjs/plugin-core'

export default function loader(source: string) {
  const result = autoImportCss(source)
  if (result) {
    return result + source
  }
  return source
}
