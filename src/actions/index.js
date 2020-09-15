export const setBooks = (books) => ({
    type: 'SET_BOOKS',
    books
});

export const setList = (listName, idNumbers) => ({
  type: 'SET_LIST',
  listName,
  idNumbers
})

export const addFavorite = (book) => ({
  type: 'ADD_TO_READING_LIST',
  book
})

export const removeFavorite = (id) => ({
  type: 'REMOVE_FROM_READING_LIST',
  id
})