using {golf} from '../db/schema';
using {managed} from '@sap/cds/common';
using { RemoteService as external } from './external/RemoteService';

service CatalogService @(path: '/browse') {
    entity Players as projection on external.Players;
    entity Rounds as projection on golf.Rounds;
    entity Holes  as projection on golf.Holes;
    entity Shots  as projection on golf.Shots;
    entity Results as projection on golf.Results;
    entity Qualities as projection on golf.Qualities;

}
