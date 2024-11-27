CREATE DATABASE fornecedoresdb;

USE fornecedoresdb;

CREATE TABLE fornecedores (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    NomeFornecedor VARCHAR(255),
    CnpjFornecedor VARCHAR(18), -- Formato CNPJ: 00.000.000/0000-00
    IEFornecedor VARCHAR(50), -- Tamanho ajustado para Inscrição Estadual
    EnderecoFornecedor VARCHAR(255),
    CepFornecedor VARCHAR(10), -- Formato CEP: 00000-000
    NrEndFornecedor VARCHAR(10), -- Tamanho ajustado para número
    PaisFornecedor VARCHAR(100),
    EstadoFornecedor VARCHAR(100),
    EmailFornecedor VARCHAR(255),
    TelFornecedor VARCHAR(20), -- Tamanho ajustado para número de telefone
    OutrosFornecedor VARCHAR(255)
);
