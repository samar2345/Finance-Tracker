import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import './schedulers/notification.scheduler.js';

origin:process.env.CORS_ORIGIN
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))//extended object
app.use(express.static("public"))//for storing pdfs, images, so that anyone can access it???
app.use(cookieParser())//used to read and update cookies on the browser of user

//routes import
// import userRouter from './routes/user.routes.js'
// import tweetRouter from './routes/tweet.routes.js'
// import playlistRouter from './routes/playlist.routes.js'
// import subscriptionRouter from './routes/subscription.routes.js'
// import likeRouter from './routes/like.routes.js'
// import commentRouter from './routes/comment.routes.js'
// import videoRouter from './routes/video.routes.js'

import userRouter from './routes/user.routes.js'
import budgetRouter from './routes/budget.routes.js'
import categoryRouter from './routes/category.routes.js'
import expenseRouter from './routes/expense.routes.js'
import notificationRouter from './routes/notification.routes.js'
import paymentMethodRouter from './routes/paymentMethod.routes.js'
import recurringPaymentRouter from './routes/recurringPayment.routes.js'



//routes declaration
app.use("/api/v1/users",userRouter) //api/v1??
app.use("/api/v1/budget",budgetRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/expense",expenseRouter)
app.use("/api/v1/notification",notificationRouter)
app.use("/api/v1/paymentMethod",paymentMethodRouter)
app.use("/api/v1/recurringPayment",recurringPaymentRouter)




export {app}