/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

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