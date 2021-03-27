import '../styles/Timer.css'

const Timer = ({countDown}) => {
    function getTime() {
        const m = Math.floor(countDown / 60)
        const s = Math.floor(countDown % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    return (
        <div id='timer'>
            <p className="timerElement">{getTime()}</p>
        </div>
    )
}

export default Timer