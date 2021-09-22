# Copyright 2018 Twitter, Inc.
# SPDX-License-Identifier: Apache-2.0

import os
import operator
import json
import requests

import graphql_queries

PATH_TO_DATA = "data"
GITHUB_USERNAME = os.environ["GH_USERNAME"]
GITHUB_OAUTH_TOKEN = os.environ["OAUTH_TOKEN"]
GITHUB_API_ENDPOINT = "https://api.github.com/graphql"

print("LOG: Assuming the current path to be the root of the metrics repository.")

SVG_NO_OF_MEMBERS = 'N/A'
SVG_NO_OF_REPOS = 'N/A'

def fetch_one_page(query_string, variables):
    """
    Request the GitHub GraphQL API
    """
    headers = {
        "Content-Type": "application/json",
    }
    r = requests.post(GITHUB_API_ENDPOINT, json={"query": query_string, "variables": variables}, auth=(GITHUB_USERNAME, GITHUB_OAUTH_TOKEN))
    if r.status_code == 200:
        return r.json()
    else:
        raise Exception("Error in GitHub API query. Status Code : {}, Response: {}".format(r.status_code, r.json()))

all_org_edges = []  # All the repos in the org with their stats

# Read repos-to-include.txt
all_orgs = []  # Track orgs and all its repos e.g. twitter, twitter
all_repos = []  # Track specific repositories e.g. ('pantsbuild', 'pants')

with open("repos-to-include.txt", "r") as f:
    for line in f:
        owner, repo = line.split("/")
        repo = repo.rstrip("\n")
        if repo == "*":
            all_orgs.append(owner)
        else:
            all_repos.append((owner, repo))

print("LOG: Orgs to track", all_orgs)
print("Repos to track", all_repos)

for org in all_orgs:
    # Combine the paginated responses from the API
    has_next_page = False
    end_cursor = None
    num_of_pages = 0
    while True:
        print("Num of pages", num_of_pages)
        variables = json.dumps({"owner": org, "endCursor": end_cursor})

        print("Sending request for", org)
        response = fetch_one_page(graphql_queries.org_all_repos, variables)
        print("Received request for", org)

        if org == 'twitter':
            SVG_NO_OF_MEMBERS = response["data"]["organization"]["membersWithRole"]["totalCount"]

        repository_edges = response["data"]["organization"]["repositories"]["edges"]
        all_org_edges.extend(repository_edges)

        pageInfo = response["data"]["organization"]["repositories"]["pageInfo"]
        has_next_page = pageInfo["hasNextPage"]
        print("has_next_page", has_next_page)
        end_cursor = pageInfo["endCursor"]
        print("end_cursor", end_cursor)
        num_of_pages += 1
        if not has_next_page:
            break

print("LOG: Fetched all the org repositories. Count:", len(all_org_edges))
# print("LOG: First record")
# print(all_org_edges[0])

# Fetch individual repositories' data

all_repo_edges = []  # All individual repos

for repo in all_repos:
    variables = json.dumps({"owner": repo[0], "repo": repo[1], "endCursor": None})

    response = fetch_one_page(graphql_queries.repo_wise, variables)
    all_repo_edges.append(response["data"])

print("LOG: Fetched all the individual repos as well. Count:", len(all_repo_edges))

# Repos to exclude
repos_to_exclude = set()
with open("repos-to-exclude.txt", "r") as f:
    for line in f:
        repo = line.rstrip("\n")
        repos_to_exclude.add(repo)

print("LOG: Removing private repositories")

public_repos = []
for edge in all_org_edges:
    if not edge["node"]["isPrivate"]:
        public_repos.append(edge)
for edge in all_repo_edges:
    if not edge["repository"]["isPrivate"]:
        public_repos.append({'node': edge['repository']})

SVG_NO_OF_REPOS = len(public_repos)
print("LOG: Number of public repos", len(public_repos))

DATA_JSON = {}
for repo in public_repos:
    repo_full_name = repo["node"]["nameWithOwner"]
    if repo_full_name in repos_to_exclude:
        print("LOG: Excluding", repo_full_name)
        continue
    DATA_JSON[repo_full_name] = repo["node"]

    # Flatten list of languages
    languages_dict = {}
    for item in DATA_JSON[repo_full_name]["languages"]["edges"]:
        languages_dict[item["node"]["name"]] = item["size"]
    total_bytes = sum(languages_dict.values())
    for lang in languages_dict:
        languages_dict[lang] /= total_bytes  # This is got to be a float, so use Python 3

    # Use languages which have more than 5% code
    languages = []
    for item, value in languages_dict.items():
        if value > 0.05:
            languages.append(item)

    DATA_JSON[repo_full_name]["languages"] = " ".join(languages)

    # Flatten list of repository topics
    _topics = DATA_JSON[repo_full_name]["repositoryTopics"]["edges"]
    topics = []
    for item in _topics:
        topics.append(item["node"]["topic"]["name"])
    DATA_JSON[repo_full_name]["repositoryTopics"] = " ".join(topics)

    # Flatten stars count and watch count
    DATA_JSON[repo_full_name]["stargazers"] = DATA_JSON[repo_full_name]["stargazers"]["totalCount"]
    DATA_JSON[repo_full_name]["watchers"] = DATA_JSON[repo_full_name]["watchers"]["totalCount"]

# Save to _data directory
file_path = PATH_TO_DATA + "/" + "projects.json"
with open(file_path, "w+") as f:
    json.dump(DATA_JSON, f, sort_keys=True, indent=2)
print("LOG: Saved to", file_path)


# Update the SVG
print("No of members", SVG_NO_OF_MEMBERS)
print("No of repos", SVG_NO_OF_REPOS)
network_svg = open("static/assets/network_raw.svg").read()
network_svg = network_svg.replace("{$members}", str(SVG_NO_OF_MEMBERS))
network_svg = network_svg.replace("{$Repos}", str(SVG_NO_OF_REPOS))
with open("static/assets/network.svg", "w+") as f:
    f.write(network_svg)
print("LOG: assets/network.svg updated!")
