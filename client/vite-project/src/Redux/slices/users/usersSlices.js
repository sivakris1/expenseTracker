import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

//Login
export const loginUserAction = createAsyncThunk(
    "user/login",
    async(payload, {rejectWithValue,getState,dispatch}) =>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            },
        }
        try{
            const {data}  = await axios.post('http://localhost:4990/api/user/login',
                payload,
                config            
            );

            //storing data through cookie
            localStorage.setItem('userInfo',JSON.stringify(data))
             if (data.failed) {
        return rejectWithValue(data.failed); // 👈 Manual rejection
      }
            return data;
        }
        catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
    }

);

//Register
export const registerUserAction = createAsyncThunk(
    'user/register',
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        const config = {
         headers : {
            'Content-Type' : 'application/json'
         },
        }
        try {
            const {data} = await axios.post('http://localhost:4990/api/user/register',
                payload,
                config
            )
            return data
        } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
    }
)

//Profile
export const userProfileAction = createAsyncThunk(
    'user/profile',
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        const userToken = getState()?.users?.userAuth?.token ;

        const config = {
         headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${userToken}`
         },
        }
        try {
            const {data} = await axios.get('http://localhost:4990/api/user/profile',
                config
            )
            return data
        } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
    }
)

//update user
export const updateUserAction = createAsyncThunk(
    'user/update',
    async(payload,{rejectWithValue,getState,dispatch}) =>{

      const userToken = getState()?.users?.userAuth?.token ;

        const config = {
         headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${userToken}`
         },
        }
        try {
            const {data} = await axios.put('http://localhost:4990/api/user/user-update',
                payload,
                config
            )
            return data
        } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
    }
)

const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : undefined
const usersSlices = createSlice({
    name : 'users',
    initialState : {
        auth : 'False',
        userAuth : userLoginFromStorage
    },
   extraReducers: builder => {

// Login
  builder.addCase(loginUserAction.pending, (state, action) => {
    console.log("Login Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

  builder.addCase(loginUserAction.fulfilled, (state, action) => {
    console.log("Login Status: Fulfilled ✅", action.payload);
    state.userAuth = action?.payload;
    state.userLoading = false;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

  builder.addCase(loginUserAction.rejected, (state, action) => {
    console.log("Register Status: ❌", action.payload);
    state.userLoading = false;
    state.userAppErr = action?.payload;
    state.userServerErr = action?.error?.message;
  });

  //Register

   builder.addCase(registerUserAction.pending, (state, action) => {
    console.log("Register Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

  builder.addCase(registerUserAction.fulfilled, (state, action) => {
    console.log("Register Status: Fulfilled ✅", action.payload);
    state.isRegistered = true;
    state.userLoading = false;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

  builder.addCase(registerUserAction.rejected, (state, action) => {
    console.log("Login Status: Rejected ❌", action.payload);
    state.userLoading = false;
    state.userAppErr = action?.payload;
    state.userServerErr = action?.error?.message;
  });


//User Profile
 builder.addCase(userProfileAction.pending, (state, action) => {
    console.log("Register Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

  builder.addCase(userProfileAction.fulfilled, (state, action) => {
    console.log("Register Status: Fulfilled ✅", action.payload);
    state.userProfile = action?.payload;
    state.userLoading = false;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

  builder.addCase(userProfileAction.rejected, (state, action) => {
    console.log("Login Status: Rejected ❌", action.payload);
    state.userLoading = false;
    state.userAppErr = action?.payload;
    state.userServerErr = action?.error?.message;
  });

  //Update User
 builder.addCase(updateUserAction.pending, (state, action) => {
    console.log("Register Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

  builder.addCase(updateUserAction.fulfilled, (state, action) => {
    console.log("Register Status: Fulfilled ✅", action.payload);
    state.updatedprofile = action?.payload;
    state.userLoading = false;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

  builder.addCase(updateUserAction.rejected, (state, action) => {
    console.log("Login Status: Rejected ❌", action.payload);
    state.userLoading = false;
    state.userAppErr = action?.payload;
    state.userServerErr = action?.error?.message;
  });
}



    
    
})

export const usersReducer = usersSlices.reducer