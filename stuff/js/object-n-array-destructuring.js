var box = { 
    books: [
        { id: 'book-1', title: 'Lord of the Rings' },
        { id: 'book-2', title: 'The Perfume' },
        { id: 'book-3', title: 'American Psycho' }
    ],
    movies: [
        { id: 'movie-1', title: 'Alien, the eighth passenger' },
        { id: 'movie-2', title: 'Peter Pan' },
        { id: 'movie-3', title: 'Toy Story' },
        { id: 'movie-4', title: 'IT 🎈🤡' }
    ]
}
undefined
box.books[2].title
'American Psycho'
var book3Title = box.books[2].title
undefined
book3Title
'American Psycho'
var { books: { 2: { title: book3Title } } } = box
undefined
book3Title
'American Psycho'
var { books: [,,{ title: book3Title }] } = box
undefined
book3Title
'American Psycho'