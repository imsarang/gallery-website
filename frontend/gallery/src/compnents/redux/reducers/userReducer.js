import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    username:null,
    loggedIn : false,
    profile_pic:null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
        USER_LOGIN : (state,action)=>{
          state.username = action.payload.username
          state.loggedIn = action.payload.loggedIn
        },
        USER_LOGOUT:state=>{
            state.username= null
            state.loggedIn = false
        },
        USER_PROFILE_PIC : (state,action)=>{
          state.profile_pic = action.payload.profile_pic
        }
  }
});

export const {USER_LOGIN,USER_LOGOUT,USER_PROFILE_PIC} = userSlice.actions

export default userSlice.reducer
export const selectUserName = (state)=>state.user.username
export const check_logged_in = (state)=>state.user.loggedIn
export const profile_Pic = (state)=>state.user.profile_pic
