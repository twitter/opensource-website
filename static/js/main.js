/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

// set dark theme on twitter timeline widgets and feather components
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.getElementsByTagName('body')[0].classList.add("u-featherBackgroundDark");
    for (const e of document.getElementsByClassName('twitter-timeline')) {
        e.setAttribute('data-theme','dark');
    }
}