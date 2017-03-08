var Datastore = require('nedb');  

function REST (router,db){
	var self = this;
	self.handleRoutes(router,db);
}
// var array = chatLog;
REST.prototype.handleRoutes = function(router,db){
	var sefl = this;
	router.post("/send",function(req,res){
		db.insert(req.body,function(err,doc){
			if(!err){
				console.log("ERROR",err,doc._id);
			}
		})
		res.json({"message":req.body});
	})
}
module.exports = REST;