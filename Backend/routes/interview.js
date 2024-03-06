const express = require ("express");
const router=express.Router()
const intervController = require("../controller/InterviewController");
const validate = require("../middl/validate") ;

router.get('/', function(req,res){
    res.send("hello express");
});

router.post("/add" ,intervController.add);
router.get('/getall', intervController.getall);
router.get("/get/:id",intervController.getbyid);
router.put('/update/:id', intervController.update);
router.delete('/deleteintrv/:id',intervController.deleteinterview );
router.get("/getitle/:title", intervController.getbytitle);
router.post("/fixAnotherDate/:id", intervController.fixAnotherDate);

module.exports = router ;