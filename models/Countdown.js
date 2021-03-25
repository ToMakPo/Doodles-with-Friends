import React from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

const Countdown = () => {
    
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a complete state
        return <Completionist />;
      } else {
        // Render a countdown
        return (
          <span>
            {seconds}
          </span>
        );
      }
    };


    return (
        // <div>
            <Countdown date={Date.now() + 5000} renderer={renderer} />
        // </div>
    )
}
export default Countdown;