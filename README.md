# Under construction

One command
```
$ newbem block__elem_mod-name_mod-val
```

Makes dirs and styl files
```
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
```
$ cat blocks/block/block__elem.styl
.block__elem
    {}
```

## Solutions with the same functionality
* [Bemy](//github.com/f0rmat1k/bemy)
* [TEATIME](//github.com/sullenor/teatime)
* [BEM Tools](//github.com/bem/bem-tools) (`bem create`)
