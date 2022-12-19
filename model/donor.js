
const sql = require('../db')
//function part is the constructor 
const Donor = function(donor){
    this.name= donor.name,
    this.age = donor.age,
    this.bloodGroup= donor.bloodGroup,
    this.phoneNumber = donor.phoneNumber,
    this.city = donor.city
}

Donor.create = async(newDonor,result)=>{
    sql.query("insert into donor set ?",newDonor, (err,res)=>{
        if(err){
            result(null,err);
        }else{
           result(null,res) 
        }
    })
}

Donor.findAll = (result) =>{
    sql.query("SELECT * FROM DONOR",(err,res)=>{
        if(err){
            result(null,err)
        }else{
            result(null,res);
        }
    })
}
Donor.findByBloodGroup=(bllodGroup,result)=>{
    sql.query("SELECT * FROM DONOR WHERE BLOODGROUP=?",bllodGroup,(err,res)=>{
        if(err){
            result(null,err);
        }else{
           result(null,res) 
        }
    })
}

module.exports = Donor;