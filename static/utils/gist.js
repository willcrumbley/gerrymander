import URI from 'urijs';

/*
 * Get the name of the custom gist
 */
const getCustomGistName = (url) => {
  let uri = new URI(url);
  let gist = uri.query(true).gist;
  return gist;
}

/**
 * Given a gist name, fetch it from github
 */
const fetchGist = (gist) => {
  let gist_url = `https://gist.githubusercontent.com/${gist}/raw`;

  return fetch(gist_url, {mode: 'cors'})
    .then((response) => {
      if(response.ok) {
        return response.text();
      } else {
        throw Error(response);
      }
    })
}

module.exports = {fetchGist, getCustomGistName};
