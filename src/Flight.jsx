import React from 'react'
import arrowLogo from './Blue_Right_Arrow.png';

export default function Flight(props) {
    console.log(props)
    // const flightdetails = 
    var stops = props.data.f[0].l.length
    var departTime = props.data.f[0].l[0].dd
    var arrivalTime = props.data.f[0].l[stops -1].ad
    if(stops >= 1 && stops < 2){
        stops = `non stop`
    }
    else if(stops === 2){
        stops = `1 stop`
    }else if(stops > 2 ){
        stops = `${stops} stops`
    }
    console.log(departTime,arrivalTime)
    var carrierCode = ""
    var flightArray = [];
    var stopsArray = [];
    var origin = ""
    var destination = ""
    var noofdates=""
    origin = props.data.f[0].l[0].da
    props.data.f[0].l.map(d=>{
        carrierCode = d.m
        stopsArray.push([d.da,d.aa])
        flightArray.push(`${d.o}-${d.f}`)
        destination = d.aa 
    })
    props.airports.map(d=>{
        if(origin === d.c){
            origin = d.cn
        }
        if(destination === d.c){
            destination = d.cn
        }
    })
    let hour = parseInt(arrivalTime.toString().slice(11,13)) - parseInt(departTime.toString().slice(11,13))
    const minuteDiffrence = parseInt(60 - departTime.toString().slice(14,16) ) + parseInt(arrivalTime.toString().slice(14,16))
    
    var date = parseInt(departTime.toString().slice(8,10))
    var arrivaldate = parseInt(arrivalTime.toString().slice(8,10))
    // console.log("date of depart",date,"date of arrival",arrivaldate)

    // console.log(minuteDiffrence)
    var quotient = Math.floor(minuteDiffrence/60);
    var minutes = minuteDiffrence %60;
    
    if(date !== arrivaldate){
        noofdates = arrivaldate - date
        hour =   (24 -parseInt(departTime.toString().slice(11,13))) + parseInt(arrivalTime.toString().slice(11,13)) 
        // console.log(24 -parseInt(departTime.toString().slice(11,13)))
        if(noofdates > 1){
            hour += 24
        }
    }
    hour = (hour -1) +quotient
    console.log(hour,minutes)
    return (

        <div>
            <div className="search-flights">
                <div style={{"display":"flex"}}>
                    <img style={{"width":"50px","height":"50px","borderRadius":"10px"}}src={props.carriers.filter(f=> carrierCode === f.c)[0]['l']} alt= "logo"/>
                    <div style={{"marginLeft":"15px","marginTop":"10px"}}>
                        { props.carriers.filter(f=> carrierCode === f.c)[0]['n']}
                        <br/>
                        <div style={{"color":"gray","fontSize":"small"}}>{flightArray.map(d=>d,)}</div> 
                    </div>
                </div>
                <div className="flights-time">
                    <div>
                        <div style={{"fontWeight":"bold","fontSize":"x-large"}}>{departTime.toString().slice(11,16)} </div>
                        <br/> 
                        <div style={{"color":"gray","fontSize":"small"}}>{origin}</div>
                    </div>
                    <div style={{"color":"gray","fontSize":"small", "display":"flex","flexDirection":"column", "justifyContent":"space-between"}}>
                        {`${hour}hours  ${minutes}minutes`}
                        <br/>
                        <img src={arrowLogo} alt="plane-logo" style={{"marginTop":"5px",'width':"100px","height":"4px"}}/>
                        <br/>
                        <div >{stops}</div>
                    </div>
                    <div>
                        <div style={{"fontWeight":"bold","fontSize":"x-large","display":"flex"}}>{arrivalTime.toString().slice(11,16)} 
                            <div style={{"fontWeight":"normal","fontSize":"x-small"}}>{noofdates >= 1 ? `+${noofdates}day` :null}</div>
                        </div>
                         
                        <br/>
                        <div style={{"color":"gray","fontSize":"small"}}>{destination}</div>
                    </div>
                </div>
                <div style={{"display":"flex", "width":"300px", "justifyContent":"flex-end"}}>
                   
                    <div style={{"fontWeight":"bold","fontSize":"x-large"}}>{props.data.l[0].pr.dp}</div>
  
                    <button style={{"borderRadius":"20px","border":"none","color":"white","backgroundColor":"#3282b8","padding": "0px 0px","marginLeft":"20px","width":"150px ", "height":"40px","backgroundImage": "linear-gradient(to right,skyblue , #3282b8)","fontWeight":"bold"}}>Book now</button>
                </div>
            </div>
        </div>
    
        )
    
}
