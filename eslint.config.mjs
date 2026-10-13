import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import react from '@eslint-react/eslint-plugin'
import hooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default defineConfig([
  js.configs.recommended,
  react.configs.recommended,
  hooks.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  globalIgnores(['.next/**', 'out/**', 'node_modules/**', 'artifacts/**']),
])
