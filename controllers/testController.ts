import express, { Response, Request } from 'Express'

interface Message {
	message: string
}

export function TestController(request: Request, response: Response): void {
	const message: Message = { message: 'The Controller has spoken...' }
	response.status(404).json(message)
}
