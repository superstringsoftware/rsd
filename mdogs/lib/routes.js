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

// http://app.com/documents/:_id
shows.route( '/:_id', {
  action: function() {
    console.log( "We're viewing a single document." );
  }
});

// http://app.com/documents/:_id/edit
shows.route( '/:_id/edit', {
  action: function() {
    console.log( "We're editing a single document." );
  }
});
