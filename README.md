# bemstyla

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]
[![XO code style][codestyle-image]][codestyle-url]

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

    -h, --help         output usage information
    -V, --version      output the version number
    -t, --type [type]  file type [styl]
    -d, --dir [value]  output files location

  Examples:

    bemstyla -h
    bemstyla block__elem
    bemstyla block__foo block__bar_baz foo__bar foo__qux
    bemstyla header.jade footer.html
    bemstyla -t css bar__baz_qux
    bemstyla -d styles/blocks blockname
```

### [Jade](http://jade-lang.com/) file support

```sh
bemstyla index.jade
bemstyla _content.jade _sidebar.jade _footer.jade
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

[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
