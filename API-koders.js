
const express = require('express')
const app = express()

const kodersList = require('./koders')

app.use(express.json())

app.post('/koders', (request, response) => {
    try {
        const koder = request.body
        if (!koder.name) throw new Error('Name is required')
        if (!koder.id) throw new Error('Id is required')
        kodersList.append(koder)
        response.json({
            success: true,
            message: 'Koder created',
            data: {
                koder
            }
        })
    } catch (error) {
        response.status(404)
        response.json({
            success: false,
            error: error.message
        })
    }
})

app.get('/koders', (request, response) => {
    console.log('GET /koders')
    response.json({
        success: true,
        data: {
            koders: kodersList
        }
    })
})

app.get('/koders/:id', (request, response) => {
    try {
        const { id: koderID } = request.params
        const koder = kodersList.find(koder => koder.id === parseInt(koderID))
        if (!koder) throw new Error(`Cannot find koder with id ${koderID}`)
        response.json({
            success: true,
            data: {
                koder
            }
        })
    } catch (error) {
        response.status(404)
        response.json({
            success: false,
            error: error.message
        })
    }
})

app.get('/koders/name/:name', (request, response) => {
    const { name: koderName } = request.params
    const koders = kodersList.filter(koder => koder.name === koderName)
    response.json({
        success: true,
        data: {
            koders
        }
    })
})

app.listen(8080, () => {
    console.log('APP RUNNING')
})