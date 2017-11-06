/*
price = baseCost * multiplier^#owned

price = cost of upgrade
baseCost = cost of first upgrade
multiplier = number between 1 and 1.15. 1 gives linear cost increases.
#owned = number owned. 
*/

setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec
setInterval(onAutoTick, 100); // 10 ticks/second

//Constants - Industry
var BASEMINERCOST = 10;
var MINERMULTIPLIER = 1.08;
var BASEDRILLCOST = 1000;
var DRILLMULTIPLIER = 1.12;
var BASEMETALLURGISTCOST = 50;
var METALLURGISTMULTIPLIER = 1.1;
var BASEMERCHANTCOST = 10;
var MERCHANTMULTIPLIER = 1.2;

//Constants - Architecture
var BASEBURROWCOST = 50;
var BURROWMULTIPLIER = 2; //This is huge. Price doubles each time.
var BASEWORKSHOPCOST = 1000;
var WORKSHOPMULTIPLIER = 1.5;
var BASESHEDCOST = 3000;
var SHEDMULTIPLIER = 1.5;
var BASESMELTERYCOST = 2000;
var SMELTERYMULTIPLIER = 1.5;
var BASETRADERCOST = 100;
var TRADERMULTIPLIER = 1.3;

//Constants - Engineering 
var BASEENGINEERCOST = 100;
var ENGINEERMULTIPLIER = 1.1;

//Limits
var maxDwarfs = 0;
var maxEngineers = 0;
var maxDrills = 0;
var maxMetallurgists = 0;
var maxMerchants = 0;

//Variables - Resources
// var debt = 20000;
var clickOreValue = 1; //The amount by which clicking increases Ore.
var clickStoneValue = 5; //The amount by which clicking increases Stone.
var autoOreValue = 0; //100ms / 0.1perTick = 1 per second
var autoStoneValue = 0; //100ms / 0.1perTick = 1 per second
var autoCoalValue = 0;
var autoGoldValue = 0;
var ironConversionSpeed = 0;
var goldConversionSpeed = 0;
var autoResearchValue = 0;
var ore = 0; //The number that you are trying to increase.
var stone = 0; //The amount of Stone in your reserves.
var coal = 0;
var goldOre = 0;
var ironIngots = 0;
var goldIngots = 20;
var ale = 0;
var aleDrinkSpeed = 0.01;

var research = 0;//The amount of Research accumulated for advancements.
var dwarfs = 0; //The number of dwarfs, across all professions
var currentResearch = "";
var coalMultiplier = 0;
var goldMultiplier = 0;

//Variables - Industry
var minerCost = BASEMINERCOST; //The cost of hiring a new miner
var numberOfMiners = 0; //The number of miners mining
var numberOfMetallurgists = 0;
var minerEfficiencyMultiplier = 1;
var minerOreSpeed = 0.01;
var minerStoneSpeed = 0.05;
var minerCoalSpeed = 0.01;
var minerGoldSpeed = 0.005;

var steamDrillCost = BASEDRILLCOST; //The cost of a Steam Drill
var steamDrillCoalUse = 0.5;  //1 = 10 per second
var numberOfSteamDrills = 0;
var drillEfficiencyMultiplier = 1;
var drillOreSpeed = 0.1;
var drillStoneSpeed = 0.5;
var drillCoalSpeed = 0.1;
var drillGoldSpeed = 0.05;

var metallurgistCost = BASEMETALLURGISTCOST;
var numberOfMetallurgists = 0;
var metallurgistIronRate = 0.03;
var metallurgistGoldRate = 0.05;


//Variables - Architecture
var dwarfBurrowCost = BASEBURROWCOST;
var numberOfBurrows = 0;

var workshopCost = BASEWORKSHOPCOST;
var numberOfWorkshops = 0;

var shedCost = BASESHEDCOST;
var numberOfSheds = 0;

var smelteryCost = BASESMELTERYCOST;
var numberOfSmelteries = 0;

var traderCost = BASETRADERCOST;
var numberOfTraders = 0;

//Variables - Engineering 
var engineerCost = BASEENGINEERCOST; //The cost of hiring a new miner
var numberOfEngineers = 0; //The number of miners mining
var engineerResearchSpeed = 0.02;

//Variables - Agriculture
var aleCost = 10; //Cost for 100 ale. Maybe should be 100?

//Variables - Commerce
var numberOfMerchants = 0;
var merchantCost = BASEMERCHANTCOST;
var merchantTariffs = 0.01;
var merchantIncome = 0;

