function sellGood(goodToSell, numberToSell, salePrice){
    window[goodToSell] -= numberToSell;
    goldIngots += (numberToSell*salePrice);
}