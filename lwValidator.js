(function(root,factor,name){
	return factor(root.jQuery,name);
})(window,function($,name){
	/*定义默认操作及验证规则*/
	var __DEFS__={
			trigger:"change"
		},
	    __RULE__={
		notempty:function(){
			return this.val()!=""&&this.val()!=null;
		},
		regexp:function(){
			return new RegExp(this.data("lw-regexp")).test(this.val());
		},
		stringlength:function(){
			return this.val().length>=this.data("lw-stringlength-min")&&this.val().length<=this.data("lw-stringlength-max");
		},
		different:function(){
			return this.val()!=$("[name=username]").val();
		},
		identical:function(){
			return this.val()!=$("[name=password]").val();
		}
	};
	//表单验证插件封装
	$.fn[name] = function(options){
		//继承
		$.extend(this,__DEFS__,options);
		var $fileds = $("#attributeForm").find("input").not("[type=submit],[type=button],[type=reset]");
		$fileds.on(this.trigger,function(){
			var $filed = $(this)
				result = true;
			$filed.next().remove();
			$.each(__RULE__,function(rule,validator){
				if($filed.data("lw-"+rule)){
					console.log(rule);
					result = validator.call($filed);
					if(!result){
						$filed.after("<p>"+$filed.data("lw-"+rule+"-message")+"</p>");
					}
					return result;
				}
			});

		});
	};
},"lwValidator");
