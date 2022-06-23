import { ExchangedRateI } from "../../actions/ExchangeRate";
import loading from '../../assets/img/loading.svg';

interface PROPS {
    exchangedRates: ExchangedRateI[]
}

function TableComponent(props: PROPS) {
    const {exchangedRates} = props;

    return (
        <div>
            <table className="table__component">
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Exchange Rate</th>
                        <th>Exchanged Amount</th>
                        <th>Amount (NPR)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {exchangedRates.map((exchangedRate: ExchangedRateI, index, exchangedRateArray) => (
                        (<tr key={`table__row__${index}`}>
                            <td>{exchangedRate.to}</td>
                            <td>{exchangedRate.exchangeRate}</td>
                            <td>{exchangedRate.exchangedAmount}</td>
                            <td>{exchangedRate.amount}</td>
                            <td>{exchangedRate.date}</td>
                    </tr>)))}
                </tbody>
            </table>
            {exchangedRates.length === 0 && (<div className="table__loading"><img src={loading}/></div>)}
        </div>
    );
}

export default TableComponent;