const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query(`CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`, (err, result) => {
    if (err) throw err
    console.log('Tabela criada com sucesso')
})

const sql = `INSERT INTO people(name) values('Felipe')`
connection.query(sql, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Dados inseridos com sucesso!')
    }
})

app.get('/', (req, res) => {
    let content = '<h1>Full Cycle 2</h1>'
    content += 'Lista de pessoas:<br>' 
    const sql = 'SELECT * FROM people'

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Erro ao buscar dados')
        } else {
            result.forEach((row) => {
                content += `${row.name}<br>`
            })
            content += '<br><h2>Dados inseridos com sucesso!</h2>'
            res.send(content)
        }
    })
})

app.listen(port, () => {
    console.log('Rodando na porta '+port)
})
