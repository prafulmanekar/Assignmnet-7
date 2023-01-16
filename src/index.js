const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const datas = require('./InitialData')
const port = 8000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let id = datas.length + 1

app.get('/api/student', (req, res) => {
    res.json(datas)
})

app.get('/api/student/:id', (req, res) => {
    const data = datas.find((e) => e.id == req.params.id)
    if (data) {
        id--
        return res.json({
            status: "Success",
            data: data
        })
    } else {
        return res.json({
            status: "Data Not Found"
        })
    }
})

app.post('/api/student', (req, res) => {
    id++
    if (req.body.name && req.body.currentClass && req.body.division) {
        const data = datas.push({ id: id, ...req.body })
        return res.json({
            status: "Success",
            data: data
        })
    } else {
        return res.json({
            status: "Data Incompleted....please fill proper details"
        })
    }
})

app.put('/api/student/:id', (req, res) => {

    const data =datas.find((e)=>e.id == req.params.id)
    if (req.body.name || req.body.currentClass || req.body.division &&data) {
        const idx =datas.findIndex((e)=>e.id == req.params.id)
        datas[idx]={...data,...req.body}
        return res.json({
            status: "Success",
            message:"Updata Has Been Done",
            data:datas[idx]
        })
    } else {
        return res.json({
            status: "please fill proper details"
        })
    }
})

app.delete('/api/student/:id', (req, res) => {

    const data = datas.findIndex((e) => e.id == req.params.id)
    if (data) {
        datas.splice(data, 1)
        return res.json({
            status: "Success",
            data: "Done"
        })
    } else {
        return res.json({
            status: "Data Not Found"
        })
    }
})

app.listen(port, () => 
console.log(`App listening on port ${port}!`))

module.exports = app;   