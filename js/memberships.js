/**
 * Copyright 2018 Twitter, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

// Remove top border from first membership card

var memberships = document.getElementsByClassName("membership");
var first = memberships[0];
first.classList.add("no-top-border");