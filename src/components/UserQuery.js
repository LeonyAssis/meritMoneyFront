import React, { useState } from "react";
import MeritMoneyService from "../services/merit-money.service";
import AsyncSelect from 'react-select/async';

const UserQuery = (props) => {
    const [search, setSearch] = useState([]);
    const [error, setError] = useState(null);    

    const onTrigger = (e) => {
        props.parentCallback(e.value);
    };

    const mountObjValue = (inputValue) => {
        MeritMoneyService.getUsers(inputValue).then(
            (response) => {
                setSearch(response.data.users);
            },
            (error) => {
                setError(error);
            }
        );

        if (error) {
            if (error.response.status === 401)
                window.location.reload();
        } else {
            return search.map(u => ({ value: u.id, label: u.name }))
        }
    };


    const loadOptions = (inputValue, callback) => {
        callback(mountObjValue(inputValue));
    };

    return (
        <>
            <AsyncSelect
                cacheOptions
                defaultOptions
                placeholder="Digite o nome"              
                loadOptions={loadOptions}
                onChange={onTrigger}
                required
                noOptionsMessage={() => "Colaborador não encontrado"}
            />
        </>
    );
};

export default UserQuery;
