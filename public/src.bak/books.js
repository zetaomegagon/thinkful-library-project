const accounts = require("../../test/fixtures/accounts.fixture");
const authors = require("../../test/fixtures/authors.fixture");
const books = require("../../test/fixtures/books.fixture");


function findAuthorById(authors, id) {
    // function(array, number) -> object
    // - consumes: authorsArray, authorID
    // - returns: authorObject === authorID
    const authorById = authors.find((author) => {
	let authorId = author.id;
	return id === authorId;
    });    

    return authorById;
}

function findBookById(books, id) {
    // function(array, string) -> object
    // - consumes: booksArray, bookId
    // - returns: bookObject === bookId
    const bookById = books.find((book) => {
	let bookId = book.id;
	return id === bookId;
    });

    return bookById;
}

function partitionBooksByBorrowedStatus(books) {
    // function(array) -> array[array,array]
    // - consumes: booksArray
    // - returns: partitionedByBorrowedArray:[ [isBookNotReturned],[isBooksReturned] ]
    const partitionByBorrowedState = books.reduce((acc,book) => {
	let bookBorrowedHistory = book.borrows;
	let bookBorrowedStateEntry = bookBorrowedHistory[0];
	let bookBorrowedStatus = bookBorrowedStateEntry.returned;
	let isBookReturned = acc[1];
	let isBookNotReturned = acc[0];
	
	bookBorrowedStatus === true
	    ? isBookReturned.push(book)
	    : isBookNotReturned.push(book)

	return acc;
    },[[],[]]);
    
    return partitionByBorrowedState;
}

function getBorrowersForBook(book, accounts) {
    // function(object, array) -> array
    // - consumes: bookObject, accountsArray
    // - returns: accountsWithBookBorrowedStatusArray
    const bookBorrowHistory = book.borrows;
    const accountsByBookBorrowedState = accounts.reduce((acc,account) => {
	let accountId = account.id;
	bookBorrowHistory.forEach((borrow) => {
	    let borrowId = borrow.id;
	    let borrowedState = borrow.returned;
	    if (accountId === borrowId) {
		account.returned = borrowedState;
		acc.push(account);
		return acc;
	    }
	});
	return acc;
    },[]);

    const tenAccountsByBookborrowedState = accountsByBookBorrowedState.slice(0,10);

    return(tenAccountsByBookborrowedState);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
