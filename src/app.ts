import express from 'express'
import cors from 'cors'
import { studentsRoutes } from './modules/students/studentsRoute'
const app = express()


app.use(express.json())
app.use(cors())


// applicatoin routes 

app.use('/api/v1/students', studentsRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app