//Main loop.
function onTimerTick() {
    // Do stuff.
    document.getElementById("oreNum").innerHTML = parseInt(ore);
    document.getElementById("ironIngotNum").innerHTML = parseInt(ironIngots);
    document.getElementById("stoneNum").innerHTML = parseInt(stone);
    document.getElementById("coalNum").innerHTML = parseInt(coal);
    document.getElementById("goldNum").innerHTML = parseInt(goldOre);
    document.getElementById("goldIngotNum").innerHTML = parseInt(goldIngots);
    // document.getElementById("debtNum").innerHTML = parseInt(debt);
    document.getElementById("aleNum").innerHTML = parseInt(ale);

    //INDUSTRY
    if(goldIngots >= minerCost && dwarfs < maxDwarfs){
        document.getElementById("hireMinerButton").disabled = false;
    }else{
        document.getElementById("hireMinerButton").disabled = true;
    }

    if(goldIngots >= steamDrillCost && dwarfs < (maxDwarfs-2) && numberOfSteamDrills < maxDrills){
        document.getElementById("hireDrillButton").disabled = false;
    }else{
        document.getElementById("hireDrillButton").disabled = true;
    }
    if(goldIngots >= metallurgistCost && dwarfs < maxDwarfs && numberOfMetallurgists < maxMetallurgists){
        document.getElementById("hireMetallurgistButton").disabled = false;
    }else{
        document.getElementById("hireMetallurgistButton").disabled = true;
    }

    //ARCHITECTURE
    if(stone >= dwarfBurrowCost){
        document.getElementById("buildBurrowButton").disabled = false;
    }else{
        document.getElementById("buildBurrowButton").disabled = true;
    }

    if(stone >= workshopCost){
        document.getElementById("buildWorkshopButton").disabled = false;
    }else{
        document.getElementById("buildWorkshopButton").disabled = true;
    }

    if(stone >= shedCost){
        document.getElementById("buildShedButton").disabled = false;
    }else{
        document.getElementById("buildShedButton").disabled = true;
    }

    if(stone >= smelteryCost){
        document.getElementById("buildSmelteryButton").disabled = false;
    }else{
        document.getElementById("buildSmelteryButton").disabled = true;
    }

    if(stone >= traderCost){
        document.getElementById("buildTraderButton").disabled = false;
    }else{
        document.getElementById("buildTraderButton").disabled = true;
    }

    //ENGINEERING
    if(goldIngots >= engineerCost && dwarfs < maxDwarfs && numberOfEngineers < maxEngineers){
        document.getElementById("hireEngineerButton").disabled = false;
    }else{
        document.getElementById("hireEngineerButton").disabled = true;
    }

    if(stone >= BASEBURROWCOST){
        document.getElementById("buildBurrowButton").style.display = '';
        if(stone >= BASETRADERCOST){
            document.getElementById("buildTraderButton").style.display = '';
            if(stone >= BASEWORKSHOPCOST){
                document.getElementById("buildWorkshopButton").style.display = '';
            }
        }
    }
    if(ore >= BASEMINERCOST){
        document.getElementById("hireMinerButton").style.display = '';
    }

    //COMMERCE
    if(goldIngots >= merchantCost && dwarfs < maxDwarfs && numberOfMerchants < maxMerchants){
        document.getElementById("hireMerchantButton").disabled = false;
    }else{
        document.getElementById("hireMerchantButton").disabled = true;
    }

    if(goldIngots >= aleCost){
        document.getElementById("purchaseAleButton").disabled = false;
    }else{
        document.getElementById("purchaseAleButton").disabled = true;
    }

    if(ore >= 10){
        document.getElementById("sellIronOreButton").disabled = false;
    }else{
        document.getElementById("sellIronOreButton").disabled = true;
    }
}

