import { useState } from 'react';
import Swal from 'sweetalert2';
import Password from './Password';

function Form() {
  const [buttons, setButtons] = useState(false);
  const [validation, setValidation] = useState({
    NomeDoServiço: false,
    Login: false,
    Senha: false,
  });
  const [data, setData] = useState({
    NomeDoServiço: '',
    Login: '',
    Senha: '',
    URL: '',
  });
  const [password, setPassword] = useState('');
  const { NomeDoServiço, Login, Senha } = validation;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  const regexFunction = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const regexV = regex.test(target.value)
     && setValidation({ ...validation, Senha: true });
    setPassword(target.value);
    setData({ ...data, Senha: target.value });
    return regexV;
  };
  const changeName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValidation({ ...validation, NomeDoServiço: true });
    setData({ ...data, NomeDoServiço: target.value });
  };
  const changeLogin = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValidation({ ...validation, Login: true });
    setData({ ...data, Login: target.value });
  };
  const changeURL = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, URL: target.value });
  };
  const [newData, setNewData] = useState([{
    NomeDoServiço: '',
    Login: '',
    Senha: '',
    URL: '',
  }]);

  const Cadastrar = () => {
    setNewData([...newData, data]);
    setData({
      NomeDoServiço: '',
      Login: '',
      Senha: '',
      URL: '',
    });
    setButtons(false);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Serviço cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleClickButton = (id: string) => {
    const newDataFilter = newData.filter((dataFilter) => dataFilter.Login !== id);
    setNewData(newDataFilter);
  };
  const [checkbox, setCheckbox] = useState(false);
  const handleClickCheck = () => {
    const check = checkbox ? setCheckbox(false) : setCheckbox(true);
    return check;
  };
  const [passwordHide, setPasswordHide] = useState(false);
  const handleClickHide = () => {
    const hide = passwordHide ? setPasswordHide(false) : setPasswordHide(true);
    return hide;
  };
  return (
    <div>
      {
      buttons
        ? (
          <form className="container">
            <label className="label" htmlFor="NomeDoServiço">Nome do serviço</label>
            <input
              className="inputs"
              id="NomeDoServiço"
              type="text"
              onChange={ changeName }
              value={ data.NomeDoServiço }
            />
            <label className="label" htmlFor="Login">Login</label>
            <input
              className="inputs"
              id="Login"
              type="text"
              onChange={ changeLogin }
              value={ data.Login }
            />
            <label className="label" htmlFor="Senha">Senha</label>
            { passwordHide
              ? <input
                  className="inputs"
                  id="Senha"
                  type="text"
                  minLength={ 8 }
                  maxLength={ 16 }
                  onChange={ regexFunction }
                  value={ data.Senha }
              />
              : <input
                  className="inputs"
                  id="Senha"
                  type="password"
                  minLength={ 8 }
                  maxLength={ 16 }
                  onChange={ regexFunction }
                  value={ data.Senha }
              /> }
            <label className="label" htmlFor="URL">URL</label>
            <input
              className="inputs"
              id="URL"
              type="text"
              onChange={ changeURL }
              value={ data.URL }
            />
            <button
              id="buttonHide"
              type="button"
              onClick={ handleClickHide }
              data-testid="show-hide-form-password"
            >
              Mostrar senha
            </button>
            <Password senha={ password } />
            <div id="buttonsContainer">
              {NomeDoServiço && Login && Senha
                ? <button id="Cadastrar" type="button" onClick={ Cadastrar }>Cadastrar</button>
                : <button id="Cadastrar" disabled>Cadastrar</button>}
              <button id="Cancelar" onClick={ () => setButtons(false) }>Cancelar</button>
            </div>
          </form>
        )
        : <button
            id="buttonCadastrarNovaSenha"
            onClick={ () => setButtons(true) }
          >
            Cadastrar nova senha
          </button>
      }
      <label htmlFor="checkbox" id="checkbox">Esconder senhas</label>
      <input
        id="checkbox"
        type="checkbox"
        onClick={ handleClickCheck }
      />
      <div id="containerList">
      { newData[0].NomeDoServiço === '' && !newData[1]
        ? <p>nenhuma senha cadastrada</p>
        : newData.slice(1).map((datax, index) => (
          <div key={ index } id="passwordContainer">
            <button
              className="buttonX"
              id={ datax.Login }
              type="button"
              data-testid="remove-btn"
              onClick={ () => handleClickButton(datax.Login) }
            >
              X
            </button>
            <a
              id="link"
              href={ datax.URL }
              target="_blank"
              rel="noreferrer"
            >
              { datax.NomeDoServiço }
            </a>
            <p className="data">{ datax.Login }</p>
            { checkbox
              ? <p className="data">******</p>
              : <p className="data">{ datax.Senha }</p> }
          </div>
        ))}
      </div>
    </div>
  );
}

export default Form;
