import express from 'express'

const app = express();

const port = 3001;

app.use(express.json())
let teaData = []
let nextID = 1

// add a new tea
app.post("/teas",(req,res)=>{
    const {name, price} = req.body
    const newTea = {id: nextID++, name, price}
    teaData.push(newTea);
    res.status(200).send(newTea)
})

// get all teas
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData)
})

// take an id and get tea for the id
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id)) // we requesting from the url so params, if requesting from body then it would be .body instead of .params
    if(!tea){
        return res.status(404).send("tea not found");
    }
    return res.status(200).send(tea);
})

//update tea
app.put("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        res.status(404).send("tea not found")
    }
    const {name, price} = req.body
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

//delete tea
app.delete("/teas/:id", (req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.send(404).send("tea not found");

    }
    const deleted = teaData[index]
    teaData.splice(index, 1)
    res.status(200).send(`deleted ${deleted}`)
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})


