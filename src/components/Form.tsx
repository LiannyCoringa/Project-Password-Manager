import { useState } from 'react';

function Form() {
  const [buttons, setButtons] = useState(false);
  return (
    <div>
      {
      buttons
        ? (
          <form>
            <label htmlFor="Nome do serviço">Nome do serviço</label>
            <input id="Nome do serviço" type="text" />
            <label htmlFor="Login">Login</label>
            <input id="Login" type="text" />
            <label htmlFor="Senha">Senha</label>
            <input id="Senha" type="password" />
            <label htmlFor="URL">URL</label>
            <input id="URL" type="text" />
            <button>Cadastrar</button>
            <button onClick={ () => setButtons(false) }>Cancelar</button>
          </form>
        )
        : <button onClick={ () => setButtons(true) }>Cadastrar nova senha</button>
      }
    </div>
  );
}

export default Form;
