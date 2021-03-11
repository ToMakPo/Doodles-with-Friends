const { default: Canvas } = require("../components/Canvas")
const ActiveGame = () => {
    return (
        <div className="container ">
            <main>
                <h2>Active Game</h2>
                <div class="container">
                    <div class="row align-items-start">
                    {/* Column1 */}
                        <div class="col-sm">
                        The WORD
                        </div>
                    {/* Column2 */}
                        <div class="col-sm">
                        ROUND 1 OF 5
                        </div>
                    {/* Column3 */}
                        <div class="col-sm">
                        TIME REMAINING
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row align-items-center">
                        <Canvas width={500} height={500} active={true}/>
                    </div>
                </div>
                <div class="container">
                    <div class="row align-items-end">
                        <div>Chat Box</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default ActiveGame