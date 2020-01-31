import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./companyusers.css";

class CompanyUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: null,

            show: false,
            showNewUser: false,

            picca: "",

            nameError: "false",

            newUserData: {
                id: "",
                name: "",
                username: "", 
                email: "",
                phone: "",
                companyname: "",
                companycatchphrase: "",
                companybs: "", 
            },

            data: [],
            faces: [],
            mySelectedObj: {}
         }
    }

    async componentDidMount (){
        
        await fetch("https://tinyfac.es/api/users")
            .then(response => response.json())
            .then(data => this.formatFaceData(data));
        
        await fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => this.formatUserData(data));  // Kan ook this.setstate({}) | kijk naar ()!! geen {} bij functie
        
        console.log("mount")

    }

    async toDataUrl(url) {
        
        var base64 = await fetch(url)
        .then(response => response.blob())
        .then(data => this.convert(data))
        
        // console.log(base64)

        return base64
    }


    convert(file){
        return new Promise((resolve, reject) => {
            var reader = new FileReader();

            reader.onloadend = function() {
                resolve(reader.result)
            }
            
            reader.readAsDataURL(file)
        });
    }

    formatFaceData(faceDataArray) {

        // console.log(faceDataArray)
        /*

        faceDataArray.map(object => {
            this.toDataUrl(object.avatars[0].url, function(www){
                console.log(www)
            })
        })
*/


        
        let faceInformationArray = faceDataArray.map(object => {
            let neededFaceData = [];
            neededFaceData.face = object.avatars[0].url;
            return neededFaceData;


        })
        

        //console.log(faceInformationArray)

        // const _this = this

        // var reader = new FileReader();
 
        //  reader.onloadend = function() {
        //    console.log('RESULT', reader.result)
 
        //    _this.setState ({
        //          faces : reader.result
        //      })
        //  }
 
        //  reader.readAsDataURL(faceInformationArray)

        this.setState({ 
            faces: faceInformationArray
        })
        
    }


     formatUserData(dataArray){
        
         let informationArray = dataArray.map(async (object, index) => {
             let neededdata ={};

             neededdata.id = object.id;
             neededdata.name = object.name ;
             neededdata.username = object.username;
             neededdata.email = object.email;
             neededdata.phone = object.phone;
             neededdata.companyname = object.company.name
             neededdata.companybs = object.company.bs
             neededdata.companycatchphrase = object.company.catchPhrase

            const face = await this.toDataUrl(this.state.faces[index].face)

            //console.log(face)

             neededdata.face = face //this.state.faces[index].face;
             return neededdata;
         })

         Promise.all(informationArray)
         .then(r =>this.setState({
            data: r
        }))
        


    }

    componentDidUpdate(prevProps, prevState){

        // console.log("update", this.state.nameError)

    }

    showCard = (object) => {

        this.setState({
            id: object.id ,
            show: true,
            mySelectedObj: object
        })
    }

    close = () => {

        this.setState({
            show: false,
            showNewUser: false
        })
    }

    addNewUser = () => {

        this.setState({
            showNewUser: true
        })
    }

    errorMessages = (data) => {
        if(data.name === ""){
            this.setState({
                nameError: true
            })
        } else {
            this.setState({
                nameError: false
            })
        }
    }


    

    submitNewUser = () => {

        this.errorMessages(this.state.newUserData)
        
        if (Object.values(this.state.newUserData).includes(null) !== true && Object.values(this.state.newUserData).includes("") !== true ) {

        let tempUser =  {...this.state.newUserData}

        tempUser.face = this.state.picca
            let tempnewuserarray= [...this.state.data]
            tempnewuserarray.push(tempUser);
            this.setState({
                showNewUser: false,
                data: tempnewuserarray,
                picca: ""
            })

        }
    }

    getInformation = (name, value) => {

        


        let tempUserData = {...this.state.newUserData}
        
        tempUserData[name] = value
        tempUserData.id = this.state.data.length +1

        this.setState({
            newUserData: tempUserData
        })
    }

    sortUsers = (upordown) => {

        console.log(this.state.data)
        
        if(upordown === "asc"){
            this.setState ({
                data : this.state.data.sort((a, b) => a.name > b.name ? 1 : -1)
            })
        } else {
            this.setState ({
                data : this.state.data.reverse((a, b) => a.name > b.name ? 1 : -1)
            })
        }
    }
    
    uploadPic = () => {
       var file = document.getElementById("upload-file").files[0]

    //    console.log("file", file)

       const _this = this

       var reader = new FileReader();

        reader.onloadend = function() {
        //   console.log('RESULT', reader.result)

          _this.setState ({
                picca : reader.result
            })
        }
        
        reader.readAsDataURL(file)
    }
 
    render() { 
        return ( 

            <React.Fragment>

            {/* user popup */}

            {this.state.show === true &&

            this.state.data.map((object, index) =>

            object.id === this.state.id ? 

                <div key={object.id} className="overlay-show"> 
                    <div className="company-card-show">
                    
                        <img src={object.face} alt="should be a face" className="user-pic-show"></img>
                        <button className="button-show" onClick={() => this.close()}>x</button>
                        
                        <p className="user-catchphrase-show">"{object.companycatchphrase}"</p>

                        <p className="title-show">About</p>
                        <div className='show-div'><span className="show-name"> Name: </span><span className="show-value">{object.name}</span></div>
                        <div className='show-div'><span className="show-name"> Username: </span><span className="show-value">{object.username}</span></div>

                        <p className="title-show">Contact</p>
                        <div className='show-div'><span className="show-name"> Email: </span><a className="show-value" href="mailto:{this.state.mySelectedObj.email}">{object.email}</a></div>
                        <div className='show-div'><span className="show-name"> Tel: </span><a className="show-value" href="tel:{this.state.mySelectedObj.phone}">{object.phone}</a></div>

                        <p className="title-show">Work</p>
                        <div className='show-div'><span className="show-name"> Company: </span><span className="show-value">{object.companyname}</span></div>
                        <div className='show-div'><span className="show-name"> Function: </span><span className="show-value">{object.companybs}</span></div>

                    </div>
                </div>
            : ""
            )}

            {/* add new user pop-up */}
            
            {this.state.showNewUser === true ?

                <div className="overlay-show"> 
                    <div className="new-user-container">

                        <button className="new-user-delete-button" onClick={() => this.close()}>x</button>

                        <div className="upload-container">
                            <img src={this.state.picca} alt="upload here" className="new-user-pic"></img>
                            <input id="upload-file" type="file" onChange={() => this.uploadPic()}/>
                        </div>

                        <input type="text" className="" placeholder="Catchphrase" name="companycatchphrase" onChange={(e) => this.getInformation(e.target.name, e.target.value)}/>

                        <p className="title-show">About</p>
                        <input type="text" className={this.state.nameError === true ? "red" : ""} placeholder="Name" name="name" onChange={(e) => this.getInformation(e.target.name, e.target.value)}/>

                        <input type="text" className="" placeholder="Username" name="username" onChange={(e) => this.getInformation(e.target.name, e.target.value)}/>

                        <p className="title-show">Contact</p>
                        <input type="email" className="" placeholder="Email" name="email" onChange={(e) => this.getInformation(e.target.name, e.target.value)}/>
                        <input type="tel" className=""  placeholder="Telephone" name="phone" onChange={(e) => this.getInformation(e.target.name, e.target.value)}/>

                        <p className="title-show">Work</p>
                        <input type="text" className="" placeholder="Company" name="companyname" onChange={(e) => this.getInformation(e.target.name, e.target.value)}/>
                        <input type="text" className="" placeholder="Function" name="companybs" onChange={(e) => this.getInformation(e.target.name, e.target.value)}/>

                        <input onClick={() => this.submitNewUser()} className="button-new-user" type="submit" value="Submit"/>

                    </div>
                </div>

            : "" }
            
            {/* main company user screen */}
                
                <div className="company-container">

                    <div className="company-header">
                        <p>Company Users</p>
                        <button onClick={() => this.sortUsers("asc")} className="button-header-asc"><span className="tooltip-text-asc">Sort users</span><FontAwesome name="sort-alpha-asc fa-2x"/></button>
                        <button onClick={() => this.sortUsers("desc")} className="button-header-desc"><span className="tooltip-text-desc">Sort users</span><FontAwesome name="sort-alpha-desc fa-2x"/></button>
                        <button onClick={() => this.addNewUser()} className="button-header"><span className="tooltip-text">Add new user</span><FontAwesome name="plus-circle fa-2x"/></button>
                    </div>

                    <div className="company-content">

                        {this.state.data.map((object, index) =>
                            <div key={object.id}  className="company-card">
                                <img alt="" src={object.face} className="user-pic"></img>
                                <p className="user-name">{object.name}</p> 
                                <p className="user-company">{object.companyname}</p>
                                <p className="user-catchphrase">"{object.companycatchphrase}"</p>
                                <button className="button-card" onClick={() => this.showCard(object)}>Full Profile</button> 
                            </div> 
                        )}

                    </div>

                </div>
                
            </React.Fragment>
         );
    }
}
 
export default CompanyUsers ;