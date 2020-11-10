var getGithubURL = function(tool) {
    return tool.code_url
}

var getHomepageURL = function(tool) {
    return tool.project_url
}

/* Create tool cards */
var renderTools = function(toolsList, searchString="") {
    // Parent div to hold all the tool cards
    var mainDiv = document.getElementsByClassName("all-tools")[0]

    // Refer this for DOM manipulation with JS https://stackoverflow.com/questions/14094697/how-to-create-new-div-dynamically-change-it-move-it-modify-it-in-every-way-po
    if (toolsList.length > 0) {
        for (var tool of toolsList) {
            // Div for each tool
            var toolDiv = document.createElement('div')
            toolDiv.className = "Grid-cell u-size1of3 tool-card"

            // Tool Name
            var nameDiv = document.createElement('h1')
            nameDiv.className = "tool-name small-margin"
            nameDiv.innerHTML = tool.name
            toolDiv.appendChild(nameDiv)

            // Color-coded border
            var colorDiv = document.createElement('div')
            colorDiv.className = "border small-margin"
            colorDiv.style = "border-bottom-color: " + stringToColour(tool.category_name)
            toolDiv.appendChild(colorDiv)

            // Tool Description (HTML version)
            var descriptionDiv = document.createElement('div')
            descriptionDiv.className = "tool-description xsmall-margin"
            descriptionDiv.innerHTML = tool.description
            toolDiv.appendChild(descriptionDiv)

            // Category
            var categoryDiv = document.createElement('p')
            categoryDiv.className = "category"
            categoryDiv.innerHTML = tool.category_name
            categoryDiv.style = "color: "  + stringToColour(tool.category_name)
            toolDiv.appendChild(categoryDiv)

            // Whitespace
            var whitespaceDiv = document.createElement('div')
            whitespaceDiv.className = "whitespace"
            toolDiv.appendChild(whitespaceDiv)

            // Tool Links
            var toolLinksDiv = document.createElement('div')
            toolLinksDiv.className = "tool-links"

            // Website link (with clause)
            var homepageURL = getHomepageURL(tool)
            var websiteLink = document.createElement('a')
            websiteLink.href = homepageURL
            websiteLink.innerHTML = "Website"
            websiteLink.target = "_blank"
            toolLinksDiv.appendChild(websiteLink)
            
            // GitHub link
            var githubLink = document.createElement('a')
            githubLink.href = getGithubURL(tool)
            githubLink.innerHTML = "GitHub"
            githubLink.target = "_blank"
            toolLinksDiv.appendChild(githubLink)                   


            toolDiv.appendChild(toolLinksDiv)

            /* Finally Add the tool card to the page */
            mainDiv.appendChild(toolDiv)
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

// Sort the tools
var sortFunction = function(a, b) {
    // Sort by recently pushedAt
    var deltaA = (new Date) - Date.parse(a.pushedAt)
    var deltaB = (new Date) - Date.parse(b.pushedAt)
    return deltaA>=deltaB?1:-1
}

// Sort and Render
allTools.sort(sortFunction)
renderTools(allTools)


/* Search implementation starts */
var searchResult = allTools  // Search Result initialization

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
    var newToolsList = []
    var searchString = searchBox.value.trim()
    searchResult = findMatches(searchString, allTools)

    // Remove all the tools
    var mainDiv = document.getElementsByClassName("all-tools")[0]
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild)
    }

    var noResultContainer = document.getElementsByClassName("no-results-container")[0]
    while (noResultContainer.firstChild) {
        noResultContainer.removeChild(noResultContainer.firstChild)
    }

    for (var item of searchResult) {
        newToolsList.push(item)
    }
    renderTools(newToolsList, searchString=searchBox.value)
})

/* Search implementation ends */

// Media queries for tools grid
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
        addClassByClass("tool-card", "u-size1of3")
        removeClassByClass("tool-card", "u-size1of2")
    } else {
        removeClassByClass("tool-card", "u-size1of3")
    }
}

// 2 columns
function twoColumn(mediaQuery) {
    if (mediaQuery.matches) {
        addClassByClass("tool-card", "u-size1of2")
        removeClassByClass("tool-card", "u-size1of3")
    } else {
        removeClassByClass("tool-card", "u-size1of2")
    }
}

// 1 column
function oneColumn(mediaQuery) {
    if (mediaQuery.matches) {
        removeClassByClass("tool-card", "u-size1of3")
        removeClassByClass("tool-card", "u-size1of2")
    }
}

function stringToColour(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}