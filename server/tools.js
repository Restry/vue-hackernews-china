const cities = require('../src/util/cities')
var url = require('url');

const getCityEntityByHostName = (hostname) => { 
  var result = url.parse(hostname);
  var host = result.hostname || hostname;

  var name = host.split('.')[0]
  return getCityEntity(name);
}

const getCityEntity = (name) => { 
  debugger
  const city = cities.find(a => a.pinyin.toLowerCase() == name.toLowerCase());
  return city;
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function getNextSequenceValue(db, sequenceName){
  var sequenceDocument = db.counters.findAndModify(
     {
        query:{_id: sequenceName },
        update: {$inc:{sequence_value:1}},
        "new":true
     });
  return sequenceDocument.sequence_value;
}

module.exports = {
  getCityEntityByHostName,
  getCityEntity,
  guid,
  getNextSequenceValue
}
