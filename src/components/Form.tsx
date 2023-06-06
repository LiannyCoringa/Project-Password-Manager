function Form() {
  return (
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
      <button>Cancelar</button>
    </form>
  );
}

export default Form;
