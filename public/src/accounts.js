function findAccountById(accounts, id) {
    // function(array,string) -> object
    // - consumes: accountsArray, accountId
    // - returns: accountObjectById
    //
    // consumes an array of account objects
    // and an an account ID. Returns the account
    // object that matches the ID
    const accountObjectById = accounts.find((account) => id === account.id);

    return accountObjectById;
}

function sortAccountsByLastName(accounts) {
    // function(array) -> array
    // - consumes: accountsArray
    // - returns: accountsSortedByLastNameArray
    //
    // consumes an array of account objects and
    // returns a new array of account objects
    // sorted by the account holder's last name
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
    // - returns: numberOfBorrowsByAccount
    //
    // consumes an account object, and an array
    // of book objects. Returns the number of times
    // the account borrowed any book on the list
    const  accountId = account.id;
    const numberOfBorrowsByAccount = books.reduce((acc,book) => {
	let borrowedList = book.borrows;
	borrowedList.forEach((borrow) => {
	    let borrowedId = borrow.id;
	    if (borrowedId === accountId) {
		acc++
	    }
	});
	return acc;
    },0);
    
    return numberOfBorrowsByAccount;
}

// HELPER FUNCTION
function _includedInBorrowedEntryObject(borrowedEntryObject, idOrBorrowedState) {
    // function(object, string|true|false) -> bool
    // - consumes: borrowEntryObject, accountId|borrowedStateValue
    // - returns: true|false
    //
    // Helper function for getBooksPossesedByAccount
    //
    // Consumes the first borrowed object in the borrows array of a
    // book object, and an account id or boolean. Returns true or
    // false based on the inclusion of the account id or boolean
    // in the borrowedEntryObject
    return Object.values(borrowedEntryObject).includes(idOrBorrowedState);
}

function getBooksPossessedByAccount(account, books, authors) {
    // function(object, array, array) -> array
    // - consumes: accountObject, booksArray, authorsArray
    // - returns: booksCheckedOutByAccountWithAuthorArray
    //
    // consumes an account, an array of books, and an array
    // of authors. returns a new array of book objects with the
    // author information included in each book if the account
    // specified has any book currently checked out.
    const accountId = account.id;
    const booksCheckedOutByAccountWithAuthorArray = books.reduce((acc,book) => {
	const { authorId, borrows } = book;
	const borrowedEntry = borrows[0];
	const didAccountBorrow = _includedInBorrowedEntryObject(borrowedEntry,accountId);
	const isBorrowed = _includedInBorrowedEntryObject(borrowedEntry,false);
	
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
    return booksCheckedOutByAccountWithAuthorArray;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
