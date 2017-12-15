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
var BASEDRILLIRONCOST = 500;
var DRILLMULTIPLIER = 1.12;
var BASEMETALLURGISTCOST = 50;
var METALLURGISTMULTIPLIER = 1.1;
var BASEMERCHANTCOST = 10;
var MERCHANTMULTIPLIER = 1.2;

//Constants - Architecture
var BASEBURROWCOST = 50;
var BURROWMULTIPLIER = 1.3; //This is huge. Price = price * multiplier each time.
var BASEWORKSHOPCOST = 1000;
var WORKSHOPMULTIPLIER = 1.4;
var BASESHEDCOST = 10000;
var SHEDMULTIPLIER = 1.3;
var BASESMELTERYCOST = 2000;
var SMELTERYMULTIPLIER = 1.2;
var BASETRADERCOST = 100;
var TRADERMULTIPLIER = 1.3;
var BASEBREWERYCOST = 2500;
var BREWERYMULTIPLIER = 1.2;
var BASEFARMCOST = 2000;
var BASEFARMGRAINCOST = 1500;
var FARMMULTIPLIER = 1.2;

//Constants - Engineering 
var BASEENGINEERCOST = 100;
var ENGINEERMULTIPLIER = 1.08;

//Constants - Agriculture
var BASEBREWSTERCOST = 75;
var BREWSTERMULTIPLIER = 1.15
var BASEFARMERCOST = 40;
var FARMERMULTIPLIER = 1.12;

//Limits
var maxDwarfs = 0;
var maxEngineers = 0;
var maxDrills = 0;
var maxMetallurgists = 0;
var maxMerchants = 0;
var maxBrewsters = 0;
var maxFarmers = 0;

//Variables - Resources
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
var grain = 0;

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
var steamDrillIronCost = BASEDRILLIRONCOST;
var steamDrillCoalUse = 0.5;  //1 = 10 per second
var numberOfSteamDrills = 0;
var drillEfficiencyMultiplier = 1;
var drillOreSpeed = 0.1;
var drillStoneSpeed = 0.5;
var drillCoalSpeed = 0.1;
var drillGoldSpeed = 0.05;

var metallurgistCost = BASEMETALLURGISTCOST;
var numberOfMetallurgists = 0;
var smeltingEfficiencyMultiplier = 1;
var metallurgistIronRate = 0.03;
var metallurgistGoldRate = 0.02;


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

var breweryCost = BASEBREWERYCOST;
var numberOfBrewaries = 0;

var farmCost = BASEFARMCOST;
var farmGrainCost = BASEFARMGRAINCOST;
var numberOfFarms = 0;

//Variables - Engineering 
var engineerCost = BASEENGINEERCOST; //The cost of hiring a new miner
var numberOfEngineers = 0; //The number of miners mining
var engineerResearchSpeed = 0.02;

//Variables - Agriculture
var aleCost = 10; //Cost for 100 ale.
var grainCost = 25; //Cost for 1000 grain. (4 grain = 1 ale)
var brewsterCost = BASEBREWSTERCOST;
var numberOfBrewsters = 0;
var brewingSpeed = 0.2;
var grainPerAle = 3; //Base is 4, switched to 3 for an experiment.

