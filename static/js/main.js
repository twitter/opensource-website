// Functions to add and remove CSS classes

function addClassById(id, className) {
	document.getElementById(id).classList.add(className)
}

function removeClassById(id, className) {
	document.getElementById(id).classList.remove(className)
}

function addClassByClass(target, className) {
    var elements = document.getElementsByClassName(target)
    var i
    for (i = 0; i < elements.length; i++) {
        elements[i].classList.add(className)
    }
}

function removeClassByClass(target, className) {
    var elements = document.getElementsByClassName(target)
    var i
    for (i = 0; i < elements.length; i++) {
        elements[i].classList.remove(className)
    }
}


// Create sticky footer by defining min-height of site wrapper
var site = document.getElementsByClassName("site")[0]
var footer = document.getElementsByClassName("footer")[0]
// Year in Review website does not have a footer
if (footer) {
    var footerHeight = footer.clientHeight
    site.style.minHeight = "calc(100vh - " + footerHeight + "px)"
}

// Create DOM element for navigation bar
var navBar = document.getElementsByTagName("nav")[0]

// Create DOM element for mobile Twitter Open Source title
var navTitle = document.getElementsByClassName("home-text")[0]


// Media queries

if (matchMedia) {
    var mediaQuery650 = window.matchMedia("(max-width: 650px)")
    lessThan650px(mediaQuery650)
    mediaQuery650.addListener(lessThan650px)

    var mediaQuery800 = window.matchMedia("(max-width: 800px)")
    lessThan800px(mediaQuery800)
    mediaQuery800.addListener(lessThan800px)
}

// Breakpoint for mobile navigation
function lessThan650px(mediaQuery) {
    if (mediaQuery.matches) {
        var caret = document.getElementById("caret")
        caret.addEventListener("click", mobileNavigation)
        navTitle.addEventListener("click", mobileNavigation)
    } else {
        navBar.classList.remove("active")
    }
}

// Makes changes for mobile navigation
function mobileNavigation() {
    if (navBar.classList.contains("active")) {
        navBar.classList.remove("active")
    } else {
        navBar.classList.add("active")
    }
}

// Mobile footer
function lessThan800px(mediaQuery) {
    if (mediaQuery.matches) {
        removeClassByClass("footer-cell", "u-size1of4")
    } else {
        addClassByClass("footer-cell", "u-size1of4")
    }
}

