Inspire Me - Simple Quote Management App
Git Repo URL - https://github.com/03egranados/InspireMe
Author - Emanuel Granados

Files:
-------
README.txt - This is a text file that you are reading and contains the documentation and instructions of the project. It can provide an overview, installation guidelines, usage instructions, and any other relevant information.
index.html - This is the main HTML file of the project. It represents the web page that users will interact with. It contains the structure and content of the web application.
style.css - This CSS file is used to define the styling and layout of the web page. It determines how the HTML elements should be displayed, such as fonts and colors.
quote_api.js - This JavaScript file is responsible for all requests and actions of web page. 
quote_db_connection.php - This PHP file is used to connect to the database. It handles a database connection and retrieves all quotes from the database.
save.php - This PHP file handles the process of saving quotes to the database. It receives data, such as quote content and author, from the web page and inserts it into the database.
edit.php - This PHP file manages the editing of quotes in the database from the web front. It's used when you want to modify existing quotes. It interacts with the database to update records.
update.php - Similar to "edit.php," this PHP file is used to take the edits and update the records in the database. 
delete.php - This PHP file handles deleting quotes from the database. It removes records from the database based on the provided ID of the quote.

TechStack Used:
----------------
MacOS - Operating System
Apache2 - Web Server
MySQL - Database
PHP - Programming Language 

Description:
-------------
Inspire Me is a basic web application for generating, saving, editing, and deleting quotes. It consists of a front-end interface for displaying and manipulating quotes from both an external API and a local database. The app allows you to fetch random quotes, save them to the database, edit existing quotes, and delete quotes you no longer want to store.

Features:
---------
1. Generate and display random quotes from an external API. 
(Click "New Quote" to fetch and display a random API generated quote.)

2. Save your favorite quotes to a local database.
(Click "Save Quote" to save the displayed API quote to the local database)

3. Edit existing quotes with customized content and author.
(Click "Edit" on any saved quote to modify its content or author.)

4. Delete quotes from the saved collection.
(Click "Delete" to remove a quote from the database.)

Requirements:
--------------
- RapidAPI Key
- RapidAPI Subscirption to "Quotes" By Martin Svoboda 
- Web server (ex. Apache) to host the application.
- PHP installed for server-side processing.
- A MySQL database for storing quotes.

Installation:
--------------
1. Download the 'Inspire Me' project files to your web server directory.
2. Create a MySQL database named 'quotes_database' (or your preferred name).
3. Import the 'quotes' table into your database using command-line tools.
4. load this command into your table -> CREATE TABLE quotes (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, content TEXT, author TEXT);
+---------+------+------+-----+---------+----------------+
| Field   | Type | Null | Key | Default | Extra          |
+---------+------+------+-----+---------+----------------+
| id      | int  | NO   | PRI | NULL    | auto_increment |
| content | text | YES  |     | NULL    |                |
| author  | text | YES  |     | NULL    |                |
+---------+------+------+-----+---------+----------------+
5. adjust the database connection settings in 'quote_db_connection.php' and 'update.php' accordingly to your set up.
6. Open your web browser and access the application.


Feel free to use, modify, and distribute this open-source project.
Enjoy using Inspire Me to discover and manage your favorite quotes!
