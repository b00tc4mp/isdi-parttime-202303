## Functional Programming Paradigm

The crux of Functional Programming: to separate *the how* from *the what*, and being able to reuse *the how* in many different *whats*.

```js
forEach<the how>(nums, printToConsole<the what>)

forEach<the how>(nums, mulBy10AndPrintToConsole<the what>)

forEach<the how>(nums, divBy10AndPrintToConsole<the what>)
```

- the how -> imperative (inside)
- the what -> declarative (outside)