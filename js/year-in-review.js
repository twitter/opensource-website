/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

// Svg triggers using intersection observer
// https://alligator.io/js/intersection-observer/
const config = {
  rootMargin: '50px 50px 50px 50px',
  threshold: [0, 0.25, 0.5]
};
observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, config);
document.querySelectorAll('.YIR-wrapper svg').forEach(image => {
  image.classList.remove('in-view');
  observer.observe(image);
});

// show active section in nav menu
const navEntries = document.querySelectorAll('.nav > li')
observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navEntries.forEach(n => {
        if (n.querySelector(`a[href="#${entry.target.id}"]`)) {
          n.classList.add('active')
        } else {
          n.classList.remove('active')
        }
      })
    }
  })
}, {rootMargin: "-50% 0px"})
document.querySelectorAll('section').forEach(e => {
  observer.observe(e);
})

// Close nav-menu when menu item clicked (only effects mobile menu)
document.querySelectorAll("#nav-menu a").forEach(e => {
  e.addEventListener("click", () => {
    document.getElementById('nav-menu').classList.remove('active')
  })
});

// polyfill smooth scrolling if needed
if (!('scrollBehavior' in document.documentElement.style)) {
  Promise.all([
    import('https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js'),
    import('https://unpkg.com/smoothscroll-anchor-polyfill@1.3.2/dist/index.min.js')
  ])
  .then(([smoothscrollPolyfill]) => {
    smoothscrollPolyfill.polyfill();
  });
}
