//DWD TODO Improve security for collections. for instance client shouldn't be allowed to delete the teamId from a group.
this.Athletes = new Meteor.Collection("athletes");

AthleteSchema = new SimpleSchema({
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
  email : {
    type: String,
    optional: true,
    autoform: {
      'label-type': 'floating',
      placeholder: 'Email'
    },
  }  

  //TODO: Insert any other information we might want about athletes

});

this.Athletes.attachSchema(AthleteSchema);
this.Athletes.attachBehaviour('softRemovable');
this.Athletes.attachBehaviour('timestampable');

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



//On creation of an athlete add to the All Swimmers Group of the current team



this.Athletes.allow({
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