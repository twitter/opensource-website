/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

var projectCards = Array.from(document.getElementsByClassName("project-card"))

// parse cards to build project list
var projects = []
projectCards.forEach(card => {
    projects.push({
        id: card.id,
        name: card.getElementsByClassName("project-name")[0].innerText,
        description: card.getElementsByClassName("project-description")[0].innerText,
        language: card.getElementsByClassName("project-language")[0].innerText,
    })
})

// import fuse and initialize
var fuse;
import("https://cdnjs.cloudflare.com/ajax/libs/fuse.js/6.4.6/fuse.esm.min.js")
    .then(module => {
        Fuse = module.default
        fuse = new Fuse(projects, {
            findAllMatches: true,
            isCaseSensitive: false,
            threshold: 0.1,
            ignoreLocation: true,
            useExtendedSearch: true,
            keys: [
              "name",
              "description",
              "language",
            ],
        })
    })

document.getElementById("search-box").addEventListener('keyup', function(event) {
    let resultsBox = document.getElementById('results')

    let query = this.value.trim()
    if (!query) {
        // reset all cards
        projectCards.forEach(card => {
            card.classList.remove("hide")
            card.style.removeProperty("order")
        })
        resultsBox.classList.add("hide")
        return
    }
    let results = fuse.search(query)

    // first, hide all the projects
    projectCards.forEach(card => {
        card.classList.add("hide")
    })


    // then show results in relevance order
    let order = 1
    results.forEach(r => {
        var card = document.getElementById(r.item.id)
        card.classList.remove("hide")
        card.style.setProperty("order", order++)
    })

    resultsBox.getElementsByClassName("count")[0].innerText = results.length
    resultsBox.getElementsByClassName("query")[0].innerText = query
    resultsBox.classList.remove("hide")
})
