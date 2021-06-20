function findAuthorById(authors, id) {
    // function(array, number) -> object
    // - consumes: authorsArray, authorID
    // - returns: authorObject === authorID
    return authorById = authors.find((author) => author.id === id);
}

function findBookById(books, id) {
    // function(array, string) -> object
    // - consumes: booksArray, bookId
    // - returns: bookObject === bookId
    return bookById = books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
    // function(array) -> array[array,array]
    // - consumes: booksArray
    // - returns: partitionedByBorrowedArray:[ [isBookNotReturned],[isBooksReturned] ]
    const partitionByBorrowedState = books.reduce((acc,book) => {
	const bookBorrowedHistory = book.borrows;
	const bookBorrowedStateEntry = bookBorrowedHistory[0];
	const bookBorrowedStatus = bookBorrowedStateEntry.returned;
	const isBookReturned = acc[1];
	const isBookNotReturned = acc[0];
	
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
	const accountId = account.id;
	bookBorrowHistory.forEach((borrow) => {
	    const borrowId = borrow.id;
	    const borrowedState = borrow.returned;
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
