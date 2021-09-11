const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    /* if(req.url === '/'){
        fs.readFile(path.join(__dirname, 'public','index.html'), (err, content) => {
            if(err) throw err

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content)
        })
    }
    if(req.url === '/api/users'){
        const users = [
            { name: 'Muflah Nasir', age: 23 },
            { name: 'Maryam Nasir', age: 27 }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    } */

    //Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    /* console.log(filePath)
    res.end() */

    //Extension of the file
    let extname = path.extname(filePath)

    //Initial content type
    let contenttype = 'text/html'

    //Check ext and set content type
    switch(extname){
        case '.js':
            contenttype = 'text/javascript'
            break;
        case '.css':
            contenttype = 'text/css';
            break;
        case '.json':
            contenttype = 'application/json';
            break;
        case '.png':
            contenttype = 'image/png';
            break;
        case '.jpg':
            contenttype = 'image/jpg';
            break;
    }

    //Read file
    fs.readFile(filePath, (err,content) => {
        if(err){
            if(err.code == 'ENOENT'){
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(content, 'utf8')
                })
            }
            else{
                //Some server error
                res.writeHead(500);
                res.end(`Server error: ${err.code}`)
            }
        }
        else{
            //Success
            res.writeHead(200, { 'Content-Type': contenttype })
            res.end(content, 'utf8')
        }
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))


/* const Logger = require('./logger')

const logger = new Logger()

logger.on('message', (data) => console.log('Called Listener: ', data))

logger.log('Hello world!!!!')
logger.log('Hi')
logger.log('My name is Muflah')
 */

//SAMPLE
/* const Person = require('./person')
//In case of function
//console.log("Name: " + person.name,"Age: " + person.age)

//In case of class
const person1 = new Person("Muflah Nasir", 23)

console.log("Name: " + person1.name,"Age: " + person1.age) */