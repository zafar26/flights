import React from 'react'
import { connect } from "react-redux";
import Flight from './Flight'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/RotateLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  margin-top:130px;
  margin-left:130px;
`;

class Data extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        airports:this.props.airports
      };
    }
    render() {
        console.log(this.props)
        if(this.props.failed){
            return(
                <div style={{"fontSize":"200","color":"white","fontWeight":"bold"}}>               
                    {this.props.failedMessage}
                    <br />
                    GO Back Try Again
                </div>
            )
        }else{
            return (
          <div>
                <div>
                    {typeof this.props.data !== 'undefined' && this.props.data.length > 0 ?
                    this.props.data.map(d=>
                    <Flight       
                    airports={this.props.airports}
                    data={d}
                    carriers={this.props.carriers}
                    summary={this.props.summary}/>
                    )
                    :
                    <div className="sweet-loading">
                    <ClipLoader
                        css={override}
                        size={20}
                        margin={40}
                        color={"white"}
                        loading={this.state.loading}
                    />
                    </div>
                    }
                </div>
        </div>
    );}
}
}

const mapStateToProps = state => ({
    airports:state.flights.airports,
    data: state.flights.data,
    carriers:state.flights.carriers,
    summary:state.flights.summary,
    failed : state.flights.failed,
    failedMessage:state.flights.message
  });
  export default connect(mapStateToProps )(Data);