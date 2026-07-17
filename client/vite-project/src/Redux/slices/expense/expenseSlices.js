import {createAsyncThunk , createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

//creating expense
export const createExpAction = createAsyncThunk(
  "expense/create",
async(payload, {rejectWithValue,getState,dispatch}) =>{
    
  const userToken = getState()?.users?.userAuth?.token ;

    console.log("---- FRONTEND DEBUG ----");
    console.log("Redux State users:", getState()?.users);
    console.log("Retrieved Token:", userToken);
    console.log("------------------------");

    
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userToken}`
            },
        }
        try{
            const {data}  = await axios.post('http://localhost:4990/api/expense',
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

//fetching expenses
export const fetchExpAction = createAsyncThunk(
  "expense/fetch",
async(payload, {rejectWithValue,getState,dispatch}) =>{
    
  const userToken = getState()?.users?.userAuth?.token ;
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userToken}`
            },
        }
        try{
            const {data}  = await axios.get(`http://localhost:4990/api/expense/fetchall?page=${payload}`,
                config            
            );
            return data;
          }
        catch(error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)


export const updateExpSlice = createAsyncThunk(
  "expense/update",
  async({id,formData}, {rejectWithValue,getState,dispatch}) =>{
    const userToken = getState()?.users?.userAuth?.token ;
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userToken}`
            },
        }
        try {
          const {data} = await axios.put(`http://localhost:4990/api/expense/update/${id}`,
                formData,
                config            
            );
            return data;
          } catch (error) {
           return rejectWithValue(error.response?.data?.message || error.message);
        }
  }
)


const expenseSlice = createSlice({
    name : 'users',
    initialState : {
    },
   extraReducers: builder => {

//creating expense
  builder.addCase(createExpAction.pending, (state, action) => {
    console.log("Expense Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

builder.addCase(createExpAction.fulfilled, (state, action) => {
  console.log("Expense Status: Fulfilled ✅", action.payload);
  state.userLoading = false;
  state.AppErr = undefined;
  state.ServerErr = undefined;
  state.newExpense = action.payload; // ✅ Save new data
});

  builder.addCase(createExpAction.rejected, (state, action) => {
    console.log("Expense Status: ❌", action.payload);
    state.userLoading = false;
    state.AppErr = action?.payload;
    state.ServerErr = action?.error?.message;
  });

//fetching expense
builder.addCase(fetchExpAction.pending, (state, action) => {
    console.log("Expense Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

builder.addCase(fetchExpAction.fulfilled, (state, action) => {
  console.log("Expense Status: Fulfilled ✅", action.payload);
  state.userLoading = false;
  state.AppErr = undefined;
  state.ServerErr = undefined;
  state.expensesList = action.payload; // ✅ Save new data
});

  builder.addCase(fetchExpAction.rejected, (state, action) => {
    console.log("Expense Status: ❌", action.payload);
    state.userLoading = false;
    state.AppErr = action?.payload;
    state.ServerErr = action?.error?.message;
  });

  //updating expense
  builder.addCase(updateExpSlice.pending, (state, action) => {
    console.log("Expense Status: Pending...");
    state.userLoading = true;
    state.userAppErr = undefined;
    state.userServerErr = undefined;
  });

builder.addCase(updateExpSlice.fulfilled, (state, action) => {
  console.log("Expense Status: Fulfilled ✅", action.payload);
  state.userLoading = false;
  state.AppErr = undefined;
  state.ServerErr = undefined;
  state.updatedExpense = action.payload; // ✅ Save new data
});

  builder.addCase(updateExpSlice.rejected, (state, action) => {
    console.log("Expense Status: ❌", action.payload);
    state.userLoading = false;
    state.AppErr = action?.payload;
    state.ServerErr = action?.error?.message;
  });
}
})


export const expenseReducer = expenseSlice.reducer;