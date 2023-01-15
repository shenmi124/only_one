var mainTab = {
    action:{
        name(){return 'Actions'},
        logs(){return ['action','Actions']},
        id(){return 'Action'},
    },
    building:{
        name(){return 'Buildings'},
        logs(){return ['building','Buildings']},
        id(){return 'Building'},
    },
}

var main = {
    resource:{
        time:{
            name(){return 'TimeFlux'},
            color(){return '#46747c'},
            Class(){return 'Space'},
            max(){return n(1800)},
            gain(){
                let a = n(1)
                if(player.timeMod.eq(2)){
                    a = n(0).sub(1).mul(player.timeMod)
                }else if(player.timeMod.eq(0)){
                    a = n(2)
                }
                return a
            },
            tooltip(){
                let gain = 'Total production:<br>'
                let a = player.timeMod.eq(2) ? 'Time flux:(-'+format(n(1))+')<br>' : ''
                let timeStop = player.timeMod.eq(0) ? 'Time pause:(+'+format(n(1))+')<br>' : ''
                let time = player.timeMod.eq(2) ? 'Time speed:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "Total:("+format(this.gain())+'/s) <-> ('+formatTime(this.gain())+'/s)'
                let max = '<hr>Total capacity:<br>'
                let a2 = "Base:(+3600.00)<br>"
                let maxAll = "Total:(+"+format(this.max())+') <-> (+'+formatTime(this.max())+')'
                return "This resource can be gained at anytime, wait, what time is it?<hr>When offline for more than 20s or paused, gain at the same rate"+colorText('time')[2]+"<br>"+colorText('time')[2]+"Can acclerate time for resource production<br><hr>"+gain+a+timeStop+time+gainAll+max+a2+maxAll
            },
            unlocked(){return player.building104.gte(1)},
            otherText(){
                return '<a id="time">Time flux</a>'
            },
            otherTooltip(){
                return "Click to change time speed. When activated you consume 1 time flux/s to acclerate global resource production.<br>Your current time speed is:<a style='color: red;'>"+format(player.timeMod)+'</a>(Max:'+format(n(2))+')'
            },
            onClick(){
                if(player.timeMod.eq(1)){
                    player.timeMod = n(2)
                    addedCss('time','time')
                    removeCss('time','timeStop')
                }else if(player.timeMod.eq(2)){
                    player.timeMod = n(0)
                    addedCss('time','timeStop')
                    removeCss('time','time')
                }else{
                    player.timeMod = n(1)
                    removeCss('time','time')
                    removeCss('time','timeStop')
                }
            },
        },
        soaring:{
            name(){return 'Ascend'},
            color(){return 'rgba(167, 184, 19, 0.9)'},
            tooltip(){
                let a = ''
                if(player.soaring.gte(1)){a += '1.point production*1e-10,but unlock<s style="color: #888">po</s>in<s style="color: #888">ts</s><br>'}
                return a
            },
            unlocked(){return player.ac.gte(1) && player.soaring.gte(1) && player.b.eq(0)},
        },
        points:{
            name(){return 'Point'},
            max(){return n(1)},
            color(){return '#000'},
            gain(){
                let base = n(1)
                let mul = n(1)
                if(player.soaring.gte(1)){mul = n(1).mul(1e-10)}
                return base.mul(mul)
            },
            tooltip(){
                let gain = 'Total production:<br>'
                let a = "Base:(+"+format(n(1))+")<br>"
                let b = player.timeMod.eq(0) ? 'in:(×'+format(n(1))+')<br>' : ''
                let timeStop = player.timeMod.eq(0) ? 'Time pause:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? 'Time speed:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "Total:(+"+format(this.gain())+'/s)'
                let max = '<hr>Total capacity:<br>'
                let a2 = "Base:(+"+format(this.max())+")<br>"
                let maxAll = "Total:(+"+format(this.max())+')'
                return "point<hr>"+gain+a+b+time+timeStop+gainAll+max+a2+maxAll
            },
            unlocked(){return player.ac.gte(1) && player.bugs.lte(0) && player.b.eq(0)},
        },
        In:{
            name(){return 'in'},
            max(){return n(1)},
            color(){return '#000'},
            gain(){return n(0)},
            tooltip(){
                let gain = 'Total production:<br>'
                let timeStop = player.timeMod.eq(0) ? 'Time pause:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? 'Time speed:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "Total:(+"+format(this.gain())+'/s)'
                let max = '<hr>Total capacity:<br>'
                let a2 = "Base:(+"+format(this.max())+")<br>"
                let maxAll = "Total:(+"+format(this.max())+')'
                return "for(i in ... (?)<hr>"+gain+time+timeStop+gainAll+max+a2+maxAll
            },
            unlocked(){return player.ac.gte(1) && player.soaring.gte(1) && player.b.eq(0)},
        },
        und:{
            name(){return 'undefined'},
            color(){return '#888'},
            tooltip(){
                return "undefined"
            },
            unlocked(){return !(player.ac.gte(1) && player.bugs.lte(0)) && player.b.eq(0)},
        },
        shark:{
            name(){return 'ShArD'},
            Class(){return 'High'},
            color(){return '#000'},
            tooltip(){
                let a = player.shark.gte(1) ? '<big>ShArD1</big><br>'+colorText('bugs')[2]+'generation +10/s<br>starting'+colorText('bugs')[2]+'+1e6' : ''
                let b = player.shark.gte(2) ? '<hr><big>ShArD2</big><br>'+colorText('bugs')[2]+'generation +1e10/s<br>starting'+colorText('bugs')[2]+'+1e15<br>“Void core”cost^1.2<br>gain 2000'+colorText('void')[2]+'' : ''
                let c = player.shark.gte(3) ? '<hr><big>ShArD3</big><br>'+colorText('bugs')[2]+'generation +1e100/s<br>starting'+colorText('bugs')[2]+'+1e101<br>“Void core”cost^1.25<br>gain 1.2e4'+colorText('void')[2]+'<br>“fix bug” exponent-0.3<br>'+colorText('voidEnergy')[2]+' from “fix bug” ^0.01' : ''
                let d = player.shark.gte(4) ? '<hr><big>ShArD4</big><br>'+colorText('bugs')[2]+'generation +1e10460/s<br>starting'+colorText('bugs')[2]+'+1e10460<br>“Void core”cost^2<br>gain 1.32e5'+colorText('void')[2]+'<br>“fix bug” exponent-0.8<br>'+colorText('voidEnergy')[2]+' from “fix bug” ^0.01<br>You lose 1% of '+colorText('power')[2]+' per sec<br>'+colorText('unstable')[2]+' gain^1.1' : ''
                return "Origin of instability<br>maybe you can discover something if you gather more.<hr><small>"+a+b+c+d+'</small>'
                        },
            unlocked(){return player.b.gte(1)},
        },
        researchPoint:{
            name(){return 'ResearchPoint'},
            color(){return '#3dd3f8'},
            max(){return n(1000)},
            gain(){return n(0).mul(player.timeMod)},
            tooltip(){
                let gain = 'Total production:<br>'
                let timeStop = player.timeMod.eq(0) ? 'Time pause:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? 'Time speed:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "Total:(+"+format(this.gain())+'/s)'
                let max = '<hr>Total capacity:<br>'
                let a2 = "Base:(+"+format(this.max())+")<br>"
                let maxAll = "Total:(+"+format(this.max())+')'
                let res1 = player.building101.gte(1) ? '<br>Reactor upgrade('+formatScientific(player.building101,0)+'/3):'+'-'+format(main.building[101].effect())+' '+colorText('unstable')[2]+'effect divisior' : ''
                let res2 = player.building102.gte(1) ? '<br>Cooling upgrade('+formatScientific(player.building102,0)+'/4):*'+format(main.building[102].effect())+' '+colorText('unstable')[2]+'reduction speed' : ''
                let res3 = player.building103.gte(1) ? '<br>Lab room('+formatScientific(player.building103,0)+'/3):'+'*'+format(main.building[103].effect())+' research speed' : ''
                let res4 = player.building104.gte(1) ? '<br>Clockworks room('+formatScientific(player.building104,0)+'/1):Unlock time flux' : ''
                return "Researching how everything works.<hr>"+gain+time+timeStop+gainAll+max+a2+maxAll+'<hr><small>Completed research:<t style="text-align: left;">'+res1+res2+res3+res4+'</t></small>'
            },
            unlocked(){return player.researchPoint.gt(0) || player.researchPointUnlocked==true},
        },
        unstable:{
            name(){return 'Unstability'},
            color(){return '#098131'},
            Class(){return 'High'},
            gain(){
                return n(0).sub(0.02).mul(main.building[102].effect())
            },
            tooltip(){
                return "Very dangerous, will cause devastation if exceeds cap.<br>"+colorText('unstable')[2]+"Will force reset if exceeds 1,"+colorText('unstable')[2]+"will increase amount of unstable energy gained.<hr><small><div style='text-align: left;'>"+colorText('power')[2]+"Gain:^+"+format(this.effect())+'</div></small>'
            },
            effect(){
                return player.unstable.div(n(4).sub(main.building[101].effect()))
            },
            unlocked(){return player.powerClickTimes.gte(1) || player.shark.gte(3)}
        },
        bugs:{
            name(){return 'Bug'},
            Class(){return 'Space'},
            gain(){
                if(player.b.lte(0)){
                    if(player.ac.eq(9)){
                        return player.bugs.add(1).mul(2)
                    }
                    return n(0).sub(player.realFixedSpeed).sub(player.bugsFiexdSpeed)
                }else{
                    if(player.bugs.lte(1)){
                        return n(0)
                    }
                    if(player.shark.eq(1)){return n(10)}
                    if(player.shark.eq(2)){return n(1e10)}
                    if(player.shark.eq(3)){return n(1e100)}
                    if(player.shark.eq(4)){return n('1e10460')}
                    return n(0)
                }
            },
            color(){return '#888'},
            tooltip(){
                return "undefined"
            },
            unlocked(){return (player.a.gte(1) && !player.bugs.eq(0)) || player.b.gte(1)},
        },
        void:{
            name(){return 'Void'},
            color(){return 'rgb(123, 25, 214)'},
            Class(){return 'High'},
            gain(){
                let a = n(0)
                return a.mul(player.timeMod)
            },
            tooltip(){
                let gain = 'Total production:<br>'
                let timeStop = player.timeMod.eq(0) ? 'Time pause:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? 'Time speed:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "Total:("+format(this.gain())+'/s)'
                return "This strange matter is not bound by physics. Actually, it's just void, not matter, seperated out from immense Instability, but you can only use a small part of its power.<br><hr>"+gain+time+timeStop+gainAll
            },
            unlocked(){return player.shark.gte(2)},
        },
        voidEnergy:{
            name(){return 'VoidEnergy'},
            color(){return 'rgb(123, 25, 214)'},
            Class(){return 'High'},
            gain(){
                return n(player.void)
            },
            tooltip(){
                let gain = 'Total production:<br>'
                let a = 'Base:('+format(player.void)+')<br>'
                let timeStop = player.timeMod.eq(0) ? 'Time pause:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? 'Time speed:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "Total:("+format(this.gain())+'/s)'
                return "Base:("+colorText('void')[2]+")<hr>Some energy coming out from instability.<br><hr>"+gain+a+time+timeStop+gainAll
            },
            unlocked(){return player.fixBugsClickTimes.gte(1)}
        },
        power:{
            name(){return 'UnstableEnergy'},
            color(){return '#fff'},
            Class(){return 'High'},
            gain(){
                if(player.shark.eq(3)){
                    return n(0).sub(player.power.div(1000))
                }
                if(player.shark.eq(4)){
                    return n(0).sub(player.power.div(1000)).sub(player.power.div(100))
                }
                return n(0)
            },
            tooltip(){
                let base = player.shark.eq(3) ? "Base:("+colorText('power')[2]+"/1000)<hr>" : player.shark.eq(4) ?  "Base:("+colorText('power')[2]+"/1000+"+colorText('power')[2]+"/100)<hr>" : ''
                let gain = 'Total production:<br>'
                let a = player.shark.eq(3) ? 'Base:('+format(n(0).sub(player.power.div(1000)))+')<br>' : player.shark.eq(4) ?  'Base:('+format(n(0).sub(player.power.div(1000).sub(player.power.div(100))))+')<br>' : ''
                let timeStop = player.timeMod.eq(0) ? 'Time pause:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? 'Time speed:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "Total:("+format(this.gain())+'/s)'
                return base+"A powerful form of energy from Instability, but it's also dangerous.<br>Unstable energy improves multiplier of Void core and Void power.<hr><div style='text-align: left;'>Void core and Void power mult*"+format(this.effect())+".<hr>"+gain+a+time+timeStop+gainAll
            },
            effect(){
                return player.power.max(1).log(10).max(1).pow(0.2)
            },
            unlocked(){return player.powerClickTimes.gte(1) || player.shark.gte(3)}
        },
        energy:{
            name(){return 'Energy'},
            color(){return '#e4f358'},
            Class(){return 'High'},
            gain(){
                if(player.shark.gte(3)){
                    return n(0).add(player.power.div(1000))
                }
                return n(0)
            },
            PR(){return [n(1),n(1)]},
            tooltip(){
                let gain = 'Total production:<br>'
                let a = 'Base:('+format(player.power.div(1000))+')<br>'
                let timeStop = player.timeMod.eq(0) ? 'Time pause:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? 'Time speed:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "Total:("+format(this.gain())+'/s)'
                return "Base:("+colorText('power')[2]+"/1000)<hr>Energy stabilized from unstable energy, lost its immense power, but can be utilized.<hr>"+gain+a+time+timeStop+gainAll
            },
            unlocked(){return player.shark.gte(3)}
        },
        realFixedSpeed:{
            name(){return 'FixingSpeed'},
            max(){return n(1).add(player.building1.add(5).factorial().log(5).mul(player.building1))},
            color(){return 'rgb(26, 162, 196)'},
            tooltip(){
                return "Why hurry, you love bugs huh."
            },
            gain(){
                return player.robot.mul(0.001).mul(player.building0.mul(10).add(1))
            },
            unlocked(){return (player.fixedSpeed.gte(0.9) && player.b.eq(0))},
        },
        fixedSpeed:{
            name(){return 'FixingSpeed'},
            color(){return 'rgb(26, 162, 196)'},
            tooltip(){
                return "Why hurry, you love bugs huh."
            },
            gain(){
                return player.robot.mul(0.001).mul(player.building0.mul(10).max(1))
            },
            unlocked(){return (player.aa.eq(1) || player.ab.eq(1)) && player.fixedSpeed.lt(0.9) && player.b.eq(0)},
        },
        robot:{
            name(){return 'Robot'},
            color(){return '#AAA'},
            tooltip(){
                return "*fixed<br>*fundefinedxed<br>*fundefinedxundefinedd<br>*undefinedundefinedundefinedundefinedd<br>..."
            },
            unlocked(){return player.robot.gt(0) && player.b.eq(0)},
        },
        mood:{
            name(){return 'Mood'},
            Class(){return 'Space'},
            max(){return n(100)},
            color(){return 'rgb(219, 34, 105)'},
            tooltip(){
                if(player.mood.lte(35)){
                    return "Don't make me angry, 50 is medium, be careful!"
                }
            },
            unlocked(){return player.ab.gte(1) && player.b.eq(0)},
        },
    },
    action:{
        0:{
            name(){return 'undefined'},
            onClick(){
                player.a = player.a.add(1)
                var text=[
                    'Easter egg:不道德的巅峰,看到这个彩蛋的人都不怀好意.',//0
                    '&lt;a style="color: undefined">undefined&lt;/a&gt;',//1
                    'Hello, friend, nice to see you.',//2
                    'Welcome to ONLY ONE.',//3
                    'This is a...',//4
                    'Oh wait, I probably shouldn\'t be here now.',//5
                    'Strange, what\'s happening.',//6
                    'Sorry, but I need to fix these bugs first.',//7
                    'Stop pressing it, let me fix.',//8
                    '...',//9
                    '...',//10
                    '...',//11
                    '...',//12
                    'Hey, if you keep pressing, I won\'t be able to fix it.',//13
                    '...',//14
                    'Oh no, damn it, so many annoying bug, I won\'t be able to fix them all.',//15
                    'I aaaaammmmm laggggggging now, thhhhhis is not ffffun, pleeeeaaaase stttop nowww, weee can stilllll be friends.',//16
                    'Well, you askkkked for it',//17
                    '<a style="color: rgb(0, 206, 0)" class="High">close()</a><br>*<a style="color: #FF0000">Error:unauthorized,undefined</a>',//18
                ]
                if(player.a.lte(19)){
                    addLog(text[player.a],'news')
                    if(player.a.eq(1)){
                        player.mood = n(50)
                    }
                    if(player.a.eq(19)){
                        if(player.bugs.gte(2000)){
                            player.aa = player.aa.add(1)
                            addLog('You\'re so...uh...I can\'t hel....l....lp you now...., you....gotta fix...it....by yourself.','news')
                        }else{
                            player.ab = player.ab.add(1)
                            addLog('Urgh, it\'s good you stopped clicking. But be warned, if you keep being so rude, I\'ll toss you out of this game.','news')
                            player.mood = player.mood.sub(15)
                        }
                        player.fixedSpeed = n(0.001)
                        player.realFixedSpeed = n(0.001)
                    }
                }
                player.bugs = player.bugs.add(140)
                
                let bugadd = n(0)
                if(player.a.lt(7)){
                    bugadd = n(0).sub(53)
                }else if(player.a.gte(7) && player.aa.eq(0) && player.ab.eq(0)){
                    bugadd = n(0).add(132)
                }else{
                    bugadd = n(0).add(0)
                }
                player.bugsFiexdSpeed = n(bugadd)
            },
            unlocked(){return (player.a.lt(19) && player.ac.lt(1)) && player.b.eq(0)},
            tooltip(){
                return "undefined"
            },
        },
        1:{
            name(){return 'Hasten'},
            tooltip(){
                return "undefined"
            },
            onClick(){
                if(player.hastenTimes.lte(30)){
                    player.fixedSpeed = player.fixedSpeed.add(0.001)
                    player.realFixedSpeed = player.realFixedSpeed.add(0.001)
                    player.hastenTimes = player.hastenTimes.add(1)
                    if(player.hastenTimes.eq(10)){
                        addLog('Arrrrrgh, stop shouting!','news')
                        player.mood = player.mood.sub(1)
                    }else if(player.hastenTimes.eq(20)){
                        addLog('Didn\'t you hear me, it so loud!','news')
                    }else if(player.hastenTimes.eq(30)){
                        addLog('Damn it, Take this robot, and go away!','news')
                        player.robot = n(1)
                    }else if(player.hastenTimes.eq(1)){
                        addLog('*You have been ignored*','news')
                    }
                }else{
                    player.hastenTimes = player.hastenTimes.add(1)
                    if(player.hastenTimes.eq(35)){
                        addLog('*What are you expecting now*','news')
                    }else if(player.hastenTimes.eq(40)){
                        addLog('*There\'s nothing here, this button is useless now, stop clicking.*','news')
                    }else if(player.hastenTimes.eq(70)){
                        addLog('*I know you\'re looking for easter eggs here, but there is\'nt any here.*','news')
                    }else if(player.hastenTimes.eq(230)){
                        player.achievement1 = true
                        addLog('*Booooring!*<br><a style="color: rgb(170, 147, 15)" class="Space">Gained achievement:Boring</a><sub><a style="color: gray" class="Space">Did you know, I didn\'t want to give you this achievement, but I don\'t want you to keep clicking...</a></sub><br>'+AllAchievement(),'news')
                    }else if(player.hastenTimes.eq(330)){
                        player.achievement2 = true
                        addLog('*You win!*<br><a style="color: rgb(170, 147, 15)" class="Space">Gained achievement:You win</a><sub><a style="color: gray" class="Space">...</a></sub><br>'+AllAchievement(),'news')
                    }
                }
            },
            unlocked(){return (player.aa.gte(1) || player.ab.gte(1)) && player.b.eq(0)},
        },
        'soaring':{
            name(){return 'Ascend'},
            unlocked(){return player.points.gte(1) && player.ac.gte(1) && player.b.eq(0)},
            tooltip(){
                let a = 'Ascend to reach further, but there will be limitations...'
                return "<small>"+a+""
            },
            onClick(){
                player.points = n(0)
                player.ac = player.ac.add(1)
                player.soaring = player.soaring.add(1)
                addLog('Well, you have ascended once, you must have known much about this game. So, keep ascending, and unlocking more.','news')
            },
        },
        'In':{
            name(){return 'i in ii'},
            unlocked(){return player.soaring.gte(1) && player.ac.gte(1) && player.b.eq(0)},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = 'Gain 1 in'
                let fin = "</div>"
                return "<small>"+top+sudb+fin+'</small>'
            },
            onClick(){
                player.In = player.In.add(1).min(1)
                player.ac = player.ac.add(1)
                if(player.ac.eq(4)){
                    addLog('This is in, it will generate previous tier of in. In short, the more in you have, the more point you gain.','news')
                }else if(player.ac.eq(5)){
                    addLog('Yeah just like this, keep clicking.','news')
                }else if(player.ac.eq(6)){
                    addLog('Soon, you can ascend more.','news')
                }else if(player.ac.eq(7)){
                    addLog('Uh?','news')
                }else if(player.ac.eq(8)){
                    addLog('Why is in capped, it shouldn\'t happen.','news')
                }else if(player.ac.eq(9)){
                    addLog('Wait there is some more bug.','news')
                    overTime = 0
                }
            },
        },
        'fixBugs':{
            name(){return 'FixBug'},
            tooltip(){
                let a = (main.building[11].effect()).gt(1) ? '<br>Void core:*'+format(main.building[11].effect()) : ''
                let b = player.shark.gte(3) ? '<br>ShAr:^-'+format(this.effectPower()) : ''
                let fin = n(this.power()).eq(1) ? format(this.base()) : format(this.base())+'<sup>'+format(this.power())+'</sup> = '+format(this.finPow())
                return 'Try to fix bug<hr><small><div style="text-align: left;">Base speed:10'+a+b+'<br><br>Total effect:'+fin+'</div></small>'
            },
            effectPower(){
                if(player.shark.gte(3)){
                    return n(0.3)
                }
                if(player.shark.gte(4)){
                    return n(0.8)
                }
                return n(0)
            },
            unlocked(){return player.b.gte(1)},
            base(){
                return n(10).mul(main.building[11].effect())
            },
            power(){
                return n(1).sub(this.effectPower())
            },
            finPow(){
                return n(this.base()).pow(this.power())
            },
            onClick(){
                let base = n(main.action.fixBugs.finPow())
                let pow = n(1)

                player.bugs = player.bugs.sub(base).max(1)
                if(player.shark.gte(3)){
                    pow = n(0.01)
                }
                player.voidEnergy = player.voidEnergy.add(n(base).pow(pow))

                player.fixBugsClickTimes = player.fixBugsClickTimes.add(1)
            },
        },
        'power':{
            name(){return 'Invert'},
            tooltip(){
                return 'Use power from bug to fix bug, but this will make this game more unstable.<br><s>Use bugs to defeat bugs</s>'
            },
            unlocked(){return player.shark.gte(2)},
            onClick(){
                let base = n(1).mul(Math.random() * 100)
                let unPow = n(1)

                if(player.shark.eq(4)){
                    unPow = n(1.1)
                }

                player.bugs = player.bugs.add(n(base).mul(1e10))
                player.unstable = player.unstable.add(n(base).div(200).pow(0.75).pow(unPow))
                player.power = player.power.add(n(base).pow(1.1).pow(n(main.resource.unstable.effect()).add(1)))

                player.powerClickTimes = player.powerClickTimes.add(1)
            },
        },
        'autoBuilding11':{
            name(){return 'Autobuyer:VoidCore'},
            tooltip(){
                let a = player.autoBuilding11Set ? 'On' : 'Off'
                return a
            },
            unlocked(){return player.building13.gte(1) || player.shark.gte(3)},
            onClick(){
                if(player.autoBuilding11Set==true){
                    player.autoBuilding11Set = false
                }else{
                    player.autoBuilding11Set = true
                }
            },
        },
    },
    building:{
        0:{
            name(){return 'Accleration'},
            unlocked(){return player.hastenTimes.gt(35) && player.b.eq(0)},
            cost(){return [['realFixedSpeed',n(0.05)]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '*'+format(player.building0.mul(10).max(1))+' '+colorText('robot')[2]+" Speed"
                let fin = "</div>"
                return "Acclerate your robot.<small>"+top+sudb+fin+'</small>'
            },
        },
        1:{
            name(){return 'Core'},
            unlocked(){return player.building0.gte(5) && player.b.eq(0)},
            cost(){return [['realFixedSpeed',n(1).add(player.building1.mul(1)).pow(player.building1.mul(0.15))]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '+'+format(player.building1.add(5).factorial().log(5).mul(player.building1))+' '+colorText('realFixedSpeed')[2]+" Cap"
                let fin = "</div>"
                return "Use part of the robot\'s core to increase speed limit.'.<small>"+top+sudb+fin+'</small>'
            },
        },
        2:{
            name(){return 'Jerk'},
            unlocked(){return player.building1.gte(3) && player.b.eq(0)},
            cost(){return [['robot',n(0.6)]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '+'+format(player.building2.mul(100))+" accleration/s"
                let fin = "</div>"
                return "Dismantle part of your robot to build autobuyer for accleration.<small>"+top+sudb+fin+'</small>'
            },
        },
        11:{
            name(){return 'VoidCore'},
            unlocked(){return player.fixBugsClickTimes.gte(1) && player.shark.gte(1) || player.shark.gte(2)},
            cost(){return [['voidEnergy',n(50).pow(n(1.12).pow(player.building11.add(1).log(2))).pow(this.costPower())]]},
            costPower(){
                if(player.shark.eq(2)){
                    return n(1.2)
                }
                if(player.shark.eq(3)){
                    return n(1.25)
                }
                if(player.shark.eq(4)){
                    return n(2)
                }
                return n(1)
            },
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '*'+format(this.effect())+" “fix bug”base(based on amount of"+colorText('bugs')[2]+")"
                let fin = "</div>"
                return "Use the center of void, to invert bug!<small>"+top+sudb+fin+'</small>'
            },
            effect(){
                let base = n(player.bugs.max(1).log(n(10).div(player.building11.add(1).pow(0.8)).add(1)).max(1))
                let basePow = n(player.building11.mul(0.01).add(1))
                let pow = n(main.building[12].effect().add(1))
                return n(base).pow(basePow).mul(main.resource.power.effect()).pow(pow).mul(player.building11.min(1)).max(1)
            },
        },
        12:{
            name(){return 'VoidPower'},
            unlocked(){return player.fixBugsClickTimes.gte(20) || player.shark.gte(2)},
            cost(){return [['voidEnergy',n(1700).pow(n(2).pow(player.building12.add(1).log(2)))]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '+'+format(this.effect())+" “Void core”exponent(based on amount of "+colorText('bugs')[2]+")"
                let fin = "</div>"
                return "Use the power of void, to invert bug!<small>"+top+sudb+fin+'</small>'
            },
            effect(){
                return player.bugs.mul(n(10).pow(player.building12)).max(1).log(30).max(1).div(10).mul(main.resource.power.effect()).mul(player.building11.min(1))
            },
        },
        13:{
            name(){return 'AI Core'},
            unlocked(){return player.powerClickTimes.gte(1)},
            cost(){return [['power',n(30).pow(player.building13.add(1))]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = 'Autobuy'+format(this.effect())+" Void core/s(Based on"+colorText('power')[2]+")"
                let fin = "</div>"
                return "Machine power.<small>"+top+sudb+fin+'</small>'
            },
            effect(){
                return player.power.max(1).log(1.1).pow(player.building13).max(1).sub(1)
            },
        },
        101:{
            name(){return 'Research(MAX3):ReactorUpgrade'},
            unlocked(){return player.researchPointUnlocked==true && player.building101.lt(3)},
            cost(){return [['researchPoint',n(10).pow(player.building101.add(1))]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '-'+format(this.effect())+' '+colorText('unstable')[2]+'effect divisor'
                let fin = "</div>"
                return "<small>"+top+sudb+fin+'</small>'
            },
            effect(){
                return player.building101.pow(1.3)
            },
        },
        102:{
            name(){return 'Research(MAX4):CoolingUpgrade'},
            unlocked(){return player.researchPointUnlocked==true && player.building102.lt(4)},
            cost(){return [['researchPoint',n(20).pow(player.building102.mul(5).add(1).log(10).add(1))]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '*'+format(this.effect())+' '+colorText('unstable')[2]+' cooldown speed'
                let fin = "</div>"
                return "<small>"+top+sudb+fin+'</small>'
            },
            effect(){
                return player.building102.add(1)
            },
        },
        103:{
            name(){return 'Research(MAX3):LabRoom'},
            unlocked(){return player.researchPointUnlocked==true && player.building103.lt(3)},
            cost(){return [['researchPoint',n(10).pow(player.building103.mul(0.5).add(1)).pow(1.5)]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '*'+format(this.effect())+' research speed'
                let fin = "</div>"
                return "Note:will force extract research points when buying.<hr><small>"+top+sudb+fin+'</small>'
            },
            effect(){
                return n(2).pow(player.building103)
            },
        },
        104:{
            name(){return 'Research(MAX1)</small>:ClockworksRoom'},
            unlocked(){return player.researchPointUnlocked==true && player.building104.lt(1)},
            cost(){return [['researchPoint',n(1000)]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = 'Unlock time flux.'
                let fin = "</div>"
                return "<small>"+top+sudb+fin+'</small>'
            },
        },
        105:{
            name(){return 'Research(MAX1):TimeInversionRoom'},
            unlocked(){return player.researchPointUnlocked==true && player.building105.lt(1)},
            cost(){return [['researchPoint',n(1001)]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = 'Unlock time flux'
                let fin = "</div>"
                return "Well, this is the end of content...<br>Author's words:In this game jam I wasted 7 days, used 4 days to make something irrelevant, and there is only 2 days for content.<br>I don't easily give up games, I will most probably finish remaining content.<br><big>Thanks for playing!</big><hr><small>"+top+sudb+fin+'</small>'
            },
        },
    },
}