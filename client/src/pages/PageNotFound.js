const PageNotFound = () => {
    return (
        <div className="card-body row">
        <h5 className="card-title col "> Custom Categories:</h5>
        <div className="row sliderContainer">
        <p className="col">NO</p>
        <label className="switch col">
            <input type="checkbox"/>
            <span className="slider round"></span>
        </label>
        <p className="col">YES</p>
        </div>
            <main>
                {/* <div class="card-deck"> */}
                    <div class="card">
                        <div class="card-body">
                            <h1>Error: 404</h1>
                            <h2>Page not found</h2>
                        </div>
                    </div>
                {/* </div> */}
            </main>
        </div>
    )
}

export default PageNotFound