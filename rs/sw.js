/*
v1.2
*/
//jQuery Extend
jQuery.fn.extend({
	serializeForm: function(){
		var data=$(this).serializeArray();
		var form={};
		for(var i=0;i<data.length;i++)
			form[data[i].name] = data[i].value;
		return form;
	},
	changeVal:function (v) {
		return $(this).val(v).trigger("change");
	},
	app: function(){
		return $(this).each(function(){
			//this.ex = new EX(this, $(this).data('ex'));
			var $this = $(this);
			this.app = $this.data('app');
			for(var i in this.app){
				var a = App.exec(i);
				if(!a) continue;
				a.args = this.app[i];
				a.node = this;
				a.obj = $(this);
				a.run && a.run();
			}
		});
	},
	appFind: function(){
		return $(this).find("[data-app]").app();
	}
});


//Applications Shell
App = new function(){
	this.exec = function(c, a){
		if(this.apps[c])
			return new this.apps[c](a);
		else
			console.log('App not installed.');
	};
	this.cli = function(c){
		var p = this.parse(c);
		this.exec(p['$0'], p);
	};
	this.create = function(o, p){
		if(typeof o == 'string' && typeof p === 'object'){
			p.name = o;
			o = p;
		}
		if(o.name && !this.apps[o.name]){
			var a = o.construct || function(){};
			a.prototype = o;
			this.apps[o.name] = a;
			return true;
		}else{
			console.log('App name not created.');
			return false;
		}

	};
	this.parse = function(c){
		var strs = c.match(/"(^".+)"/g), S='$S',
		 c = c.replace(/"(^".+)"/g, S),
		 args = c.split(' '), l = args.length,
		 res = {$0: args[0]}, flag = false;

		for(var i=1;i<l;i++){
			var p, v=true, raw=args[i];
			if(raw[0]=='-'){
				var s=raw.split('=', 2);
				p=s[0].substring(1);
				if(p[0] == '-'){
					p=p.substring(1);
					if(s.length == 2)
						v=s[1];
				}else{
					var n=0;
					if(s.length==1)
						while(p[n]){
							res[flag=p[n]] = true;
							n++;
						}

					continue;
				}
			}else if(flag){
				v=raw;
				p=flag;
				flag=false;
			}
			if(v==S){
				v=strs[0];
				strs=strs.shift();
			}else if($.isNumeric(v)){
				v=parseFloat(v);
			}
			res[p]=v;
		}
		return res;
	};
	this.apps = {};
}();