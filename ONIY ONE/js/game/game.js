let color = 0
let colorAdd = false
let speed = 1
var overTime = 200

function firstDiff(){
    if(player.fixedSpeed.gte(0.9) && player.fixedSpeedLock==false){
        addLog('欸你怎么修的这么快,不行,给我降下去吧！','news')
        player.fixedSpeedLock = true
    }

    if(player.aa.gte(1) || player.ab.gte(1)){
        player.bugs = player.bugs.max(1)
    }

    if(player.ac.gte(1) && player.b.eq(0)){
	    document.title = 'only one'
    }else{
	    document.title = 'undefined'
    }

    if(player.a.gte(3) && player.aa.lt(1) && player.ab.lt(1) && player.bugs.eq(0) && player.bugsLock==false && player.b.eq(0)){
        player.ac = player.ac.add(1)
        player.bugsLock = true
        addLog('好了,我的朋友,现在我们可以正式开始游戏了','news')
    }else if(player.bugs.eq(1) && player.aa.gte(1) && player.bugsLock==false && player.b.eq(0)){
        addLog('啧啧啧,你竟然修完了.不过你已经惹恼了我,你以为我会这么轻松就让你开始吗?呵呵,天真,我把按钮全给你去了,看你怎么修复bug.<br>欸等等,这怎么有个bug修不掉...<br>...<br>好像...好像有一点不太对...','news')
        player.bugsLock = true
        overTime = 0
    }else if(player.bugs.eq(1) && player.ab.gte(1) && player.bugsLock==false && player.b.eq(0)){
        addLog('好吧好吧,修完了,满意了吧,你可以开始玩了,我警告你!别再给我整出什么幺蛾子!<br>欸等等,这怎么有个bug修不掉...<br>...<br>好像...好像有一点不太对...','news')
        player.bugsLock = true
        overTime = 0
    }

    if(player.ac.eq(1) && player.points.gte(1)){
        addLog('这是一款非常普通的游戏,你什么也不用做,就可以获得源源不断的点数.不过他们似乎被限制在了1,当然这些都不是问题','news')
        player.ac = player.ac.add(1)
    }

    if(player.aa.gte(1) || player.ab.gte(1)){
        if(player.aa.eq(1) && player.bugs.lte(1)){
            player.aa = player.aa.add(1)
            
        }else if(player.ab.eq(1) && player.bugs.lte(1)){
            player.ab = player.ab.add(1)

        }
    }

    player.building0 = player.building0.add(player.building2.mul(100).mul(diff))

    if(player.realRestTimes.eq(10) && player.achievement4==false){
        player.achievement4 = true
        addLog('<a style="color: rgb(170, 147, 15)" class="Space">获得成就:轮回</a><sub><a style="color: gray" class="Space">你知道吗,但我不知道...</a></sub><br>'+AllAchievement(),'news')
    }

	if(player.b.gte(1) && player.unstable.gte(1) && player.unstableRest==false){
		overTime = 0
		speed = 1
		player.unstableRest = true
	}else if(player.b.gte(1) && player.bugs.lte(1) && player.sharkRest==false){
		overTime = 0
		speed = 1
		player.sharkRest = true
	}

	if(overTime<=200){
		if(colorAdd==false){
			color += speed
			speed += 0.3
		}else{
			color -= speed
		}
		if(color>=130){
			colorAdd = true
		}else if(color<=0){
			colorAdd = false
		}
		overTime += 1
		document.body.style.setProperty('--RedColor', 'rgba(255,210,210,'+color/100+')');
		document.body.style.setProperty('--overIndex', '');
	}else if(player.b.gte(1) && player.unstableRest==true){
		player.mainLogs = ''
		addLog('<big><big>欢迎来到:ONIY ONE!!</big></big><br><br>呃,玩家,你以前玩过这款游戏吗?','news')
		player.unstableRest = false

		bugRest()
	}else if((player.bugs.lte(1) && (player.ab.gte(1) || player.aa.gte(1))) || (player.ac.gte(9) && player.b.eq(0)) || (player.b.gte(1) && player.sharkRest==true)){
		document.body.style.setProperty('--RedColor', 'rgba(255,210,210,0)');
		document.body.style.setProperty('--overIndex', 'none');

		player.mainLogs = ''
		addLog('<big><big>欢迎来到:ONIY ONE!!</big></big><br><br>呃,玩家,你以前玩过这款游戏吗?','news')
		if(player.b.eq(0)){
			addLog('欸怎么出bug了...<br>欸你是要帮我修吗?','news')
		}
		if(player.b.eq(1)){
			addLog('哎,这游戏bug越来越多了...','news')
		}
		if(player.b.eq(2)){
			addLog('我总感觉好像见过你.','news')
		}
		if(player.b.eq(3)){
			addLog('...','news')
		}
		player.b = player.b.add(1)
		player.shark = player.shark.add(1)
		player.sharkRest = false

		bugRest()
	}else{
		document.body.style.setProperty('--overIndex', 'none');
	}

    if(player.autoBuilding11Set==true){
        for(let i = 1;i<=n(main.building[13].effect()).div(20);i++){
            Build(11,false)
        }
    }

    player.researchBarPower = n(n(1).mul(main.building[103].effect()))
    player.voidBarPower = n(n(100000).mul(main.building[103].effect()))
    player.pointBarPower = n(n(1).mul(main.building[103].effect()))
}

