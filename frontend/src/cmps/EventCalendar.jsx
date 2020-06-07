import React, { Component } from 'react'
import 'date-fns' 
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export default class EventCalendar extends React.Component {
    state = {
        date: new Date()
    }
    
    onChange = (date) => {
        this.setState({date})
        const eventDate = +date
        this.props.onDateChange(eventDate)
        console.log(eventDate);
    }
    
    render() {
        return (
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 {/* <MuiPickersUtilsProvider >  */}
                    <DatePicker
                        autoOk
                        orientation="vertical"
                        variant="static"
                        openTo="date"
                        value={this.state.date}
                        onChange={this.onChange}
                    /> 
                     </MuiPickersUtilsProvider> 
            </div>
        )

    }
}
 