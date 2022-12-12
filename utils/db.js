var loki = require('lokijs')
var db = new loki('creditcards.db');

var credit = db.addCollection('cards', { indices: ['number','name'] });

module.exports = {credit};