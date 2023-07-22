namespace golf;

type par_type : Integer @assert.range: [
    1,
    7
];

using {managed} from '@sap/cds/common';

entity Results {
    code : Integer;
    name : String;
}

entity Rounds : managed {
    key ID    : UUID;
        title : String(111);
        holes : Composition of many Holes;
}

define entity Holes : managed {
    key ID     : UUID;
    key round  : Association to Rounds;
        name   : String;
        score  : Integer;
        shots  : Composition of many Shots;
        par    : par_type;
        result : String;

}

define entity Shots : managed {
    key ID          : UUID;
    key hole        : Association to Holes;
        name        : String;
        impact      : Integer;
        criticality : Integer;
}
