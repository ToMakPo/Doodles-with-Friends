import ChatBox from "../components/ChatBox"
const { default: Canvas } = require("../components/Canvas")

const ArtistView = () => {
    return (
        <div 
        id="bootstrap-overrides" 
        className="container sketchBackground">
            <main>
                <h2 className="banner">
                    <div className="d-flex justify-content-around align-items-center">
                        
                        <div className="d-inline p-2">
                        THE WORD
                        </div>
                        <div className="d-inline p-2 ">
                        ROUND 1 OF 5
                        </div>

                        <div className="d-inline p-2 ">
                        TIME REMAINING
                        </div>
                    </div>
                </h2>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <div className="">
                                {/* <Canvas width={500} height={500} active={true}/> */}
                            </div>
                        </div>
                    </div>
                    <ChatBox/>
                </div>

            </main>
        </div>
    )
}
export default ArtistView