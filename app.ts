import express, { Request, Response } from 'express'
import process from 'process'

const PORT: string = '4000' || process.env.PORT
const application = express()

interface BasicResponse {
	message: string
}

application.get('/', (req: Request, res: Response) => {
	const basicResponse: BasicResponse = {
		message: 'You have fetched the API! whoa!',
	}
	res.status(200).json(basicResponse)
})

application.listen(PORT, () => console.log('listening on ' + PORT + '!'))
