'use strict'
var Datastore = require('nedb');
var extIP = require('external-ip');
var where = require('node-where');

var getIP = extIP({
    replace: true,
    services: ['http://ifconfig.co/x-real-ip', 'http://ifconfig.io/ip'],
    timeout: 600,
    getIP: 'parallel'
});

function REST (router,db,hosting_ip){
	var self = this;
	self.handleRoutes(router,db,hosting_ip);
}
REST.prototype.handleRoutes = function(router,db,hosting_ip){
	//===save to database file===//
	router.post("/send",function(req,res){
		// console.log(req.connection.localAddress);
		let date = new Date();
		let t = date.getTime();
		var data = {
			name: req.body.name,
			content: req.body.content,
			_id: t
		}
		db.insert(data,function(err,doc){
			if(!err){
				console.log("ERROR",err,doc._id);
			}
		})
		res.json({"message":"sent"});
	})
	//===load data from database file===/
	router.post("/get",function(req,res){

		db.find({},function(err,doc){
			// console.log(err,doc);
			res.json({"doc":doc,"host":hosting_ip,"IP":req.ip});
		})
	})
	//===get location===//
	router.post("/location",function(req,res){
		getIP(function (err, ip) {
			if (err) {
				// every service in the list has failed
				throw err;
			}
			console.log(ip);
		   where.is(ip,function(err,result){
			   if(result){
				   let location = result.get('postalCode')+" "+result.get('city')+","
				   		+result.get('country')
				   console.log(location);
				   res.json({"location":location});
			   }
		   })
		});

	})
}
module.exports = REST;
