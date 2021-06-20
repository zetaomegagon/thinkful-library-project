const accounts = require("../../test/fixtures/accounts.fixture");
const authors = require("../../test/fixtures/authors.fixture");
const books = require("../../test/fixtures/books.fixture");

function getTotalBooksCount(books) {
    // function(array) -> number
    // - consumes: booksArray
    // - returns: numberOfBooks
    const numberOfBooks = books.length;
    return numberOfBooks;
}

function getTotalAccountsCount(accounts) {
    // function(array) -> number
    // - consumes: accountsArray
    // - returns: numberOfAccounts
    const numberOfAccounts = accounts.length;
    return numberOfAccounts;
}

function getBooksBorrowedCount(books){
    // function(array) -> number
    // - consumes: booksArray
    // - returns: numberOfBooksCheckedOut
    const booksCheckedOut = books.filter(({ borrows }) => borrows[0].returned === false).length;
    const numberOfBooksCheckedOut = booksCheckedOut.length;
    return numberOfBooksCheckedOut;
}

function getMostCommonGenres(books) {
    // function(array) -> array
    // - consumes: booksArray
    // - returns: popularGenres
    //
    // EXPECTED: It returns an array containing five objects or fewer
    //           that represents the most common occurring genres, ordered
    //           from most common to least.
    //
    // ex:
    //
    // [
    // 	{ name: "Nonfiction", count: 9 },
    // 	{ name: "Historical Fiction", count: 7 },
    // 	{ name: "Thriller", count: 7 },
    // 	...
    // ]
    
    
}

function getMostPopularBooks(books) {
    // function(array) -> array
    // - consumes: booksArray
    // - returns: popularBooks
    //
    // EXPECTED: It returns an array containing five objects or fewer
    //           that represents the most popular books in the library.
    //
    //           Popularity is represented by the number of times a book
    //           has been borrowed.

    const getGenresPerBook = books.forEach((book) => console.log(book.genre));
    //books.map(({ genre }) => genre);
    console.log(getGenresPerBook);
    const getCountsByGenreObject = books.reduce((acc, { genre }) => {
	acc[genre]
	    ? acc[genre] += 1
	    : acc[genre] = 1
	return acc;
    },{});
    //console.log(getCountsByGenreObject);
    const getCountsByGenreArray = Object.entries(getCountsByGenreObject);
    //console.log(getCountsByGenreArray);
    const sortedCountsByGenreArray = getCountsByGenreArray.sort(([str1, num1],[str2, num2]) => {
	return num2 - num1;
    });
    //console.log(sortedCountsByGenreArray);
    const generateCountsByGenreArrayObjects = sortedCountsByGenreArray.map((entry) => {
	const name = entry[0];
	const count = entry[1];
	const genreObject = { name, count };

	return genreObject;
    });
    //console.log(sortedCountsByGenreArray);
    const slicedCountsByGenreArray = generateCountsByGenreArrayObjects.slice(0,5)

    //console.log(slicedCountsByGenreArray);
    return slicedCountsByGenreArray;
}

getMostPopularBooks(books);
//console.log(test)

function getMostPopularAuthors(books, authors) {
    // function(array, array) -> array
    // - consumes: booksArray, authorsArray
    // - returns: popularAuthors
    //
    // EXPECTED: It returns an array containing five objects or fewer that
    //           represents the most popular authors whose books have been
    //           checked out the most.
    //
    //           Popularity is represented by finding all of the books written
    //           by the author and then adding up the number of times those books
    //           have been borrowed.
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};
