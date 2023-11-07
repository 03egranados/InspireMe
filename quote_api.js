// Define API and database URLs
const apiUrl = 'https://quotes15.p.rapidapi.com/quotes/random/';
const dbUrl = 'http://localhost:8080/quote_db_connection.php';
// Set up API request headers
const apiHeaders = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '(THIS SHOULD BE YOUR RAPIDAPI KEY)',
    'X-RapidAPI-Host': 'quotes15.p.rapidapi.com',
  }
};
// Get DOM elements for various parts of the page
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const saveQuoteBtn = document.getElementById('saveQuoteBtn');
const dbQuotesContainer = document.getElementById('dbQuotes');

// Add an event listener to the "New Quote" button
newQuoteBtn.addEventListener('click', fetchNewQuote);
// Function to fetch a new quote from the API
function fetchNewQuote() {
  fetch(apiUrl, apiHeaders)
    .then((response) => response.json())
    .then((data) => {
      // Display the quote content and author
      quoteElement.textContent = data.content;
      authorElement.textContent = `— ${data.originator.name}`;
    });
}

// Add an event listener to the "Save Quote" button
saveQuoteBtn.addEventListener('click', saveQuoteToDatabase);
// Function to save a quote from the API to the database
function saveQuoteToDatabase() {
  // Get the quote content and author from the API response
  const apiQuoteContent = quoteElement.textContent;
  const apiQuoteAuthor = authorElement.textContent.substr(2);

  // Send a POST request to the server to save the quote
  fetch('save.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `content=${encodeURIComponent(apiQuoteContent)}&author=${encodeURIComponent(apiQuoteAuthor)}`,
  })
    .then((response) => response.text())
    .then((data) => {
      // Display a message indicating success or failure
      alert(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to fetch and display quotes from the database
function fetchAndDisplayDatabaseQuotes() {
  fetch(dbUrl)
    .then((response) => response.json())
    .then((data) => {
      // Clear the database quotes container
      dbQuotesContainer.innerHTML = '';

      // Loop through the saved quotes and display them
      data.forEach((quote) => {
        const quoteElement = document.createElement('p');
        let content = `${quote.content}`;
        let author = `${quote.author}`;
        quoteElement.textContent = `${content} - ${author}`;

        // Create "Edit" and "Delete" buttons for each quote
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        // Get the record ID from the database
        let recordID = quote.id;

        // Add event listener for editing the quote
        editButton.addEventListener('click', () => {
          openEditDialog(content, author, recordID);
        });

        // Add an event listener to the "Delete" button
        deleteButton.addEventListener('click', () => {
          deleteQuote(recordID);
        });

        // Attach data attributes to the edit button
        editButton.dataset.content = content;
        editButton.dataset.author = author;
        editButton.dataset.id = recordID;

        // Append buttons to the quote element
        quoteElement.appendChild(editButton);
        quoteElement.appendChild(deleteButton);

        // Add the quote element to the database container
        dbQuotesContainer.appendChild(quoteElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// Fetch a new quote and display all database quotes when the page loads
fetchNewQuote();
fetchAndDisplayDatabaseQuotes();

// Global variable to store the currently edited record's ID
let editingRecordID;
// Function to open the edit form with existing content and author
function openEditDialog(content, author, recordID) {
  editingRecordID = recordID; // Store the record ID for editing

  // Create an edit form
  const editForm = document.createElement('div');
  editForm.id = 'editForm'; // Set a unique ID for the form
  editForm.innerHTML = `
    <label for="editedContent">Content:</label>
    <textarea id="editedContent" rows="4">${content}</textarea>
    <br>
    <label for="editedAuthor">Author:</label>
    <input type="text" id="editedAuthor" value="${author}">
    <br>
    <button id="saveEditedQuoteBtn">Save Changes</button>
  `;

  // Append the form to the document body
  document.body.appendChild(editForm);

  // Add an event listener to the "Save Changes" button
  const saveEditedQuoteBtn = document.getElementById('saveEditedQuoteBtn');
  saveEditedQuoteBtn.addEventListener('click', saveEditedQuote);
}

// Function to save the edited quote
function saveEditedQuote() {
  // Get the edited content and author
  const editedContent = document.getElementById('editedContent').value;
  const editedAuthor = document.getElementById('editedAuthor').value;

  console.log('Editing Record ID:', editingRecordID);
  // Send the edited data to the server for updating in the database
  const requestData = {
    recordID: editingRecordID,
    editedContent: editedContent,
    editedAuthor: editedAuthor,
  };

  // Send a POST request to update.php
  fetch('/update.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      console.log('Record updated successfully:', data);

      // Remove the edit form from the document
      const editForm = document.getElementById('editForm');
      if (editForm) {
        editForm.remove();
      }

      // Refresh the displayed database quotes
      fetchAndDisplayDatabaseQuotes();
    })
    .catch((error) => {
      // Handle and log the error
      console.error('Error updating record:', error);
    });
}

// Function to delete a quote from the database
function deleteQuote(recordID) {
  // Send a POST request to delete.php
  fetch('/delete.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: recordID }),
  })
    .then((response) => {
      if (response.ok) {
        // Quote deleted successfully, remove it from the UI
        const quoteElement = document.querySelector(`[data-id="${recordID}"]`);
        if (quoteElement) {
          quoteElement.remove();
        }
      } else {
        // Handle the case where the deletion was not successful
        console.error('Error deleting quote');
      }
    })
    .catch((error) => {
      // Handle any errors, e.g., display an error message
      console.error('Error deleting quote:', error);
    });
};
