function getTotalBooksCount(books) {
    // function(array) -> number
    // - consumes: booksArray
    // - returns: numberOfBookObjects
    //
    // consumes an array of book objects
    // and returns the number of book
    // objects in the array
    return books.length;
}

function getTotalAccountsCount(accounts) {
    // function(array) -> number
    // - consumes: accountsArray
    // - returns: numberOfAccountObjects
    //
    // consumes an array of account objects
    // and returns the number of account
    // objects in the array
    return accounts.length;
}

function getBooksBorrowedCount(books){
    // function(array) -> number
    // - consumes: booksArray
    // - returns: numberOfBooksCheckedOut
    //
    // consumes an array of books objects
    // and returns the number of book
    // objects where 'book.borrows[0].returned'
    // is 'false'
    return books.filter(({ borrows }) => borrows[0].returned === false).length;
}

// HELPER FUNCTION
function _topFiveSortedBookOrAuthorEntriesArray(bookOrAuthorArray) {
    // function(arrayOfArrays) -> arrayOfArrays
    // - consumes: bookOrAuthorArrayOfArrays
    // - returns: sortedBookOrAuthorArrayOfArrays
    //
    //   [ [ e, 1 ], [ e, 2 ], ...arrElemN ] ->
    //
    //   [ [ e, 2 ], [ e, 1 ], ...arrElem5 ]
    //
    // Consumes an array of book or author arrays and
    // sorts the array elements by count. The array
    // is returned with elements in ascending order
    // with the top 5 array elements present
    return bookOrAuthorArray.sort(([elem1, elem2],[elem3, elem4]) => {
	return elem4 - elem2;
    }).slice(0,5);
}

// HELPER FUNCTION
function _mapBookOrAuthorEntriesToObjects(booksArray, authorsArray = []) {
    // function(arrayOfArrays) -> arrayOfObjects
    // - consumes: bookOrAuthorArrayOfArrays
    // - returns: bookOrAuthorArrayOfObjects
    //
    //   [ [ tag, count], ...arrN ] ->
    //
    //   [ { 'name':tag, 'count':count }, ...objN ] 
    //
    // Consumes an array of book or author arrays
    // and converts each top-level element to an
    // object, returning a new array of objects
    //
    // If authorsArray isn't passed; then mapBooksArray
    // is returned; otherwise mapAuthors array is returned
    const mapBookArray = booksArray.map((elem) => {
	const name = elem[0];
	const count = elem[1];
	const object = { name, count };
	
	return object;
    });

    
    const mapAuthorArray =  booksArray.map((entry) => {
	let object = {}
	authorsArray.forEach(({ id, name: { first, last } }) => {
	    const authorId = Number(entry[0]);
	    const count = entry[1];
	    
	    if (authorId === id) {
		object.name =`${first} ${last}`;
		object.count = count;
		return object;
	    }
	});
	return object;
    });

    return authorsArray.length === 0
	? mapBookArray
	: mapAuthorArray
}

function getMostCommonGenres(books) {
    // function(array) -> array
    // - consumes: booksArray
    // - returns: topFivePopularGenresArray
    //
    // consumes an array of book objects and
    // returns an new array of objects with
    // each object containing a 'name:genre'
    // pair and a 'count:count' pair, sorted
    // by the top 5 genres based on count 
    const  genresByCountObject = books.reduce((acc, { genre }) => {
	acc[genre]
	    ? acc[genre] += 1
	    : acc[genre] = 1
	return acc;
    },{});

    const genresByCountArray = Object.entries(genresByCountObject);
    const sortedGenresByCountArray = _topFiveSortedBookOrAuthorEntriesArray(genresByCountArray);
    const topFivePopularGenresArray = _mapBookOrAuthorEntriesToObjects(sortedGenresByCountArray);

    return topFivePopularGenresArray;
}

function getMostPopularBooks(books) {
    // function(array) -> array
    // - consumes: booksArray
    // - returns: topFivePopularBooksArray
    //
    // consumes an array of book object and
    // returns a new array of objects with
    // each object containing a 'name:title'
    // pair and a 'count:count' pair, sorted
    // by the top five titles based on count
    const borrowCountsByBookArray = books.reduce((acc, { title, borrows }) => {
	const count = borrows.length;
	const entry = [title,count];
	acc.push(entry);
	return acc;
    },[]);
    
    const sortedBorrowCountsByBookArray = _topFiveSortedBookOrAuthorEntriesArray(borrowCountsByBookArray);
    const topFivePopularBooksArray = _mapBookOrAuthorEntriesToObjects(sortedBorrowCountsByBookArray);

    return topFivePopularBooksArray;
}

function getMostPopularAuthors(books, authors) {
    // function(array, array) -> array
    // - consumes: booksArray,authorsArray
    // - returns: topFivePopularAuthorsArray
    //
    // consumes an array of book objects and
    // and array of author objects, returning
    // a new array of objects with each object
    // containing a 'name:authorName' pair, and
    // a 'count:count' pair. It is sorted by the
    // top 5 authors based on count
    const authorsByBorrowsObject = books.reduce((acc, { authorId, borrows }) => {
	const count = borrows.length
	acc[authorId]
	    ? acc[authorId] += count
	    : acc[authorId] = count
	return acc;
    },{});
    
    const authorsByBorrowsArray = Object.entries(authorsByBorrowsObject);
    const sortedAuthorsByCountArray = _topFiveSortedBookOrAuthorEntriesArray(authorsByBorrowsArray);
    const topFivePopularAuthorsArray = _mapBookOrAuthorEntriesToObjects(sortedAuthorsByCountArray, authors);

    return topFivePopularAuthorsArray;
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};
