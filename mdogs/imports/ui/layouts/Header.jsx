import React from 'react';

import { AdminMenuComponent } from '../AdminMenu';

export default Header = () => (

<div className="navbar navbar-default navbar-fixed-top">
  <div className="container">

      <div className="navbar-header">
        <a href="/" className="navbar-brand">Флэты России: База Данных</a>
        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
      <div className="navbar-collapse collapse" id="navbar-main">

        <div id="admin-menu"><AdminMenuComponent  /></div>

        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">login here</a></li>

        </ul>


      </div>

  </div>
</div>
);
