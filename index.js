const http = require('http');
const fs = require('fs')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    if (req.url == '/favicon.ico') {
        res.statusCode = 204

    } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html');
        let path = "." + req.url
        fs.readdir(path, { "encoding": "utf8" }, (err, data) => {
            if (err) {
                res.end("<h1> Directory Not Found</h1>")
            } else {
                let response = ''
                data.forEach((el) => {
                    response += `<li style="font-size : 30px"><a href = ${el + "/"}>${el}</a></li>`
                })
                res.end(`<div style="width: 30%; margin: auto; margin-top: 70px; border: 1px solid red; padding: 30px; border-radius: 10px "><h1 style= "text-align :center">File server</h1><hr/> <div>${response}</div></div>`);
            }
        });

    }


})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})