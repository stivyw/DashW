App.create('hello',{
	run: function(){
alert(this.name);
	}
});
$(function(){
	$(document).appFind();


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

	var c = 'com -a -b 300 --testando=/testando/path$Steste';
	window.W=App.exec(c);
	//$(document.body).css({background:'none'}).html(c);
	console.log(c);
	console.log(W);
	//$(document.body).css({background:'none'}).html('--- --teste'.match(/^-+/).length);
	
});
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

//#############################

