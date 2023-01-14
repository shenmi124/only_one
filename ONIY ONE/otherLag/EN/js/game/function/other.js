function colorText(id){
	let color = '#c3c3c3'
	let Text = 'Noname'
	let Class = ''
	for(let researchColor in main['resource']){
		if(id==researchColor){
			if(main['resource'][researchColor]['color']!=undefined){
				color = main['resource'][researchColor]['color']()
			}
			if(main['resource'][researchColor]['name']!=undefined){
				Text = main['resource'][researchColor]['name']()
			}
			if(main['resource'][researchColor]['Class']!=undefined){
				Class = main['resource'][researchColor]['Class']()
			}
		}
	}
	if(id=='none'){
		return ['#888','Unknown',"<a style='color: #888'>Unknown</a>",'rgba(136, 136, 136, 0.5)']
	}
	let color2 = tinycolor(color).setAlpha(.5);
	return [color,Text,"<a style='color:"+color+"' class='"+Class+"'>"+Text+"</a>",color2]
}