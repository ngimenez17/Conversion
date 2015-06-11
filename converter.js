// Required Libraries
var fs = require('fs');
var util = require('util');

// Helper function
function deep(obj){
  console.log(util.inspect(obj, false, null));  
}


var data = fs.readFileSync('practices.json', 'utf-8');
var data_object = JSON.parse(data);

var numberOfWorkouts = data_object.length;


/****************************** Workouts Blob ******************************/

var workouts = [];

for (var i=0; i<numberOfWorkouts; i++){
  var courseDistance = data_object[i].course.distance;
  var courseMetric = data_object[i].course.metric;
  var dateTime = data_object[i].date_time['$date'];

  workouts.push({
    'num': i+1,
    'course': {'distance': courseDistance,'metric': courseMetric},
    'date_time': dateTime,
    'name': null
  });

};

workouts = JSON.stringify(workouts);

deep(workouts);


/****************************** Sets Blob ******************************/

var sets = [];

for (var i=0; i<numberOfWorkouts; i++){

  var numberOfSets = data_object[i].sets.length;

  for (var j=0; j<numberOfSets; j++){
    var loop = data_object[i].sets[j].loop;
    var groups = data_object[i].sets[j].setGroups[0].groups;

    // Loop over setGroups to form innerSets

    var number0fSetGroups = data_object[i].sets[j].setGroups.length;

    var innerSets = [];

    for(var k=0; k<number0fSetGroups; k++){

      var interval_min = data_object[i].sets[j].setGroups[k].interval_min * 60;
      var interval_sec = data_object[i].sets[j].setGroups[k].interval_sec;


      var _id = data_object[i].sets[j].setGroups[k]._id;
      var description = data_object[i].sets[j].setGroups[k].description;
      var repetitions = data_object[i].sets[j].setGroups[k].repetitions;
      var distance = data_object[i].sets[j].setGroups[k].distance;
      var interval = interval_min + interval_sec;
      var strokeNumber = data_object[i].sets[j].setGroups[k].stroke;
      var typeNumber = data_object[i].sets[j].setGroups[k].type;
      var energyNumber = data_object[i].sets[j].setGroups[k].energy_zone;

      switch (strokeNumber){
        case 1: var stroke = 'Choice';
        break;
        case 2: var stroke = 'Freestyle';
        break;
        case 3: var stroke = 'Stroke';
        break;
        case 4: var stroke = 'Butterfly';
        break;
        case 5: var stroke = 'IM';
        break;
        case 6: var stroke = 'Breaststroke';
        break;
        case 7: var stroke = 'Backstroke';
        break;
        case 8: var stroke = 'Mix';
        break;
        case 9: var stroke = 'Dry';
        break;
        default: var stroke = null;
        break;
      }

      switch (typeNumber){
        case 1: var type = 'Swim';
        break;
        case 2: var type = 'Kick';
        break;
        case 3: var type = 'Pull';
        break;
        case 4: var type = 'Drill';
        break;
        case 5: var type = 'Mix';
        break;
        case 6: var type = 'Dry';
        break;
        default: var type = null;
        break;
      }

      switch (energyNumber){
        case 1: var energy_zone = 1;
        break;
        case 2: var energy_zone = 2;
        break;
        case 3: var energy_zone = 2;
        break;
        case 4: var energy_zone = 3;
        break;
        case 5: var energy_zone = 4;
        break;
        case 6: var energy_zone = 4;
        break;
        case 7: var energy_zone = 5;
        break;
        default: var energy_zone = null;
        break;
      }

      innerSets.push({
        '_id': _id,
        'description': description,
        'repetitions': repetitions,
        'distance': distance,
        'interval': interval,
        'stroke': stroke,
        'type': type,
        'energy_zone': energy_zone
      });

    };

    sets.push({
      'workoutNum': i+1,
      'loop': loop,
      'groups': groups,
      'innerSets': innerSets
    });
  };

};

// sets = JSON.stringify(sets);

// deep(sets);

