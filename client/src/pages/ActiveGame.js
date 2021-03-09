const { default: Canvas } = require("../components/Canvas")

const ActiveGame = () => {
    return (
        <main>
            <h2>Active Game</h2>
            <Canvas width={500} height={500} active={true}/>
        </main>
    )
}

export default ActiveGame