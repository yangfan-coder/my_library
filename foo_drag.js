for( var i = 0 ;i <this.elements.length; i++){
			addEvent(this.elements[i],"mousedown",function(e){
			if(trim(this.innerHTML).length == 0 ) e.preventDefault();
			var _this = this;
			var dllX = e.clientX - _this.offsetLeft;
			var dllY = e.clientY - _this.offsetTop;

			if(e.target.tagName.toLowerCase() == obj ){
				addEvent(document,"mousemove",move);
				addEvent(document,"mouseup",up);
			}else{
				removeEvent(document,"mousemove",move);
				removeEvent(document,"mouseup",up);
			}
			function move(e){
				var left = e.clientX-dllX;
				var top = e.clientY-dllY;
				if(left < 0 ){
					left = 0;
				}else if(left > getInner().width - _this.offsetWidth){
					left = getInner().width - _this.offsetWidth;
				}
				if(top < 0 ){
					top = 0;
				}else if(top > getInner().height - _this.offsetHeight){
					top = getInner().height - _this.offsetHeight;
				}
				_this.style.left = left + "px";
				_this.style.top = top + "px";
			};
			function up(){
				removeEvent(document,"mousemove",move);
				removeEvent(document,"mouseup",up);
			}
		});
	}