var farmerCost = BASEFARMERCOST;
var numberOfFarmers = 0;
var farmerGrainProduction = 0.5; //Default 2, was too slow.
var farmingSpeed = 0;

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
    document.getElementById("aleNum").innerHTML = parseInt(ale);
    document.getElementById("grainNum").innerHTML = parseInt(grain);

    //INDUSTRY
    if(goldIngots >= minerCost && dwarfs < maxDwarfs){
        document.getElementById("hireMinerButton").disabled = false;
    }else{
        document.getElementById("hireMinerButton").disabled = true;
    }

    if(goldIngots >= steamDrillCost && ironIngots >= steamDrillIronCost && dwarfs < (maxDwarfs-2) && numberOfSteamDrills < maxDrills){
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

    if(stone >= breweryCost){
        document.getElementById("buildBreweryButton").disabled = false;
    }else{
        document.getElementById("buildBreweryButton").disabled = true;
    }

    if(stone >= farmCost && grain >= farmGrainCost){
        document.getElementById("buildFarmButton").disabled = false;
    }else{
        document.getElementById("buildFarmButton").disabled = true;
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
            document.getElementById("commerceSector").style.display = '';
            if(stone >= BASEWORKSHOPCOST){
                document.getElementById("engineeringSector").style.display = '';
            }
        }
    }
    if(ore >= BASEMINERCOST){
        document.getElementById("hireMinerButton").style.display = '';
        document.getElementById("minerData").style.display = '';
    }
    if(dwarfs >= 50){
        document.getElementById("buildBreweryButton").style.display = '';
    }

    //AGRICULTURE
    if(goldIngots >= brewsterCost && dwarfs < maxDwarfs && numberOfBrewsters < maxBrewsters){
        document.getElementById("hireBrewsterButton").disabled = false;
    }else{
        document.getElementById("hireBrewsterButton").disabled = true;
    }
    if(goldIngots >= farmerCost && dwarfs < maxDwarfs && numberOfFarmers < maxFarmers){
        document.getElementById("hireFarmerButton").disabled = false;
    }else{
        document.getElementById("hireFarmerButton").disabled = true;
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

    if(goldIngots >= grainCost){
        document.getElementById("purchaseGrainButton").disabled = false;
    }else{
        document.getElementById("purchaseGrainButton").disabled = true;
    }

    if(ore >= 100){
        document.getElementById("sellIronOreButton").disabled = false;
    }else{
        document.getElementById("sellIronOreButton").disabled = true;
    }

    if(ironIngots >= 100){
        document.getElementById("sellIronBarsButton").disabled = false;
    }else{
        document.getElementById("sellIronBarsButton").disabled = true;
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

    if(coal >= numberOfSteamDrills*steamDrillCoalUse){
        coal -= numberOfSteamDrills*steamDrillCoalUse;
        coalSupplyMultiplier = 1;
    }else{
        coalSupplyMultiplier = 0;
    }
    calculateMiningSpeed();
    calculateBrewingSpeed();

    //Farming
    grain += (farmingSpeed);

    //Mining
    ore += autoOreValue;
    stone += autoStoneValue;
    coal += autoCoalValue;
    goldOre += autoGoldValue;

    //Smelting
    if(ore > ironConversionSpeed){
        ore -= ironConversionSpeed;
        ironIngots += ironConversionSpeed;
        document.getElementById("ironIngotSpeed").innerHTML = (Math.round(ironConversionSpeed * 100)/10);
    }else{
        ironIngots += ore;
        ore -= ore;
        document.getElementById("ironIngotSpeed").innerHTML = (Math.round(autoOreValue * 100)/10);
    }
    
    if(goldOre > goldConversionSpeed){
        goldOre -= goldConversionSpeed;
        goldIngots += goldConversionSpeed;
        document.getElementById("smeltingGoldSpeed").innerHTML = (Math.round(goldConversionSpeed * 100)/10);
    }else{
        goldIngots += goldOre;
        goldOre -= goldOre;
        document.getElementById("smeltingGoldSpeed").innerHTML = (Math.round(autoGoldValue * 100)/10);
    }
    goldIngots += merchantIncome;

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
    calculateBrewingSpeed();
    
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

    drillOreRate = numberOfSteamDrills*drillOreSpeed*drillEfficiencyMultiplier*aleMultiplier*coalSupplyMultiplier;
    drillStoneRate = numberOfSteamDrills*drillStoneSpeed*drillEfficiencyMultiplier*aleMultiplier*coalSupplyMultiplier;
    drillCoalRate = numberOfSteamDrills*drillCoalSpeed*drillEfficiencyMultiplier*aleMultiplier*coalSupplyMultiplier;
    drillGoldRate = numberOfSteamDrills*drillGoldSpeed*drillEfficiencyMultiplier*aleMultiplier*coalSupplyMultiplier;

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

    ironConversionSpeed = (numberOfMetallurgists*metallurgistIronRate*smeltingEfficiencyMultiplier*aleMultiplier);
    goldConversionSpeed = (numberOfMetallurgists*metallurgistGoldRate*smeltingEfficiencyMultiplier*aleMultiplier*goldMultiplier);

    

    document.getElementById("merchantGoldSpeed").innerHTML = (Math.round(merchantIncome * 100)/10);
    document.getElementById("goldIngotSpeed").innerHTML = (Math.round((goldConversionSpeed + merchantIncome) * 100)/10);
}

function calculateBrewingSpeed(){
    var brewingRate = numberOfBrewsters * brewingSpeed * aleMultiplier;

    if(grain >= brewingRate*grainPerAle){
        grain -= brewingRate*grainPerAle;
        ale += brewingRate;

        document.getElementById("aleNum").innerHTML = parseInt(ale);
        document.getElementById("aleProdSpeed").innerHTML = (Math.round(brewingRate * 100)/10);
    }else{
        document.getElementById("aleNum").innerHTML = parseInt(ale);
        document.getElementById("aleProdSpeed").innerHTML = 0;
    }

    farmingSpeed = numberOfFarmers*farmerGrainProduction*aleMultiplier;
    document.getElementById("grainProdSpeed").innerHTML = parseInt(farmingSpeed*10);
}

//INDUSTRY
function onMinerClick(){
    goldIngots -= minerCost;

    numberOfMiners++;
    dwarfs++;
    calculateIncrements();

    minerCost = Math.round(BASEMINERCOST * Math.pow(MINERMULTIPLIER, numberOfMiners));
    
    document.getElementById("minerCost").innerHTML = parseInt(minerCost);
}

function onDrillClick(){    
    goldIngots -= steamDrillCost;
    ironIngots -= steamDrillIronCost;

    numberOfSteamDrills++;
    dwarfs+=3;
    calculateIncrements();

    steamDrillCost = Math.round(BASEDRILLCOST * Math.pow(DRILLMULTIPLIER, numberOfSteamDrills));
    steamDrillIronCost = Math.round(BASEDRILLIRONCOST * Math.pow(DRILLMULTIPLIER, numberOfSteamDrills));
    
    document.getElementById("drillCost").innerHTML = parseInt(steamDrillCost);
    document.getElementById("drillIronCost").innerHTML = parseInt(steamDrillIronCost);
    
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
        document.getElementById("sellIronBarsButton").style.display = '';
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
}

function onShedClick(){
    stone -= shedCost;
    maxDrills += 2;
    numberOfSheds++;

    shedCost = Math.round(BASESHEDCOST * Math.pow(SHEDMULTIPLIER, numberOfSheds));
    document.getElementById("shedCost").innerHTML = parseInt(shedCost);
    document.getElementById("numSheds").innerHTML = numberOfSheds;
    document.getElementById("numDrills").innerHTML = numberOfSteamDrills + " / " + maxDrills;
}

function onSmelteryClick(){
    stone -= smelteryCost;
    maxMetallurgists += 3;
    numberOfSmelteries++;

    smelteryCost = Math.round(BASESMELTERYCOST * Math.pow(SMELTERYMULTIPLIER, numberOfSmelteries));
    document.getElementById("smelteryCost").innerHTML = parseInt(smelteryCost);
    document.getElementById("numSmelteries").innerHTML = numberOfSmelteries;
    document.getElementById("numMetallurgists").innerHTML = numberOfMetallurgists + " / " + maxMetallurgists;
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

function onBreweryClick(){
    stone -= breweryCost;
    maxBrewsters += 5;
    numberOfBrewaries++;

    breweryCost = Math.round(BASEBREWERYCOST * Math.pow(BREWERYMULTIPLIER, numberOfBrewaries));
    document.getElementById("breweryCost").innerHTML = parseInt(breweryCost);
    document.getElementById("numBrewaries").innerHTML = numberOfBrewaries;
    document.getElementById("numBrewsters").innerHTML = numberOfBrewsters + " / " + maxBrewsters;

    if(numberOfBrewaries <= 1){
        document.getElementById("hireBrewsterButton").style.display = '';
        document.getElementById("breweryData").style.display = '';
        document.getElementById("brewsterData").style.display = '';
        document.getElementById("purchaseGrainButton").style.display = '';
        document.getElementById("grainData").style.display = '';
    }
}

function onFarmClick(){
    stone -= farmCost;
    grain -= farmGrainCost;
    maxFarmers += 6;
    numberOfFarms++;

    farmCost = Math.round(BASEFARMCOST * Math.pow(FARMMULTIPLIER, numberOfFarms));
    farmGrainCost = Math.round(BASEFARMGRAINCOST * Math.pow(FARMMULTIPLIER, numberOfFarms));
    document.getElementById("farmCost").innerHTML = parseInt(farmCost);
    document.getElementById("farmGrainCost").innerHTML = parseInt(farmGrainCost);
    document.getElementById("numFarms").innerHTML = numberOfFarms;
    document.getElementById("numFarmers").innerHTML = numberOfFarmers + " / " + maxFarmers;

    if(numberOfFarms <= 1){
        document.getElementById("hireFarmerButton").style.display = '';
        document.getElementById("farmData").style.display = '';
        document.getElementById("farmerData").style.display = '';
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

function onGrainClick(){
    goldIngots -= grainCost;

    grain += 1000;
}

function onBrewsterClick(){
    goldIngots -= brewsterCost;
    numberOfBrewsters++;
    dwarfs++;
    calculateIncrements();

    brewsterCost = Math.round(BASEBREWSTERCOST * Math.pow(BREWSTERMULTIPLIER, numberOfBrewsters));
    document.getElementById("brewsterCost").innerHTML = parseInt(brewsterCost);
    document.getElementById("numBrewsters").innerHTML = numberOfBrewsters + " / " + maxBrewsters;

    if(numberOfBrewsters > 4){
        document.getElementById("buildFarmButton").style.display = '';
    }
}

function onFarmerClick(){
    goldIngots -= farmerCost;
    numberOfFarmers++;
    dwarfs++;
    calculateIncrements();

    farmerCost = Math.round(BASEFARMERCOST * Math.pow(FARMERMULTIPLIER, numberOfFarmers));
    document.getElementById("farmerCost").innerHTML = parseInt(farmerCost);
    document.getElementById("numFarmers").innerHTML = numberOfFarmers + " / " + maxFarmers;
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
    document.getElementById("ironData").style.display = 'none';
    document.getElementById("goldData").style.display = 'none';
    document.getElementById("coalData").style.display = 'none';
    document.getElementById("researchData").style.display = 'none';

    document.getElementById("minerData").style.display = 'none';
    document.getElementById("drillData").style.display = 'none';
    document.getElementById("burrowData").style.display = 'none';
    document.getElementById("shedData").style.display = 'none';

    document.getElementById("engineeringSector").style.display = 'none';

    document.getElementById("hireMinerButton").style.display = 'none';
    document.getElementById("hireDrillButton").style.display = 'none';
    document.getElementById("hireMetallurgistButton").style.display = 'none';
    document.getElementById("smelteryData").style.display = 'none';
    document.getElementById("metallurgistData").style.display = 'none';

    document.getElementById("buildBurrowButton").style.display = 'none';
    document.getElementById("buildShedButton").style.display = 'none';
    document.getElementById("buildSmelteryButton").style.display = 'none';
    document.getElementById("buildBreweryButton").style.display = 'none';
    
    document.getElementById("researchCoalMiningButton").style.display = 'none';
    document.getElementById("researchGoldMiningButton").style.display = 'none';
    document.getElementById("researchSmeltingButton").style.display = 'none';
    document.getElementById("researchAdvSmeltingButton").style.display = 'none';
    document.getElementById("researchSteelPicksButton").style.display = 'none';
    document.getElementById("researchSteamButton").style.display = 'none';
    document.getElementById("researchDrillButton").style.display = 'none';
    document.getElementById("researchIronVeinsButton").style.display = 'none';
    document.getElementById("researchReinforcedCoalButton").style.display = 'none';
    document.getElementById("researchGoldVeinsButton").style.display = 'none';

    document.getElementById("commerceSector").style.display = 'none';
    document.getElementById("purchaseAleButton").style.display = 'none';
    document.getElementById("sellIronOreButton").style.display = 'none';
    document.getElementById("sellIronBarsButton").style.display = 'none';
    
    document.getElementById("hireBrewsterButton").style.display = 'none';
    document.getElementById("breweryData").style.display = 'none';
    document.getElementById("brewsterData").style.display = 'none';
    document.getElementById("purchaseGrainButton").style.display = 'none';
    document.getElementById("grainData").style.display = 'none';

    document.getElementById("buildFarmButton").style.display = 'none';
    document.getElementById("hireFarmerButton").style.display = 'none';
    document.getElementById("farmData").style.display = 'none';
    document.getElementById("farmerData").style.display = 'none';

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
    document.getElementById("buildBreweryButton").addEventListener("click", onBreweryClick);
    document.getElementById("buildFarmButton").addEventListener("click", onFarmClick);

    document.getElementById("hireEngineerButton").addEventListener("click", onEngineerClick);
    document.getElementById("researchCoalMiningButton").addEventListener("click", function(){
        doResearch("coalMiningResearch", "COALMINING", "researchCoalMiningButton", "coalResearchProgress", COALMININGRESEARCHTARGET, coalMiningResearchComplete)
    });
    document.getElementById("researchGoldMiningButton").addEventListener("click", function(){
        doResearch("goldMiningResearch", "GOLDMINING", "researchGoldMiningButton", "goldResearchProgress", GOLDMININGRESEARCHTARGET, goldMiningResearchComplete)
    });
    document.getElementById("researchSmeltingButton").addEventListener("click", function(){
        doResearch("smeltingResearch", "SMELTING", "researchSmeltingButton", "smeltingResearchProgress", SMELTINGRESEARCHTARGET, smeltingResearchComplete)
    });
    document.getElementById("researchAdvSmeltingButton").addEventListener("click", function(){
        doResearch("advSmeltingResearch", "ADVSMELTING", "researchAdvSmeltingButton", "advSmeltingResearchProgress", ADVSMELTINGRESEARCHTARGET, advSmeltingResearchComplete)
    });
    document.getElementById("researchSteelPicksButton").addEventListener("click", function(){
        doResearch("steelPickResearch", "STEELPICK", "researchSteelPicksButton", "steelPicksResearchProgress", STEELPICKRESEARCHTARGET, steelPickResearchComplete)
    });
    document.getElementById("researchSteamButton").addEventListener("click", function(){
        doResearch("steamResearch", "STEAM", "researchSteamButton", "steamResearchProgress", STEAMRESEARCHTARGET, steamResearchComplete)
    });
    document.getElementById("researchDrillButton").addEventListener("click", function(){
        doResearch("drillResearch", "DRILL", "researchDrillButton", "drillResearchProgress", DRILLRESEARCHTARGET, drillResearchComplete)
    });
    document.getElementById("researchIronVeinsButton").addEventListener("click", function(){
        doResearch("ironVeinsResearch", "IRONVEINS", "researchIronVeinsButton", "ironVeinsResearchProgress", IRONVEINSRESEARCHTARGET, ironVeinsResearchComplete)
    });
    document.getElementById("researchReinforcedCoalButton").addEventListener("click", function(){
        doResearch("reinforcedCoalResearch", "REINFORCEDCOAL", "researchReinforcedCoalButton", "reinforcedCoalResearchProgress", REINFORCEDCOALRESEARCHTARGET, reinforcedCoalResearchComplete)
    });
    document.getElementById("researchGoldVeinsButton").addEventListener("click", function(){
        doResearch("goldVeinsResearch", "GOLDVEINS", "researchGoldVeinsButton", "goldVeinsResearchProgress", GOLDVEINRESEARCHTARGET, goldVeinsResearchComplete)
    });

    document.getElementById("hireMerchantButton").addEventListener("click", onMerchantClick);
    document.getElementById("purchaseAleButton").addEventListener("click", onAleClick);
    document.getElementById("purchaseGrainButton").addEventListener("click", onGrainClick);
    document.getElementById("sellIronOreButton").addEventListener("click", function(){
        sellGood("ore", 100, 0.1)
    });
    document.getElementById("sellIronBarsButton").addEventListener("click", function(){
        sellGood("ironIngots", 100, 0.3)
    });

    document.getElementById("hireBrewsterButton").addEventListener("click", onBrewsterClick);
    document.getElementById("hireFarmerButton").addEventListener("click", onFarmerClick);
});
