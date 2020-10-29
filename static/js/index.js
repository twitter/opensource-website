// Changes height of target to newHeight

function changeHeightByClass(target, newHeight) {
    var elements = document.getElementsByClassName(target)
    var i
    for (i = 0; i < elements.length; i++) {
        elements[i].setAttribute("data-height", newHeight)
        elements[i].style.height = newHeight
    }
}

// Creates DOM element for Open Source text on homepage

var textCell = document.createElement('div')
textCell.classList.add("Grid-cell", "u-size5of12", "u-before1of12")
textCell.id = "open-source-text"

var heading = document.createElement("h1")
heading.classList.add("small-title", "mega-margin", "open-source-title")
// Normal text in heading
var headingText = document.createTextNode("Follow Us ")

var link = document.createElement("a")
// Link text in heading
var linkText = document.createTextNode("@TwitterOSS")
link.appendChild(linkText)
link.setAttribute("target", "_blank")
link.setAttribute("href", "https://twitter.com/TwitterOSS")

heading.appendChild(headingText)
heading.appendChild(link)
textCell.appendChild(heading)

// Optional caption after title

// var caption = document.createElement("p")
// caption.classList.add("same-mega-margin")
// var captionText = document.createTextNode("")
// caption.appendChild(captionText)
// textCell.appendChild(caption)

var timeline = document.getElementById("open-source-timeline")
var parent = timeline.parentNode

// Media queries

if (matchMedia) {
    var mediaQuery600 = window.matchMedia("(max-width: 600px)")
    lessThan600px(mediaQuery600)
    mediaQuery600.addListener(lessThan600px)

    var mediaQuery900 = window.matchMedia("(max-width: 900px)")
    lessThan900px(mediaQuery900)
    mediaQuery900.addListener(lessThan900px)
}

//General mobile changes
function lessThan600px(mediaQuery) {
    if (mediaQuery.matches) {
        // Header
        removeClassById("header-text", "u-size7of8")

        // Our Philosophy
        removeClassById("philosophy-text", "u-size4of6")
        removeClassById("philosophy-text", "u-before1of6")
        removeClassById("philosophy-text", "u-after1of6")

        // Removing Columns
        removeClassByClass("timeline-cell", "u-size1of2")
        removeClassByClass("left-text", "u-size5of12")
        removeClassByClass("left-text", "u-after1of12")

        // Timeline Height
        changeHeightByClass("twitter-timeline", "450px")
        
        // Follow Us @TwitterOSS
        parent.insertBefore(textCell, timeline)
        removeClassById("open-source-text", "u-size5of12")
        removeClassById("open-source-text", "u-before1of12")
        addClassById("open-source-text", "center-text")

        // Career
        addClassById("career-text", "center-text")

    } else {
        // Header
        addClassById("header-text", "u-size7of8")

        // Our Philosophy
        addClassById("philosophy-text", "u-size4of6")
        addClassById("philosophy-text", "u-before1of6")
        addClassById("philosophy-text", "u-after1of6")

        // Adding Columns
        addClassByClass("timeline-cell", "u-size1of2")
        addClassByClass("left-text", "u-size5of12")
        addClassByClass("left-text", "u-after1of12")

        // Timeline Height
        changeHeightByClass("twitter-timeline", "700px")

        // Follow Us @TwitterOSS
        parent.insertBefore(textCell, timeline.nextSibling)
        addClassById("open-source-text", "u-size5of12")
        addClassById("open-source-text", "u-before1of12")
        removeClassById("open-source-text", "center-text")

        // Career
        removeClassById("career-text", "center-text")
    }
}

// Our Philosophy - emoji cards
function lessThan900px(mediaQuery) {
    if (mediaQuery.matches) {
        removeClassByClass("emoji-card", "u-size1of3")
        addClassByClass("emoji-card", "sizeFull")
        addClassByClass("emoji-card", "center-margin")
    } else {
        addClassByClass("emoji-card", "u-size1of3")
        removeClassByClass("emoji-card", "sizeFull")
        removeClassByClass("emoji-card", "center-margin")
    }
}

