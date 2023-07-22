
const cds = require('@sap/cds')

/**
 * Implementation for Hole Management service defined in ./cat-service.cds
 */
module.exports = cds.service.impl(async function () {
    this.on('CREATE', 'Holes', (req,next) => {
        let hole = req.data;
        const par = req.data.par;
        const score = hole.score;
        const calc_result = score - par;
        let result = "";
        // const holes = Array.isArray(holeData) ? holeData : [holeData];
        if (par < 0) req.error `${{ par }} must be >= ${0}`;
        console.log(calc_result);
        switch (calc_result) {
            case -3:
                result= "albatross";
                break;
            case -2:
                result= "eagle"; 
                break;
            case -1:
                result= "birdie";
                break;
            case 0: 
                result= "par";
                break;
            case 1:
                result= "bogey";
                break;
            case 2:
                result= "double bogey";
                break;
            case 3:
                result= "triple bogey";
                break;

        }
        if (score === 1) {
            result= "hole in one";
        }
        hole.result = result;
        return next()
        // return Object.assign(hole.result,result) ;
    });
  
    this.on('error', (err, req) => {
        err.message = 'Oh no! ' + err.message
    })
    this.after('READ', 'Shots', shotData => {
        const shots = Array.isArray(shotData) ? shotData : [shotData];
        shots.forEach(shot => {
            if (shot.impact >= 100000) {
                shot.criticality = 1;
            } else {
                shot.criticality = 2;
            }
        });
    });
   

});