function CreditsComponent() {
    return (
    <div className="credits__component">
        <h1>Credits</h1>
        <p>I used these services(for FREE) to make this app. Least, to do, is to provide credits. Plus, a bit of shameless-plug for my portfolio(Do visit).</p>
        <ul>
            <li>
                <div className="credit">
                    <p>App</p>
                    <a href="http://sushant-sapkota.herokuapp.com" target="_blank">Sushant Sapkota</a>
                </div>
            </li>
            <li>
                <div className="credit">
                    <p>Api</p>
                    <a href="https://apilayer.com/marketplace/exchangerates_data-api" target="_blank">Exchange Rates API</a>
                </div>
            </li>
            <li>
                <div className="credit">
                    <p>Background Image</p>
                    <a href="https://unsplash.com/photos/Uo40KRVStJo" target="_blank">Wance Paleri</a>
                </div>
            </li>
        </ul>
    </div>
    )
};

export default CreditsComponent;