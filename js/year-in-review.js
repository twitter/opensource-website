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
    waitUntilVisible: true,
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

        var repoLink = document.createElement('a');
        repoLink.innerHTML = repo.name;
        repoLink.href = "https://github.com/twitter/" + repo.name;
        repoLink.target = "_blank";
        
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
const svgs = document.querySelectorAll('svg');
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

if (matchMedia) {
  var mediaQuery1080 = window.matchMedia("(max-width: 1080px)")
  lessThan1080px(mediaQuery1080)
  mediaQuery1080.addListener(lessThan1080px)
}

function lessThan1080px(mediaQuery) {
  if (mediaQuery.matches) {
      var caret = document.getElementById("caret")
      caret.addEventListener("click", mobileNavigation)
      navTitle.addEventListener("click", mobileNavigation)

      // If user clicks on a link in the nav-menu, the nav-menu disappears
      var navLinkList = document.getElementsByClassName("nav-link");
      for (var i = 0; i < navLinkList.length; i++) {
        var navLink = navLinkList[i];
        navLink.addEventListener("click", mobileNavigation);
      }
  } else {
      navBar.classList.remove("active")
  }
}

// Smooth scrolling sections
// https://codepen.io/nailaahmad/pen/MyZXVE
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
