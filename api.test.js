const supertest = require('supertest');
const {app,server,connection} = require('./index'); // Importe seu aplicativo Express

describe('Teste GET /fornecedores', () => {
    it('deve responder com status 200', async () => {
        const response = await supertest(app).get('/fornecedores');
        expect(response.statusCode).toBe(200);
    });
});

// Feche o servidos após os testes serem feitos
afterAll(() => {
    server.close();
    connection.close();
});