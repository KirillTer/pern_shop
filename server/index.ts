import * as dotenv from 'dotenv'
import * as express from'express'
import sequelizeConnection from'./src/db'
// import models from'./models/models'
import * as cors from'cors'
// import fileUpload from'express-fileupload'
// import router from'./routes/index'
// import errorHandler from'./middleware/ErrorHandlingMiddleware'
import * as path from'path'

dotenv.config({path:`.${process.env.NODE_ENV}.env`});

const PORT = process.env.PORT || 5001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
// app.use('/api', router)

// Error handler
// app.use(errorHandler)

const start = async () => {
    try {
        await sequelizeConnection.authenticate()
        await sequelizeConnection.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()