// Insert date range for header
let date = new Date();
let month = date.toLocaleString('default', { month: 'short' });
let currYear = date.getFullYear();
let prevYear = currYear - 1;

let dateRange = document.getElementById("date-range");
dateRange.innerText = month + " " + prevYear + " - " + month + " " + currYear;

// Typing effect on header
new TypeIt('#type', {
    cursor: false,
    speed: 40,
}).go();

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
        repoData.innerHTML = repo.name;
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

// SVG TRIGGERS USING INTERSECTION OBSERVER
const svgs = document.querySelectorAll('svg');

observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // in view
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('in-view');
      // console.log(entry.target.classList)
    // outside of view
    } else {
      entry.target.classList.remove('in-view');
      // console.log(entry.target.classList)
    }
  });
});

svgs.forEach(image => {
  observer.observe(image);
});



// SMOOTH SCROLLING SECTIONS
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});