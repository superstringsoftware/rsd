import React, { Component, PropTypes } from 'react';

export default class Show extends Component {
  render() {
    return (
        <tr className="showLine" data-showID={this.props.show.ID}>
            <td>{this.props.show.name}</td>
            <td>{this.props.show.organizer}</td>
            <td>{this.props.show.date}</td>
            <td>{this.props.show.place}</td>
        </tr>
    );
  }
}

Show.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  show: PropTypes.object.isRequired,
};
