import express, { Request, Response } from 'express'
import process from 'process'

// configure Express
const PORT: string = '4000' || process.env.PORT
export const application = express()

// include routes
require('./routes/testRoute')
// ...
// ...

// initialize application
application.listen(PORT, () => console.log('listening on ' + PORT + '!'))
