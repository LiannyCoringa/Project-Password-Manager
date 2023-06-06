import { useState } from 'react';

function Form() {
  const [buttons, setButtons] = useState(false);
  const [validation, setValidation] = useState({
    NomeDoServiço: false,
    Login: false,
    Senha: false,
  });
  const { NomeDoServiço, Login, Senha } = validation;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  const regexFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regexs = regex.test(event.target.value)
     && setValidation({ ...validation, Senha: true });
  };
  return (
    <div>
      {
      buttons
        ? (
          <form>
            <label htmlFor="NomeDoServiço">Nome do serviço</label>
            <input
              id="NomeDoServiço"
              type="text"
              onChange={ () => setValidation({ ...validation, NomeDoServiço: true }) }
            />
            <label htmlFor="Login">Login</label>
            <input
              id="Login"
              type="text"
              onChange={ () => setValidation({ ...validation, Login: true }) }
            />
            <label htmlFor="Senha">Senha</label>
            <input
              id="Senha"
              type="password"
              minLength={ 8 }
              maxLength={ 16 }
              onChange={ regexFunction }
            />
            <label htmlFor="URL">URL</label>
            <input id="URL" type="text" />
            {NomeDoServiço && Login && Senha
              ? <button>Cadastrar</button>
              : <button disabled>Cadastrar</button>}
            <button onClick={ () => setButtons(false) }>Cancelar</button>
          </form>
        )
        : <button onClick={ () => setButtons(true) }>Cadastrar nova senha</button>
      }
    </div>
  );
}

export default Form;
