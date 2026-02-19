const reportService = require('../services/reportService');

async function getSummary(req, res, next) {
    try {
        const summary = await reportService.getSummary();
        res.json(summary);
    } catch (err) {
        next(err);
    }
}

module.exports = { getSummary };
