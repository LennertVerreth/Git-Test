import React, {Component} from 'react';
import FontAwesome from "react-fontawesome"

class Modal extends Component {
    constructor(props) {
        super(props);
            this.state = { 
            // saysArray: [],
            counter: 0,
            tutorialArray: [{
                id: 0,
                content: "Here is the primary nav bar, it's your principle way to navigate between project manager, settings, communication app and your profile",
                todo: '',
                position: {
                    x: 150,
                    y: 400,
                },
                overlay: { 
                    x:0,
                    y: 0,
                    width: 0,
                    height: 0,
                },
            },
            {
                id: 0,
                content: "When you click on icon in the primary nav bar it could open a secondary nav bar to access to more options",
                todo: '',
                position: {
                    x: 500,
                    y: 400,
                },
                overlay: { 
                    x:0,
                    y: 0,
                    width: 0,
                    height: 0,
                },
            },
            {
                id: 0,
                content: "If you click on this button you can enlarge the secondary navbar to access to more informations about tools.",
                todo: '',
                position: {
                    x: 800,
                    y: 400,
                },
                overlay: { 
                    x:0,
                    y: 0,
                    width: 0,
                    height: 0,
                },
            }]

    }
        console.log(this.state.tutorialArray)
        // console.log(this.state.saysArray)
        // console.log(this.state.counter)
    }
    
    componentDidMount(){
        //on load once 
        console.log("MOUNT")
    }

    componentDidUpdate(){
        //everytime the component refreshes himself
        console.log("update ", this.state.counter)
        console.log("update ", this.state.saysArray)
    }


    say(x){
        //alert(x);
        //make a temp array and fill it with whatever was in the state
        let tempArray = [...this.state.saysArray]

        //then push x to the temp array
        tempArray.push(x)

        this.setState({
            //set your temp array to saysArray
            saysArray: tempArray,
            counter: this.state.counter +1
        })
        // console.log("says ", this.state.counter)
        // console.log(tempArray)
        // console.log(this.state.saysArray)
    }

    delete(index){
        let tempArray = [...this.state.saysArray]

        tempArray.splice(index, 1)

        this.setState({
            saysArray: tempArray, 
            counter: this.state.counter -1
        })
    }

    render() { 
        return ( 
            <div>
            <div className="modal-container">
                <div className='modal-header'>
                    <p className='modal-p'>Tutorial</p>
                </div>         
                <div className='modal-content'>
                    <p className='content-p'>Do you want to assist to the BIMOC tutorial ?</p>
                </div> 
                <div className='modal-footer'>
                    <button onClick={() => this.say("No ")} className="btn">No</button>
                    <button onClick={() => this.say("Yes")} className='btn'>Yes</button>
                </div> 
            </div>

            {this.state.saysArray.map((displayDiv, index) =>
                <div key={index} className="extraDiv">
                    <span className='extraSpan'>{displayDiv}</span>
                    <button className='deleteBtn' onClick={() => this.delete(index)}>
                        <FontAwesome name="trash" /></button>           
                </div>
            )}
            </div>
         );
    }
}

// export default Modal;