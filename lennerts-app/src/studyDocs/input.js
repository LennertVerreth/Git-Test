import React,{ Component} from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            first_name: "first name",
            last_name: "last name"
        }
    }

    //this.state.first_name
    //this.state["first_name"]

    getName = (name, value) =>  {
        console.log(name, value)
        this.setState({
            [name]: value
        })
    }

    getMe = (e) =>  {
        console.log(e.target.name, e.target.value)
    }

    render() { 
        return (
                        <div className="name-container">
                            <div className='modal-header'>
                                <p className='modal-p'>What is your name, sir?</p>
                            </div>         
                            <div className='modal-content'>
                                <input 
                                    className='content-input' 
                                    name="first_name"
                                    onChange={(e) => this.getName(e.target.name, e.target.value)}
                                    value={this.state.first_name}
                                />

                                <input 
                                    className='content-input' 
                                    name="last_name"
                                    onChange={(e) =>  this.getName(e.target.name, e.target.value)}
                                    value={this.state.last_name}
                                />

                                <input 
                                    className='content-input' 
                                    style={{marginTop:0}}
                                    name="other_name"
                                    onChange={(e) =>  this.getMe(e)}
                                    value={this.state.last_name}
                                />

                            </div> 
                            <div className='modal-footer'>
                                <button className="btn" onClick={() => console.log(this.state)}>Submit</button>
                                
                            </div> 
                        </div> 
                    
          );


    }
}
 
export default Input ;