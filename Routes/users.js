const express= require("express")
const users= require("../Data/users.json")

const router = express.Router();

/*
*Route: /users
Method: GET
Description: Get list of all the users in the system
Access:Public
Parametters:None
*/
router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})
/*Route: /users/subscriptiondetails/:id
Method: Put
Description:Subscription details by id
Access:Public
Parametters:id
*/
router.get('/SubscriptionDetails/:id',(req,res)=>{
    const id=Number(req.params.id)
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"No User Found"
        })
    }
    const getDateInDays =(data = '')=>{
        let date;
        if(data){
            date=new Date(data);
        }else {
            date=new Date(); 
        }
        let days=Math.floor(date/(1000*60*60*24));
        return days;
    }
    const subscriptionType =(data)=>{
        if(user.subscriptionType==="Basic"){
            data=data+90;
        }else if(user.subscriptionType==="Standard"){
            data=data+180
        }else if(user.subscriptionType==="Premium"){
            data=data+365
        }
        return data;
    }
    let returnDate= getDateInDays(user.returnDate);
    let currentDate=getDateInDays();
    let subscriptionDate=getDateInDays(user.subscriptionDate);
    let subscriptionExpiration=subscriptionType(subscriptionDate);
    let fine = 0;
if (returnDate<currentDate) {
    fine+=100;
}
if (subscriptionExpiration<currentDate){
    fine+=100;
}
    const data={
        ...user,
        subscriptionExpired:subscriptionExpiration<currentDate,
        subscriptionDaysLeft: subscriptionExpiration-currentDate,
        daysLeftForExpiration:returnDate-currentDate,
        returnDate:returnDate<currentDate ? "Book Is Overdue" : returnDate,
        fine: fine
    }
    res.status(200).json({
        success: true,
        data: data
    })
})
/*
*Route: /users/id
Method: GET
Description: Get a user by id in the system
Access:Public
Parametters:id
*/
router.get('/:id',(req,res)=>{
    const id=Number(req.params.id);
  const user= users.find((each)=>each.id===id)
  if(!user){
   return res.status(404).json({
        success:false,
        message:'User not found'
    })
  }
    res.status(200).json({
        success:true,
        data:user
    })
})
/*
*Route: /users
Method: Post
Description: Register a new user in the system
Access:Public
Parametters:none
*/
router.post('/',(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
       return res.status(400).json({
        success:false,
        message:'All fields are required'
       })
    }
    const user =users.find((each)=>each.id===id)
    if(user){
        return res.status(400).json({
            success:false,
            message:"User Already Exist"
        })
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    })
    res.status(201).json({
        success:true,
        message: "User added successfully"
    })
})
/*
*Route: /users/:id
Method: Put
Description:Updating a user by id
Access:Public
Parametters:id
*/
router.put('/:id',(req,res)=>{
  const id= Number(req.params.id);
  const data=req.body
  const user= users.find((each)=>each.id===id)
    if(!user){
   return res.status(404).json({
        success: false,
        message:"User Doesn't Exist"
    })
  }
  //with spread operator  // spread operator copies the data of one array or object to other array or object
const index = users.findIndex(each=>each.id===id);

users[index]={
    ...users[index], //copies the already existing data
    ...data // overwrites the fields which is given by us in req.body
};

res.status(200).json({
    success:true,
    message:"User updated successfully",
});

})
/*
*Route: /users/:id
Method: Put
Description:Deleting a user by id
Access:Public
Parametters:id
*/
router.delete('/:id',(req,res)=>{
    const id=Number(req.params.id)
    const user=users.find((each)=>each.id===id)
    if(!user){
         return res.status(404).json({
            success:false,
            message:"User Not Found"
         })
    }
    const index=users.findIndex((each)=>each.id===id);
         users.splice(index,1) // as it is zero indexed 
         res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
         })
})



module.exports = router;