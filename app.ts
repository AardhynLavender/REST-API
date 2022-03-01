import express, { Request, Response } from 'express'
import process from 'process'

// configure Express
const PORT: string = process.env.PORT || '4000'
export const application = express()

// include routes
require('./routes/testRoute')
// ...
// ...

// initialize application
application.listen(PORT, () => console.log('listening on ' + PORT + '!'))
