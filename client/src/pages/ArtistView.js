import ChatBox from "../components/ChatBox"
const { default: Canvas } = require("../components/Canvas")

const ArtistView = () => {
    return (
        <div className="container ">
            <main>
                <h2>
                    <div className="d-flex justify-content-around align-items-center">
                        
                        <div className="d-inline p-2 bg-primary text-white">
                        THE WORD
                        </div>
                        <div className="d-inline p-2 bg-primary text-white">
                        ROUND 1 OF 5
                        </div>

                        <div className="d-inline p-2 bg-primary text-white">
                        TIME REMAINING
                        </div>
                    </div>
                </h2>
                <div className="card-deck">

                <div className="card">
                    <div className="card-body">
                        <div className="">
                            <Canvas width={500} height={500} active={true}/>
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