# Copyright 2018 Twitter, Inc.
# SPDX-License-Identifier: Apache-2.0

"""
Fetch metrics provided by Augur.
https://github.com/osshealth/augur

Progress: https://github.com/twitter/metrics/issues/2
"""

import datetime
import itertools
import json
import os

import pandas as pd
import requests


API_ENDPOINT = "http://newtwitter.augurlabs.io/api/unstable"
PATH_TO_METRICS_DATA = "data"
DATESTAMP = datetime.datetime.now().date().isoformat()

print("LOG: Assuming the current path to be the root of the metrics repository.")
# tracked projects
with open(os.path.join(PATH_TO_METRICS_DATA, "projects_tracked.json")) as f:
    PROJECTS_TRACKED = json.load(f)

"""
Bus Factor

API: /:owner/:repo/bus_factor

The API endpoint is unstable and experimental as of now. There is no guarantee of a result
each time. That's why bus factor is cached as a one time result and frequently
updated. In future, this metric can be included in _data and saved weekly,
once the API becomes reliable.

Update _metadata/augur/bus_factor.json
"""

# BUS_FACTOR = {}
# bus_factor_json_file = f"{PATH_TO_METRICS_DATA}/augur/bus_factor.json"
# if os.path.exists(bus_factor_json_file):
#     with open(bus_factor_json_file) as f:
#         BUS_FACTOR = json.load(f)
#
# for org in PROJECTS_TRACKED['projects']:
#     for repo in PROJECTS_TRACKED['projects'][org]:
#         print(f"Sending request to {API_ENDPOINT}/{org}/{repo}/bus_factor")
#         r = requests.get(f"{API_ENDPOINT}/{org}/{repo}/bus_factor")
#         try:
#             if r.ok:
#                 print("OK!")
#                 bus_factor = r.json()[0]
#                 BUS_FACTOR[f"{org}/{repo}"] = bus_factor
#             else:
#                 print(f"Error! Response code {r.status_code}")
#                 print(r.content.decode("utf-8"))
#         except Exception as e:
#             print(f"Error: Something went wrong with /:owner/:repo/bus_factor - {e}")
#
# with open(bus_factor_json_file, "w+") as f:
#     json.dump(BUS_FACTOR, f)



"""
Code Changes (repo)

API: /repo-groups/:repo_group_id/repos/:repo_id/code-changes

Update _metadata/augur/repo-commits.json
"""


# function to aggregate all sums
def tmp(group_series):
  if (group_series == group_series.iloc[0]).all():
    return group_series.iloc[0]
  else:
    return group_series.sum()


# necessary repo_ids to loop thru
with open(os.path.join(PATH_TO_METRICS_DATA, "repo_ids.json")) as f:
  REPO_IDS = json.load(f)

api_data_commits = []
repo_commits_json_file = f"{PATH_TO_METRICS_DATA}/augur/repo_commits.json"
if os.path.exists(repo_commits_json_file):
  with open(repo_commits_json_file) as f:
    out = json.load(f)

# gets repo_ids for relevant projects in the twitter org
for repo in PROJECTS_TRACKED['projects']['twitter']:
  if len(REPO_IDS[repo]) > 0:
    repo_id = REPO_IDS[repo][0]['repo_id']
  else:
    repo_id = "None"

  # hits endpoint using specific repo_ids
  print(f"Sending request to {API_ENDPOINT}/repo-groups/twitter/repos/{repo_id}/code-changes")
  request = requests.get(f"{API_ENDPOINT}/repo-groups/twitter/repos/{repo_id}/code-changes")
  try:
    if request.ok:
      print("OK!")
      api_data_commits.append(json.loads(request.text))
    else:
      print(f"Error! Response code {request.status_code}")
      print(request.content.decode("utf-8"))
  except Exception as e:
    print(f"Error: Something went wrong with repo_commits - {e}")

# unnest and clean data
unnested_data = list(itertools.chain.from_iterable(api_data_commits))
df = pd.DataFrame(data=unnested_data, columns=unnested_data[0].keys())
df = df.drop("date", axis=1)
df = df.groupby('repo_name').agg(tmp).sort_values('commit_count', ascending=False)
out = df.to_json(orient='index').replace('},{', ',')

with open(repo_commits_json_file, "w") as f:
  f.write(out)
