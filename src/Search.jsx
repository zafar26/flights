import React from 'react'
import './App.css'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchingflights } from './actions/fetchaction';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/RotateLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture, faTrain,faBus,faHotel,faTaxi,faAtlas,faGift, faBuilding, faHome, faParachuteBox } from '@fortawesome/free-solid-svg-icons'


const override = css`
  margin-top:130px;
  margin-left:130px;
  `;

class Search extends React.Component  {
    
    state ={
        airports:[],
        origin:"",
        destination:"",
        dateOfJourney:new Date(),
        returnJourney:"",
        // dateactual:"",
        class:"0",
        passengers:"1",
        adults:"1",
        childs:'0',
        loading:false,
        oneWay:false,
        roundTrip:false,
        checkedTwoWaY:false,
        checked:true
    }
    handleChangeTrip = event => {
        console.log(event.target.checked)
        if(event.target.checked !==  this.state[event.target.id]){

            this.setState({
                [event.target.id]: event.target.checked
            })
        }
    }    
    handleChange = event => {
        console.log(event.target)
        this.setState({
            [event.target.id]: event.target.value,
            loading:true,
        });
        this.fetchingAirports(event.target.value)
      };
      handleChangeDate = event => {
          
          this.setState({
            [event.target.id]: event.target.value,
            dateactual:event.target.value
          })
          console.log(event.target.value)
        //   const year = date.toString().slice(11,15) 
        //   const onlyDate = date.toString().slice(8,10)
        //   var month = date.toString().slice(4,7)
        //   month = month.toLowerCase();
        //   var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        //   month = months.indexOf(month);
        //   var datepicked = ""
        //   if(month < 9){
        //     datepicked = `0${month+1}`
        //   }else{
        //     datepicked = `${month+1}`
        //   }
        // this.setState({
        //     dateOfJourney: date,
        //     dateactual:`${year}-${datepicked}-${onlyDate}`
        // });
      };
    
