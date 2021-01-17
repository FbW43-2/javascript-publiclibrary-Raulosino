
class Shelf {

    books = [];
    constructor(name, books) {
        this.name = name;
        this.books = [];
    }

    checkExistingBook(book) {
        for (var i = 0; i < this.books.length; i++) {
            if (this.books[i] === book) {
                return true;
            }
        }
        return false;
    }

    spaceLimitReached() {
        if (this.books.length >= 5) {
            return true;
        }
        return false;
    }

    addBook(book) {
        if (this.checkExistingBook(book)) {
            throw new Error("This book is already in the shelf.");
        }
        if (this.spaceLimitReached()) {
            throw new Error("You can't add this book, this shelf is already full.");
        }
        this.books.push(book);
        book.assignShelf(this);
    }

    removeBook(book) {
        if (this.checkExistingBook(book) === false) {
            throw new Error("This book is not in the shelf");
        }
        for (var i = 0; i < this.books.length; i++) {
            if (this.books[i] === book) {
                this.books.splice(i, 1);
            }
        }
    }


    moveBook(shelf, book) {

        if (this.checkExistingBook(book)) {

            if (shelf.checkExistingBook(book)) {
                throw new Error("This book is already in the shelf");
            }
            if (shelf.spaceLimitReached()) {
                throw new Error("You can't add this book, this shelf is already full.")
            }

            book.deleteShelfAssigned();
            this.removeBook(book);
            shelf.books.push(book);
            book.assignShelf(shelf);
        } else {
            throw new Error("The book is not in this shelf.")
        }
    }



    amountOfBooks() {
        console.log("The " + this.name + " has " + this.books.length + " books.");
    }

    displayBooks() {
        console.log("All books in " + this.name + " :");
        console.log(this.books);
    }

    emptyShelf() {
        this.books = [];
        for (n in this.books) {
            n.author = null;
        }
    }
}

class Book {
    shelf = null;

    constructor(title, author, pages, publicationYear) {
        this.title = title;
        this.author = this.assignAuthor(author);
        this.pages = pages;
        this.publicationYear = publicationYear;
    }

    assignShelf(shelf) {
        if (this.shelf !== null) {
            throw new Error("This book is already in a shelf");
        }
        this.shelf = shelf.name;
    }

    deleteShelfAssigned() {
        if (this.shelf !== null) {
            this.shelf = null;
        }
    }

    assignAuthor(author) {
        this.author = author.firstName;
        return author.firstName + " " + author.lastName;
    }
}

class Author {
    constructor(firstName, lastName, age, nationality) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.nationality = nationality;
    }
}


var rightShelf = new Shelf("Right-Shelf");
var leftShelf = new Shelf("Left-Shelf");

let nietzsche = new Author("Friedrich", "Nietzsche", 56, "German");
let heidegger = new Author("Martin", "Heidegger", 87, "German");
let plato = new Author("Aristocles", "Plato", 80, "Greece")
let descartes = new Author("Rene", "Descartes", 54, "French")

let b1 = new Book("Thus spoke Zarathustra", nietzsche, 254, 1885);
let b2 = new Book("The Antichrist", nietzsche, 96, 1895);
let b3 = new Book("God is dead", nietzsche, 200, 1882);
let b4 = new Book("Ecce homo", nietzsche, 144, 1908);
let b5 = new Book("Discourse on Method", descartes, 200, 1656);
let b6 = new Book("Passions of the soul", descartes, 250, 1649);
let b7 = new Book("The republic", plato, 692, -375);
let b8 = new Book("Allegory of the cave", plato, 20, -517);
let b9 = new Book("Being and Time", heidegger, 589, 1927);



rightShelf.addBook(b1);
rightShelf.addBook(b2);
rightShelf.addBook(b3);
rightShelf.addBook(b4);
rightShelf.addBook(b5);
rightShelf.amountOfBooks();
rightShelf.removeBook(b1);
rightShelf.displayBooks();
rightShelf.moveBook(leftShelf, b1);