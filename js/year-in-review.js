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

// Insert top 10 repos

var renderTopRepos = function(reposList) {
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
        numData.innerHTML = num.toString();
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
        commitCountData.innerHTML = repo.commitCount;
        row.appendChild(commitCountData);

        topTenReposTable.appendChild(row);
    }
}

renderTopRepos(allRepos);