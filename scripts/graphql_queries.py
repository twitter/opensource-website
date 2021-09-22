# Copyright 2018 Twitter, Inc.
# SPDX-License-Identifier: Apache-2.0

org_all_repos = """
query ($owner: String!, $endCursor: String) {
  organization(login: $owner) {
    repositories(first: 100, after: $endCursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
      edges {
        node {
          nameWithOwner
          name
          descriptionHTML
          homepageUrl
          isPrivate
          repositoryTopics(first: 50) {
            edges {
              node {
                topic {
                  name
                }
                url
              }
            }
          }
          primaryLanguage {
            name
            color
          }
          languages (first: 50) {
            edges {
              node {
                name
              }
              size
            }
          }
          pushedAt
          forkCount
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
        }
      }
    }
    membersWithRole {
      totalCount
    }
  }
}
"""

repo_wise = """
query ($owner:String!, $repo:String!) {
  repository(owner: $owner, name: $repo) {
    nameWithOwner
    name
    descriptionHTML
    homepageUrl
    isPrivate
    repositoryTopics(first: 50) {
      edges {
        node {
          topic {
            name
          }
          url
        }
      }
    }
    primaryLanguage {
      name
      color
    }
    languages (first: 50) {
      edges {
        node {
          name
        }
        size
      }
    }
    pushedAt
    forkCount
    stargazers {
      totalCount
    }
    watchers {
      totalCount
    }
  }
}
"""
