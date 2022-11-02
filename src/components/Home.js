import React, { useMemo, useState, useEffect, useCallback, Fragment } from "react";
import MeritMoneyService from "../services/merit-money.service";
import AuthService from "../services/auth.service";
import FormatService from "../services/format.service";
import Table from "./Table";
import jwt_decode from "jwt-decode";
import Balance from "./Balance"
import TransferBalance from "./TransferBalance"

const Home = () => {
  const [balanceHistories, setBalanceHistories] = useState([]);
  const [userBalance, setUserBalance] = useState([]);

  const fetchHome = useCallback(() => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    MeritMoneyService.getUserBalance(jwt_decode(token).id).then(
      (response) => {
        setUserBalance(response.data);
      },
      (error) => {
        // CRIAR FUNÇÃO TRATAR COD != 401 (API NÃO ESTÁ RODANDO)
        if (error.response && error.response.status === 401) {
          AuthService.invalidToken(error);
        }
      }
    );

    MeritMoneyService.getBalanceHistories().then(
      (response) => {
        setBalanceHistories(response.data);
      },
      (error) => {
        // CRIAR FUNÇÃO TRATAR COD != 401 (API NÃO ESTÁ RODANDO)
        if (error.response && error.response.status === 401) {
          AuthService.invalidToken(error);
        }
      }
    );

  }, [])

  const handleCallback = () => {
    fetchHome()
  };
  
  useEffect(() => {
    fetchHome()
  }, [fetchHome]);

  const columns = useMemo(
    () => [
      {
        Header: 'Ultimas Transações',
        columns: [
          {
            Header: 'Origem',
            accessor: 'userOrigin.name',
            Cell: props => <div> <Fragment>{FormatService.formatOrigin(props.value)}</Fragment> </div>
          },
          {
            Header: 'Valor',
            accessor: 'value',
            Cell: props => <div> <Fragment>{FormatService.toCurrency(props.value)}</Fragment> </div>
          },
          {
            Header: 'Destino',
            accessor: 'userDestiny.name',
            Cell: props => <div> <Fragment>{FormatService.formatDestiny(props.value)}</Fragment> </div>
          },
          {
            Header: 'Tipo',
            accessor: 'type',
            Cell: props => <div> <Fragment>{FormatService.formatType(props.value)}</Fragment> </div>
          },
          {
            Header: 'Data',
            accessor: 'created_at',
            Cell: props => <div> <Fragment>{FormatService.formatDate(props.value)}</Fragment> </div>
          },
        ],
      },
    ],
    []
  )



  return (
    <div>
      {
        userBalance &&
        userBalance.balance
        && (<Balance userBalance={userBalance} />)
      }
      <TransferBalance parentCallback={handleCallback}/>
      {
        balanceHistories &&
        balanceHistories.itens
        && (<Table columns={columns} data={balanceHistories.itens} />)
      }
    </div>
  );
};

export default Home;
