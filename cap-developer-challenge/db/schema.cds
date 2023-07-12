namespace golf;

using {managed} from '@sap/cds/common';

entity Rounds : managed {
    key ID    : UUID;
        title : String(111);
        holes : Composition of many Holes;
}

define entity Holes : managed {
    key ID    : UUID;
    key round : Association to Rounds;
        name  : String;
        score : Integer;
        shots : Composition of many Shots;
}

define entity Shots : managed {
    key ID   : UUID;
    key hole : Association to Holes;
        name : String;
}
