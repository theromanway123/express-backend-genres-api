const joi = require('joi'); //import joi
const express = require('express'); //import express
const data = require('./mockdata').data; //import data from mock.js
const { json } = require('express');

console.log("Made by ",data.author);

const app = express();

const genere_schema = joi.object({
    "genere":joi.string().min(1).max(40).required(),
    "info":joi.object({
        "description":joi.string().min(5).required(),
        "keywords":joi.array().min(1).required(),
        "examples":joi.array()
    })
});

const update_genere_schema = joi.object({
    "genere":joi.string().min(1).required(),
    "field":joi.string().min(1).required(),
    "update":joi.string()
});

//=========================== Imports =============================================================================================================

app.use(express.json());

//=========================== Middleware ==========================================================================================================

// OVERVIEW (HOMEPAGE)
app.get('/api/overview',(req,res)=>{
    const homepage = `
        <html>
            <body>
                <h1>Welcome to homepage of this api</h1>
                <p> This api allows basic CRUD operations on a mock database which stores genres.<br/>Checkout mockdata.js to see data structure</p>
                <h3><br/>Helps me understand the basics of using Express.js with Joi.js for input validation using schema</h3>
                <h4><br/>Usage</h4>
                <ul>
                <li> GET /api/ : homepage</li>
                <li> GET /api/generes (all) : get all generes</li>
                <li> GET /api/generes/{genre name} : get information regarding a particular genere </li>
                <li> POST /api/generes/ : create a new genere </li>
                <li> PUT /api/generes/ :replace the genere </li>
                <li> DELETE /api/generes/{genere name} :delete the genere </li>
                </ul>
                <h5> Shoutout to Mosh Hamedamni for this amazing tutorial of Node.js </h5>
            </body>
        </html>
    `;
    res.status(200).send(homepage);
});

// VIEW ALL
app.get('/api/generes',(req,res)=>{
    res.status(200).send(data.generes);
});

// READ (R)
app.get('/api/generes/:genere',(req,res)=>{
    const result = data.generes.find(c => c.genere == req.params.genere);
    if (!result) return res.status(400).send('Bad Request');
    if (result) return res.status(200).send(result);
});
// CREATE (C)
app.post('/api/generes',(req,res)=>{
    const check = genere_schema.validate(req.body);
    if(check.error) return res.status(400).send('Bad Request, Invalid request format');
    else {
        const val = data.generes.find(c=>c.genere==req.body.genere);
        if(val) return res.status(409).send('Resource already exists');
        else{
            data.generes.push(req.body);
            console.log(`Added a new genere : ${req.body}`);
            return res.status(200).send(req.body);
        }
    }
});
// UPDATE (U)
app.put('/api/generes',(req,res)=>{
    const check = update_genere_schema.validate(req.body);
    // console.log(check);
    if(check.error) return res.status(400).send('Object Not Found, Invalid request format');
    else {
        const val = data.generes.find(c=>c.genere==req.body.genere);
        if(!val) return res.status(404).send('Resource not found');
        else{
            const index = data.generes.indexOf(data.generes.find(x=>x.genere==req.body.genere));
            data.generes[index].info[req.body.field.toString()] = req.body.update;
            return res.status(200).send(req.body);
        }
    }
});
//DELETE (D)
app.delete('/api/generes/:genere',(req,res)=>{
    const check = data.generes.indexOf(data.generes.find(x=>x.genere==req.params.genere));
    if(check==-1) return res.status(404).send('Resource Doesnt Exist');
    else{
        data.generes.splice(check,1);
        // console.log('Index : ',check,data.generes);
        return res.status(200).send('Resource Deleted');    
    } 
});

//========================== Route Handlers =========================================================================================================
const port = process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log(`\nListening on port ${port}`);
});
//======================================================================================================================================================
