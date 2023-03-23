a = 10

!a
false
a = 0

!a
true
a = -10

!a
false
s = 'hello world'

!s
false
s = ''

!s
true
o = {}

!o
false
o = null

!o
true
o = undefined

!o
true
a = []

!a
false
n = 10

!!n
true
1 + true
2
1 + false
1
true + 1
2
false + 1
1
true + true
2
false + true
1
false + true + 'hola'
'1hola'
1 + 'hola'
'1hola'
'hola' + 1
'hola1'
1 * 'hola'
NaN