const Stuff = require('../models/stuff'),
  c = console.log

const apiResponse = (req, res, err, data) => {
  if(err) {
    res.status(500).send({
      message:`Server Error ${err.message}`
    })
  } else {
    if(data){
      res.status(200).send({data})
    } else {
      res.status(404).send({
        message:`Doesn't exist this data ${data}`
      })
    }
  }
}

// Read
const getStuffs = async(req, res) => {
  await Stuff // reference this model
    .find({})
    .sort({'_id':-1})
    .exec((err,data)=>apiResponse(req,res,err,data))
}

// Post Stuff
const postStuff = async(req, res) => {
  let stuff = new Stuff(req.body)
  c(req.body)
  c(JSON.stringify(req.body.cosa))
  await stuff.save((err,data)=> (req, res, err, data))
}

// To edit firts i need to know the stuff
const getStuff = async(req, res) => {
  await Stuff
    .findById(req.params.id)
    .exec((err,data)=>apiResponse(req,res,err,data))
}

// Update
const putStuff = async(req, res) => {
  await Stuff.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, data) => apiResponse(req, res, err, data)
  )
}

// Delete
const deleteStuff = async(req, res) => {
  await Stuff.findByIdAndRemove(
    req.params.id,
    (err, data) => apiResponse(req, res, err, data)
  )
}

module.exports = {
  getStuffs,
  postStuff,
  getStuff,
  putStuff,
  deleteStuff
}