import { createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash-es'
import { jsonParse } from '@/utils'
import { User } from '@/types'
import { UserState } from './userReducer.d'

const userStorage = jsonParse(localStorage.getItem('user')) as User

const initialState: UserState = {
  access_token: '',
  refresh_token: '',
  userId: 0,
  username: '',
  avatar: '',
  sex: 0,
  email: '',
  roles: [],
  isActive: true,
  isBanned: false
}
export const user = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
    ...userStorage
  },
  reducers: {
    login(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    logout(state) {
      state = cloneDeep(initialState)
    },
    updateToken(state, { payload }) {
      const newState = {
        ...state,
        ...payload
      }
      localStorage.setItem('user', JSON.stringify(newState))
      return newState
    }
  }
})

export const { login, logout, updateToken } = user.actions

export default user.reducer