    search=()=> {
        this.props.fetchingflights(this.state.passengers,this.state.class,this.state.destination,this.state.origin,this.state.dateOfJourney)
        // console.log(this.state)
    
    }
    fetchingAirports = (name) =>{
        
        if(name !== ""){
            fetch(`https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=${name}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "6b5b012475msh2afbf8b0e481403p1e9e0ajsnc34492b45006"
                }
            })
            .then(response=>response.json())
            .then(response => {
                console.log(response)   
                if(!response.errors){    
                    this.setState({
                        airports:response
                    })
                }
                this.setState({
                    loading:false,
                })
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    render(){
        // console.log(this.state)
        
        var year = new Date().getFullYear()
        var month = (new Date().getMonth())
        var today = new Date().getDate();
        if(month < 9){
            month = `0${month+1}`
        }else{
            month ++
        }
        if(today < 9){
            today = `0${today}`
        }
        var date = year +'-'+ month +'-'+today
        console.log("date",date)
        
        return (
            <div>
                <div className="first">
                    <div className="second">
                        <div className="icon">
                            <div className="fonts">
                        <FontAwesomeIcon icon={faPlaneDeparture} />
                        <label>Flights</label>
                        <FontAwesomeIcon icon={faBuilding} />
                        <label>Hotels</label>
                       
                        <FontAwesomeIcon icon={faHome} />
                        <label>villas Apt</label>
                       
                        <FontAwesomeIcon icon={faParachuteBox} />
                        <label>Holidays</label>
                       
                        <FontAwesomeIcon icon={faTrain} />
                        <label>Trains</label>
                       
                        <FontAwesomeIcon icon={faBus} />
                        <label>Buses</label>
                       
                        <FontAwesomeIcon icon={faTaxi} />
                        <label>Cabs</label>
                       
                        <FontAwesomeIcon icon={faAtlas} />
                        <label>Visa</label>
                       
                        <FontAwesomeIcon icon={faGift} />
                        <label>Giftcards</label>

                        </div>
                            {/* <i class="fa fa-plane"></i> */}
                            {/* <img src={logo} alt="plane-logo" style={{'width':"100px","marginTop":"15px"}}/> */}
                            {/* <span class="chNavIcon appendBottom2 chSprite chFlights active"></span> */}
                        </div>
                        <div style={{"display":"flex" ,"marginLeft": "40px","position":"relative", "top":"-20px"}}>
                        <input type="radio" style={{"width":"20px"}}id="oneWay" value="oneWay" checked = {this.state.checked}onChange={this.handleChangeTrip}/>
                        <label for="oneWay">One Way</label>
                        <input type="radio" id="roundTrip" style={{"width":"20px"}} value="twoWay" checked = {!this.state.checkedTwoWaY} onChange={this.handleChangeTrip} />
                        <label for="roundTrip">Round Trip</label>
                        </div>
                        
                        <div className="searchbox">
                            <div>
                                <label for="origin">From</label>
                                <input id="origin"type="text" 
                                onChange ={this.handleChange}
                                value={this.state.origin}                
                                list="suggestionorigin" placeholder="Type Origin"/>
                                <datalist id="suggestionorigin">
                                    {
                                    this.state.loading ? 
                                    <option>
                                    <ClipLoader
                            
                                        css={override}
                                        size={20}
                                        margin={40}
                                        color={"black"}
                                        loading={this.state.loading}
                                        />
                                        </option>
                                        : 
                                        this.state.airports.map(d=>           
                                    <option key={d.code} value={d.code}>{d.display_name}</option>    
                                        )
                                    }
                                </datalist>
                            </div>
                            <div>
                                <label for="destination">To</label>
                                <input id="destination" list="suggestiondestination"
                                onChange={this.handleChange}
                                value={this.state.destination}
                                placeholder="Type Destination"/>
                                <datalist id="suggestiondestination">
                                    {this.state.loading ? 
                                    <ClipLoader
                        
                                    css={override}
                                    size={20}
                                    margin={40}
                                    color={"black"}
                                    loading={this.state.loading}
                                    />:
                                    this.state.airports.map(d=>
                                    <option key={d.code} value={d.code}>{d.display_name}</option>    
                                        )
                                    }
                                </datalist>
                            </div>
                            <div className="journey-date">
                                <label for="dateOfJourney">Date</label>
                                
                                <input id="dateOfJourney"type="date" min={date} value={this.state.dateOfJourney} onChange={this.handleChangeDate}/>
                                
                                {/* <DatePicker
                                // id="dateofjourney"
                                selected={this.state.dateOfJourney}
                                onChange={this.handleChangeDate}
                                minDate={new Date()}
                                showDisabledMonthNavigation
                                /> */}
                            </div>
                            <div className="journey-date" >

                                <label for="returnJourney">Return Date</label>  
                                {this.state.roundTrip !== "twoWay" ?
                                <input id="returnJourney"type="date" disabled min={this.state.dateOfJourney} value={this.state.returnJourney} onChange={this.handleChangeDate}/>
                                :
                                <input id="returnJourney"type="date"  min={this.state.dateOfJourney} value={this.state.returnJourney} onChange={this.handleChangeDate}/>
                            }
                            </div>   
                            <div id="pass-label-input">
                                <label for="passengers">Passengers</label>
                                <div className="adults-childs-input">
                                    <div>
                                    <label for="adults">Adults</label>
                                    <input type="number"id="adults" onChange ={this.handleChange} value ={this.state.adults} />
                                    </div>
                                    <div>
                                    <label for="childs">Childs</label>
                                    <input type="number"id="childs" onChange ={this.handleChange} value ={this.state.childs} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="class">Class</label>
                                <select id="class" required value={this.state.class} onChange={this.handleChange}>
                                    <option value="0">economy</option>
                                    <option value="1">business</option>
                                    <option value="2">first</option>
                                    <option value="3">premiumeconomy</option>
                                </select>
                            </div>
                        </div>
                        <div className="search-button">
                        <Link
                            to={{
                            pathname: `/flights`

                            }}
                        >

                            <button onClick={this.search}>search</button>                
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
   
      
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, { fetchingflights })(Search);