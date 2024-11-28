const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Tentando conectar ao banco...');
console.log('Tentando criar tabelas...');

(async () => {
  try {
    await createDatabase(); // Cria o banco de dados
    await createTables();   // Cria as tabelas dentro do banco
    console.log('Servidor pronto para receber requisições.');
  } catch (error) {
    console.error('Erro durante a inicialização:', error);
  }
})();

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: '172.17.0.1', // Nome do host do seu contêiner MySQL
      user: process.env.MYSQL_USER, // Usuário do MySQL
      password: process.env.MYSQL_PASSWORD, // Senha do MySQL
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
    console.log(`Banco de dados "${process.env.MYSQL_DATABASE}" criado com sucesso.`);
    await connection.end(); // Fecha a conexão
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
    throw error;
  }
}

async function createTables() {
  try {
    const connection = await mysql.createConnection({
      host: '172.17.0.1', // Nome do host do seu contêiner MySQL
      user: process.env.MYSQL_USER, // Usuário do MySQL
      password: process.env.MYSQL_PASSWORD, // Senha do MySQL
      database: process.env.MYSQL_DATABASE, // Nome do banco de dados
    });

    const CREATE_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS fornecedores (
        id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
        NomeFornecedor VARCHAR(255) NOT NULL,
        CnpjFornecedor VARCHAR(18) NOT NULL,
        IEFornecedor VARCHAR(18) NOT NULL,
        EnderecoFornecedor VARCHAR(255) NOT NULL,
        CepFornecedor VARCHAR(9) NOT NULL,
        NrEndFornecedor VARCHAR(10) NOT NULL,
        PaisFornecedor VARCHAR(100) NOT NULL,
        EstadoFornecedor VARCHAR(100) NOT NULL,
        EmailFornecedor VARCHAR(100) NOT NULL,
        TelFornecedor VARCHAR(15) NOT NULL,
        OutrosFornecedor TEXT NOT NULL
      );
    `;

    await connection.query(CREATE_TABLE_QUERY);
    console.log('Tabela "fornecedores" criada com sucesso.');
    await connection.end(); // Fecha a conexão
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    throw error;
  }
}