//Auto increment loop.
// var secondCount = 0; //variable used to count a second.
function onAutoTick() {
    // if(secondCount==10){
    //     secondCount = 0;
    // }

    //Ale
    if(ale >= dwarfs*aleDrinkSpeed){
        ale -= dwarfs*aleDrinkSpeed;
        aleMultiplier = 1;
    }else{
        aleMultiplier = 0.5;
    }

    if(coal >= numberOfSteamDrills){
        coal -= numberOfSteamDrills;
        coalMultiplier = 1;
    }else{
        coalMultiplier = 0;
    }
    calculateMiningSpeed();

    //Mining
    ore += autoOreValue;
    stone += autoStoneValue;
    coal += autoCoalValue;
    goldOre += autoGoldValue;

    //Smelting
    if(ore > ironConversionSpeed){
        ore -= ironConversionSpeed;
        ironIngots += ironConversionSpeed;
    }else{
        ironIngots += ore;
        ore -= ore;
    }

    // if(debt > 0){
    //     if(secondCount==0){
    //         debt = debt*1.0001;
    //     }
    //     if(goldOre > goldConversionSpeed){
    //         goldOre -= goldConversionSpeed;
    //         debt -= goldConversionSpeed;
    //     }else{
    //         debt -= goldOre;
    //         goldOre -= goldOre;
    //     }
    // }else{
        if(goldOre > goldConversionSpeed){
            goldOre -= goldConversionSpeed;
            goldIngots += goldConversionSpeed;
        }else{
            goldIngots += goldOre;
            goldOre -= goldOre;
        }
        goldIngots += merchantIncome;
    // }

    //Research
    research += autoResearchValue;

    // secondCount++;
}

function onIncreaseClick(){
    ore += clickOreValue;
    stone += clickStoneValue;

    if(ore == clickOreValue){
        document.getElementById("oreData").style.display = '';
    document.getElementById("stoneData").style.display = '';
    }
}

function calculateIncrements(){
    calculateMiningSpeed();
    
    document.getElementById("numMiners").innerHTML = numberOfMiners;
    document.getElementById("numDrills").innerHTML = numberOfSteamDrills + " / " + maxDrills;
    document.getElementById("numMetallurgists").innerHTML = numberOfMetallurgists + " / " + maxMetallurgists;
    
    document.getElementById("numEngineers").innerHTML = numberOfEngineers + " / " + maxEngineers;
    document.getElementById("popNum").innerHTML = dwarfs + " / " + maxDwarfs;
}

function calculateMiningSpeed(){

    minerOreRate = numberOfMiners*minerOreSpeed*minerEfficiencyMultiplier*aleMultiplier;
    minerStoneRate = numberOfMiners*minerStoneSpeed*minerEfficiencyMultiplier*aleMultiplier;
    minerCoalRate = numberOfMiners*minerCoalSpeed*minerEfficiencyMultiplier*aleMultiplier;
    minerGoldRate = numberOfMiners*minerGoldSpeed*minerEfficiencyMultiplier*aleMultiplier;

    drillOreRate = numberOfSteamDrills*drillOreSpeed*drillEfficiencyMultiplier*aleMultiplier*coalMultiplier;
    drillStoneRate = numberOfSteamDrills*drillStoneSpeed*drillEfficiencyMultiplier*aleMultiplier*coalMultiplier;
    drillCoalRate = numberOfSteamDrills*drillCoalSpeed*drillEfficiencyMultiplier*aleMultiplier*coalMultiplier;
    drillGoldRate = numberOfSteamDrills*drillGoldSpeed*drillEfficiencyMultiplier*aleMultiplier*coalMultiplier;

    autoOreValue = (minerOreRate)+(drillOreRate);
    autoStoneValue = (minerStoneRate)+(drillStoneRate);
    autoCoalValue = ((minerCoalRate)+(drillCoalRate))*coalMultiplier;
    autoGoldValue = ((minerGoldRate)+(drillGoldRate))*goldMultiplier;

    document.getElementById("oreSpeed").innerHTML = (Math.round(autoOreValue * 100)/10);
    document.getElementById("stoneSpeed").innerHTML = (Math.round(autoStoneValue * 100)/10);
    document.getElementById("coalSpeed").innerHTML = (Math.round(autoCoalValue * 100)/10);
    document.getElementById("goldSpeed").innerHTML = (Math.round(autoGoldValue * 100)/10);

    autoResearchValue = (numberOfEngineers*engineerResearchSpeed*aleMultiplier);
    document.getElementById("researchSpeed").innerHTML = (Math.round(autoResearchValue * 100)/10);

    ironConversionSpeed = (numberOfMetallurgists*metallurgistIronRate*aleMultiplier);
    goldConversionSpeed = (numberOfMetallurgists*metallurgistGoldRate*aleMultiplier*goldMultiplier);

    document.getElementById("ironIngotSpeed").innerHTML = (Math.round(ironConversionSpeed * 100)/10);
    document.getElementById("smeltingGoldSpeed").innerHTML = (Math.round(goldConversionSpeed * 100)/10);

    document.getElementById("merchantGoldSpeed").innerHTML = (Math.round(merchantIncome * 100)/10);
    document.getElementById("goldIngotSpeed").innerHTML = (Math.round((goldConversionSpeed + merchantIncome) * 100)/10);
}

