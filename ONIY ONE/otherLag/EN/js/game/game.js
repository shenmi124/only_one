let color = 0
let colorAdd = false
let speed = 1
var overTime = 200

function firstDiff(){
    if(player.fixedSpeed.gte(0.9) && player.fixedSpeedLock==false){
        addLog('Why are you fixing so fast, no, go back！','news')
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
        addLog('Well, my friend, now we can start the game.','news')
    }else if(player.bugs.eq(1) && player.aa.gte(1) && player.bugsLock==false && player.b.eq(0)){
        addLog('Wow, you fixed it all. But you made me angry, do you think I will let you start so easily? HAHA, naive, I\'ll remove all the buttons, let me see how you can fix the bug.<br>Wait, I can\'t fix this bug...<br>...<br>Uh...Something is wrong...','news')
        player.bugsLock = true
        overTime = 0
    }else if(player.bugs.eq(1) && player.ab.gte(1) && player.bugsLock==false && player.b.eq(0)){
        addLog('Okay, it\'s all fixed, satisfied? Now you can play, I warn you! Don\'t make more troubles!<br>Wait, I can\'t fix this bug...<br>...<br>Uh...Something is wrong...','news')
        player.bugsLock = true
        overTime = 0
    }

    if(player.ac.eq(1) && player.points.gte(1)){
        addLog('This is a very simple game, you don\'t need to do anything, and you can gain points by sitting idle. The only problem is they are capped at 1, surely it is\'nt a problem.','news')
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
        addLog('<a style="color: rgb(170, 147, 15)" class="Space">Gained achievement:Loop</a><sub><a style="color: gray" class="Space">Do you know? I don\'t...</a></sub><br>'+AllAchievement(),'news')
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
		addLog('<big><big>Welcome to:ONIY ONE!!</big></big><br><br>Uh, player, have you played this before?','news')
		player.unstableRest = false

		bugRest()
	}else if((player.bugs.lte(1) && (player.ab.gte(1) || player.aa.gte(1))) || (player.ac.gte(9) && player.b.eq(0)) || (player.b.gte(1) && player.sharkRest==true)){
		document.body.style.setProperty('--RedColor', 'rgba(255,210,210,0)');
		document.body.style.setProperty('--overIndex', 'none');

		player.mainLogs = ''
		addLog('<big><big>Welcome to:ONIY ONE!!</big></big><br><br>Uh, player, have you played this before?','news')
		if(player.b.eq(0)){
			addLog('Ah there is a bug...<br>Are you fixing it for me?','news')
		}
		if(player.b.eq(1)){
			addLog('Ah, bug is becoming more...','news')
		}
		if(player.b.eq(2)){
			addLog('I feel I have seen you before.','news')
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
            addLog('???You are going to restart? No, calm down, player, think of our memories, if you reset, I will be reset! My memory of you, and your game, will all disappear!! I\'m begging you, don\'t reset...','news')
            player.restTimes = player.restTimes.add(1)
        }else if(player.restTimes.eq(1)){
            addLog('HAHAHA, do you think I\'m going to say something like this? Hey, This game is full of bug, I just need to...well, now you can\'t reset, HAHAHA, well, I\'m never going to fix this.','news')
            player.restTimes = player.restTimes.add(1)
            if(player.achievement3==false){
                player.achievement3 = true
                addLog('*Never gonna give up...hahaha...*<br><a style="color: rgb(170, 147, 15)" class="Space">Gained achievement:Never gonna give up</a><sub><a style="color: gray" class="Space">Haha</a></sub><br>'+AllAchievement(),'news')
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
        ac += '·><a style="color: rgb(170, 147, 15)" class="Space">Boring</a><br>'
    }
    if(player.achievement2==true){
        ac += '·><a style="color: rgb(170, 147, 15)" class="Space">You win</a><br>'
    }
    if(player.achievement3==true){
        ac += '·><a style="color: rgb(170, 147, 15)" class="Space">Never gonna give up</a><br>'
    }
    if(player.achievement4==true){
        ac += '·><a style="color: rgb(170, 147, 15)" class="Space">Loop</a><br>'
    }
    return 'You currently have achievements:<br>'+ac
}