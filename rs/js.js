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
	$(document.body).css({background:'none'}).html(Shell.parse('com --aY -bd="abs"'));
	//$(document.body).css({background:'none'}).html('--- --teste'.match(/^-+/).length);
	
});
//Applications Shell
Shell = function(){
	this.exec = function(c){

	};
	this.parse = function(c){
		var strs = c.match(/".+"/g), S='$S',
		 c = c.replace(/".+"/g, S),
		 args = c.split(' '), l = args.length,
		 res = {}, flag = false;

		for(var i=1;i<l;i++){
			var raw = args[i];
			
			if(raw[0]=='-'){
				if(raw[1] == '-'){
					var r=raw.split('='), v=true;
					if(r&&[1]&&r[1]==S&&v = strs[0])
						strs.shift();
					r[0] && res[r[0]] = r.length==2&&r[1]?r[1]:v;
					continue;
				}
				var n=0;
				while(flag = raw[++n]) res[flag] = true;
				continue;
			}
			if(flag){
				res[flag] = raw;
				continue;
			}
			if(raw[0] == '-'){

			}
			if(flag){
				flag = false;
			}
			if(first=='-'){

			}if(first=='"'){
				part = part.substring(1,part.length-2);
			}
			args.push(part);
		}
		return args;
	};
};
Shell = new Shell;
Shell.apps = {
	youtube: function(){
		
	}
};