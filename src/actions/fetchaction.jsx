import {
    FETCH_FLIGHTS,
    CLEAR_FLIGHTS,
    FETCH_FAILED

  } from "./types";

export const fetchingflights = (passengers,flightclass,destination,origin,dateOfJourney) => dispatch => {
    console.log("fetchingaction",passengers,flightclass,destination,origin,dateOfJourney)
    
        dispatch({
            type: CLEAR_FLIGHTS
        })
    
    fetch(`https://tripadvisor1.p.rapidapi.com/flights/create-session?currency=INR&ta=${passengers}&c=${flightclass}&d1=${destination}&o1=${origin}&dd1=${dateOfJourney}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "6b5b012475msh2afbf8b0e481403p1e9e0ajsnc34492b45006"
        }
    })
    .then(response=>response.json())
    .then(response => {
        // console.log(response)
        console.log(response.search_params.sid);
        if(response.search_params.sid !== undefined){
            fetch(`https://tripadvisor1.p.rapidapi.com/flights/poll?currency=INR&n=15&ns=NON_STOP%252CONE_STOP&so=PRICE&o=0&sid=${response.search_params.sid}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "6b5b012475msh2afbf8b0e481403p1e9e0ajsnc34492b45006"
                }
            })
            .then(response=>response.json())
            .then(response => {
                console.log(response);
                dispatch({
                    type: FETCH_FLIGHTS,
                    flightsData: response
                })
                // this.setState({ 
                //     data:response.itineraries,
                //     carriers:response.carriers
                //  })
            })
            .catch(err => {
                dispatch({
                    type: FETCH_FAILED,
                })
                console.log(err);
            });
        }
    })
    .catch(err => {
        dispatch({
            type: FETCH_FAILED,
        })
        console.log(err);
    })
}