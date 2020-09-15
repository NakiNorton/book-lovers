import { readingList } from './ReadingList'
import { books } from './Books'
import { lists } from './Lists'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({ 
    books,
    readingList,
    lists
})