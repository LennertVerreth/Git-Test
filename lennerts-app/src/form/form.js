import React, {Component} from "./node_modules/react";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state ={
            favorite_food: "",
            favorite_vacation: "",
            terms_of_service: false,
            favorite_toy: "your beautiful self",
            favorite_genre: "",
            genreArray: ["Horror", "Comedie", "SciFi"]

         }
    }

    getValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    sendData = (formStateData) => {
        
        this.props.speaktoparent(formStateData)
        
    }

    render() { 
        return (
                <div className="form-container">

                    <div className='modal-header'>
                        <p className='modal-p'>Question list</p>
                    </div>

                    <div className='form-content'>

                        <label className="input-field-container">Favorite food:
                            <input 
                                type = "text"
                                className="input-field"
                                placeholder= "Favorite food"
                                onChange={(e) => this.getValue(e.target.name, e.target.value)}
                                name="favorite_food"
                                value={this.state.favorite_food}
                            />
                        </label>

                        <label className="input-field-container" >Favorite vacation destination:
                            <input 
                                type="text"
                                className="input-field"
                                placeholder= "Favorite vacation"
                                onChange={(e) => this.getValue(e.target.name, e.target.value)}
                                name="favorite_vacation"
                                value={this.state.favorite_vacation} 
                            />
                        </label>
                        
                        <div className="margin-div">Favorite toy as a kid:</div> 

                        <label className="radio-button-container"> Football
                            <input 
                                name="favorite_toy" 
                                type="radio"
                                onChange={(e) => this.getValue(e.target.name, e.target.value)}
                                value= "Football"
                            /> 
                            <span className="checkmark"></span>
                        </label>

                        <label className="radio-button-container"> Barbie doll
                            <input 
                                name="favorite_toy" 
                                type="radio" 
                                onChange={(e) => this.getValue(e.target.name, e.target.value)}
                                value= "Barbie doll"
                            /> 
                            <span className="checkmark"></span>
                        </label>

                        <label className="radio-button-container"> Gaming console 
                            <input 
                                name="favorite_toy" 
                                type="radio"
                                onChange={(e) => this.getValue(e.target.name, e.target.value)} 
                                value= "Gaming console"
                            />
                            <span className="checkmark"></span>
                        </label>


                        
                        
                        
                        <label className="select-button-container">Favorite movie genre

                            <select className="select-button" name="favorite_genre" onChange={(e) => this.getValue(e.target.name , e.target.value)}>
                            
                                <option value="">select genre, plz</option>

                                {this.state.genreArray.map((genre, index) =>
                                    <option key={index} value={genre}> {genre} </option>
                                )}
                            </select>
                        </label>




                        
                        <div className="margin-div">Have you read the terms of service?</div>

                        <label className="checkbox-container"> 
                            <input 
                                type="checkbox"
                                onChange={(e) => this.getValue(e.target.name, e.target.checked)}
                                name="terms_of_service"
                                value={this.state.terms_of_service}                                
                            />
                            <span className="chechmark"></span>
                        </label> 




                    </div> 

                    <div className='modal-footer'>
                        <button className="btn" onClick={() => this.sendData(this.state)}>Submit</button>
                        
                    </div> 
                </div> 


        );
    }
}
 
export default Form ;