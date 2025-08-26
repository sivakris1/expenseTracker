const http = require('http')
const app = require('./app.js')
const connect = require('../config/dbconnect.js')
const {userRoute} = require('../src/routes/users/userRoute.js')
const incomeRouter = require('./routes/income/incomeRoute.js')
const ExpenseRouter = require('./routes/expense/ExpenseRoute.js')
const accountStasRoute = require('./routes/income/accountStatRoute.js')
require('dotenv').config();



const PORT = process.env.PORT || 4990
const server = http.createServer(app)





//routes
app.use('/api/user',userRoute)
app.use('/api/income',incomeRouter)
app.use('/api/expense',ExpenseRouter)
app.use('/api',accountStasRoute);


//connecting to server
server.listen(PORT,async(req,res)=>{
    console.log(`server is running on port ${PORT}`)
    await connect()
}
)

//nkZIwESvu7upQLoq
//mongodb+srv://sivapalaparthi003:nkZIwESvu7upQLoq@cluster0.9q4lfqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0