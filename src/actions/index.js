export const setBooks = (books) => ({
    type: 'SET_BOOKS',
    books
});

export const addFavorite = (readingList) => ({
  type: 'SET_READING_LIST',
  readingList
})