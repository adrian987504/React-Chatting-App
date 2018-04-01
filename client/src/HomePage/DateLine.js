import React from 'react';
var dateFormat = require('dateformat');

class DateLine extends React.Component {
  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'from-me' : '';
    const date = dateFormat(new Date(this.props.date), "dddd, mmmm dS, yyyy");
    return (
      <div className={`message ${fromMe}`}>
        {date}
      </div>
    );
  }
}

DateLine.defaultProps = {
  date: '',
};

export default DateLine;
