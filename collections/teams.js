this.Teams = new Meteor.Collection("teams");

TeamSchema = new SimpleSchema({
  name : {
    type : String,
    min : 1,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Name'
    }   
  }        
})

this.Teams.attachSchema(TeamSchema);
this.Teams.attachBehaviour('softRemovable');
this.Teams.attachBehaviour('timestampable');

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

if (Meteor.isClient)
{
  Teams.before.insert(function (userId, doc) {
    var coachId = Coaches.findOne({'userId': userId})._id;
    var coaches = [];
    coaches.push(coachId);
    doc.coaches = coaches;
  });

  //After hook is here so that upon insert the updatedAt is smacked onto team. This should be in sync with the currentTeamId
  Teams.after.insert(function (userId, doc) {
    doc.updatedAt = new Date();


    //Creates the default allSwimmersGroup
    var allSwimmersGroup = {
      name: "All Swimmers",
      Abbr: "all",
      teamId: doc._id,
      athletes: []
    };

    Groups.insert(allSwimmersGroup, function(error, result){
      if (error){
        console.log(error);
      }
      else{
        console.log('this is the allSwimmersGroup id: ' + result);
      }
    });



  });  
}

  setDefault = function(list, collection, doc){
    _.each(list, function(item){
      if(collections !== "Athletes") {
        item.teamId = doc._id;
      }
      collection.insert(item, function(error, result){
        if (error){
          console.log(error);
        }
        else{
          console.log(result);
        }
      });
    });        
  }

if (Meteor.isServer)
{
  Teams.after.insert(function (userId, doc){
    setDefault(Meteor.settings.public.default_intensity_levels, IntensityLevels, doc);
    setDefault(Meteor.settings.public.default_strokes, Strokes, doc);
    setDefault(Meteor.settings.public.default_types, Types, doc);
    setDefault(Meteor.settings.public.default_courses, Courses, doc);

    setDefault(Meteor.settings.public.default_athletes, Athletes, doc);
  });
}


this.Teams.allow({
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