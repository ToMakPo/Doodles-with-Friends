import React from "react"

const CustomSwitch = ({playersProp}) => {
    return(
    <div className="card-body row">
        <h5 className="card-title col "> Custom Categories:</h5>
        <div className="row sliderContainer">
        <p className="col">NO</p>
        <label className="switch col">
            <input type="checkbox"/>
            <span className="slider round"></span>
        </label>
        <p className="col">YES</p>
        </div>
    </div>
    )
}
export default CustomSwitch