
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
var coalMiningResearch = 0;
function coalMiningResearchComplete(){
    coalMultiplier += 1;
    document.getElementById("coalData").style.display = '';
    calculateIncrements();
    document.getElementById("researchReinforcedCoalButton").style.display = '';
    if(smeltingResearch >= 1000){
        document.getElementById("researchSteamButton").style.display = '';
    }
}

var goldMiningResearch = 0;
function goldMiningResearchComplete(){
    goldMultiplier += 1;
    document.getElementById("goldData").style.display = '';
    calculateIncrements();
    if(ironVeinsResearch >= 1500){
        document.getElementById("researchGoldVeinsButton").style.display = '';
    }
}

var smeltingResearch = 0;
function smeltingResearchComplete(){
    document.getElementById("researchSteelPicksButton").style.display = '';
    document.getElementById("buildSmelteryButton").style.display = '';
    document.getElementById("researchAdvSmeltingButton").style.display = '';
}

var advSmeltingResearch = 0;
function advSmeltingResearchComplete(){
    smeltingEfficiencyMultiplier += 0.5;
    if(coalMiningResearch >= 2000){
        document.getElementById("researchSteamButton").style.display = '';
    }
}

var steelPickResearch = 0;
function steelPickResearchComplete(){
    minerEfficiencyMultiplier += 0.5;
    calculateIncrements();
}

var steamResearch = 0;
function steamResearchComplete(){
    document.getElementById("researchDrillButton").style.display = '';
    //Enable production of convayors and lifts for automated mining too.
}

var drillResearch = 0;
function drillResearchComplete(){
    document.getElementById("buildShedButton").style.display = '';
}

var ironVeinsResearch = 0;
function ironVeinsResearchComplete(){
    minerOreSpeed = minerOreSpeed*2;
    calculateIncrements();
    if(goldMiningResearch >= 1000){
        document.getElementById("researchGoldVeinsButton").style.display = '';
    }
}

var reinforcedCoalResearch = 0;
function reinforcedCoalResearchComplete(){
    minerCoalSpeed = minerCoalSpeed*2
    calculateIncrements();
}

var goldVeinsResearch = 0;
function goldVeinsResearchComplete(){
    minerGoldSpeed = minerGoldSpeed*2
    calculateIncrements();
}