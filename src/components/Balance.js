import React from "react";
import FormatService from "../services/format.service";

export default function Balance({ userBalance }) {

    const showBalance = (el) => {
        if (el === 'show') {
            document.getElementById('show-balance').classList.remove('hidden');
            document.getElementById('hidden-balance').classList.add('hidden');
        } else {
            document.getElementById('hidden-balance').classList.remove('hidden');
            document.getElementById('show-balance').classList.add('hidden');
        }
    }

    return (
        <div className="d-flex flex-row-reverse">
            <div id="hidden-balance" className="hidden-balance" onClick={() => showBalance('show')}>
                <div>Saldo</div>
                <i className="bi bi-eye-slash"></i> ****,**
            </div>
            <div id="show-balance" className={"hidden-balance hidden " + (userBalance && userBalance.balance > 0 ? 'positive-balance' : 'negative-balance')} onClick={() => showBalance('hidden')}>
                <div>Saldo</div>
                <i className="bi bi-piggy-bank"></i> M$ {FormatService.toCurrency(userBalance && userBalance.balance)}
            </div>
        </div>
    )
}
