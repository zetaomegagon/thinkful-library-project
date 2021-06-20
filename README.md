# Thinkful Local Library Project

## About this project

This project showcases a dashboard for a local neighborhood library. For the purposes of keeping track of books and trends in borrowing, the dashboard shows:

- which books are available,
- which are currently out,
- and other general statistics about books and library account owners.

## Overview

The Local Library dashboar has three main components:

1. General statistics such as the:
   - total books owned by the library,
   - `   "` books currently borrowed,
   - `   "` accounts registered with the library,
   - and the `top 5` books by `Genre`, `Book`, and `Author`.
   
   These statistics are are produced in `/public/src/home.js`

2. The returned status of a book, as well as details about the book such as:
   - the book author,
   - it's genre,
   - and list of the ten most recent borrowers, with their returned status.

   These details are produced in `/public/src/books.js`.

3. Finally, a listing of accounts subscribed to the library and per account details. Notably:
   - the name of the account owner,
   - a company name,
   - their email address,
   - when the account was created,
   - the amount of time the account owner borrowed a book,
   - and the current book checked out by the account owner.

   These details are produced in `/public/src/accounts.js`.

## Screenshots

### Overall Stats
![Overall Statistics Page](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/images/home.js.png)

### Book Information
![Book Information Page](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/images/books.js.png)

### Account Information
![Account Information Page](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/images/accounts.js.png)
