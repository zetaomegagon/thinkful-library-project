function getTotalBooksCount(books) {
    // function(array) -> number
    // - consumes: booksArray
    // - returns: numberOfBooks
    return books.length;
}

function getTotalAccountsCount(accounts) {
    // function(array) -> number
    // - consumes: accountsArray
    // - returns: numberOfAccounts
    return accounts.length;
}

function getBooksBorrowedCount(books){
    // function(array) -> number
    // - consumes: booksArray
    // - returns: numberOfBooksCheckedOut
    return books.filter(({ borrows }) => borrows[0].returned === false).length;
}

// HELPER FUNCTION
function _topFiveSortedBookOrAuthorEntriesArray(bookOrAuthorArray) {
    // function(arrayOfArrays) -> arrayOfArrays
    // - consumes: bookOrAuthorArrayOfArrays
    // - returns: sortedBookOrAuthorArrayOfArrays
    //
    //   [ [ B, 1 ], [ A, 2 ], ...arrElemN ] ->
    //
    //   [ [ A, 2 ], [ B, 1 ], ...arrElem5 ]
    //
    // Consumes an array of arrays and sorts the array elements
    // by count. The array is returned with elements in ascending order
    // with the top 5 array elements.
    return bookOrAuthorArray.sort(([elem1, elem2],[elem3, elem4]) => {
	return elem4 - elem2;
    }).slice(0,5);
}

// HELPER FUNCTION
function _mapBookOrAuthorEntriesToObjects(books, authors = []) {
    // function(arrayOfArrays) -> arrayOfObjects
    // - consumes: bookOrAuthorArrayOfArrays
    // - returns: bookOrAuthorArrayOfObjects
    //
    //   [ [ tag, count], ...arrN ] ->
    //
    //   [ { 'name':tag, 'count':count }, ...objN ] 
    //
    // Consumes an array of arrays and converts
    // each element to an object, returning a new
    // array of objects


    const mapBookArray = books.map((elem) => {
	    const name = elem[0];
	    const count = elem[1];
	    const object = { name, count };
	    
	    return object;
	});

    
   const mapAuthorArray =  books.map((entry) => {
	let object = {}
	authors.forEach(({ id, name: { first, last } }) => {
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

    if (authors.length === 0) {
	return mapBookArray;
    } else {
	return mapAuthorArray;
    }
}

function getMostCommonGenres(books) {
    // function(array) -> array
    // - consumes: booksArray
    // - returns: topFivePopularGenresArray
    const  genresByCountObject = books.reduce((acc, { genre }) => {
	acc[genre]
	    ? acc[genre] += 1
	    : acc[genre] = 1
	return acc;
    },{});

    const genresByCountArray = Object.entries(genresByCountObject);
    const sortedGenresByCountArray = _topFiveSortedBookOrAuthorEntriesArray(genresByCountArray);

    return _mapBookOrAuthorEntriesToObjects(sortedGenresByCountArray);
}

function getMostPopularBooks(books) {
    // function(array) -> array
    // - consumes: booksArray
    // - returns: topFivePopularBooksArray
    const borrowCountsByBookArray = books.reduce((acc, { title, borrows }) => {
	const count = borrows.length;
	const entry = [title,count];
	acc.push(entry);
	return acc;
    },[]);
    
    const sortedBorrowCountsByBookArray = _topFiveSortedBookOrAuthorEntriesArray(borrowCountsByBookArray);

    return _mapBookOrAuthorEntriesToObjects(sortedBorrowCountsByBookArray);
}

function getMostPopularAuthors(books, authors) {
    // function(array, array) -> array
    // - consumes: booksArray,authorsArray
    // - returns: topFivePopularAuthorsArray
    const authorsByBorrowsObject = books.reduce((acc, { authorId, borrows }) => {
	const count = borrows.length
	acc[authorId]
	    ? acc[authorId] += count
	    : acc[authorId] = count
	return acc;
    },{});
    
    const authorsByBorrowsArray = Object.entries(authorsByBorrowsObject);
    const sortedEntriesArray = _topFiveSortedBookOrAuthorEntriesArray(authorsByBorrowsArray);

    return _mapBookOrAuthorEntriesToObjects(sortedEntriesArray, authors);
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};
