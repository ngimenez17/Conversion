//DWD TODO Improve security for collections. for instance client shouldn't be allowed to delete the teamId from a group.
this.Coaches = new Meteor.Collection("coaches");

CoachSchema = new SimpleSchema({
  userId : {
    type : String,
  },
  phone: {
    type: String,
    optional: true,
    autoform: {
      'label-type': 'floating',
      placeholder: 'Phone'
    },            
  },
  first_name : {
    type : String,
    optional: true,
    max: 14,
    autoform: {
      'label-type': 'floating',
      placeholder: 'First Name'
    },    
  },
  last_name : {
    type : String,
    optional : true,
    max: 14,
    autoform: {
      'label-type': 'floating',
      placeholder: 'Last Name'
    },    
  },
  gender : {
    type: String,
    optional: true,
    autoform: {
      'label-type': 'floating',
      placeholder: 'Gender'
    },    
  },
  teams : {
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
});

this.Coaches.attachSchema(CoachSchema);
this.Coaches.attachBehaviour('softRemovable');
this.Coaches.attachBehaviour('timestampable');

// // Soft remove document by _id
// Posts.softRemove({_id: 'BFpDzGuWG8extPwrE'});

// // Restore document by _id
// Posts.restore('BFpDzGuWG8extPwrE');

// // Actually remove document from collection
// Posts.remove({_id: 'BFpDzGuWG8extPwrE'});
// Find

// // Find all posts except soft removed posts
// Posts.find({});

// // Find only posts that have been soft removed
// Posts.find({removed: true});

// // Find all posts including removed
// Posts.find({}, {removed: true});
if (Meteor.isServer)
{
  Coaches.after.insert(function(userId, doc){
    //Create Team
    team = {
      'name' : 'Example Team'
    };

    //Insert team into collection and record resultId
    var resultId;
    Teams.insert(team, function(error, result){
      if (error){
        console.log(error);
      }
      else{
        console.log('this is the created team id: ' + result);
        resultId = result;
      }
    });
    console.log("Example Team's id exists out here as: " + resultId);
    Session.set("ExampleTeamId", result);
    //Add team id to this coach
    var teams = [];
    teams.push(resultId);
    doc.teams = teams;
  });
}

this.Coaches.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; 
    //return true;
  },
  update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId; 
    //return true;
  }
});