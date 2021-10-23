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

// import fuse and initialize
let fuse;
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

        // perform initial search with query parameter if present
        if (q = new URL(window.location).searchParams.get("q")) {
            search(q)
        }
        // respond to browser history navigation
        window.addEventListener("popstate", () => {
            q = new URL(window.location).searchParams.get("q")
            search(q)
        })
    })

// perform search on search-box keyup and store in browser history.
searchBox.addEventListener('keyup', function(event) {
    const query = this.value
    search(query)

    // push new query onto history stack
    const url = new URL(window.location)
    if (url.searchParams.get('q') != query) {
        if (query) {
            url.searchParams.set('q', query)
        } else {
            url.searchParams.delete('q')
        }
        pushState(query, url)
    }
})

// debounce wraps a function so that calls will be delayed to prevent repeated
// calls within the specified time window.
const debounce = (fn, timeout = 500) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { fn.apply(this, args); }, timeout);
    }
}

// pushState pushes the new search query onto the browser history on a slight
// delay. This is to prevent every individual keystroke from being pushed onto
// the history stack.
const pushState = debounce((query, url) => {
    window.history.pushState({}, `Projects search: ${query}`, url)
})

// search the project list for the query string and display ranked results.
const search = (query) => {
    searchBox.value = query
    const resultsBox = document.getElementById('results')

    if (!query) {
        // reset all project cards
        projectCards.forEach(card => {
            card.classList.remove("hide")
            card.style.removeProperty("order")
        })
        resultsBox.classList.add("hide")
        return
    }
    const results = fuse.search(query)

    // first, hide all the projects
    projectCards.forEach(card => {
        card.classList.add("hide")
    })


    // show results in ranked order
    let order = 1
    results.forEach(r => {
        const card = document.getElementById(r.item.id)
        card.classList.remove("hide")
        card.style.setProperty("order", order++)
    })

    resultsBox.getElementsByClassName("count")[0].innerText = results.length
    resultsBox.getElementsByClassName("query")[0].innerText = query
    resultsBox.classList.remove("hide")
}
