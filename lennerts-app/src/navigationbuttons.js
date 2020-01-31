import React, { Component} from 'react';
import FontAwesome from "react-fontawesome"

class NavigationButtons extends Component {
    
    render() { 
        return (  
            <button className='btn2' onClick={this.props.testFunction} >
                <FontAwesome name={this.props.part === this.props.index ? 'circle' : 'circle-o'} />
            </button>
        );
    }
}
 
export default NavigationButtons;