function calcPlayer(){
    loader(['a'],n(0))
    loader(['aa'],n(0))
    loader(['ab'],n(0))
    loader(['ac'],n(0))

    loader(['b'],n(0))

    loader(['bugsLock'],false)
    loader(['bugsFiexdSpeed'],n(0))
    loader(['bugsLogs'],n(0))
    loader(['fixedSpeedLock'],false)

    loader(['realRestTimes'],n(0))
    loader(['restTimes'],n(0))
    loader(['hastenTimes'],n(0))
    
    loader(['mainLogs'],'')

    loader(['sharkRest'],false)
    loader(['unstableRest'],false)
    
    loader(['autoBuilding11Set'],true)
    
    loader(['fixBugsClickTimes'],n(0))
    loader(['powerClickTimes'],n(0))
    
    loader(['achievement1'],false)
    loader(['achievement2'],false)
    loader(['achievement3'],false)
    loader(['achievement4'],false)

    baseLoader()
    
    superLoader()
}

function baseLoader(){
    loader(['offline'],n(0))
    loader(['timeMod'],n(1))

    loader(['devSpeed'],n(1))

    loader(['firstGame'],false)

    loader(['logsType'],["none"])

	loader(['autoSave'],true)
	loader(['saveTick'],false)
    loader(['noneButtonID'],false)
	loader(['countingMethod'],"scientific")
	loader(['flushLog'],false)

    loader(['ResearchItem'],'energy')
    loader(['researchBar'],n(0))
    loader(['researchBarPower'],n(1))
    loader(['researchBarMax'],n(200))

    loader(['voidBar'],n(0))
    loader(['voidRealBar'],n(0))
    loader(['voidBarMax'],n(10000000))
    loader(['voidBarPower'],n(100000))

    loader(['pointBar'],n(0))
    loader(['pointBarPower'],n(1))
    loader(['pointRealBar'],n(0))
    loader(['pointBarMax'],n(200))

    loader(['barToggle'],n(100))
}

function superLoader(){
    for(let ii in main['resource']){
		loader([ii],n(0))
        loader([ii+'Unlock'],false)
        loader([ii+'Unlocked'],false)
	}
    for(let  ii in main['building']){
		loader(['building'+ii],n(0))
	}
}