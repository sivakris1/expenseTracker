import {createAsyncThunk , createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const accountStatisticsAction = createAsyncThunk(
  "account/fetch",
async(payload, {rejectWithValue,getState,dispatch}) =>{
    
  const userToken = getState()?.users?.userAuth?.token ;
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userToken}`
            },
        }
        try{
            const {data}  = await axios.get('http://localhost:4990/api/accounts-statistics',
                payload,
                config            
            );
            return data;
          }
        catch(error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const accountSlice = createSlice({
    name : 'account',
    initialState : {
    },
   extraReducers: builder => {

//fetching account 
builder.addCase(accountStatisticsAction.pending, (state, action) => {
    console.log("acccount Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

builder.addCase(accountStatisticsAction.fulfilled, (state, action) => {
  console.log("account Status: Fulfilled ✅", action.payload);
  state.userLoading = false;
  state.AppErr = undefined;
  state.ServerErr = undefined;
  state.expensesList = action.payload; // ✅ Save new data
});

  builder.addCase(accountStatisticsAction.rejected, (state, action) => {
    console.log("account Status: ❌", action.payload);
    state.userLoading = false;
    state.AppErr = action?.payload;
    state.ServerErr = action?.error?.message;
  });

}
})


export const account = accountSlice.reducer;