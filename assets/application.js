(function ($, undefined) {
  // Put custom repo URL's in this object, keyed by repo name.
  var repoUrls = {
    "bootstrap": "http://twitter.github.com/bootstrap/",
    "hogan.js": "http://twitter.github.com/hogan.js/"
  };

  function repoUrl(repo) {
    return repoUrls[repo.name] || repo.html_url;
  }

  // Put custom repo descriptions in this object, keyed by repo name.
  var repoDescriptions = {
    "bootstrap": "Bootstrap is a toolkit from Twitter designed to kickstart development of webapps and sites. It includes base CSS and HTML for typography, forms, buttons, tables, grids, navigation, and more.",
    "chainsaw": "Chainsaw is a thin Scala wrapper on top of SLF4J. It provides support for var-args and for lazy args, and for easily creating Logger instances.",
    "configgy": "Configgy is a library for handling config files and logging for a scala daemon. The idea is that it should be simple and straightforward, allowing you to plug it in and get started quickly.",
    "finagle": "Finagle is an asynchronous network stack for the JVM that you can use to build asynchronous Remote Procedure Call (RPC) clients and servers in Java, Scala, or any JVM-hosted language. Finagle provides a rich set of tools that are protocol independent.",
    "flockdb": "FlockDB is a distributed directed graph store built with Gizzard on MySQL. It's useful for storing and retrieving relationship edges between entities and their intersections. Twitter uses it to store user to user, user to tweet, and tweet to tweet relationships.",
    "gizzard": "Gizzard is a flexible sharding framework for creating eventually-consistent distributed datastores. It allows for easier scaling of any data storage system, e.g. MySQL or Redis. Twitter uses it to store tweets, relationships, and timeline data.",
    "gizzmo": "Gizzmo is a command line tool for managing Gizzard clusters. It is used to create tables, sharding structures and topologies in Gizzard. Twitter uses it to manage all our clusters.",
    "haplocheirus": "Haplocheirus is a Redis-backed storage engine for timelines.",
    "kestrel-client": "kestrel-client is a library that allows you to talk to a Kestrel queue server from ruby. As Kestrel uses the memcache protocol, kestrel-client is implemented as a wrapper around the memcached gem.",
    "naggati2": 'Naggati (Inuktitut for "make fit") is a protocol builder for netty, using scala 2.8.',
    "pycascading": "PyCascading is a Python wrapper for Cascading that allows you to control the full data processing workflow from Python.",
    "sbt-scrooge": "sbt-scrooge is an sbt plugin that adds a mixin for doing thrift code auto-generation during your compile phase."
  };

  function repoDescription(repo) {
    return repoDescriptions[repo.name] || repo.description;
  }

  function addRecentlyUpdatedRepo(repo) {
    var $item = $("<li>");
    $item.append('<span class="name"><a href="' + repoUrl(repo) + '">' + repo.name + '</a></span>');
    $item.append('<span class="time"><a href="' + repo.html_url + '/commits">' + strftime("%h %e, %Y", repo.pushed_at) + '</a></span>');
    $item.append('<span class="bullet">&sdot;</span>');
    $item.append('<span class="watchers"><a href="' + repo.html_url + '/watchers">' + repo.watchers + ' watchers</a></span>');
    $item.append('<span class="bullet">&sdot;</span>');
    $item.append('<span class="forks"><a href="' + repo.html_url + '/network">' + repo.forks + ' forks</a></span>');
    $item.appendTo("#recently-updated-repos");
  }

  function addRepo(repo) {
    var $item = $("<li>").addClass("repo grid-1 " + repo.language.toLowerCase());
    var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
    $link.append($("<h2>").text(repo.name));
    $link.append($("<h3>").text(repo.language));
    $link.append($("<p>").text(repoDescription(repo)));
    $item.appendTo("#repos");
  }

  $.getJSON("https://api.github.com/users/twitter/repos?callback=?", function (result) {
    var repos = result.data;

    $(function () {
      $("#num-repos").text(repos.length);

      // Convert pushed_at to Date.
      $.each(repos, function (i, repo) {
        repo.pushed_at = new Date(repo.pushed_at);
      });

      // Sort by highest # of watchers.
      repos.sort(function (a, b) {
        if (a.watchers < b.watchers) return 1;
        if (b.watchers < a.watchers) return -1;
        return 0;
      });

      $.each(repos, function (i, repo) {
        addRepo(repo);
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