//INDUSTRY
function onMinerClick(){
    goldIngots -= minerCost;

    numberOfMiners++;
    dwarfs++;
    calculateIncrements();

    minerCost = Math.round(BASEMINERCOST * Math.pow(MINERMULTIPLIER, numberOfMiners));
    
    document.getElementById("minerCost").innerHTML = parseInt(minerCost);

    if(numberOfMiners == 1){
        document.getElementById("industrySector").style.display = '';
        document.getElementById("minerData").style.display = '';
    }
}

function onDrillClick(){    
    goldIngots -= steamDrillCost;

    numberOfSteamDrills++;
    dwarfs+=3;
    calculateIncrements();

    steamDrillCost = Math.round(BASEDRILLCOST * Math.pow(DRILLMULTIPLIER, numberOfSteamDrills));
    
    document.getElementById("drillCost").innerHTML = parseInt(steamDrillCost);
    
    if(numberOfSteamDrills == 1){
        document.getElementById("drillData").style.display = '';
    }
}

function onMetallurgistClick(){    
    goldIngots -= metallurgistCost;

    numberOfMetallurgists++;
    dwarfs++;
    calculateIncrements();

    metallurgistCost = Math.round(BASEMETALLURGISTCOST * Math.pow(METALLURGISTMULTIPLIER, numberOfMetallurgists));
    
    document.getElementById("metallurgistCost").innerHTML = parseInt(metallurgistCost);
    
    if(numberOfMetallurgists == 1){
        document.getElementById("metallurgistData").style.display = '';
        document.getElementById("ironData").style.display = '';
    }
}

//ARCHITECTURE
function onHouseClick(){
    stone -= dwarfBurrowCost;
    maxDwarfs += 10;
    numberOfBurrows++;

    dwarfBurrowCost = Math.round(BASEBURROWCOST * Math.pow(BURROWMULTIPLIER, numberOfBurrows));
    document.getElementById("burrowCost").innerHTML = parseInt(dwarfBurrowCost);
    document.getElementById("numBurrows").innerHTML = numberOfBurrows;
    document.getElementById("popNum").innerHTML = dwarfs + " / " + maxDwarfs;

    if(numberOfBurrows <= 1){
        document.getElementById("hireMinerButton").style.display = '';
        document.getElementById("architectureSector").style.display = '';
        document.getElementById("popData").style.display = '';
        document.getElementById("burrowData").style.display = '';
    }
}

function onWorkshopClick(){
    stone -= workshopCost;
    maxEngineers += 4;
    numberOfWorkshops++;

    workshopCost = Math.round(BASEWORKSHOPCOST * Math.pow(WORKSHOPMULTIPLIER, numberOfWorkshops));
    document.getElementById("workshopCost").innerHTML = parseInt(workshopCost);
    document.getElementById("numWorkshops").innerHTML = numberOfWorkshops;
    document.getElementById("numEngineers").innerHTML = numberOfEngineers + " / " + maxEngineers;

    if(numberOfWorkshops <= 1){
        document.getElementById("hireEngineerButton").style.display = '';
        document.getElementById("workshopData").style.display = '';
        document.getElementById("engineerData").style.display = '';
    }
}

function onShedClick(){
    stone -= shedCost;
    maxDrills += 2;
    numberOfSheds++;

    shedCost = Math.round(BASESHEDCOST * Math.pow(SHEDMULTIPLIER, numberOfSheds));
    document.getElementById("shedCost").innerHTML = parseInt(shedCost);
    document.getElementById("numSheds").innerHTML = numberOfSheds;
    document.getElementById("numDrills").innerHTML = numberOfSteamDrills + " / " + maxDrills;

    if(numberOfSheds <= 1){
        document.getElementById("hireDrillButton").style.display = '';
        document.getElementById("shedData").style.display = '';
        document.getElementById("drillData").style.display = '';
    }
}

