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

    var $name = $("<a>").attr("href", repoUrl(repo)).text(repo.name);
    $item.append($("<span>").addClass("name").append($name));

    var $time = $("<a>").attr("href", repo.html_url + "/commits").text(strftime("%h %e, %Y", repo.pushed_at));
    $item.append($("<span>").addClass("time").append($time));

    $item.append('<span class="bullet">&sdot;</span>');

    var $watchers = $("<a>").attr("href", repo.html_url + "/watchers").text(repo.watchers);
    $item.append($("<span>").addClass("watchers").append($watchers));

    $item.append('<span class="bullet">&sdot;</span>');

    var $forks = $("<a>").attr("href", repo.html_url + "/network").text(repo.forks + " forks");
    $item.append($("<span>").append($forks));

    $item.appendTo("#recently-updated-repos");
  }

  function addRepo(repo) {
    var $item = $("<li>").addClass("repo grid-1 " + (repo.language || '').toLowerCase());
    var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
    $link.append($("<h2>").text(repo.name));
    $link.append($("<h3>").text(repo.language));
    $link.append($("<p>").text(repoDescription(repo)));
    $item.appendTo("#repos");
  }

  $.getJSON("https://api.github.com/orgs/twitter/repos?callback=?", function (result) {
    var repos = result.data;

    $(function () {
      $("#num-repos").text(repos.length);

      // Convert pushed_at to Date.
      $.each(repos, function (i, repo) {
        repo.pushed_at = new Date(repo.pushed_at);

        var weekHalfLife  = 1.146 * Math.pow(10, -9);

        var pushDelta    = (new Date) - Date.parse(repo.pushed_at);
        var createdDelta = (new Date) - Date.parse(repo.created_at);

        var weightForPush = 1;
        var weightForWatchers = 1.314 * Math.pow(10, 7);

        repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
        repo.hotness += weightForWatchers * repo.watchers / createdDelta;
      });

      // Sort by highest # of watchers.
      repos.sort(function (a, b) {
        if (a.hotness < b.hotness) return 1;
        if (b.hotness < a.hotness) return -1;
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

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  var $flyzone;

  function flyzone() {
    if (!$flyzone) {
      $flyzone = $("<div>").attr("id", "flyzone").prependTo(document.body);
    }

    return $flyzone;
  }

  var sizes = ["smaller", "small", "medium", "large", "fat"];

  var sizeDimensions = {
    "smaller": 20,
    "small": 50,
    "medium": 100,
    "large": 200,
    "fat": 300
  };

  var speeds = ["slow", "medium", "fast"];

  var speedDurations = {
    "slow": 45000,
    "medium": 30000,
    "fast": 20000
  };

  function makeLarry(sizeName, speedName) {
    var size = sizeDimensions[sizeName];
    var top = Math.floor((flyzone().height() - size) * Math.random());

    var $img = $("<img>")
      .addClass("larry size-" + sizeName)
      .attr("src", "assets/larry.png")
      .attr("width", size)
      .attr("height", size)
      .css({
        position: "absolute",
        opacity: Math.random(),
        top: top,
        left: -size
      });

    $img.prependTo(flyzone());

    var left = flyzone().width() + size;
    var speed = speedDurations[speedName];

    $img.animate({left: left}, speed, function () {
      $img.remove();
      makeRandomLarry();
    });

    return $img;
  }

  function makeRandomLarry() {
    var size = randomItem(sizes);
    var speed = randomItem(speeds);
    return makeLarry(size, speed);
  }

  $(function () {
    $("#logo").click(function () {
      makeRandomLarry();
    });
  });

  var match = (/\blarry(=(\d+))?\b/i).exec(window.location.search);

  if (match) {
    var n = parseInt(match[2]) || 20;

    $(function () {
      for (var i = 0; i < n; ++i) {
        setTimeout(makeRandomLarry, Math.random() * n * 500);
      }
    });
  }

})(jQuery);
