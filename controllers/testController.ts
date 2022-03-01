<<<<<<< HEAD
import express, { Response, Request } from 'Express'
=======
import { Response, Request } from "express";
>>>>>>> 7a5987b (further tests to allow heroku to build project)

interface Message {
	message: string
}

export function TestController(request: Request, response: Response): void {
	const message: Message = { message: 'The Controller has spoken...' }
	response.status(404).json(message)
}
