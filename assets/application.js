(function ($) {
  function addRecentlyUpdatedRepo(repo) {
    var $item = $("<li>");
    $item.append('<span class="name"><a href="' + repo.html_url + '">' + repo.name + '</a></span>');
    $item.append('<span class="time"><a href="' + repo.html_url + '/commits">' + strftime("%h %e, %Y", repo.pushed_at) + '</a></span>');
    $item.append('<span class="bullet">&sdot;</span>');
    $item.append('<span class="watchers"><a href="' + repo.html_url + '/watchers">' + repo.watchers + ' watchers</a></span>');
    $item.append('<span class="bullet">&sdot;</span>');
    $item.append('<span class="forks"><a href="' + repo.html_url + '/network">' + repo.forks + ' forks</a></span>');
    $item.appendTo("#recently-updated-repos");
  }

  function addProject(project) {
    var $project = $("<div>").addClass("project");
    $project.addClass(project.language);
    $project.append($("<h2>").text(project.name));
    $project.append($("<h3>").text(project.language));
    $project.append($("<p>").text(project.description));
    $project.appendTo("#projects");
  }

  $.getJSON("https://api.github.com/users/twitter/repos?callback=?", function (result) {
    var repos = result.data;

    $(function () {
      $("#num-repos").text(repos.length);

      // Convert pushed_at to Date.
      $.each(repos, function (i, repo) {
        repo.pushed_at = new Date(repo.pushed_at);
      });

      // Sort by most # of watchers.
      repos.sort(function (a, b) {
        if (a.watchers < b.watchers) return 1;
        if (b.watchers < a.watchers) return -1;
        return 0;
      });

      $.each(repos, function (i, repo) {
        addProject(repo);
      });

      // Sort by most-recently pushed to.
      repos.sort(function (a, b) {
        if (a.pushed_at < b.pushed_at) return 1;
        if (b.pushed_at < a.pushed_at) return -1;
        return 0;
      });

      $.each(repos.slice(0, 3), function (i, repo) {
        addRecentlyUpdatedRepo(repo);
      });
    });
  });

  $.getJSON("https://api.github.com/orgs/twitter/members?callback=?", function (result) {
    var members = result.data;

    $(function () {
      $("#num-members").text(members.length);
    });
  });

})(jQuery);
