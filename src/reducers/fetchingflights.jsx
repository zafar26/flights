import {
    FETCH_FLIGHTS,
    CLEAR_FLIGHTS,
   FETCH_FAILED
  } from "../actions/types";
  
  const initialSatate = {
    summary:[],
      airports:[],
    data:[],
    carriers:[],
    failed:false,
    message:""
  };
  export default function(state = initialSatate, action) {
    switch (action.type) {
      case FETCH_FLIGHTS:
      // console.log("fetchingreducers",action.flightsData)
      if(action.flightsData.errors){
        return {
          ...state,
          failed:true,
          message:action.flightsData.errors[0].message} 
      }
        return {
          ...state,
          summary:action.flightsData.summary,
          airports:action.flightsData.airports,
          data: action.flightsData.itineraries,
          carriers:action.flightsData.carriers
        };
        case CLEAR_FLIGHTS:
          return initialSatate
        case FETCH_FAILED:
          return {
            ...state,
            failed:true
          }

      default:
        return state;
    }
  }
  