# bemstyla

[![Commitizen friendly][commitizen-image]][commitizen-url]
[![XO code style][codestyle-image]][codestyle-url]

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Creates block__elem_mod-name_mod-value styl files

One command
```sh
bemstyla block__elem_mod-name_mod-val
```

Makes dirs and styl files
```sh
tree
blocks
└── block
    ├── __elem
    │   ├── _mod-name
    │   │   └── block__elem_mod-name_mod-val.styl
    │   └── block__elem.styl
    └── block.styl
```

And writes initial selector
```sh
cat blocks/block/block__elem.styl
.block__elem
    {}
```

## Install

```sh
npm install --global bemstyla
```

## Usage

```
bemstyla --help

  Usage: bemstyla [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -t, --type [type]      file type [styl]
    -f, --format [format]  file content format [styl] (by default based on type)
    -d, --dir [path]       output files location

  Examples:

    bemstyla -h
    bemstyla block__elem
    bemstyla block_mod block__elem_mod foo__bar foo__qux
    bemstyla block--mod block__elem--mod
    bemstyla header.pug body.jade footer.html
    bemstyla -t css bar__baz_qux
    bemstyla -f less foo_bar
    bemstyla -d styles/blocks blockname
```

### [Pug (Jade)](https://github.com/pugjs/pug) file support

```sh
bemstyla index.pug
bemstyla _content.pug _sidebar.pug _footer.pug
```

### HTML file support

```sh
bemstyla index.html
bemstyla _content.html _sidebar.html _footer.html
```

### Output file extension

Default: `styl`

```sh
bemstyla -t less block__elem
bemstyla --type css block__elem
```

### File content format

Default: `styl` based on file type

```sh
bemstyla -f less block__elem
bemstyla --format css block__elem
```

**Formats**
- Default, `styl`, `sass`

  ```css
  .block
      {}
  ```
  Usage
  ```styl
  .block
      border: none
  ```

- `css`, `less`, `scss`

  ```css
  .block {
  }
  ```
  Usage
  ```css
  .block {
      border: none;
  }
  ```

### Output file location

```sh
bemstyla -d css/components block__elem
bemstyla --dir styles/blocks block__elem
```

## Solutions with the same functionality
* [Bemy](//github.com/f0rmat1k/bemy)
* [TEATIME](//github.com/sullenor/teatime)
* [BEM Tools](//github.com/bem/bem-tools) (`bem create`)

## License
MIT © [Vladimir Rodkin](https://github.com/VovanR)

[commitizen-url]: http://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square

[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square

[npm-url]: https://npmjs.org/package/bemstyla
[npm-image]: http://img.shields.io/npm/v/bemstyla.svg?style=flat-square

[travis-url]: https://travis-ci.org/VovanR/bemstyla
[travis-image]: http://img.shields.io/travis/VovanR/bemstyla.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/VovanR/bemstyla
[coveralls-image]: http://img.shields.io/coveralls/VovanR/bemstyla.svg?style=flat-square

[depstat-url]: https://david-dm.org/VovanR/bemstyla
[depstat-image]: https://david-dm.org/VovanR/bemstyla.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/VovanR/bemstyla
[depstat-dev-image]: https://david-dm.org/VovanR/bemstyla/dev-status.svg?style=flat-square
