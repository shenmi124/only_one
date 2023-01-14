var tab = true
var tooltipSel

var allWorkResource = 1
var allResearch = 17
var allWork = 1

function tooltipMouseoverID(id){
	$('#'+id).mouseover(function(){
		tooltip(id)
		tooltipSel = self.setInterval(function(){
			tooltip(id)
		},50)
	});
}

function baseLoad(){
	if(player.flushLog==true){
		player.logsType = ['none']
	}
	
	let border = n(0).add(player.researchBar.div(player.researchBarMax.max(0.01)).mul(100))
	getNotNumDoc('loadResearchResourceOtherBorder',`
	<div class="ResearchResourceOtherBorder" style='background: var(--researchColor); margin-left:50px; margin-top:20px'></div>
	<div class="ResearchResourceOtherBorder" style='border: 2px solid #282828; z-index: 100; border-radius: 5px; margin-left:48px; margin-top:18px'></div>
	<div class="ResearchResourceOtherBorder void-bar" id="ResearchResourceOtherBorderID" style="background: #fff; margin-left:50px; width:72px; margin-top:20px; z-index: 10; clip-path: inset(0% 0% `+border+`% 0%);"></div>
	`)

	let border2 = n(0).add(player.voidBar.div(player.voidBarMax.max(0.01)).mul(100))
	getNotNumDoc('loadResearchResourceBorder',`
	<div class="ResearchResourceBorder" style='background: `+colorText('void')[0]+`; margin-left:250px; margin-top:20px'></div>
	<div class="ResearchResourceBorder" style='border: 2px solid #282828; z-index: 100; border-radius: 5px; margin-left:248px; margin-top:18px'></div>
	<div class="ResearchResourceBorder void-bar" id="ResearchResourceBorderID" style="background: #fff; margin-left:250px; width:72px; margin-top:20px; z-index: 10; clip-path: inset(0% 0% `+border2+`% 0%);"></div>
	`)

	let border3 = n(0).add(player.pointBar.min(player.pointRealBar).div(player.pointBar.max(0.01)).mul(100))
	getNotNumDoc('loadResearchResourcePointBorder',`
	<div class="ResearchResourcePointBorder" style='background: #3dd3f8; margin-left:450px; margin-top:20px'></div>
	<div class="ResearchResourcePointBorder" style='border: 2px solid #282828; z-index: 100; border-radius: 5px; margin-left:448px; margin-top:18px'></div>
	<div class="ResearchResourcePointBorder void-bar" id="ResearchResourcePointBorderID" style="background: #fff; margin-left:450px; width:72px; margin-top:20px; z-index: 10; clip-path: inset(0% 0% `+border3+`% 0%);"></div>
	`)

	let mainStr = ''
	for(let i in mainTab){
		let text = '<a id="'+mainTab[i]['id']()+'TextID"></a>'
		let load = '<a id="load'+mainTab[i]['id']()+'"></a>'
		mainStr += text+load+'<br><br>'
	}
	getNotDoc('loadMain',mainStr)

	let logStr = '<t id="noneStyleLog" class="logTypes unselectLogs" onclick="changeLog(\'none\')">All</t><t id="newsStyleLog" class="logTypes" onclick="changeLog(\'news\')">News</t>'
	for(let i in mainTab){
		if(mainTab[i]['logs']!=undefined){
			let text = '<t id="'+mainTab[i]['logs']()[0]+'StyleLog" class="logTypes unselectLogs" onclick="changeLog(\''+mainTab[i]['logs']()[0]+'\')">'+mainTab[i]['logs']()[1]+'</t>'
			logStr += text
		}
	}
	getNotDoc('loadLogText',logStr)
}

function fistLoad(){
	baseLoad()

	let resourceStr = ''
	for(let i in main['resource']){resourceStr += '<a id='+i+'LoadResource></a>'}
	getNotDoc('loadResource',resourceStr)
	for(let i in main['resource']){
		getNotDoc(i+'LoadResource',`<a id="`+i+`LoadResourceTitleID"></a><a id="`+i+`LoadResourceID"></a><a id="`+i+`LoadResourceOtherID"></a><a id="`+i+`LoadResourceBrID"></a>`)
		getResourceTitleID(i+'LoadResource',i)
		getResourceOtherID(i+'LoadResource',i)
	}

	let actionStr = ''
	for(let i in main['action']){
		actionStr += '<a id='+i+'LoadAction></a>'
	}
	getNotDoc('loadAction',actionStr)
	for(let i in main['action']){
		getNotDoc(i+'LoadAction',`<br id="`+i+`LoadActionBrID"><a id="`+i+`LoadActionID"></a> `)
		let nameAct = '未命名'
		if(main['action'][i]['name']!=undefined){
			nameAct = main['action'][i]['name']()
		}
		getActionID(i,nameAct)
	}

	let buildingStr = ''
	for(let i in main['building']){
		buildingStr += '<a id='+i+'LoadBuilding></a>'
	}
	getNotDoc('loadBuilding',buildingStr)
	for(let i in main['building']){
		getNotDoc(i+'LoadBuilding',`<br id="`+i+`LoadBuildingBrID"><a id="`+i+`LoadBuildingID"></a> `)
		let nameBud = '未命名'
		if(main['building'][i]['name']!=undefined){
			nameBud = main['building'][i]['name']()
		}
		getBuildingID(i,nameBud)
	}

	let researchResourceStr = ''
	for(let i in main['resource']){
		if(main['resource'][i]['PR']!=undefined){
			researchResourceStr += '<a id='+i+'LoadResearchResource></a>'
		}
	}
	getNotDoc('loadResearchResource',researchResourceStr)
	for(let i in main['resource']){
		if(main['resource'][i]['PR']!=undefined){
			getNotDoc(i+'LoadResearchResource',`<br id="`+i+`LoadResearchResourceBrID"><a id="`+i+`LoadResearchResourceID"></a>`)
			getResearchResourceID(i+'LoadResearchResource',i)
		}
	}
}

function firstTab(){
	if(tab==true){
		fistLoad()

		if(player.firstGame==false){
			player.firstGame = true
			addLog('<big><big>Welcome to:ONIY ONE!!</big></big><br>*Mouse over resource for tooltip*','news')
		}

		$(document).ready(function(){
			$("tooltip").mouseover(function(){
				document.getElementById("tooltip").style.display = ''
			});
			$("tooltip").mouseleave(function(){
				document.getElementById("tooltip").style.display = 'none'
				window.clearInterval(tooltipSel)
			});
			
			for(let i in main['resource']){tooltipMouseoverID(i+"TooltipLoadResource")}
			for(let i in main['resource']){tooltipMouseoverID(i+"TooltipLoadResourceOther")}
			for(let i in main['action']){tooltipMouseoverID(i+'TooltipLoadAction')}
			for(let i in main['resource']){tooltipMouseoverID(i+"TooltipLoadResearchResource")}
			for(let i in main['building']){tooltipMouseoverID(i+"TooltipLoadBuilding")}

			tooltipMouseoverID("ResearchResourceOtherTooltip")
			tooltipMouseoverID("ResearchResourceVoidTooltip")
			tooltipMouseoverID("ResearchResourcePointTooltip")
		});
		tab = false
	}
}

function showTab(id){
	if(id=="setting"){
		Open('tab_setting')
	}else{
		Close('tab_setting')
	}

	if(id=="main"){
		Open('tab_main')
	}else{
		Close('tab_main')
	}

	if(id=="research"){
		Open('tab_research')
	}else{
		Close('tab_research')
	}
}