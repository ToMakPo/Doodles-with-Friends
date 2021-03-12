import ChatBox from "../components/ChatBox"
const { default: Canvas } = require("../components/Canvas")

const ArtistView = () => {
    return (
        <div className="container ">
            <main>
                <h2>Artist View</h2>
                <div className="card-deck">

                <div className="card">
                    <div className="card-header">
                        <span class="d-block p-2 bg-primary text-white text-center">THE WORD</span>
                    </div>
                    <div className="card-body">
                        <div className="">
                            <Canvas width={500} height={500} active={true}/>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="">
                            <div className="d-flex justify-content-around align-items-center">

                                <div className="d-inline p-2 bg-primary text-white">
                                ROUND 1 OF 5
                                </div>

                                <div className="d-inline p-2 bg-primary text-white">
                                TIME REMAINING
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="row align-items-end">
                            <ChatBox/>
                        </div>
                    </div>
                </div>
                </div>

            </main>
        </div>
    )
}
export default ArtistView