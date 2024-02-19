'use strict'

//Importaciones
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from "dotenv"

const app = express()
config();
const port = process.env.PORT || 3056

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev')) 

//definir las rutas
app.use('/auth', authRoutes);
app.use('/teacher', teacherRoutes);


//levantar el server
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}

app.use(validateJwt);
app.use(errorHandler);

export default app;