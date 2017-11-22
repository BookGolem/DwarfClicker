//Function for batch selling goods to make cash quickly. 
function sellGood(goodToSell, numberToSell, salePrice){
    window[goodToSell] -= numberToSell;
    goldIngots += (numberToSell*salePrice);
}

