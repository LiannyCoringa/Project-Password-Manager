type SenhaProps = {
  senha: string;
};

function Password({ senha }: SenhaProps) {
  const classValidation = 'valid-password-check';
  const classInvalidation = 'invalid-password-check';
  const regexNumbers = /^(?=.*[A-Za-z])(?=.*\d)/g;
  const regexCaracEspecial = /(?=.*?[#?!@$%^&*-])/g;
  return (
    <>
      <p
        className={ senha.length < 8
          ? classInvalidation
          : classValidation }
      >
        Possuir 8 ou mais caracteres
      </p>
      <p
        className={ senha.length >= 16
          ? classInvalidation
          : classValidation }
      >
        Possuir até 16 caracteres
      </p>
      <p
        className={ regexNumbers.test(senha)
          ? classValidation
          : classInvalidation }
      >
        Possuir letras e números
      </p>
      <p
        className={ regexCaracEspecial.test(senha)
          ? classValidation
          : classInvalidation }
      >
        Possuir algum caractere especial
      </p>
    </>
  );
}

export default Password;
