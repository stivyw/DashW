/*
v1.1
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
	ex: function(){
		return $(this).each(function(){
			this.ex = new EX(this, $(this).data('ex'));
		});
	},
	EX: function(){
		return $(this).find("[data-ex]").ex();
	}
});

window.EX = function(o, dt){
	this.o = o;
	this.$ = $(o);
	this.dt = dt || {};
	for(var i in this.dt)
		if(typeof EX[i] === 'function'){
			var nex = new EX[i](this.dt[i]);
			nex.ex = this;
			nex.init && nex.init();
			this[i] = nex;
		}
};
//Example
(EX.hello = function(data){
		alert('EX hello' + this.test(data));
}).prototype = {
	test: function(dt){
		return ' test(' + dt + ')';
	}
};
//Apply in document
$(function(){
	$(document).EX();
});

$(function(){
	$('.square').click(function(){
		$('#sw-wrapper').toggleClass('in');
		$('header').toggleClass('in');
		$('#sw-side').toggleClass('in');

	});
});

$(function(){
	var c = 'com -a -b 300 --testando=/testando/path$Steste';
	window.W=Shell.exec(c);
	//$(document.body).css({background:'none'}).html(c);
	console.log(c);
	console.log(W);
	//$(document.body).css({background:'none'}).html('--- --teste'.match(/^-+/).length);
	
});
//Applications Shell
Shell = function(){
	this.exec = function(c){
		return this.parse(c);
	};
	this.parse = function(c){
		var strs = c.match(/"(^".+)"/g), S='$S',
		 c = c.replace(/"(^".+)"/g, S),
		 args = c.split(' '), l = args.length,
		 res = {}, flag = false;

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
};
Shell = new Shell;
Shell.apps = {
	youtube: function(){
		
	}
};