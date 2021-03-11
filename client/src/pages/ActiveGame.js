const { default: Canvas } = require("../components/Canvas")

const ActiveGame = () => {
    return (
        <main>
            <h2>Active Game</h2>
            <div className="container">

                <h3>THE WORD</h3>

                <h3>ROUND X OF 10</h3>

                <h3>TIME REMAINING:</h3>

                </div>

            <div className="container">

                <h3>DRAWING AREA</h3>

            </div>

            <div className="container">

                <h3>CALL CHAT HERE</h3>

            </div>


            <Canvas width={500} height={500} active={true}/>
        </main>
    )
}

export default ActiveGame