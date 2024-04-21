/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

const projectCards = Array.from(document.getElementsByClassName("project-card"))
const searchBox = document.getElementById("search-box")

// parse cards to build project list
const projects = []
projectCards.forEach(card => {
    projects.push({
        id: card.id,
        name: card.getElementsByClassName("project-name")[0].innerText,
        description: card.getElementsByClassName("project-description")[0].innerText,
        language: card.getElementsByClassName("project-language")[0].innerText,
    })
})

// Get the necessary elements
const countElement = document.querySelector('#results .count');
const searchBar = document.getElementById('search-bar');

// Function to perform the search and update the count
function performSearch() {
    const searchTerm = searchBox.value.trim().toLowerCase(); // Get the search term
    // Here you would perform your search logic, for demonstration, let's assume you have a list of projects
    const projects = ["Project 1", "Project 2", "Project 3"]; // Example list of projects
    const filteredProjects = projects.filter(project => project.toLowerCase().includes(searchTerm)); // Filter projects based on search term
    const count = filteredProjects.length; // Get the count of filtered projects
    countElement.textContent = count; // Update the count element with the count
}

// Event listener for input in the search box
searchBox.addEventListener('input', () => {
    performSearch(); // Perform search whenever there's an input
});

// Initial search on page load
performSearch();
