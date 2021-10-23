/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

// Insert top 10 repos
function renderTopRepos(reposList) {
    const topTenRepos = reposList.sort((a,b) => b.commitCount-a.commitCount).slice(0, 10);
    const topTenReposTable = document.getElementById("top-10-repos");
    let num = 1;

    topTenRepos.forEach(repo => {
        // Row
        const row = document.createElement('tr');
        row.className = "content";

        // Number
        const numData = document.createElement('td');
        numData.className = "num";
        numData.innerHTML = num;
        num++;
        row.appendChild(numData);

        // Repo name
        const repoData = document.createElement('td');
        repoData.className = "repo";

        const repoLink = document.createElement('a');
        repoLink.innerHTML = repo.name;
        repoLink.href = "https://github.com/twitter/" + repo.name;
        repoLink.target = "_blank";
        repoLink.rel = "noopener";
        
        repoData.appendChild(repoLink);
        row.appendChild(repoData);

        // Commit count
        const commitCountData = document.createElement('td');
        commitCountData.className = "commit-value";
        commitCountData.innerHTML = repo.commitCount;
        row.appendChild(commitCountData);

        topTenReposTable.appendChild(row);
    })
}

renderTopRepos(allRepos);

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
