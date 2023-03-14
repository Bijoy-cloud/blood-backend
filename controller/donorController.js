// const donor = require("../model/donor");
const sql = require("../db");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be Empty",
    });
  }
  // console.log("req",req.body)
  const donor = {
    name: req.body.name,
    lastname: req.body.lastname,
    bloodGroup: req.body.bloodGroup,
    phoneNumber: req.body.phoneNumber,
    location: req.body.city,
    previousDonation: req.body.previousBloodDonation,
  };
  sql.query("insert into donor set ?",donor,(err,data)=>{
    if(err){
          if (err.code === 'ER_DUP_ENTRY' || err.code === 'ER_DUP_KEY') {
              
              return res.status(400).send({message:"Duplicate Entry"});
              // Handle MySQL unique constraint error
            }else{
              return res.status(400).send({message:"Something bad happend on client side"})
            }     
      
  }else{
     return res.status(200).send("Succed") 
  }
  })
  // donor.create(dono, (err,data) => {
  //   console.log("data is",data)
  //   console.log(" is",err)

  //   if(data.message=="Duplicate Entry"){
  //     console.log("Hello")
  //     res.status(400).send({message:"this number already exist"})
  //   }else res.send(data);
  // });
};

exports.findAll = (req, res) => {
  donor.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.findByBloodGroup = (req, res) => {
  donor.findByBloodGroup(req.body.boodGroup, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error occured",
      });
    } else res.send(data);
  });
};

exports.findDonor = (req, res) => {
    // console.log(req.query)
  
  const bloodGroup = req.query.bloodgroup;
  const location = req.query.city;
  console.log(bloodGroup)
  let query = "SELECT * FROM donor";
  // Add bloodgroup to query if it is present
  if (bloodGroup) {
    query += ` WHERE bloodgroup = '${bloodGroup}'`;
  }

  if (location) {
    if (bloodGroup) {
      query += `AND location='${location}'`;
    } else {
      query += `WHERE location= '${location}'`;
    }
  }
  query+=';'
  // console.log(query)
  sql.query(query,(error,result)=>{
    if (error) {
        return res.status(400).send(error);
      } else {
        return res.status(200).json({
          data: result
        });
      }
  })
};
