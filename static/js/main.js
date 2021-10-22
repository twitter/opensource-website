/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

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


// Create DOM element for navigation bar
var navBar = document.getElementsByTagName("nav")[0]

// Create DOM element for mobile Twitter Open Source title
var navTitle = document.getElementsByClassName("home-text")[0]


// Media queries

if (matchMedia) {
    var mediaQuery650 = window.matchMedia("(max-width: 650px)")
    lessThan650px(mediaQuery650)
    mediaQuery650.addListener(lessThan650px)
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

// set dark theme on twitter timeline widgets and feather components
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.getElementsByTagName('body')[0].classList.add("u-featherBackgroundDark");
    for (const e of document.getElementsByClassName('twitter-timeline')) {
        e.setAttribute('data-theme','dark');
    }
}
