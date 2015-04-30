# bemstyla

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

One command
```sh
$ bemstyla block__elem_mod-name_mod-val
```

Makes dirs and styl files
```sh
$ tree
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
$ cat blocks/block/block__elem.styl
.block__elem
    {}
```

## Install

```sh
npm i -g bemstyla
```

## Usage

```sh
bemstyla block__elem
bemstyla foo_size_small
bemstyla bar__baz_qux
bemstyla block__foo block__bar_baz foo__bar foo__qux
...
```

### [Jade](http://jade-lang.com/) file support

```sh
bemstyla header.jade
bemstyla content.jade sidebar.jade footer.jade
```

## Solutions with the same functionality
* [Bemy](//github.com/f0rmat1k/bemy)
* [TEATIME](//github.com/sullenor/teatime)
* [BEM Tools](//github.com/bem/bem-tools) (`bem create`)

[npm-url]: https://npmjs.org/package/bemstyla
[npm-image]: http://img.shields.io/npm/v/bemstyla.svg

[travis-url]: https://travis-ci.org/VovanR/bemstyla
[travis-image]: http://img.shields.io/travis/VovanR/bemstyla.svg

[coveralls-url]: https://coveralls.io/r/VovanR/bemstyla
[coveralls-image]: http://img.shields.io/coveralls/VovanR/bemstyla.svg

[depstat-url]: https://david-dm.org/VovanR/bemstyla
[depstat-image]: https://david-dm.org/VovanR/bemstyla.svg

[depstat-dev-url]: https://david-dm.org/VovanR/bemstyla
[depstat-dev-image]: https://david-dm.org/VovanR/bemstyla/dev-status.svg
