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
                <div className="card-deck" style={{
                    display: 'flex',
                    alignItems: "stretch",
                    // flexDirection: 'row'
                    // flexWrap: 'wrap'
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="">
                                {/* TODO: Check if this is the active player */}
                                <Canvas active={true}/> 
                            </div>
                        </div>
                    </div>
                    <ChatBox lobby={{id: 'D5EA12C14'}} user={{username: 'ToMakPo'}}/>
                </div>
            </main>
        </div>
    )
}
export default ArtistView