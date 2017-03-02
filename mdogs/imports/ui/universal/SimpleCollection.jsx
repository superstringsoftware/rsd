import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class LineItem extends Component {
  render() {
      const cells = Object.getOwnPropertyNames(this.props.item).map((k, index) =>
          // Only do this if items have no stable IDs
          <td key={index}>
            {this.props.item[k].toString()}
          </td>
        );


    return (
        <tr className="showLine" data-showID={this.props.item.ID}>
            {cells}
        </tr>
    );
  }
}

class LineHeader extends Component {
  render() {
      let cells = [];
      if (this.props.item !== undefined) {
      cells = Object.getOwnPropertyNames(this.props.item).map((k, index) =>
          // Only do this if items have no stable IDs
          <th key={index}>
            {k}
        </th>
        );
    }

    return (
        <tr className="showLine">
            {cells}
        </tr>
    );
  }
}

/*LineItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  item: PropTypes.object.isRequired,
};*/


// App component - represents the whole app
export default class SimpleCollection extends Component {

    constructor(props) {
      super(props);
      this.state = {tableClass: "table table-striped table-hover"};
    }

  renderItems() {
      return this.props.items.map((item) => (
        <LineItem key={item._id} item={item} />
      ));
  }

  render() {
      const hitem = this.props.items[0];
      console.log (this.props.items);
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <table className={this.state.tableClass}>
            <thead>
                <LineHeader item={hitem} />
            </thead>
            <tbody>
                {this.renderItems()}
            </tbody>
        </table>

      </div>
    );
  }
}
