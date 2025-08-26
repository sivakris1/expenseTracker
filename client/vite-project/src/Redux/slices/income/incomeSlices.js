import {createAsyncThunk , createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const createIncomeAction = createAsyncThunk(
  "income/create",
async(payload, {rejectWithValue,getState,dispatch}) =>{
    
  const userToken = getState()?.users?.userAuth?.token ;
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userToken}`
            },
        }
        try{
            const {data}  = await axios.post('http://localhost:4990/api/income',
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

export const fetchIncomeAction = createAsyncThunk(
  "income/fetch",
async(payload, {rejectWithValue,getState,dispatch}) =>{
    
  const userToken = getState()?.users?.userAuth?.token ;
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userToken}`
            },
        }
        try{
            const {data}  = await axios.get(`http://localhost:4990/api/income/fetchall?page=${payload}`,
                config            
            );
            return data;
          }
        catch(error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

export const updateIncomeAction = createAsyncThunk(
  "income/update",
  async({id,formData}, {rejectWithValue,getState,dispatch}) =>{
    const userToken = getState()?.users?.userAuth?.token ;
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userToken}`
            },
        }
        try {
          const {data} = await axios.put(`http://localhost:4990/api/income/update/${id}`,
                formData,
                config            
            );
            return data;
          } catch (error) {
           return rejectWithValue(error.response?.data?.message || error.message);
        }
  }
)

const incomeSlice = createSlice({
    name : 'income',
    initialState : {
    },
   extraReducers: builder => {

//creating income
  builder.addCase(createIncomeAction.pending, (state, action) => {
    console.log("Income Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

builder.addCase(createIncomeAction.fulfilled, (state, action) => {
  console.log("Income Status: Fulfilled ✅", action.payload);
  state.userLoading = false;
  state.AppErr = undefined;
  state.ServerErr = undefined;
  state.incomeList = action.payload; // ✅ Save new data
});

  builder.addCase(createIncomeAction.rejected, (state, action) => {
    console.log("Income Status: ❌", action.payload);
    state.userLoading = false;
    state.AppErr = action?.payload;
    state.ServerErr = action?.error?.message;
  });

//fetching income
builder.addCase(fetchIncomeAction.pending, (state, action) => {
    console.log("income Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

builder.addCase(fetchIncomeAction.fulfilled, (state, action) => {
  console.log("income Status: Fulfilled ✅", action.payload);
  state.userLoading = false;
  state.AppErr = undefined;
  state.ServerErr = undefined;
  state.incomeList = action.payload; // ✅ Save new data
});

  builder.addCase(fetchIncomeAction.rejected, (state, action) => {
    console.log("income Status: ❌", action.payload);
    state.userLoading = false;
    state.AppErr = action?.payload;
    state.ServerErr = action?.error?.message;
  });

  // updating income
  builder.addCase(updateIncomeAction.pending, (state, action) => {
    console.log("income Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
  console.log("income Status: Fulfilled ✅", action.payload);
  state.userLoading = false;
  state.AppErr = undefined;
  state.ServerErr = undefined;
  state.updatedIncome = action.payload; // ✅ Save new data
});

  builder.addCase(updateIncomeAction.rejected, (state, action) => {
    console.log("income Status: ❌", action.payload);
    state.userLoading = false;
    state.AppErr = action?.payload;
    state.ServerErr = action?.error?.message;
  });
}
})

export const incomeReducer = incomeSlice.reducer;