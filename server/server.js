import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import favicon from 'serve-favicon'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
import dotenv from 'dotenv'
import carRoutes from './routes/car.js'

// import the router from your routes file


dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use
app.use('/api', carRoutes)


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})