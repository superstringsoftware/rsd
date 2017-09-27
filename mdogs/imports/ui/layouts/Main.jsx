import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ShowsPublicTable, TotalResultsTable } from '../public/showsPage.jsx';

export default Main = () => (

<div className="container">
    <div className="row">

        <div className="col-md-12">
          <Switch>
             <Route exact path='/' component={ShowsPublicTable} />
             <Route path='/shows/:id' component={TotalResultsTable} />
          </Switch>
        </div>

    </div>
</div>
);
