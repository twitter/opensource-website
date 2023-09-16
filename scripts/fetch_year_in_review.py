# Copyright 2018 Twitter, Inc.
# SPDX-License-Identifier: Apache-2.0

"""
Aggregate Summary

API: /repo-groups/:repo_group_id/aggregate-summary

Returns the current count of watchers, stars, and forks and the counts of all commits,
committers, and pull requests merged between a given beginning and end date (default between
now and 365 days ago).

Update _metadata/augur/aggregate_summary.json
"""

import datetime
import json
import os

import requests


API_ENDPOINT = "http://newtwitter.augurlabs.io/api/unstable"
PATH_TO_METRICS_DATA = "data"
DATESTAMP = datetime.datetime.now().date().isoformat()

print("LOG: Assuming the current path to be the root of the metrics repository.")

AGGREGATE_SUMMARY = {}
aggregate_summary_json_file = f"{PATH_TO_METRICS_DATA}/augur/aggregate_summary.json"
if os.path.exists(aggregate_summary_json_file):
  with open(aggregate_summary_json_file) as f:
    AGGREGATE_SUMMARY = json.load(f)

# the repo_group_id for Twitter org is 25155
print(f"Sending request to {API_ENDPOINT}/repo-groups/25155/aggregate-summary")
r = requests.get(f"{API_ENDPOINT}/repo-groups/25155/aggregate-summary")
try:
  if r.ok:
    print("OK!")
    AGGREGATE_SUMMARY = r.json()
  else:
    print(f"Error! Response code {r.status_code}")
    print(r.content.decode("utf-8"))
except Exception as e:
  print(f"Error: Something went wrong with aggregate summary - {e}")

with open(aggregate_summary_json_file, "w+") as f:
  json.dump(AGGREGATE_SUMMARY, f)
