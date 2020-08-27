'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typedoc_1 = require('typedoc');
const app = new typedoc_1.Application({
  experimentalDecorators: true,
  ignoreCompilerErrors: false,
  listInvalidSymbolLinks: true,
  theme: 'markdown',
  readme: 'none',
  excludePrivate: true,
  excludeProtected: true,
  excludeNotExported: true,
  target: 'ES2017',
  tsconfig: './tsconfig.js',
});
const project = app.convert(app.expandInputFiles(['src']));
if (project) app.generateDocs(project, 'docs');
//# sourceMappingURL=docs-generator.js.map
