
class libraryObject {
    checkString(name) {
        if (!name) {
            throw new Error("The name of the object can't be null");
        }
        if (typeof (name) !== "string") {
            throw new Error("The name of the object must be a string");
        }
        return name;
    }
}

//AUTHOR
class Author extends libraryObject {
    constructor(firstName, lastName, age, country) {
        super();
        this.firstName = this.checkString(firstName);
        this.lastName = this.checkString(lastName);
        if (!age || age < 0) {
            throw new Error("The age of the author can't be less than 0 or can't be null");
        }
        this.age = age;
        this.country = this.checkString(country);
    }
}


//BOOK
class Book extends libraryObject {

    isBurned = false;
    shelf = null;

    constructor(title, author, type, pages, year) {
        super()
        this.title = this.checkString(title);
        if (!(author instanceof Author)) {
            throw new Error("The parameter author must be an object Author");
        }
        this.author = author.firstName + " " + author.lastName;
        if (!pages || pages < 0) {
            throw new Error("The book pages must be more than 0 and can't be null.");
        }
        this.type = type;
        this.pages = pages;
        if (!year) {
            throw new Error("The publication year can't be null.");
        }
        this.year = year;
    }
}


//SHELF
class Shelf extends libraryObject {

    books = [];
    constructor(name) {
        super();
        this.name = this.checkString(name);
    }

    addBook(book) {
        if (!(book instanceof Book)) {
            throw new Error("Only objects of the instance Book can be added to shelf.");
        }
        if (book.isBurned) {
            throw new Error("This burned has been burned and can't be used")
        }
        if (book.shelf !== null) {
            throw new Error("The book is already in this shelf.")
        }
        if (this.shelfLimitReached()) {
            throw new Error("The shelf has reached the capacity limit");
        }
        this.books.push(book);
        book.shelf = this;
    }

    shelfLimitReached() {
        if (this.books.length >= 5) {
            return true;
        }
        return false;
    }

    amountOfBooks() {
        console.log("Amount of books in this shelf: " + this.books.length);
    }

    booksInShelf() {
        this.amountOfBooks();
        for (let i = 0; i < this.books.length; i++) {
            console.log("Book in index " + i + " : " + this.books[i].title);
        }
    }

    moveBook(shelf, book) {
        if (!(shelf instanceof Shelf)) {
            throw new Error("The first parameter must be an instance of shelf.");
        }
        if (!(book instanceof Book)) {
            throw new Error("The second parameter must be an instance of book.");
        }
        if (book.shelf != this) {
            throw new Error("This book is not in this shelf");
        }
        this.removeBook(book);
        shelf.books.push(book);
        book.shelf = shelf;
    }

    removeBook(book) {
        if (book.shelf != this) {
            throw new Error("The book is not in this shelf");
        }
        for (var i = 0; i < this.books.length; i++) {
            if (this.books[i] === book) {
                this.books.splice(i, 1);
            }
        }
        book.shelf = null;
    }

}
var leftShelf = new Shelf("Left-Shelf");
var rightShelf = new Shelf("Right-Shelf");


//LIBRARY
class Library extends libraryObject {
    shelves = [leftShelf, rightShelf]
    constructor(name) {
        super()
        this.name = this.checkString(name);
    }

    burnBooks(year) {
        if (typeof (year) != "number") {
            throw new Error("the parameter must be a number");
        }
        for (let i = 0; i < this.shelves.length; i++) {
            let array = [];
            for (let x = 0; x < this.shelves[i].books.length; x++) {
                if (this.shelves[i].books[x].year < year) {
                    this.shelves[i].books[x].isBurned = true;
                } else {
                    array.push(this.shelves[i].books[x]);
                }
            }
            this.shelves[i].books = array;
        }
    }

    searchByAuthor(author) {
        if (!(author instanceof Author)) {
            throw new Error("The parameter must be an instance of Author");
        }
        for (let i = 0; i < this.shelves.length; i++) {
            let array = [];
            for (let x = 0; x < this.shelves[i].books.length; x++) {
                if (this.shelves[i].books[x].author === author) {
                    array.push(this.shelves[i].books[x]);
                }
            }
            this.shelves[i].books = [];
            this.shelves[i].books = array;
        }
    }
}


let alexandria = new Library("Alexandria");


let nietzsche = new Author("Friedrich", "Nietzsche", 56, "German");
let heidegger = new Author("Martin", "Heidegger", 87, "German");
let plato = new Author("Aristocles", "Plato", 80, "Greece")
let descartes = new Author("Rene", "Descartes", 54, "French")


let b1 = new Book("Thus spoke Zarathustra", nietzsche, "Academic", 254, 1885);
let b2 = new Book("The Antichrist", nietzsche, "Academic", 96, 1895);
let b3 = new Book("God is dead", nietzsche, "Academic", 200, 1882);
let b4 = new Book("Ecce homo", nietzsche, "Academic", 144, 1908);
let b5 = new Book("Discourse on Method", descartes, "Academic", 200, 1656);
let b6 = new Book("Passions of the soul", descartes, "Academic", 250, 1649);
let b7 = new Book("The republic", plato, "Academic", 692, -375);
let b8 = new Book("Allegory of the cave", plato, "Academic", 20, -517);
let b9 = new Book("Being and Time", heidegger, "Academic", 589, 1927);

rightShelf.addBook(b1);
rightShelf.addBook(b2);
rightShelf.addBook(b3);
rightShelf.addBook(b4);
rightShelf.addBook(b5);


leftShelf.addBook(b6);
leftShelf.addBook(b7);
leftShelf.addBook(b8);
leftShelf.addBook(b9);


alexandria.burnBooks(1885);

console.log(leftShelf);
console.log(rightShelf);

