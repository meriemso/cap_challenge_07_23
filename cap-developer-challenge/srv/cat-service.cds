using {golf} from '../db/schema';
using {managed} from '@sap/cds/common';

service CatalogService @(path: '/browse') {
    entity Rounds as projection on golf.Rounds;
    entity Holes  as projection on golf.Holes;
    entity Shots  as projection on golf.Shots;
}
