import {createSlice} from '@reduxjs/toolkit'

//defining initial state
const initialState = {
    //token will be stored in local storage if created before
    signupData: null,
    loading:false,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state,value){
            state.token = value.payload;
        }
    }
})

export const {setSignupData ,setToken ,setLoading} = authSlice.actions;
export default authSlice.reducer;

/*
setToken: This action creator is exported to be used in components to update the authentication token in the Redux store.
authSlice.reducer: The reducer is exported to be included in the root reducer of the application. This allows the authentication state to be managed globally within the Redux store.
*/