# Use uma imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia os arquivos necessários para a imagem
COPY package*.json ./
COPY script_db.js ./
COPY . .

# Instala as dependências
RUN npm install

# Define o comando para inicializar o serviço
CMD ["npm", "start"]
