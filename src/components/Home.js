import React, { useMemo, useState, useEffect } from "react";
import BalanceService from "../services/balance.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Table from "./Table";


const Home = () => {
  const [balanceHistories, setBalanceHistories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    refresh()
  }, []);

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

  function refresh() {
    if (!JSON.parse(localStorage.getItem("user"))) {
      navigate("/login");
      window.location.reload();
    }
    BalanceService.getBalanceHistories().then(
      (response) => {
        setBalanceHistories(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 401) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }

  return (
    <div>   
      {
        balanceHistories &&
        balanceHistories.itens
        && (<Table columns={columns} data={balanceHistories.itens} teste={balanceHistories} />)
      }

    </div>
  );
};

export default Home;