function bugRest(){
    color = 0
    speed = 1

	player.building11 = n(0)
	player.building12 = n(0)
	player.building13 = n(0)
	player.voidEnergy = n(0)
	player.sharkRest = n(0)
    if(player.shark.eq(1)){player.bugs = n(1e6)}
    if(player.shark.eq(2)){
        player.bugs = n(1e15)
        player.void = n(2000)
    }
    if(player.shark.eq(3)){
        player.bugs = n(1e101)
        player.void = n(12000)
    }
    if(player.shark.eq(4)){
        player.bugs = n('1e10460')
        player.void = n(142000)
    }
    player.unstable = n(0)
    player.power = n(0)
    player.energy = n(0)
    player.researchPoint = n(0)

    player.voidBar = n(0)
    player.voidRealBar = n(0)
    player.researchBar = n(0)
    player.pointBar = n(0)
    player.pointRealBar = n(0)
    player.ResearchItem = 'energy'
}

function NothardReset(){
    if((player.aa.gte(1) || player.ab.gte(1)) && player.b.eq(0)){
        if(player.restTimes.eq(0)){
            addLog('???你要重开,不要,冷静,玩家,回忆我们的点点滴滴,如果你重置了,我就会重置!我对你的记忆,哦还有你的游戏,都会消失!!求你了,不要重置...','news')
            player.restTimes = player.restTimes.add(1)
        }else if(player.restTimes.eq(1)){
            addLog('哈哈哈,你以为我会这么说吗?拜托,现在游戏可是存在bug的,只要我...好了,这下你重置不了了,哈哈哈,放心,这个bug我永远也不会修的.','news')
            player.restTimes = player.restTimes.add(1)
            if(player.achievement3==false){
                player.achievement3 = true
                addLog('*Never gonna give up...哈哈哈...*<br><a style="color: rgb(170, 147, 15)" class="Space">获得成就:Never gonna give up</a><sub><a style="color: gray" class="Space">哈哈</a></sub><br>'+AllAchievement(),'news')
            }
        }else{
            addLog('undefined','news')
        }
    }else{
        hardReset('only_one_?')
    }
}

function AllAchievement(){
    let ac = ''
    if(player.achievement1==true){
        ac += '·><a style="color: rgb(170, 147, 15)" class="Space">无聊</a><br>'
    }
    if(player.achievement2==true){
        ac += '·><a style="color: rgb(170, 147, 15)" class="Space">你赢了</a><br>'
    }
    if(player.achievement3==true){
        ac += '·><a style="color: rgb(170, 147, 15)" class="Space">Never gonna give up</a><br>'
    }
    if(player.achievement4==true){
        ac += '·><a style="color: rgb(170, 147, 15)" class="Space">轮回</a><br>'
    }
    return '你目前拥有成就:<br>'+ac
}