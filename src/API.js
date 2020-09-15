const rootUrl = "https://api.nytimes.com/svc/books/v3/";
const key = "api-key=x5EmADYf2iLxSpp6H6EiN4JnZCZ5RMps";

export const fetchBooks = (listName) => {
  return fetch(`${rootUrl}lists/current/${listName}.json?${key}`)
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
}