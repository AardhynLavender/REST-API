import mongoose from 'mongoose'

const options: any = {
	useNewUrlParser: true,
	autoIndex: true,
	keepAlive: true,
	connectTimeoutMS: 10000,
	socketTimeoutMS: 45000,
	family: 4,
	useUnifiedTopology: true,
}

export const connection = (url: string) => mongoose.connect(url, options)
