var mainTab = {
    action:{
        name(){return '行动'},
        logs(){return ['action','行动']},
        id(){return 'Action'},
    },
    building:{
        name(){return '建筑'},
        logs(){return ['building','建筑']},
        id(){return 'Building'},
    },
}

var main = {
    resource:{
        time:{
            name(){return '时间通量'},
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
                let gain = '总计生产:<br>'
                let a = player.timeMod.eq(2) ? '时间洪流:(-'+format(n(1))+')<br>' : ''
                let timeStop = player.timeMod.eq(0) ? '时间暂停:(+'+format(n(1))+')<br>' : ''
                let time = player.timeMod.eq(2) ? '时间倍率:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "总计:("+format(this.gain())+'/秒) <-> ('+formatTime(this.gain())+'/秒)'
                let max = '<hr>总计上限:<br>'
                let a2 = "基础:(+3600.00)<br>"
                let maxAll = "总计:(+"+format(this.max())+') <-> (+'+formatTime(this.max())+')'
                return "这个资源可能在未来也就是2个月前的现在获得,等等,现在是什么时间?<hr>离线时长超过20秒或暂停时获得同等"+colorText('time')[2]+"<br>"+colorText('time')[2]+"可以加速资源生产的时间流逝<br><hr>"+gain+a+timeStop+time+gainAll+max+a2+maxAll
            },
            unlocked(){return player.building104.gte(1)},
            otherText(){
                return '<a id="time">时间洪流</a>'
            },
            otherTooltip(){
                return "点击以改变流速,在时间洪流中你每秒消耗1时间通量来获得全局资源生产速度提升<br>当前你的时间倍率是:<a style='color: red;'>"+format(player.timeMod)+'</a>(上限:'+format(n(2))+')'
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
            name(){return '飞升'},
            color(){return 'rgba(167, 184, 19, 0.9)'},
            tooltip(){
                let a = ''
                if(player.soaring.gte(1)){a += '1.点数生产*1e-10,但是解锁<s style="color: #888">po</s>in<s style="color: #888">ts</s><br>'}
                return a
            },
            unlocked(){return player.ac.gte(1) && player.soaring.gte(1) && player.b.eq(0)},
        },
        points:{
            name(){return '点数'},
            max(){return n(1)},
            color(){return '#000'},
            gain(){
                let base = n(1)
                let mul = n(1)
                if(player.soaring.gte(1)){mul = n(1).mul(1e-10)}
                return base.mul(mul)
            },
            tooltip(){
                let gain = '总计生产:<br>'
                let a = "基础:(+"+format(n(1))+")<br>"
                let b = player.timeMod.eq(0) ? 'in:(×'+format(n(1))+')<br>' : ''
                let timeStop = player.timeMod.eq(0) ? '时间暂停:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? '时间倍率:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "总计:(+"+format(this.gain())+'/秒)'
                let max = '<hr>总计上限:<br>'
                let a2 = "基础:(+"+format(this.max())+")<br>"
                let maxAll = "总计:(+"+format(this.max())+')'
                return "点数<hr>"+gain+a+b+time+timeStop+gainAll+max+a2+maxAll
            },
            unlocked(){return player.ac.gte(1) && player.bugs.lte(0) && player.b.eq(0)},
        },
        In:{
            name(){return 'in'},
            max(){return n(1)},
            color(){return '#000'},
            gain(){return n(0)},
            tooltip(){
                let gain = '总计生产:<br>'
                let timeStop = player.timeMod.eq(0) ? '时间暂停:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? '时间倍率:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "总计:(+"+format(this.gain())+'/秒)'
                let max = '<hr>总计上限:<br>'
                let a2 = "基础:(+"+format(this.max())+")<br>"
                let maxAll = "总计:(+"+format(this.max())+')'
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
            name(){return '凌片'},
            Class(){return 'High'},
            color(){return '#000'},
            tooltip(){
                let a = player.shark.gte(1) ? '<big>凌阻1</big><br>'+colorText('bugs')[2]+'生产+10/秒<br>初始'+colorText('bugs')[2]+'+1e6' : ''
                let b = player.shark.gte(2) ? '<hr><big>凌阻2</big><br>'+colorText('bugs')[2]+'生产+1e10/秒<br>初始'+colorText('bugs')[2]+'+1e15<br>“虚无核心”价格^1.2<br>获得2000'+colorText('void')[2]+'' : ''
                let c = player.shark.gte(3) ? '<hr><big>凌阻3</big><br>'+colorText('bugs')[2]+'生产+1e100/秒<br>初始'+colorText('bugs')[2]+'+1e101<br>“虚无核心”价格^1.25<br>获得1.2e4'+colorText('void')[2]+'<br>“修复bug”指数-0.3<br>由“修复bug”获取的'+colorText('voidEnergy')[2]+'^0.01' : ''
                let d = player.shark.gte(4) ? '<hr><big>凌阻4</big><br>'+colorText('bugs')[2]+'生产+1e10460/秒<br>初始'+colorText('bugs')[2]+'+1e10460<br>“虚无核心”价格^2<br>获得1.32e5'+colorText('void')[2]+'<br>“修复bug”指数-0.8<br>由“修复bug”获取的'+colorText('voidEnergy')[2]+'^0.01<br>你每秒会流失1%的'+colorText('power')[2]+'<br>'+colorText('unstable')[2]+'获取^1.1' : ''
                return "不稳定原体<br>或许多攒一些可以有什么发现.<hr><small>"+a+b+c+d
            },
            unlocked(){return player.b.gte(1)},
        },
        researchPoint:{
            name(){return '研究'},
            color(){return '#3dd3f8'},
            max(){return n(1000)},
            gain(){return n(0).mul(player.timeMod)},
            tooltip(){
                let gain = '总计生产:<br>'
                let timeStop = player.timeMod.eq(0) ? '时间暂停:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? '时间倍率:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "总计:(+"+format(this.gain())+'/秒)'
                let max = '<hr>总计上限:<br>'
                let a2 = "基础:(+"+format(this.max())+")<br>"
                let maxAll = "总计:(+"+format(this.max())+')'
                let res1 = player.building101.gte(1) ? '<br>核反应升级('+formatScientific(player.building101,0)+'/3):'+'-'+format(main.building[101].effect())+' '+colorText('unstable')[2]+'效果除数' : ''
                let res2 = player.building102.gte(1) ? '<br>冷却升级('+formatScientific(player.building102,0)+'/4):*'+format(main.building[102].effect())+' '+colorText('unstable')[2]+'冷却速度' : ''
                let res3 = player.building103.gte(1) ? '<br>研究室('+formatScientific(player.building103,0)+'/3):'+'*'+format(main.building[103].effect())+' 研究速度' : ''
                let res4 = player.building104.gte(1) ? '<br>时钟室('+formatScientific(player.building104,0)+'/1):解锁时间通量' : ''
                return "研究世间万物的规律<hr>"+gain+time+timeStop+gainAll+max+a2+maxAll+'<hr><small>已完成的研究:<t style="text-align: left;">'+res1+res2+res3+res4+'</t>'
            },
            unlocked(){return player.researchPoint.gt(0) || player.researchPointUnlocked==true},
        },
        unstable:{
            name(){return '不稳定'},
            color(){return '#098131'},
            Class(){return 'High'},
            gain(){
                return n(0).sub(0.02).mul(main.building[102].effect())
            },
            tooltip(){
                return "危险物质,一旦超过上限结果不堪设想<br>"+colorText('unstable')[2]+"超过1时将会重置,"+colorText('unstable')[2]+"数量越多不稳定能量获取越多<hr><small><div style='text-align: left;'>"+colorText('power')[2]+"获取:^+"+format(this.effect())
            },
            effect(){
                return player.unstable.div(n(4).sub(main.building[101].effect()))
            },
            unlocked(){return player.powerClickTimes.gte(1) || player.shark.gte(3)}
        },
        bugs:{
            name(){return 'bug'},
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
            name(){return '虚空'},
            color(){return 'rgb(123, 25, 214)'},
            Class(){return 'High'},
            gain(){
                let a = n(0)
                return a.mul(player.timeMod)
            },
            tooltip(){
                let gain = '总计生产:<br>'
                let timeStop = player.timeMod.eq(0) ? '时间暂停:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? '时间倍率:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "总计:("+format(this.gain())+'/秒)'
                return "这是一种违背了物理常识的物质,准确来说,这只是一片虚无,算不上是物质,在强大的不稳定中被分离了出来,但你只能利用它强大能量的一部分.<br><hr>"+gain+time+timeStop+gainAll
            },
            unlocked(){return player.shark.gte(2)},
        },
        voidEnergy:{
            name(){return '虚空能量'},
            color(){return 'rgb(123, 25, 214)'},
            Class(){return 'High'},
            gain(){
                return n(player.void)
            },
            tooltip(){
                let gain = '总计生产:<br>'
                let a = '基础:('+format(player.void)+')<br>'
                let timeStop = player.timeMod.eq(0) ? '时间暂停:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? '时间倍率:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "总计:("+format(this.gain())+'/秒)'
                return "基础:("+colorText('void')[2]+")<hr>一种由不稳定体中冒出的未知能量<br><hr>"+gain+a+time+timeStop+gainAll
            },
            unlocked(){return player.fixBugsClickTimes.gte(1)}
        },
        power:{
            name(){return '不稳定能量'},
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
                let base = player.shark.eq(3) ? "基础:("+colorText('power')[2]+"/1000)<hr>" : player.shark.eq(4) ?  "基础:("+colorText('power')[2]+"/1000+"+colorText('power')[2]+"/100)<hr>" : ''
                let gain = '总计生产:<br>'
                let a = player.shark.eq(3) ? '基础:('+format(n(0).sub(player.power.div(1000)))+')<br>' : player.shark.eq(4) ?  '基础:('+format(n(0).sub(player.power.div(1000).sub(player.power.div(100))))+')<br>' : ''
                let timeStop = player.timeMod.eq(0) ? '时间暂停:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? '时间倍率:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "总计:("+format(this.gain())+'/秒)'
                return base+"一种由不稳定体中冒出的更强大的能量,也更加危险<br>你的不稳定能量可以提升虚空核心,虚空力量的乘数<hr><div style='text-align: left;'>*"+format(this.effect())+"虚空核心,虚空力量乘数</div><hr>"+gain+a+time+timeStop+gainAll
            },
            effect(){
                return player.power.max(1).log(10).max(1).pow(0.2)
            },
            unlocked(){return player.powerClickTimes.gte(1) || player.shark.gte(3)}
        },        
        energy:{
            name(){return '能量'},
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
                let gain = '总计生产:<br>'
                let a = '基础:('+format(player.power.div(1000))+')<br>'
                let timeStop = player.timeMod.eq(0) ? '时间暂停:(×'+format(player.timeMod)+')<br>' : ''
                let time = player.timeMod.eq(2) ? '时间倍率:(×'+format(player.timeMod)+')<br>' : ''
                let gainAll = "总计:("+format(this.gain())+'/秒)'
                return "基础:("+colorText('power')[2]+"/1000)<hr>由不稳定能量聚合,裂变形成的稳定能量,虽然失去了强大的力量,但因此也获得了一个研究和利用的机会<hr><hr>"+gain+a+time+timeStop+gainAll
            },
            unlocked(){return player.shark.gte(3)}
        },
        realFixedSpeed:{
            name(){return '修复速度'},
            max(){return n(1).add(player.building1.add(5).factorial().log(5).mul(player.building1))},
            color(){return 'rgb(26, 162, 196)'},
            tooltip(){
                return "急什么急,反正你爱玩bug."
            },
            gain(){
                return player.robot.mul(0.001).mul(player.building0.mul(10).add(1))
            },
            unlocked(){return (player.fixedSpeed.gte(0.9) && player.b.eq(0))},
        },
        fixedSpeed:{
            name(){return '修复速度'},
            color(){return 'rgb(26, 162, 196)'},
            tooltip(){
                return "急什么急,反正你爱玩bug."
            },
            gain(){
                return player.robot.mul(0.001).mul(player.building0.mul(10).max(1))
            },
            unlocked(){return (player.aa.eq(1) || player.ab.eq(1)) && player.fixedSpeed.lt(0.9) && player.b.eq(0)},
        },
        robot:{
            name(){return '机器人'},
            color(){return '#AAA'},
            tooltip(){
                return "*fixed<br>*fundefinedxed<br>*fundefinedxundefinedd<br>*undefinedundefinedundefinedundefinedd<br>..."
            },
            unlocked(){return player.robot.gt(0) && player.b.eq(0)},
        },
        mood:{
            name(){return '心情'},
            Class(){return 'Space'},
            max(){return n(100)},
            color(){return 'rgb(219, 34, 105)'},
            tooltip(){
                if(player.mood.lte(35)){
                    return "不要惹我生气谢谢,50是中等,好好掂量掂量你!"
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
                    '彩蛋:不道德的巅峰,看到这个彩蛋的人都不怀好意.',//0
                    '&lt;a style="color: undefined">undefined&lt;/a&gt;',//1
                    '哦,朋友,很高兴能见到你',//2
                    '欢迎来到 ONLY ONE',//3
                    '这是一款...',//4
                    '哦等等,这似乎不是我应该出现的时间',//5
                    '奇怪,这是怎么回事',//6
                    '实在是抱歉了,不过我得先修复一下这些bug',//7
                    '你别按了,让我先修',//8
                    '...',//9
                    '...',//10
                    '...',//11
                    '...',//12
                    '朋友,你要是再捣乱的话,我就修不好了',//13
                    '...',//14
                    '哦不,该死,这令人讨厌的bug,我要修不完了',//15
                    '我我我我我我我已经有有有有有点卡了,这这这这这不好玩,现在请请请请请请你停下,我们还还还还还能做朋友.',//16
                    '行,你逼我我我我我我我我的',//17
                    '<a style="color: rgb(0, 206, 0)" class="High">close()</a><br>*<a style="color: #FF0000">命令错误:您没有该权限,undefined</a>',//18
                ]
                if(player.a.lte(19)){
                    addLog(text[player.a],'news')
                    if(player.a.eq(1)){
                        player.mood = n(50)
                    }
                    if(player.a.eq(19)){
                        if(player.bugs.gte(2000)){
                            player.aa = player.aa.add(1)
                            addLog('你真的...是...我现在....也帮....不了你....了,你....自己慢慢...修吧','news')
                        }else{
                            player.ab = player.ab.add(1)
                            addLog('咳咳,幸好你没有继续点了.不过我警告你,下次要是还这么粗鲁的话,信不信我直接把你扔出游戏.','news')
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
            name(){return '催促'},
            tooltip(){
                return "undefined"
            },
            onClick(){
                if(player.hastenTimes.lte(30)){
                    player.fixedSpeed = player.fixedSpeed.add(0.001)
                    player.realFixedSpeed = player.realFixedSpeed.add(0.001)
                    player.hastenTimes = player.hastenTimes.add(1)
                    if(player.hastenTimes.eq(10)){
                        addLog('啊啊啊,吵什么吵!','news')
                        player.mood = player.mood.sub(1)
                    }else if(player.hastenTimes.eq(20)){
                        addLog('你没听见吗,吵死了!','news')
                    }else if(player.hastenTimes.eq(30)){
                        addLog('可恶,拿上这个机器人,然后给我滚','news')
                        player.robot = n(1)
                    }else if(player.hastenTimes.eq(1)){
                        addLog('*系统已经将你屏蔽*','news')
                    }
                }else{
                    player.hastenTimes = player.hastenTimes.add(1)
                    if(player.hastenTimes.eq(35)){
                        addLog('*你在期待什么*','news')
                    }else if(player.hastenTimes.eq(40)){
                        addLog('*这里啥也没有,这个按钮已经没有作用了,你不要再点了*','news')
                    }else if(player.hastenTimes.eq(70)){
                        addLog('*我知道你想找彩蛋,但是这里确实没有彩蛋.*','news')
                    }else if(player.hastenTimes.eq(230)){
                        player.achievement1 = true
                        addLog('*无聊*<br><a style="color: rgb(170, 147, 15)" class="Space">获得成就:无聊</a><sub><a style="color: gray" class="Space">你知道吗,我本来是不想给你这个成就的,但我怕你一直点下去...</a></sub><br>'+AllAchievement(),'news')
                    }else if(player.hastenTimes.eq(330)){
                        player.achievement2 = true
                        addLog('*你赢了*<br><a style="color: rgb(170, 147, 15)" class="Space">获得成就:你赢了</a><sub><a style="color: gray" class="Space">...</a></sub><br>'+AllAchievement(),'news')
                    }
                }
            },
            unlocked(){return (player.aa.gte(1) || player.ab.gte(1)) && player.b.eq(0)},
        },
        'soaring':{
            name(){return '飞升'},
            unlocked(){return player.points.gte(1) && player.ac.gte(1) && player.b.eq(0)},
            tooltip(){
                let a = '飞升以达到更加理想的高度,只不过会受到一些限制...'
                return "<small>"+a+"</small>"
            },
            onClick(){
                player.points = n(0)
                player.ac = player.ac.add(1)
                player.soaring = player.soaring.add(1)
                addLog('很好,既然你已经成功飞升一次了,想来你也对这游戏了解很多了,那么接下来,继续飞升吧,解锁更多的东西去','news')
            },
        },
        'In':{
            name(){return 'i in ii'},
            unlocked(){return player.soaring.gte(1) && player.ac.gte(1) && player.b.eq(0)},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '获得1in'
                let fin = "</div>"
                return "<small>"+top+sudb+fin+'</small>'
            },
            onClick(){
                player.In = player.In.add(1).min(1)
                player.ac = player.ac.add(1)
                if(player.ac.eq(4)){
                    addLog('这是in,他会帮你遍历上一级的in.简单来讲,你的in越多,你获得的点数就越多','news')
                }else if(player.ac.eq(5)){
                    addLog('对就是这样,多点几下.','news')
                }else if(player.ac.eq(6)){
                    addLog('很快,你就可以进行下一次飞升了','news')
                }else if(player.ac.eq(7)){
                    addLog('欸?','news')
                }else if(player.ac.eq(8)){
                    addLog('为什么in被上限了,这不应该啊.','news')
                }else if(player.ac.eq(9)){
                    addLog('等等好像又有一点点bug.','news')
                    overTime = 0
                }
            },
        },
        'fixBugs':{
            name(){return '修复bug'},
            tooltip(){
                let a = (main.building[11].effect()).gt(1) ? '<br>虚无核心:*'+format(main.building[11].effect()) : ''
                let b = player.shark.gte(3) ? '<br>凌片:^-'+format(this.effectPower()) : ''
                let fin = n(this.power()).eq(1) ? format(this.base()) : format(this.base())+'<sup>'+format(this.power())+'</sup> = '+format(this.finPow())
                return '尝试修复bug<hr><small><div style="text-align: left;">基础速度:10'+a+b+'<br><br>最终效率:'+fin+'</div></small>'
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
            name(){return '扭转力量'},
            tooltip(){
                return '提取bug中的力量去修复bug,只是这会让本就不稳定的游戏雪上加霜<br><s>要用bug去打败bug</s>'
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
            name(){return '自动购买虚无核心'},
            tooltip(){
                let a = player.autoBuilding11Set ? '已开启' : '已关闭'
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
            name(){return '加速度'},
            unlocked(){return player.hastenTimes.gt(35) && player.b.eq(0)},
            cost(){return [['realFixedSpeed',n(0.05)]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '*'+format(player.building0.mul(10).max(1))+' '+colorText('robot')[2]+"速度"
                let fin = "</div>"
                return "用速度加持机器人.<small>"+top+sudb+fin
            },
        },
        1:{
            name(){return '核心'},
            unlocked(){return player.building0.gte(5) && player.b.eq(0)},
            cost(){return [['realFixedSpeed',n(1).add(player.building1.mul(1)).pow(player.building1.mul(0.15))]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '+'+format(player.building1.add(5).factorial().log(5).mul(player.building1))+' '+colorText('realFixedSpeed')[2]+"上限"
                let fin = "</div>"
                return "用一点点机器人的核心来扩充速度上限.<small>"+top+sudb+fin
            },
        },
        2:{
            name(){return '加加速度'},
            unlocked(){return player.building1.gte(3) && player.b.eq(0)},
            cost(){return [['robot',n(0.6)]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '+'+format(player.building2.mul(100))+" 加速度/秒"
                let fin = "</div>"
                return "拆掉一点你的机器人来构建一个自动购买加速度的机器人.<small>"+top+sudb+fin
            },
        },
        11:{
            name(){return '虚无核心'},
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
                let sudb = '*'+format(this.effect())+" “修复bug”基数(基于"+colorText('bugs')[2]+"数量)"
                let fin = "</div>"
                return "利用虚空的中心,逆转bug!<small>"+top+sudb+fin
            },
            effect(){
                let base = n(player.bugs.max(1).log(n(10).div(player.building11.add(1).pow(0.8)).add(1)).max(1))
                let basePow = n(player.building11.mul(0.01).add(1))
                let pow = n(main.building[12].effect().add(1))
                return n(base).pow(basePow).mul(main.resource.power.effect()).pow(pow).mul(player.building11.min(1)).max(1)
            },
        },
        12:{
            name(){return '虚无力量'},
            unlocked(){return player.fixBugsClickTimes.gte(20) || player.shark.gte(2)},
            cost(){return [['voidEnergy',n(1700).pow(n(2).pow(player.building12.add(1).log(2)))]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '+'+format(this.effect())+" “虚无核心”指数(基于"+colorText('bugs')[2]+"数量)"
                let fin = "</div>"
                return "利用虚空的力量,逆转bug!<small>"+top+sudb+fin
            },
            effect(){
                return player.bugs.mul(n(10).pow(player.building12)).max(1).log(30).max(1).div(10).mul(main.resource.power.effect()).mul(player.building11.min(1))
            },
        },
        13:{
            name(){return 'AI核心'},
            unlocked(){return player.powerClickTimes.gte(1)},
            cost(){return [['power',n(30).pow(player.building13.add(1))]]},
            tooltip(){
                let top = "<div style='text-align: left;'><hr>"
                let sudb = '自动购买'+format(this.effect())+" 虚空核心/秒(基于"+colorText('power')[2]+")"
                let fin = "</div>"
                return "机械使能.<small>"+top+sudb+fin
            },
            effect(){
                return player.power.max(1).log(1.1).pow(player.building13).max(1).sub(1)
            },
        },
        101:{
            name(){return '研究(MAX3):核反应升级'},
            unlocked(){return player.researchPointUnlocked==true && player.building101.lt(3)},
            cost(){return [['researchPoint',n(10).pow(player.building101.add(1))]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '-'+format(this.effect())+' '+colorText('unstable')[2]+'效果除数'
                let fin = "</div>"
                return "<small>"+top+sudb+fin
            },
            effect(){
                return player.building101.pow(1.3)
            },
        },
        102:{
            name(){return '研究(MAX4):冷却升级'},
            unlocked(){return player.researchPointUnlocked==true && player.building102.lt(4)},
            cost(){return [['researchPoint',n(20).pow(player.building102.mul(5).add(1).log(10).add(1))]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '*'+format(this.effect())+' '+colorText('unstable')[2]+' 冷却速度'
                let fin = "</div>"
                return "<small>"+top+sudb+fin
            },
            effect(){
                return player.building102.add(1)
            },
        },
        103:{
            name(){return '研究(MAX3):研究室'},
            unlocked(){return player.researchPointUnlocked==true && player.building103.lt(3)},
            cost(){return [['researchPoint',n(10).pow(player.building103.mul(0.5).add(1)).pow(1.5)]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '*'+format(this.effect())+' 研究速度'
                let fin = "</div>"
                return "注意:购买时强制取出研究<hr><small>"+top+sudb+fin
            },
            effect(){
                return n(2).pow(player.building103)
            },
        },
        104:{
            name(){return '研究(MAX1):时钟室'},
            unlocked(){return player.researchPointUnlocked==true && player.building104.lt(1)},
            cost(){return [['researchPoint',n(1000)]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '解锁“时间通量”'
                let fin = "</div>"
                return "<small>"+top+sudb+fin
            },
        },
        105:{
            name(){return '研究(MAX1):逆时所'},
            unlocked(){return player.researchPointUnlocked==true && player.building105.lt(1)},
            cost(){return [['researchPoint',n(1001)]]},
            tooltip(){
                let top = "<div style='text-align: left;'>"
                let sudb = '解锁“逆转时间”'
                let fin = "</div>"
                return "好吧,当然看见这个时就代表已经没有更多的内容了...<br>作者的私话:其实本次的game jam我浪费了7天,做了4天与游戏内容无关的东西,最后只有不到2天给我写游戏内容. <br>我不是一个容易随意抛弃游戏的人,大概率我会继续制作没做完的内容.<br><big>感谢游玩</big><hr><small>"+top+sudb+fin
            },
        },
    },
}