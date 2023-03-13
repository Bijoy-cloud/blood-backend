
const sql = require('../db')
//function part is the constructor 
const Donor = function(donor){
    this.name= donor.name,
    this.lastname= donor.lastname,
    this.bloodGroup= donor.bloodGroup,
    this.phoneNumber = donor.phoneNumber,
    this.city = donor.city
    this.previousDonation=donor.previousDonation
}

Donor.create = async(newDonor,result)=>{
    console.log("new is",newDonor)
    sql.query("insert into donor set ?",newDonor, (err,res)=>{
        // console.log("p",err)
        if(err){
            // console.log(err)
            // console.log(res)
                if (err.code === 'ER_DUP_ENTRY' || err.code === 'ER_DUP_KEY') {
                    
                    result(null,{message:"Duplicate Entry"});
                    // Handle MySQL unique constraint error
                  }else{
                    result({err})
                  }     
            
        }else{
           result(null,res) 
        }
    })
}

Donor.findAll = (result) =>{
    sql.query("SELECT * FROM donor",(err,res)=>{
        if(err){
            result(null,err)
        }else{
            result(null,res);
        }
    })
}
Donor.findByBloodGroup=(bloodGroup,result)=>{
    sql.query("SELECT * FROM donor WHERE BLOODGROUP=?",bloodGroup,(err,res)=>{
        if(err){
            result(null,err);
        }else{
           result(null,res) 
        }
    })
}

module.exports = Donor; 