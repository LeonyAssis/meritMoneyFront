import React, { useMemo, useState, useEffect, useCallback } from "react";
import MeritMoneyService from "../services/merit-money.service";
import AuthService from "../services/auth.service";
import Table from "./Table";
import jwt_decode from "jwt-decode";

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
          },
          {
            Header: 'Valor',
            accessor: 'value',
          },
          {
            Header: 'Destino',
            accessor: 'userDestiny.name',
          },
          {
            Header: 'Tipo',
            accessor: 'type',
          },
          {
            Header: 'Data',
            accessor: 'created_at',
          },
        ],
      },
    ],
    []
  )

  return (
    <div>
      <p>{userBalance.balance}</p>
      {
        balanceHistories &&
        balanceHistories.itens
        && (<Table columns={columns} data={balanceHistories.itens} teste={balanceHistories} />)
      }

    </div>
  );
};

export default Home;
