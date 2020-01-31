import React, {Component} from 'react';

class MyChild extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    sendData = () => {
        this.props.speaktoparent("hellofrfd")
        
    }


    render() { 
        return ( 
             <button onClick={this.sendData} >
                 say hello to parent
            </button>

         );
     }
 }
 
export default MyChild;