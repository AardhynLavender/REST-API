import mongoose from 'mongoose'

export const connection = (url: string) => mongoose.connect(url)