function onSmelteryClick(){
    stone -= smelteryCost;
    maxMetallurgists += 3;
    numberOfSmelteries++;

    smelteryCost = Math.round(BASESMELTERYCOST * Math.pow(SMELTERYMULTIPLIER, numberOfSmelteries));
    document.getElementById("smelteryCost").innerHTML = parseInt(smelteryCost);
    document.getElementById("numSmelteries").innerHTML = numberOfSmelteries;
    document.getElementById("numMetallurgists").innerHTML = numberOfMetallurgists + " / " + maxMetallurgists;

    if(numberOfSmelteries <= 1){
        document.getElementById("hireMetallurgistButton").style.display = '';
        document.getElementById("smelteryData").style.display = '';
        document.getElementById("metallurgistData").style.display = '';
    }
}

function onTraderClick(){
    stone -= traderCost;
    maxMerchants += 1;
    numberOfTraders++;

    traderCost = Math.round(BASETRADERCOST * Math.pow(TRADERMULTIPLIER, numberOfTraders));
    document.getElementById("traderCost").innerHTML = parseInt(traderCost);
    document.getElementById("numTraders").innerHTML = numberOfTraders;
    document.getElementById("numMerchants").innerHTML = numberOfMerchants + " / " + maxMerchants;

    if(numberOfTraders <= 1){
        document.getElementById("hireMerchantButton").style.display = '';
        document.getElementById("traderData").style.display = '';
        document.getElementById("merchantData").style.display = '';
    }
}

//ENGINEERING
function onEngineerClick(){    
    goldIngots -= engineerCost;

    numberOfEngineers++;
    dwarfs++;
    calculateIncrements();

    engineerCost = Math.round(BASEENGINEERCOST * Math.pow(ENGINEERMULTIPLIER, numberOfEngineers));
    
    document.getElementById("engineerCost").innerHTML = engineerCost;

    if(numberOfEngineers == 1){
        document.getElementById("researchSmeltingButton").style.display = '';
        document.getElementById("engineeringSector").style.display = '';
        document.getElementById("researchData").style.display = '';
    }else if(numberOfEngineers == 2){
        document.getElementById("researchGoldMiningButton").style.display = '';
    }else if(numberOfEngineers == 4){
        document.getElementById("researchCoalMiningButton").style.display = '';
    }
}

//AGRICULTURE
function onAleClick(){
    goldIngots -= aleCost;

    ale += 100;
}

//COMMERCE 
function onMerchantClick(){
    goldIngots -= merchantCost;
    numberOfMerchants++;
    dwarfs++;
    calculateIncrements();

    merchantCost = Math.round(BASEMERCHANTCOST * Math.pow(MERCHANTMULTIPLIER, numberOfMerchants));
    document.getElementById("merchantCost").innerHTML = parseInt(merchantCost);
    document.getElementById("numMerchants").innerHTML = numberOfMerchants + " / " + maxMerchants;

    merchantIncome += merchantTariffs;

    document.getElementById("purchaseAleButton").style.display = '';
    document.getElementById("sellIronOreButton").style.display = '';
}



