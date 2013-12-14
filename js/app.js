/*global jQuery,can*/
(function($, can){
  "use strict";

  /**
   * Repository contributor model
   * @type {*|void}
   */
  var Contributor = can.Model.extend({
    findAll: function(params){
      return $.ajax({
        url: params.url,
        type: 'get',
        dataType: 'json'
      });
    }
  }, {});

  /**
   * eKnight Github repository model
   * @type {*|void}
   */
  var GithubRepository = can.Model.extend({
    attributes: {
      contributors: 'Models.Contributor.models',
      leaders: 'Models.Contributor.models'
    },
    findOne: function(params){
      return $.ajax({
        url: 'https://api.github.com/repos/hasadna/' + params.name,
        type: 'get',
        dataType: 'json'
      });
    },
    getLastIssue: function(params){
      return $.ajax({
        url: 'https://api.github.com/repos/hasadna/' + params.name + '/issues?per_page=1',
        type: 'get',
        dataType: 'json'
      });
    }
  }, {});

  /**
   * eKnight model
   * @type {*|void}
   */
  var EKnight = can.Model.extend({
    id: "github_repo",
    attributes: {
      repository: 'Models.GithubRepository.models'
    },
    findAll: 'GET data/eknights.json'
  }, {});

  EKnight.List = EKnight.List.extend({
    inGroupsOf: function(n){
      var list = [], group, c;
      this.each(function(item, index) {
        if(index % n === 0){
          group = [];
          list.push(group);
        }
        group.push(item);
      });
      return new can.List(list);
    }
  });

  /**
   * eKnights control. Renders eKnights to page
   * @type {*|void}
   */
  var EKnightsControl = can.Control.extend({
    init: function( element, options ) {
      var _this = this;
      EKnight.findAll({}).then(function(eKnights){
        _this.element.html(can.view('templates/eKnights.ejs', {eKnights: eKnights.inGroupsOf(2)}));
        _this.updateEKnightsFromGithub(eKnights);
      });
    },
    /**
     * Update each eKnight's data from Github
     * @param eKnights list of eKnight models to update
     */
    updateEKnightsFromGithub: function(eKnights){
      var _this = this;
      $.each(eKnights, function(index, eKnight){
        _this.updateEKnightFromGithub(eKnight);
      });
    },
    /**
     * Update eKnight data from Github, including repository and contributors data
     * @param eKnight eKnight model instance to update
     */
    updateEKnightFromGithub: function(eKnight){
      GithubRepository.findOne({name: eKnight.github_repo}).then(function(repo){
        Contributor.findAll({url: repo.contributors_url}).then(function(contributors){
          var leaders = contributors.filter(function(contr){
            return eKnight.leaders.indexOf(contr.login) > -1;
          });
          repo.attr('contributors',contributors);
          repo.attr('leaders',leaders);
          eKnight.attr('repository', repo);
          GithubRepository.getLastIssue({name: repo.name}).then(function(json){
            var index = Math.round((repo.open_issues_count / json[0].number * 100) * 100) / 100;
            repo.attr('help_index', index);
          });
        });
      });
    }
  });

  var eKnightsControl = new EKnightsControl($('.eknights'), {});

}(jQuery, can));