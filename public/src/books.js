function findAuthorById(authors, id) {
    // function(array, number) -> object
    // - consumes: authorsArray, authorId
    // - returns: authorObject
    //
    // consumes an array of author objects and
    // an author id; returns the author object
    // matching the passed author id
    const authorById = authors.find((author) => author.id === id);

    return authorById;
}

function findBookById(books, id) {
    // function(array, string) -> object
    // - consumes: booksArray, bookId
    // - returns: bookObject
    //
    // consumes an array of books objects, and a
    // book id; returns the book object that matches
    // the passed book id
    const bookById = books.find((book) => book.id === id);

    return bookById;
}

function partitionBooksByBorrowedStatus(books) {
    // function(array) -> array[array,array]
    // - consumes: booksArray
    // - returns: partitionedByBorrowedStateArray
    //
    // consumes an array of book objects, and checks
    // if they are returned or not based on the
    // borrows[0].returned value of the book object.
    //
    // returns an array of the form...
    //
    //   [ [isBookNotReturned],[isBooksReturned] ]
    //
    // ...where array[0] contains all check out books,
    // and array[1] contains all books that are currently
    // returned
    const partitionByBorrowedStateArray = books.reduce((acc,book) => {
	const { borrows } = book;
	const bookBorrowedStatus = borrows[0].returned;
	const isBookNotReturned = acc[0];
	const isBookReturned = acc[1];
	
	bookBorrowedStatus === true
	    ? isBookReturned.push(book)
	    : isBookNotReturned.push(book)

	return acc;
    },[[],[]]);
    
    return partitionByBorrowedStateArray;
}

function getBorrowersForBook(book, accounts) {
    // function(object, array) -> array
    // - consumes: bookObject, accountsArray
    // - returns: tenAccountsWithBookBorrowedStateArray
    //
    // consumes a book object, and an accounts array;
    // returns a new array of account objects with the
    // book return state embedded in them, for each account
    // that has borrowed the book; limited to ten elements
    const { borrows } = book;
    const accountsByBookBorrowedState = accounts.reduce((acc,account) => {
	const accountId = account.id;
	borrows.forEach(({ id, returned }) => {
	    const borrowId = id;
	    const borrowedState = returned;
	    if (accountId === borrowId) {
		account.returned = borrowedState;
		acc.push(account);
		return acc;
	    }
	});
	return acc;
    },[]);

    const tenAccountsByBookBorrowedState = accountsByBookBorrowedState.slice(0,10);

    return(tenAccountsByBookBorrowedState);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
