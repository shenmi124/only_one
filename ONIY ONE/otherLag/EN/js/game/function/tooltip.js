function tooltip(id){
	for(let i in main['resource']){
		if(id==i+'TooltipLoadResource'){
			if(main['resource'][i]['tooltip']!=undefined){
				return getTooDoc(colorText(i)[2]+"<hr><small>"+main['resource'][i]['tooltip']())
			}else{
				return getTooDoc('未命名')
			}
        }
	}

	for(let i in main['resource']){
		if(id==i+'TooltipLoadResourceOther'){
			if(main['resource'][i]['otherTooltip']!=undefined && main['resource'][i]['otherText']!=undefined){
				return getTooDoc("<div style='color: "+colorText(i)[0]+"'>"+main['resource'][i]['otherText']()+"</div><hr><small>"+main['resource'][i]['otherTooltip']())
			}else{
				return getTooDoc('未命名')
			}
        }
	}

	for(let i in main['action']){
		if(id==i+'TooltipLoadAction'){
			let name = '未命名'
			if(main['action'][i]['name']!=undefined){
				name = main['action'][i]['name']()
			}
			if(main['action'][i]['tooltip']!=undefined){
				return getTooDoc(name+'<hr><small>'+main['action'][i]['tooltip']())
			}else{
				return getTooDoc('未命名')
			}
        }
	}

	for(let i in main['building']){
		if(id==i+'TooltipLoadBuilding'){
			let name = '未命名'
			let cost = '无消耗'
			if(main['building'][i]['name']!=undefined){
				name = main['building'][i]['name']()
			}
			if(main['building'][i]['cost']!=undefined){
				cost = BuildTooltipCost(i)
			}
			if(main['building'][i]['tooltip']!=undefined){
				return getTooDoc(name+"("+format(player['building'+i],0)+")"+'<hr><small>'+cost+'<hr>'+main['building'][i]['tooltip']())
			}else{
				return getTooDoc('未命名')
			}
        }
	}

	for(let i in main['resource']){
		if(id==i+'TooltipLoadResearchResource'){
			if(main['resource'][i]['PR']!=undefined){
				return researchTooltip(i)
			}else{
				return getTooDoc('未命名')
			}
        }
	}

	if(id=='ResearchResourceOtherTooltip'){
		return getTooDoc('<a style="color: var(--researchColor);text-shadow: 3px 3px 2px var(--researchColor);">Input matter</a><hr><small>Fill in '+formatScientific(player.barToggle,0)+'% of your '+colorText(player.ResearchItem)[2]+'<hr><small>'+colorText(player.ResearchItem)[2]+':<br>Quality'+format(main['resource'][player.ResearchItem]['PR']()[0])+'<br>Research value'+format(main['resource'][player.ResearchItem]['PR']()[1])+'<br>Unit research value'+format(n(main['resource'][player.ResearchItem]['PR']()[0]).mul(main['resource'][player.ResearchItem]['PR']()[1]))+'<hr>You will fill in:'+format(player[player.ResearchItem].mul(player.barToggle.mul(0.01)).min(player.researchBarMax.sub(player.researchBar).div(main['resource'][player.ResearchItem]['PR']()[0])))+'('+format(player[player.ResearchItem].mul(main['resource'][player.ResearchItem]['PR']()[0]).mul(player.barToggle.mul(0.01)).min(player.researchBarMax.sub(player.researchBar).div(main['resource'][player.ResearchItem]['PR']()[0])))+'Quality)'+colorText(player.ResearchItem)[2]+'<br>You will gain:'+format(player[player.ResearchItem].mul(main['resource'][player.ResearchItem]['PR']()[0]).mul(player.barToggle.mul(0.01)).min(player.researchBarMax.sub(player.researchBar).div(main['resource'][player.ResearchItem]['PR']()[0])).mul(main['resource'][player.ResearchItem]['PR']()[1]))+colorText('researchPoint')[2])
	}

	if(id=='ResearchResourceVoidTooltip'){
		return getTooDoc('<a style="color: rgb(123, 25, 214);text-shadow: 3px 3px 2px rgb(123, 25, 214, 0.5);">Input energy</a><hr><small>Use your '+colorText('voidEnergy')[2]+'to analyze matter for '+colorText('researchPoint')[2]+'<small>')
	}

	if(id=='ResearchResourcePointTooltip'){
		return getTooDoc('<a style="color: #3dd3f8;text-shadow: 3px 3px 2px rgb(61, 211, 248, 0.5);">Output research</a><hr><small>Grab your '+colorText('researchPoint')[2]+'<hr>Available:'+format(player.pointBar))+colorText('researchPoint')[2]
	}
}