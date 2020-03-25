import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './style.css';

function Newincidents(){

    const [title, setTitle] = useState("");
    const [description, setDescriptin] = useState("");
    const [value, setValue] = useState("");

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewincident(event){
        event.preventDefault();

        const data = {
            title,
            description,
            value
        }; 

        try {
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            });

            alert('caso cadastrado com sucesso');

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente')
        }
    }

    return(
        <div className="new-incident-container">            
            <div className="content">
                <section>
                    <img src={ LogoImg } alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewincident}>
                    <input 
                    type="text" 
                    placeholder="Titule do caso" 
                    value={ title }
                    onChange={ event => setTitle(event.target.value) }
                    />

                    <textarea 
                    placeholder="Descrição"
                    value={ description }
                    onChange={ event => setDescriptin(event.target.value) } 
                    />

                    <input 
                    placeholder="Valor em reais" 
                    value={value}
                    onChange={ event => setValue(event.target.value) }
                    />

                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Newincidents;