# bemstyla

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
bemstyla index.jade
bemstyla _content.jade _sidebar.jade _footer.jade
```

### HTML file support

```sh
bemstyla index.html
bemstyla _content.html _sidebar.html _footer.html
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
