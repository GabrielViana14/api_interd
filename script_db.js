const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost', // Use o nome do host do seu contêiner MySQL
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
      	host: 'localhost', // Use o nome do host do seu contêiner MySQL
  	user:  process.env.MYSQL_USER, // Seu nome de usuário do MySQL
  	password: process.env.MYSQL_PASSWORD,
  	database: process.env.MYSQL_DATABASE 
    });

  
     await connection.query(`
       CREATE TABLE IF NOT EXISTS users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
           email VARCHAR(255) NOT NULL
       )
     `);

    console.log('Tabelas criadas com sucesso.');

    connection.close();
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
}



// Chame as funções na ordem desejada
createDatabase()
  .then(() => createTables())
  .catch((error) => console.error('Erro geral:', error));