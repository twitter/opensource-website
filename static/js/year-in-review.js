/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

// Insert date range for header
let date = new Date();
let month = date.toLocaleString('default', { month: 'short' });
let currYear = date.getFullYear();
let prevYear = currYear - 1;

let dateRange = document.getElementById("date-range");
dateRange.innerText = month + " " + prevYear + " - " + month + " " + currYear;

// Insert top 10 repos
function renderTopRepos(reposList) {
    let topTenRepos = reposList.slice(0, 10);
    var topTenReposTable = document.getElementById("top-10-repos");
    var num = 1;

    for (var repo of topTenRepos) {
        // Row
        var row = document.createElement('tr');
        row.className = "content";

        // Number
        var numData = document.createElement('td');
        numData.className = "num";
        numData.innerHTML = num;
        num++;
        row.appendChild(numData);

        // Repo name
        var repoData = document.createElement('td');
        repoData.className = "repo";

        var repoLink = document.createElement('a');
        repoLink.innerHTML = repo.name;
        repoLink.href = "https://github.com/twitter/" + repo.name;
        repoLink.target = "_blank";
        repoLink.rel = "noopener";
        
        repoData.appendChild(repoLink);
        row.appendChild(repoData);

        // Commit count
        var commitCountData = document.createElement('td');
        commitCountData.className = "commit-value";
        commitCountData.innerHTML = formatNum(repo.commitCount);
        row.appendChild(commitCountData);

        topTenReposTable.appendChild(row);
    }
}

renderTopRepos(allRepos);

// Svg triggers using intersection observer
// https://alligator.io/js/intersection-observer/
const svgs = document.querySelectorAll('.YIR-wrapper svg');
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
svgs.forEach(image => {
  observer.observe(image);
}, config);

// Media query for Year in Review mobile navigation

// Close nav-menu when menu item clicked (only effects mobile menu)
document.querySelectorAll("#nav-menu a").forEach(e => {
  e.addEventListener("click", () => {
    document.getElementById('nav-menu').classList.remove('active')
  })
});

// polyfill smooth scrolling if needed
if (!('scrollBehavior' in document.documentElement.style)) {
  Promise.all([
    import('https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js'),
    import('https://unpkg.com/smoothscroll-anchor-polyfill')
  ])
  .then(([smoothscrollPolyfill]) => {
    smoothscrollPolyfill.polyfill();
  });
}
