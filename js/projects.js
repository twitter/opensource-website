// Put custom repo GitHub URLs in this object, keyed by nameWithOwner repo name.
var customGithubURL = {
    "twitter/pants": "https://github.com/pantsbuild/pants",
}

var getGithubURL = function(project) {
    return customGithubURL[project.nameWithOwner] || 'https://github.com/' + project.nameWithOwner
}


// Put custom repo Website URLs in this object, keyed by nameWithOwner repo name
var customWebsiteURL = {
    "twitter/pants": "https://www.pantsbuild.org/",
}

var getHomepageURL = function(project) {
    return customWebsiteURL[project.nameWithOwner] || project.homepageURL
}

/* Create project cards */
var renderProjects = function(projectsList, searchString="") {
    // Parent div to hold all the project cards
    var mainDiv = document.getElementsByClassName("all-projects")[0]

    // Refer this for DOM manipulation with JS https://stackoverflow.com/questions/14094697/how-to-create-new-div-dynamically-change-it-move-it-modify-it-in-every-way-po
    if (projectsList.length > 0) {
        for (var project of projectsList) {
            // Div for each project
            var projectDiv = document.createElement('div')
            projectDiv.className = "Grid-cell u-size1of3 project-card"

            // Project Name
            var nameDiv = document.createElement('h1')
            nameDiv.className = "project-name small-margin"
            nameDiv.innerHTML = project.name
            projectDiv.appendChild(nameDiv)

            // Color-coded border
            var colorDiv = document.createElement('div')
            colorDiv.className = "border small-margin"
            colorDiv.style = "border-bottom-color: " + project.color
            projectDiv.appendChild(colorDiv)

            // Project Description (HTML version)
            var descriptionDiv = document.createElement('div')
            descriptionDiv.className = "project-description xsmall-margin"
            descriptionDiv.innerHTML = project.description
            projectDiv.appendChild(descriptionDiv)

            // Primary Language
            var languageDiv = document.createElement('p')
            languageDiv.className = "project-language"
            languageDiv.innerHTML = project.primaryLanguage
            projectDiv.appendChild(languageDiv)

            // Whitespace
            var whitespaceDiv = document.createElement('div')
            whitespaceDiv.className = "whitespace"
            projectDiv.appendChild(whitespaceDiv)

            // Project Links
            var projectLinksDiv = document.createElement('div')
            projectLinksDiv.className = "project-links"

            // GitHub link
            var githubLink = document.createElement('a')
            githubLink.href = getGithubURL(project)
            githubLink.innerHTML = "GitHub"
            githubLink.target = "_blank"
            projectLinksDiv.appendChild(githubLink)

            // Website link (with clause)
            var homepageURL = getHomepageURL(project)
            if (homepageURL != "") {
                var websiteLink = document.createElement('a')
                websiteLink.href = homepageURL
                websiteLink.innerHTML = "Website"
                websiteLink.target = "_blank"
                projectLinksDiv.appendChild(websiteLink)
            }

            projectDiv.appendChild(projectLinksDiv)

            // Metrics button
            var metricsButton = document.createElement('button')
            metricsButton.setAttribute("onclick", "window.open('https://opensource.twitter.com/metrics/" + project.nameWithOwner + "/WEEKLY')")
            metricsButton.type = "button"
            metricsButton.className = "Button Button--tertiary"
            metricsButton.innerHTML = "Metrics"
            projectDiv.appendChild(metricsButton)

            /* Finally Add the project card to the page */
            mainDiv.appendChild(projectDiv)
        }
    } else {
        var noResultDiv = document.createElement('div')
        noResultDiv.className = 'no-results'

        var noResultPara = document.createElement('p')
        noResultPara.innerHTML = "No results for " + '<b>' + searchString + '</b>'
        noResultDiv.appendChild(noResultPara)

        var noResultContainer = document.getElementsByClassName("no-results-container")[0]
        noResultContainer.appendChild(noResultDiv)
    }
    // Apply functions that determine how many columns
    if (matchMedia) {
        var mq3 = window.matchMedia("(min-width: 1236px)")
        var mq2 = window.matchMedia("(max-width: 1236px) and (min-width: 850px)")
        var mq1 = window.matchMedia("(max-width: 850px)")
        threeColumn(mq3)
        twoColumn(mq2)
        oneColumn(mq1)
    }
}

// Sort the projects
var sortFunction = function(a, b) {
    // Sort by recently pushedAt
    var deltaA = (new Date) - Date.parse(a.pushedAt)
    var deltaB = (new Date) - Date.parse(b.pushedAt)
    return deltaA>=deltaB?1:-1
}

// Sort and Render
allProjects.sort(sortFunction)
renderProjects(allProjects)


/* Search implementation starts */
var searchResult = allProjects  // Search Result initialization

function findMatches(query, repos) {
  if (query === '') {
      return repos
  } else {
      var options = {
        findAllMatches: true,
        threshold: 0.2,
        location: 0,
        distance: 50,
        maxPatternLength: 50,
        minMatchCharLength: 1,
        keys: [
          "name",
          "languages",
          "description"
        ]
      }
      var fuse = new Fuse(repos, options)
      var result = fuse.search(query)

      // Sort
      result.sort(sortFunction)

      return result
  }
}

var searchBox = document.getElementsByClassName('search-box')[0]

document.addEventListener('keyup', function(event) {
    /* Update the list of results with the search results */
    var newProjectsList = []
    var searchString = searchBox.value.trim()
    searchResult = findMatches(searchString, allProjects)

    // Remove all the projects
    var mainDiv = document.getElementsByClassName("all-projects")[0]
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild)
    }

    var noResultContainer = document.getElementsByClassName("no-results-container")[0]
    while (noResultContainer.firstChild) {
        noResultContainer.removeChild(noResultContainer.firstChild)
    }

    for (var item of searchResult) {
        newProjectsList.push(item)
    }
    renderProjects(newProjectsList, searchString=searchBox.value)
})

/* Search implementation ends */

// Media queries for projects grid
if (matchMedia) {
    var mediaQueryThreeColumn = window.matchMedia("(min-width: 1236px)")
    threeColumn(mediaQueryThreeColumn)
    mediaQueryThreeColumn.addListener(threeColumn)

    var mediaQueryTwoColumn = window.matchMedia("(max-width: 1236px) and (min-width: 850px)")
    twoColumn(mediaQueryTwoColumn)
    mediaQueryTwoColumn.addListener(twoColumn)

    var mediaQueryOneColumn = window.matchMedia("(max-width: 850px)")
    oneColumn(mediaQueryOneColumn)
    mediaQueryOneColumn.addListener(oneColumn)
}

// 3 columns
function threeColumn(mediaQuery) {
    if (mediaQuery.matches) {
        addClassByClass("project-card", "u-size1of3")
        removeClassByClass("project-card", "u-size1of2")
    } else {
        removeClassByClass("project-card", "u-size1of3")
    }
}

// 2 columns
function twoColumn(mediaQuery) {
    if (mediaQuery.matches) {
        addClassByClass("project-card", "u-size1of2")
        removeClassByClass("project-card", "u-size1of3")
    } else {
        removeClassByClass("project-card", "u-size1of2")
    }
}

// 1 column
function oneColumn(mediaQuery) {
    if (mediaQuery.matches) {
        removeClassByClass("project-card", "u-size1of3")
        removeClassByClass("project-card", "u-size1of2")
    }
}

