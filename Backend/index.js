const express=  require('express');
require("./db/config");

const app= express();
const cors=require('cors');
const Signup=require('./db/Signup');
const Country=require('./db/Countries');
const State=require('./db/State');
const City=require('./db/City');

app.use(express.json());  //it is middleware used to get data from react to node
app.use(cors());


app.post("/signup", async (req,res)=>{
    let user = new Signup(req.body);   //store data to Users schema from react 
    let result= await user.save();
// result= result.toObject();

   res.send(result);
});
app.get('/signup', async (req, res) => {
    const id = req.query.id;
    const result = await Signup.findOne({ _id: id }).exec();
    res.json(result);
  });

  app.put('/signup/:id', async (req, res) => {
    const itemId = req.params.id;
    const updatedData = req.body;
  
    try {
      // await client.connect();
      // const database = client.db('my-db');
      // const collection = database.collection('my-collection');
      const result = await Signup.updateOne({ _id: itemId }, { $set: updatedData });
  
      if (result.modifiedCount === 1) {
        res.send(result);
      } else {
        res.send(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } 
  });


  app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await Signup.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "NO USER FOUND" });
    }
  }
});


app.post("/country", async (req, res) => {
   
    let country = new Country(req.body); 
      let result= await country.save();
    res.send(result);
  });

  app.get('/country', async(req, res) =>{
   let country=await Country.find();
   res.send(country);
  });

  app.post("/state", async (req, res) => {
   
    let state = new State(req.body); 
      let result= await state.save();
    res.send(result);
  });

  app.get('/state', async (req, res) => {
    const countryId = req.query.country;
    const states = await State.find({ country: countryId }).exec();
    res.json(states);
  });


   app.post("/city", async (req, res) => {
   
    let city = new City(req.body); 
      let result= await city.save();
    res.send(result);
  });
   
   app.get('/city', async(req, res) =>{
    const stateId = req.query.state;
    const cities = await City.find({ state: stateId }).exec();
    res.json(cities);
   });

app.listen(5000);