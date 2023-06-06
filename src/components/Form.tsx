import { useState } from 'react';

function Form() {
  const [buttons, setButtons] = useState(false);
  const [validation, setValidation] = useState({
    NomeDoServiço: false,
    Login: false,
    Senha: false,
  });
  const { NomeDoServiço, Login, Senha } = validation;
  const classValidation = 'valid-password-check';
  const classInvalidation = 'invalid-password-check';
  const [validationPassword, setValidationPassword] = useState({
    minLength: classInvalidation,
    maxLength: classValidation,
    numbersAndT: classInvalidation,
    caracRegex: classInvalidation,
  });
  const { minLength, maxLength, numbersAndT, caracRegex } = validationPassword;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  const regexNumbers = /^(?=.*\d)[0-9]/;
  const regexText = /^(?=.*[a-zA-Z])/;
  const regexCaracEspecial = /^(?=.*[$*&@#])/;
  const regexFunction = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const regexV = regex.test(target.value)
     && setValidation({ ...validation, Senha: true });
    const minLengthV = target.value.length < 8
      ? setValidationPassword({ ...validationPassword, minLength: classInvalidation })
      : setValidationPassword({ ...validationPassword, minLength: classValidation });
    const maxLengthV = target.value.length >= 16
      ? setValidationPassword({ ...validationPassword, maxLength: classInvalidation })
      : setValidationPassword({ ...validationPassword, maxLength: classValidation });
    const regexTandNV = regexNumbers.test(target.value) && regexText.test(target.value)
      && setValidationPassword({ ...validationPassword, numbersAndT: classValidation });
    const regexCaracV = regexCaracEspecial.test(target.value)
      && setValidationPassword({ ...validationPassword, caracRegex: classValidation });
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
            <p className={ minLength }>Possuir 8 ou mais caracteres</p>
            <p className={ maxLength }>Possuir até 16 caracteres</p>
            <p className={ numbersAndT }>Possuir letras e números</p>
            <p className={ caracRegex }>Possuir algum caractere especial</p>
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
