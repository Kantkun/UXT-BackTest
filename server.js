let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mysql = require('mysql')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// homepage route
app.get('/',(req,res) => {
    return res.send({
        error: false,
        message: 'Welcome to RESTful CRUD API',
        wriiten_by: 'Prapas.N'
    })
})

// db connection
let dbCon = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    port: '3306',
    user: 'sql6509072',
    password: 'ugb1VUeAh8',
    database: 'sql6509072'
})

dbCon.connect()

// retrieve all book
app.get('/books', (req, res) => {
    dbCon.query('select * from books', (error,results,fields) => {
        if (error) throw error

        let message = ''
        if (results === undefined || results.length == 0){
            message = 'Books is empty'
        }else{
            message = 'Successfully retrieved all books'
        }
        return res.send({
            error: false,
            data: results,
            message: message
        })
    })
})


app.listen(3000, () => {
    console.log('Node App is running on port 3000')
})