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


var { movies: [,,,{ id, title } ] } = box
undefined
console.log(id, title)
VM3319:1 movie-4 IT 🎈🤡
undefined

var { id, title } = box.movies[3]
undefined
console.log(id, title)
VM3441:1 movie-4 IT 🎈🤡
undefined

var { movies: [,,,{ id: movieId, title: movieTitle } ], books: [, { id: bookId, title: bookTitle } ] } = box
console.log(movieId, movieTitle, bookId, bookTitle)
VM3944:3 movie-4 IT 🎈🤡 book-2 The Perfume
undefined

var [{ id: book1Id, title: book1Title }, , { id: book3Id, title: book3Title }] = box.books
console.log(book1Id, book1Title, book3Id, book3Title)
VM4355:2 book-1 Lord of the Rings book-3 American Psycho