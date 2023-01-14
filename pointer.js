document.oncontextmenu = function(event){
	event.preventDefault()
}

if(document.all){
	document.onselectstart = function(){
		return false
	}
}else{
	document.onmousedown = function(){
		return false
	}
	document.onmouseup = function(){
		return true
	}
}
