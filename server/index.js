const express = require("express");

const http =  require("https")

const server = http.createServer( (req, res) => {
res.end("Hello, World!")
})

const PORT = process.env.PORT || 3000

server.listen(PORT, console.log(`listening on PORT ${PORT}`))

let url = 'https:api.spoonacular.com/recipes/716429/information?apiKey=5a9eaad9b6f54ec5adca1041255d83f2&includeNutrition=true'

http.get(url, res => {

    let rawData = ''

    res.on('data', chunk => {
        rawData += chunk
    })
    
    res.on('end', () => {
    const parsedData = JSON.parse(rawData)
    console.log(parsedData)
    })

})





