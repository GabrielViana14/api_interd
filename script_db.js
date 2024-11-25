const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = await mysql.createConnection({
  host: '172.17.0.1',
  user: 'root',
  password: 'senha@123',
  database: 'fornecedoresdb',
});

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
      host: '172.17.0.1', // Use o nome do host do seu contêiner MySQL
      user:  process.env.MYSQL_USER, // Seu nome de usuário do MySQL
      password: process.env.MYSQL_PASSWORD,

    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`);
    console.log('Banco de dados criado com sucesso.');

    connection.close();
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  }
}

async function createTables() {
  try {
    const connection = await mysql.createConnection({
      host: '172.17.0.1', // Use o nome do host do seu contêiner MySQL
      user: process.env.MYSQL_USER, // Seu nome de usuário do MySQL
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    await connection.query(`
      CREATE TABLE IF NOT EXISTS fornecedores (
          id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
          NomeFornecedor VARCHAR(255),
          CnpjFornecedor VARCHAR(18),
          IEFornecedor VARCHAR(50),
          EnderecoFornecedor VARCHAR(255),
          CepFornecedor VARCHAR(10),
          NrEndFornecedor VARCHAR(10),
          PaisFornecedor VARCHAR(100),
          EstadoFornecedor VARCHAR(100),
          EmailFornecedor VARCHAR(255),
          txtTelFornecedor VARCHAR(20),
          txtOutrosFornecedor VARCHAR(255)
      );
    `);

    console.log('Tabela "fornecedores" criada com sucesso.');

    connection.close();
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
}

console.log('Tentando criar tabelas...');
console.log('Tentando conectar ao banco...');


// Chame as funções na ordem desejada
createDatabase()
  .then(() => createTables())
  .catch((error) => console.error('Erro geral:', error));