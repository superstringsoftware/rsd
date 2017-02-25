// Flow router routes

FlowRouter.route( '/', {
  action: () => {
      console.log( "We're viewing main page" );
      BlazeLayout.render( 'applicationLayout', { main: 'mainPage' } );

  },
  name: 'main'
});


var shows = FlowRouter.group({
  prefix: '/shows'
});

// http://app.com/shows
shows.route( '/', {
  action: () => {
    console.log( "We're viewing a list of all shows." );
    BlazeLayout.render( 'applicationLayout', { main: 'showsList' } );
  }
});

// http://app.com/shows/:_id
shows.route( '/:_id', {
  action: (params) => {
    console.log( "We're viewing a single document." );
    console.log( params._id );
    BlazeLayout.render( 'applicationLayout', { main: 'resultList' } );
  },
  name: 'showResultsRoute'
});

// http://app.com/shows/:_id/edit
shows.route( '/:_id/edit', {
  action: function() {
    console.log( "We're editing a single document." );
  }
});





var dogs = FlowRouter.group({
  prefix: '/dogs'
});

// http://app.com/dogs
dogs.route( '/', {
  action: () => {
    console.log( "We're viewing a list of all dogs." );
    //BlazeLayout.render( 'applicationLayout', { main: 'showsList' } );
  }
});

// http://app.com/dogs/:_id
dogs.route( '/:_id', {
  action: (params) => {
    console.log( "We're viewing a single dog." );
    console.log( params._id );
    BlazeLayout.render( 'applicationLayout', { main: 'dog' } );
  },
  name: 'showDogRoute'
});
