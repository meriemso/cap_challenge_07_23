
const cds = require('@sap/cds')

/**
 * Implementation for Hole Management service defined in ./cat-service.cds
 */
module.exports = cds.service.impl(async function () {
    db = await cds.connect.to('db');

    this.on('CREATE', 'Holes', async (req, next) => {
        let hole = req.data;
        const par = req.data.par;

        if (hole.shots) {
            var score = hole.shots.length
        } else if (hole.score) {
            score = hole.score;
        }
        const calc_result = score - par;
        let result_code;
        // const holes = Array.isArray(holeData) ? holeData : [holeData];
        if (par < 0) req.error`${{ par }} must be >= ${0}`;
        console.log(calc_result);
        switch (calc_result) {
            case -3:
                result_code = 1;
                break;
            case -2:
                result_code = 2;
                break;
            case -1:
                result_code = 3;
                break;
            case 0:
                result_code = 4;
                break;
            case 1:
                result_code = 5;
                break;
            case 2:
                result_code = 6;
                break;
            case 3:
                result_code = 7;
                break;

        }
        if (score === 1) {
            result_code = 8;
        }
        const { test } = await SELECT.one(`CatalogService.Results`, i => i).where({ code: result_code })
        const { result } = await cds.run(SELECT.one.from(`CatalogService.Results`).where({ code: result_code }));
        // let resultObj =  srv.read(Results).where({code:result});
        hole.result_code = result_code;
        hole.result = result;
        // Object.assign(hole.result,result) ;
        return next()
    });

    this.on('error', (err, req) => {
        err.message = 'Oh no! ' + err.message
    });
    this.on(['CREATE', 'UPDATE'], 'Shots', (req, next) => {
        const shot = req.data;

        if (shot.distance >= 50) {
            const quality = 1;
        } else {
            quality = 2;
        }

    });

    // this.on(['CREATE', 'UPDATE'], 'Rounds', (req, next) => {
    //     const rounds = req.data;
    //     return next()
    // });

    this.after('READ', 'Holes', async (each) => {
        const result = await cds.run(SELECT.one.from(`CatalogService.Results`).where({ code: each.result_code }));
        each.result = result

    })

    const remote = await cds.connect.to('RemoteService')
    this.on('*', 'Players', (req) => {
        console.log('>> delegating to remote service...')
        return remote.run(req.query)
    })
});