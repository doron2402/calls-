# calls-
Simple nodejs package for measuring response time from an end point


### Features
  - Make N request to specific URL and time the response
  - Support `Authorization` header
  - Support custom user agent

### CLI
  - Example: `node calls.js -interval 10 -url http://www.google.com/a/b -calls 10 -auth nkajsndjnasjdnf.asdf.asdf -agent testing-agent`
  - `url` (String): the url to make the call (Required).
  - `interval` (Number): Number of seconds to wait between the calls (Default 120 seconds).
  - `calls` (Number): Number of calls to make (default to 10 calls).
  - `auth` (String): if `Authorization` header is required use it.
  - `agent` (String): `User-Agent` default to `test`.


### find a bug?
  - Create an issue.
  - Fix it :) and make a pr.
  - Ping me on github or twitter.

