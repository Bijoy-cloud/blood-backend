const donor = require('../model/donor')

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be Empty"
        });
    }
    const donor = new Donor({
    name: req.body.name,
    age : req.body.age,
    bloodGroup: req.body.bloodGroup,
    phoneNumber : req.body.phoneNumber,
    city : req.body.city
    })

    donor.create(donor,(err,data)=>{
        if(err){
            res.status(500).send({
               message: err.message || "some error occured"
            })  
        } 
        else res.send(data) 
    })
};

exports.findAll = (req,res) =>{
    donor.findAll((err,data)=>{
        if(err){
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              }) 
        }else{
            res.status(200).send(data)
        }
    })
}

exports.findByBloodGroup = (req,res) =>{
    donor.findByBloodGroup(req.body.boodGroup,(err,data)=>{
        if(err){
            res.status(500).send({
               message: err.message || "some error occured"
            })  
        } 
        else res.send(data) 
    });
}