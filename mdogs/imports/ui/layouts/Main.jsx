import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ShowsPublicTable, TotalResultsTable } from '../public/showsPage.jsx';

import NotFound from '../pages/NotFound';
import { DogPageComponent } from '../pages/Dog';

import DogsAdminTable from '../pages/admin/Dogs';
import PeopleAdminTable from '../pages/admin/People'
import ShowsAdminTable from '../pages/admin/Shows'
import ResultsAdminTable from '../pages/admin/Results'
import { ResultsShows, ShowsSelection } from '../pages/admin/ResultsShows'


export default Main = () => (

<div className="container">
    <div className="row">

        <div className="col-md-12">
          <Switch>
             <Route exact path='/' component={ShowsPublicTable} />
             <Route path='/shows/:id' component={TotalResultsTable} />
             <Route path='/dogs/:id' component={DogPageComponent} />
             <Route exact path='/admin/dogs' component={DogsAdminTable} />
             <Route exact path='/admin/people' component={PeopleAdminTable} />
             <Route exact path='/admin/shows' component={ShowsAdminTable} />
             <Route exact path='/admin/results' component={ShowsSelection} />
             <Route component={NotFound} />
          </Switch>
        </div>

    </div>
</div>
);
