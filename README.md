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
   
   These statistics are are produced in [/public/src/home.js](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/src/home.js)

2. The returned status of a book, as well as details about the book such as:
   - the book author,
   - it's genre,
   - and list of the ten most recent borrowers, with their returned status.

   These details are produced in [/public/src/books.js](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/src/books.js).

3. Finally, a listing of accounts subscribed to the library and per account details. Notably:
   - the name of the account owner,
   - a company name,
   - their email address,
   - when the account was created,
   - the amount of time the account owner borrowed a book,
   - and the current book checked out by the account owner.

   These details are produced in [/public/src/accounts.js](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/src/accounts.js).

## Screenshots

### Overall Stats
![Overall Statistics Page](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/images/home.js.png)

### Book Information
![Book Information Page](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/images/books.js.png)

### Account Information
![Account Information Page](https://github.com/zetaomegagon/thinkful-library-project/blob/main/public/images/accounts.js.png)

## Installation

### Requirements

Installing the library dashboard requires the following to be done:
1. cloning this repository locally.
2. installing `nvm` [posix](https://github.com/Neilpang/nvm) | [windows](https://duckduckgo.com/?kae=d&kn=1&kak=-1&kaq=-1&kp=-2&kah=wt-wt&k5=1&kw=w&kax=-1&kau=-1&kaj=m&k1=-1&kav=1&ku=1&kao=-1&kap=-1&kk=-1&kl=us-en&kad=us-en&kg=p&kd=-1&kam=osm&q=installing+nvm+on+windows).
3. using `nvm` to install `node`.

### The install

1. Once the requirements are met, navigate to the cloned repository folder and run the following, which should pull all necessary `node_modules` needed to run the webserver and run the code / display pages:

`npm install`

2. If the node modules install completes without error, you can start the webserver like this:

`npm start`

This will launch a forground process in your shell wich you can kill with `ctrl-c`, or other means.