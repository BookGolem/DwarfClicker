
function doResearch(researchToDo,           //The variable tracking research progress (var coalMiningResearch)
                    researchID,             //What currentResearch will be set to (COALMINING)
                    researchButtonName,     //The id of the button pressed to begin the research ("researchCoalMiningButton")
                    researchProgressName,   //The id of the span tracking research progress ("coalResearchProgress")
                    researchTargetValue,    //How much research is needed (2000)
                    completeFunction){      //The function to run once research is complete
    
    document.getElementById(researchButtonName).disabled = true;
    currentResearch = researchID;

    doMoreResearch(researchToDo, researchID, researchButtonName, researchProgressName, researchTargetValue, completeFunction);

}

function doMoreResearch(researchToDo, researchID, researchButtonName, researchProgressName, researchTargetValue, completeFunction){
    window[researchToDo] += autoResearchValue;
    document.getElementById(researchProgressName).innerHTML = parseInt(window[researchToDo]);
    if(window[researchToDo] < researchTargetValue && currentResearch===researchID){
        setTimeout(function(){
            doMoreResearch(researchToDo, researchID, researchButtonName, researchProgressName, researchTargetValue, completeFunction);
        }, 100);
    }else if(currentResearch===researchID){
        //research finished
        window[researchToDo] = researchTargetValue;
        completeFunction();
    }else{
        document.getElementById(researchButtonName).disabled = false;
    }
}

//Specific research functions and variables
var COALMININGRESEARCHTARGET = 1000;
var coalMiningResearch = 0;
function coalMiningResearchComplete(){
    coalMultiplier += 1;
    document.getElementById("coalData").style.display = '';
    calculateIncrements();
    document.getElementById("researchReinforcedCoalButton").style.display = '';
    if(advSmeltingResearch >= ADVSMELTINGRESEARCHTARGET){
        document.getElementById("researchSteamButton").style.display = '';
    }
}

var GOLDMININGRESEARCHTARGET = 1000;
var goldMiningResearch = 0;
function goldMiningResearchComplete(){
    goldMultiplier += 1;
    document.getElementById("goldData").style.display = '';
    calculateIncrements();
    if(ironVeinsResearch >= IRONVEINSRESEARCHTARGET){
        document.getElementById("researchGoldVeinsButton").style.display = '';
    }
}

var SMELTINGRESEARCHTARGET = 500;
var smeltingResearch = 0;
function smeltingResearchComplete(){
    document.getElementById("researchSteelPicksButton").style.display = '';
    document.getElementById("buildSmelteryButton").style.display = '';
    document.getElementById("researchAdvSmeltingButton").style.display = '';
    document.getElementById("researchIronVeinsButton").style.display = '';
}

var ADVSMELTINGRESEARCHTARGET = 1000;
var advSmeltingResearch = 0;
function advSmeltingResearchComplete(){
    smeltingEfficiencyMultiplier += 0.5;
    if(coalMiningResearch >= COALMININGRESEARCHTARGET){
        document.getElementById("researchSteamButton").style.display = '';
    }
}

var STEELPICKRESEARCHTARGET = 2000;
var steelPickResearch = 0;
function steelPickResearchComplete(){
    minerEfficiencyMultiplier += 0.5;
    calculateIncrements();
}

var STEAMRESEARCHTARGET = 2000;
var steamResearch = 0;
function steamResearchComplete(){
    document.getElementById("researchDrillButton").style.display = '';
    //Enable production of convayors and lifts for automated mining too.
}

var DRILLRESEARCHTARGET = 4000;
var drillResearch = 0;
function drillResearchComplete(){
    document.getElementById("buildShedButton").style.display = '';
}

var IRONVEINSRESEARCHTARGET = 1500;
var ironVeinsResearch = 0;
function ironVeinsResearchComplete(){
    minerOreSpeed = minerOreSpeed*1.5;
    calculateIncrements();
    if(goldMiningResearch >= GOLDMININGRESEARCHTARGET){
        document.getElementById("researchGoldVeinsButton").style.display = '';
    }
}

var REINFORCEDCOALRESEARCHTARGET = 1500;
var reinforcedCoalResearch = 0;
function reinforcedCoalResearchComplete(){
    minerCoalSpeed = minerCoalSpeed*1.5
    calculateIncrements();
}

var GOLDVEINRESEARCHTARGET = 1500;
var goldVeinsResearch = 0;
function goldVeinsResearchComplete(){
    minerGoldSpeed = minerGoldSpeed*1.5
    calculateIncrements();
}