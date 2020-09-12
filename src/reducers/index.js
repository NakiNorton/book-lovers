import { readingList } from './ReadingList'
import { books } from './Books'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({ 
    books,
    readingList
})