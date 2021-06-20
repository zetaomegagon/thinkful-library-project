function findAccountById(accounts, id) {
    // function(array,string) -> object
    // - consumes: accountsArray, accountId
    // - returns: accountObject === accountId
    const accountByID = accounts.find((account) => {
	let accountID = account.id;
	return id === accountID;
    });

    return accountByID;
}

function sortAccountsByLastName(accounts) {
    // function(array) -> array
    // - consumes: accountsArray
    // - returns: accountsSortedByLastNameArray
    const sortedAccountsByLastName = accounts.sort((accountA, accountB) => {
	let lastNameA = accountA.name.last;
	let lastNameB = accountB.name.last;
	return lastNameA < lastNameB ? -1 : 1;
    });

    return sortedAccountsByLastName;
}

function getTotalNumberOfBorrows(account, books) {
    // function(object,array) -> number
    // - consumes: an accountObject, booksArray
    // - returns: number
    const  accountId = account.id;
    const bookBorrowedTimesByAccountId = books.reduce((acc,book) => {
	let bookBorrowedList = book.borrows;
	bookBorrowedList.forEach((borrow) => {
	    let bookBorrowedId = borrow.id;
	    if (bookBorrowedId === accountId) {
		acc++
	    }
	});
	return acc;
    },0);
    
    return bookBorrowedTimesByAccountId;
}

// HELPER FUNCTION
function _includedInBorrowEntryObject(borrowedEntryObject, idOrBorrowedState) {
    // function(object, string|true|false) -> bool
    // - consumes: borrowEntryObject, accountId|borrowedStateValue
    // - returns: true|false
    //
    // Helper function for getBooksPossesedByAccount
    // used to determine if an accountId or borrowedState
    // is present in the borrowedEntryObject, indicating if a
    // book is currently borrowed or not
    return Object.values(borrowedEntryObject).includes(idOrBorrowedState);
}

function getBooksPossessedByAccount(account, books, authors) {
    // function(object, array, array) -> array
    // - consumes: accountObject, booksArray, authorsArray
    // - returns: booksCheckedOutByAccountWithAuthorArray
    const accountId = account.id;
    const booksCheckedOutByAccountWithAuthor = books.reduce((acc,book) => {
	const { authorId, borrows } = book;
	const borrowedEntry = borrows[0];
	const didAccountBorrow = _includedInBorrowEntryObject(borrowedEntry,accountId);
	const isBorrowed = _includedInBorrowEntryObject(borrowedEntry,false);
	
	authors.forEach((author) => {
	    const { id } = author;
	    if (didAccountBorrow && authorId === id && isBorrowed) {
		book.author = author;
		acc.push(book);
		return acc;
	    }
	});
	return acc;					    
    },[]);
    return booksCheckedOutByAccountWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
