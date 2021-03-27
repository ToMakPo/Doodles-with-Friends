import '../styles/Timer.css'

const Timer = ({countdown}) => {
    function getTime() {
        const m = Math.floor(countdown / 60)
        const s = Math.floor(countdown % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    return (
        <div id='timer'>
            <p className="timerElement">{getTime()}</p>
        </div>
    )
}

export default Timer