//Set Listeners
document.addEventListener("DOMContentLoaded", function(event) { 
    //Set initial state.
    document.getElementById("minerCost").innerHTML = parseInt(minerCost);
    document.getElementById("numMiners").innerHTML = numberOfMiners;
    document.getElementById("oreSpeed").innerHTML = (Math.round(autoOreValue * 100)/10);
    document.getElementById("stoneSpeed").innerHTML = (Math.round(autoStoneValue * 100)/10);
    document.getElementById("drillCost").innerHTML = parseInt(steamDrillCost);
    document.getElementById("numDrills").innerHTML = numberOfSteamDrills;
    document.getElementById("burrowCost").innerHTML = parseInt(dwarfBurrowCost);
    document.getElementById("numBurrows").innerHTML = numberOfBurrows;
    document.getElementById("workshopCost").innerHTML = parseInt(workshopCost);
    document.getElementById("numWorkshops").innerHTML = numberOfWorkshops;
    document.getElementById("numEngineers").innerHTML = numberOfEngineers + " / " + maxEngineers;
    document.getElementById("popNum").innerHTML = dwarfs + " / " + maxDwarfs;
    document.getElementById("aleCost").innerHTML = aleCost;
    document.getElementById("merchantCost").innerHTML = BASEMERCHANTCOST;
    document.getElementById("traderCost").inerHTML = parseInt(traderCost);


    //Hide locked controls and data
    //data
    document.getElementById("oreData").style.display = 'none';
    document.getElementById("ironData").style.display = 'none';
    document.getElementById("goldData").style.display = 'none';
    document.getElementById("stoneData").style.display = 'none';
    document.getElementById("coalData").style.display = 'none';
    document.getElementById("researchData").style.display = 'none';
    document.getElementById("popData").style.display = 'none';

    document.getElementById("minerData").style.display = 'none';
    document.getElementById("drillData").style.display = 'none';
    document.getElementById("burrowData").style.display = 'none';
    document.getElementById("workshopData").style.display = 'none';
    document.getElementById("shedData").style.display = 'none';
    document.getElementById("engineerData").style.display = 'none';

    document.getElementById("merchantData").style.display = 'none';

    document.getElementById("industrySector").style.display = 'none';
    document.getElementById("architectureSector").style.display = 'none';
    document.getElementById("engineeringSector").style.display = 'none';

    document.getElementById("hireMinerButton").style.display = 'none';
    document.getElementById("hireDrillButton").style.display = 'none';
    document.getElementById("hireMetallurgistButton").style.display = 'none';

    document.getElementById("buildBurrowButton").style.display = 'none';
    document.getElementById("buildWorkshopButton").style.display = 'none';
    document.getElementById("buildShedButton").style.display = 'none';
    document.getElementById("buildSmelteryButton").style.display = 'none';
    document.getElementById("buildTraderButton").style.display = 'none';

    
    document.getElementById("hireEngineerButton").style.display = 'none';
    document.getElementById("researchCoalMiningButton").style.display = 'none';
    document.getElementById("researchGoldMiningButton").style.display = 'none';
    document.getElementById("researchSmeltingButton").style.display = 'none';
    document.getElementById("researchSteelPicksButton").style.display = 'none';
    document.getElementById("researchSteamButton").style.display = 'none';
    document.getElementById("researchDrillButton").style.display = 'none';

    document.getElementById("hireMerchantButton").style.display = 'none';
    document.getElementById("purchaseAleButton").style.display = 'none';
    document.getElementById("sellIronOreButton").style.display = 'none';



    //do work
    document.getElementById("mineButton").addEventListener("click", onIncreaseClick);

    document.getElementById("hireMinerButton").addEventListener("click", onMinerClick);
    document.getElementById("hireDrillButton").addEventListener("click", onDrillClick);
    document.getElementById("hireMetallurgistButton").addEventListener("click", onMetallurgistClick);
    
    document.getElementById("buildBurrowButton").addEventListener("click", onHouseClick);
    document.getElementById("buildWorkshopButton").addEventListener("click", onWorkshopClick);
    document.getElementById("buildShedButton").addEventListener("click", onShedClick);
    document.getElementById("buildSmelteryButton").addEventListener("click", onSmelteryClick);
    document.getElementById("buildTraderButton").addEventListener("click", onTraderClick);

    document.getElementById("hireEngineerButton").addEventListener("click", onEngineerClick);
    document.getElementById("researchCoalMiningButton").addEventListener("click", function(){
        doResearch("coalMiningResearch", "COALMINING", "researchCoalMiningButton", "coalResearchProgress", 2000, coalMiningResearchComplete)
    });
    document.getElementById("researchGoldMiningButton").addEventListener("click", function(){
        doResearch("goldMiningResearch", "GOLDMINING", "researchGoldMiningButton", "goldResearchProgress", 1000, goldMiningResearchComplete)
    });
    document.getElementById("researchSmeltingButton").addEventListener("click", function(){
        doResearch("smeltingResearch", "SMELTING", "researchSmeltingButton", "smeltingResearchProgress", 1000, smeltingResearchComplete)
    });
    document.getElementById("researchSteelPicksButton").addEventListener("click", function(){
        doResearch("steelPickResearch", "STEELPICK", "researchSteelPicksButton", "steelPicksResearchProgress", 2000, steelPickResearchComplete)
    });
    document.getElementById("researchSteamButton").addEventListener("click", function(){
        doResearch("steamResearch", "STEAM", "researchSteamButton", "steamResearchProgress", 2000, steamResearchComplete)
    });
    document.getElementById("researchDrillButton").addEventListener("click", function(){
        doResearch("drillResearch", "DRILL", "researchDrillButton", "drillResearchProgress", 4000, drillResearchComplete)
    });

    document.getElementById("hireMerchantButton").addEventListener("click", onMerchantClick);
    document.getElementById("purchaseAleButton").addEventListener("click", onAleClick);
    document.getElementById("sellIronOreButton").addEventListener("click", function(){
        sellGood("ore", 10, 0.1)
    });
});
