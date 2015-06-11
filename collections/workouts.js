this.Workouts = new Meteor.Collection("Workouts");

WorkoutSchema = new SimpleSchema({
  course : {
    type : String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Course',
      options: function () {
        var teamCourses = Courses.find({'teamId': Session.get('currentTeamId')}).fetch();
        var courseAutoformList = [];
        _.each(teamCourses, function(course){
            var courseObj = {};
            courseObj.label = course.distance + ' ' + course.metric;
            courseObj.value = course._id;
            courseAutoformList.push(courseObj);
        });
        return courseAutoformList;
      }     
    },    
  },
  
  sets: {
    type : [String],
    autoValue: function() {
      if (this.isInsert) {
        return [];
      } else if (this.isUpsert) {
        return {$setOnInsert: []};
      } else {
        this.unset();
      }
    }     
  },
  name : {
    type : String,
    optional : true,
    autoform: {
      'label-type': 'floating',
      placeholder: 'Name'
    },     
  },

  //Hold original date, team and coach who created workout
  date_time : {
    type: Date,
    autoform: {
      //DWD TODO add in a package that makes the date time pretty
      type:'datetime-local',
      'label-type': 'floating',
      placeholder: 'Date'
    },     
  },
  teamId : {
    type : String,
  },
  coachId : {
    type: String,
  },

  //These two just handle sharing. Second one is an array of coach ids
  shareCounter : {
    type: Number,
    defaultValue: 0,
  },
  coachesSharedWith : {
    type: [String],
    defaultValue : [],
  }
});

if (Meteor.isClient)
{
  Workouts.before.insert(function (userId, doc) {
    var teamId = Session.get('currentTeamId');
    var coachId = Session.get('currentCoachId');
    doc.teamId = teamId;
    doc.coachId = coachId
  });
}


this.Workouts.attachSchema(WorkoutSchema);
this.Workouts.attachBehaviour('softRemovable');
this.Workouts.attachBehaviour('timestampable');

this.Workouts.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; 
    //return true;
  },
  update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId; 
    //return true;
  },
});
