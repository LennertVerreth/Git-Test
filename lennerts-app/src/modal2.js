import React, {Component} from 'react';
import FontAwesome from "react-fontawesome"
import NavigationButtons from './navigationbuttons';
//import MyChild from "./myChild";
// import Input from "./input";
// import Form from "./form";
import CompanyUsers from "./companyUsers/companyusers"

class Modal2 extends Component {
    constructor(props) {
        super(props);
            this.state = { 
                // style: {},
                message: "",
                visibility: false,
                visible: false,
                visibiliti: true,
                part: null,
                tutorialArray: 
                [{
                    id: 0,
                    content: "Here is the primary nav bar, it's your principle way to navigate between project manager, settings, communication app and your profile",
                    todo: '',
                    position: {x: 12, y: 490},
                    overlay: {x: 60, y: 0, width: 1860, height: '100%'},
                },
                {
                    id: 1,
                    content: "When you click on icon in the primary nav bar it could open a secondary nav bar to access to more options",
                    todo: '',
                    position: {x: 12, y: 435},
                    overlay: {x: 120, y: 0, width: 1800, height: '100%'},
                },
                {
                    id: 2,
                    content: "If you click on this button you can enlarge the secondary navbar to access to more informations about tools.",
                    todo: '',
                    position: {x: 7, y: 0},
                    overlay: {x: 120, y: 0, width: 1800, height: '100%'},
                }]

        }
        //console.log(this.state.visibility)
    }

    componentDidMount(){
        //on load once 
    }

    componentDidUpdate(){
        //everytime the component refreshes himself
        console.log("update ", this.state.message)
        //console.log(this.object)
    }

    tutorialYesNo = (x) => {
        if (x === 'no'){
            this.setState({
                visibility: false
            })
        } else {
            this.setState({
                visible: true,
                visibiliti: false,
                part: 0
            })
        }

    }

    setPart = (index) => { 
          this.setState({
            part: index
        })
    }

    tutorialBackFurther = (x) => {
        if (x === 'back' && this.state.part > 0){
            this.setState({
                part: this.state.part -1
            })
        } else if (x === 'further' && this.state.part < 2) {
            this.setState({
                part: this.state.part +1,
            })
        } else {
            this.setState({
                part: this.state.part
            })
        }

    }

    speakToParent = (childData) => {

        if(childData.favorite_genre !== ""){
            let myObject = {
                favorite_food: childData.favorite_food,
                favorite_vacation: childData.favorite_vacation,
                terms_of_service: childData.terms_of_service,
                favorite_toy: childData.favorite_toy,
                favorite_genre: childData.favorite_genre
            }
            this.setState({
                message: myObject
            })
        }
    }
        



    render() { 
            let posX = 0
            let posY = 0
            let overlayX = 0
            let overlayY = 0
            let overlayWidth =  "100%"
            let overlayHeight = "100%"
                    
        if (this.state.part !== null){
             posX = this.state.tutorialArray[this.state.part].position.x 
             posY = this.state.tutorialArray[this.state.part].position.y 
             overlayX = this.state.tutorialArray[this.state.part].overlay.x 
             overlayY = this.state.tutorialArray[this.state.part].overlay.y 
             overlayWidth = this.state.tutorialArray[this.state.part].overlay.width 
             overlayHeight = this.state.tutorialArray[this.state.part].overlay.height 
        }
        

        return ( 

            <React.Fragment>

                {/* <Form speaktoparent={this.speakToParent}/> */}
                <CompanyUsers/>

                {this.state.visibility === true ?
                <div className='tutorial' style={{ marginLeft: overlayX, marginTop: overlayY, width: overlayWidth, height: overlayHeight}}> 
                    {this.state.visibiliti &&
                        <div className="modal-container">
                            <div className='modal-header'>
                                <p className='modal-p'>Tutorial</p>
                            </div>         
                            <div className='modal-content'>
                                <p className='content-p'>Do you want to assist to the BIMOC tutorial ?</p>
                            </div> 
                            <div className='modal-footer'>
                                <button onClick={() => this.tutorialYesNo('no')} className="btn">No</button>
                                <button onClick={() => this.tutorialYesNo()} className='btn'>Yes</button>
                            </div> 
                        </div> 
                    }



                {this.state.visible === true ?
                    <div id="test" className='modal-container2' style={{ marginLeft: posX, marginTop: posY}}> 
                        <p className='modal-content2'>{this.state.tutorialArray[this.state.part].content}</p>
                        <button onClick={() => this.tutorialYesNo('no') } className='btn2'> x </button>
                        <div className='modal-footer2'>
                            
                            <button onClick={() => this.tutorialBackFurther('back')} className='btn2'>
                                <FontAwesome name="chevron-left"/>
                            </button>

                            
                            {this.state.tutorialArray.map((object, index) =>
                                <NavigationButtons key={index} testFunction={() => this.setPart(index)} part={this.state.part} index={index} />
                            )}

                            <button onClick={() =>  this.tutorialBackFurther('further')} className='btn2'>
                                <FontAwesome name="chevron-right"/>
                            </button>

                            
                            
                            {/* <MyChild speaktoparent={this.speakToParent} /> */}
                        </div>   
                    </div>
                : ""}
                </div>
                : ""}

                

            </React.Fragment>
         );
    }
}

export default Modal2;