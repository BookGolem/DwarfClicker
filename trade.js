//Function for batch selling goods to make cash quickly. 
function sellGood(goodToSell, numberToSell, salePrice){
    window[goodToSell] -= numberToSell;
    goldIngots += (numberToSell*salePrice);
}

//Constants


//Variables
var maxTradeRoutes = 0;

var tradePartner = function(name, startRep, goodsForSale, goodsWillBuy){
    this.name = name;
    this.reputation = startRep;
    this.goodsAvailable = goodsForSale;
    this.goodsToBuy = goodsWillBuy;
}

var dwarfKingdom = new tradePartner("Dwarf Kingdom", 10, ["ale"], ["ore", "goldOre", "ironIngots", "coal"]);

function setupTradeRoute(partner,       //Kingdom to trade with 
                        goodSent,       //Good that decreases 
                        sellPrice,      //value recieved per good sent.
                        sellRate,       //number of goods sent per second
                        goodRecieved,   //Good that increases
                        buyPrice,       //value lose per good recieved
                        buyRate,        //number of goods acquired per second
                        duration        //number of seconds the deal lasts (900 is good)
                        ){
    
    ongoingTrade(partner, goodSent, sellPrice, sellRate, goodRecieved, buyPrice, buyRate, duration);

}

function ongoingTrade(partner, goodSent, sellPrice, sellRate, goodRecieved, buyPrice, buyRate, duration){
    if(window[goodSent] < sellPrice*sellRate){
        //Failed to fulfil deal
        partner.reputation -= 1;
    }else if(duration <= 0){
        //Contract complete
        partner.reputation++;
    }else{
        //Continue contract
        window[goodRecieved] += buyPrice*buyRate;
        window[goodSent] -= sellPrice*sellRate

        duration--;

        setTimeout(function(){
            ongoingTrade(partner, goodSent, sellPrice, sellRate, goodRecieved, buyPrice, buyRate, duration);
        }, 1000)
    }
}

