namespace golf;

using {managed} from '@sap/cds/common';


entity Results {
    key code : Integer;
        name : String @mandatory;
}

entity Qualities {
    key code : Integer;
        name : String @mandatory;
}

entity Rounds : managed {
    key ID    : UUID;
        title : String(100);
        holes : Composition of many Holes;
}

define entity Holes : managed {
    key ID        : UUID;
        name      : String(100);
        score     : Integer;
        shots     : Composition of many Shots;
        par       : Integer @assert.range: [
            3,
            5
        ];
        result    : Association to  Results;


}

define entity Shots : managed {
    key ID       : UUID;
        name     : String;
        distance : Integer;
        quality  : Association to Qualities;
    
}
