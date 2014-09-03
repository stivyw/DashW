/*
v1.1
*/
Main=new function(){
	this.load = function redirect(url, req, call){
		this.abort().progress(60).progress(80);
		this.obj && this.obj.addClass('loading');
		this.pBar && this.pBar.css({display:'block'});
		if(typeof req === 'function'){
			call=req;
			req=false;
		}
		this.xhr = $.ajax({
			url: url,
			type: req?'POST':'GET',
			dataType: 'html',
			data: req
/** /
			xhrFields: {
				onprogress: function (e) { console.log(e.lengthComputable);
					if (e.lengthComputable){
						console.log(e.loaded / e.total * 100 + '%');
					}
				}
			}
/**/
		}).done(function(data){
			Main.pBar.animate({width: '100%'}, function(){
				$(this).css({width: 0});
			});
			Main.obj.html(data);
		}).fail(function(a,b,c){
			Main.data('<h1>Erro ao carregar a página</h1><p>O erro retornou a seguinte mensagem: <b>'+c+'</b></p>').pBar.stop(true).animate({width: 0});
		})
		return this;
	}
	this.abort = function(){
		if (this.xhr)
			this.xhr.abort();
		this.obj && this.obj.removeClass('loading');
		this.pBar && this.pBar.stop().animate({width: 0}, function(){
			$(this).css({width: 0});
		});
		return this;
	}
	this.progress = function(p){
		this.pBar && this.pBar.animate({width: p + '%'});
		return this;
	}
	this.data = function(d){
		this.obj && this.obj.html(d);
		return this;
	}
};

$(function(){
	Main.obj = $('#content');
	Main.pBar = $('<div/>').css({zIndex:1001,position: 'fixed', top:0, left:0, height: 2, width:0, background: 'red'}).appendTo(document.body);
	$('.square').click(function(){
		$('#sw-main').toggleClass('in');
		$('#sw-side').toggleClass('in');

	});
	$('a.jx').click(function(){
		if(!this.post)
			this.post = $('this').data('req');
		Main.load(this.href, this.post);
		return false;
	});
	$(document).EX();
});

$(function(){
	var c = 'com -a -b 300 --testando=/testando/path$Steste';
	window.W=Shell.exec(c);
	//$(document.body).css({background:'none'}).html(c);
	console.log(c);
	console.log(W);
	//$(document.body).css({background:'none'}).html('--- --teste'.match(/^-+/).length);
	
});
//#############################

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