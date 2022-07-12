# Boas vindas ao repositório do Chat API

  API de comunicação entre usuários em tempo real! Chat API foi desenvolvida em Node.js com express, Typescript, POO, socket.io para implementar a emissão e escuta de eventos entre usuários, e JWT para autenticação. O projeto conta também com alguns endpoints e com integração com um banco de dados não relacional - MongoDB. A arquitetura da aplicação foi feita em camadas utilizando o padrão MSC: model, service e controller.
  
  Como as informações dos usuários são salvas no banco de dados, neste projeto, foi utilizada a biblioteca de criptografia <a href="https://www.npmjs.com/package/md5/v/2.3.0">MD5</a> que criptografa a senha antes de ser armazenada no banco de dados.
  
  O deploy da API foi feito através do Heroku utilizando Docker. E sua versão em produção pode ser acessada por este <a href="https://socket-chatapi.herokuapp.com/">Link</a>
  
## Endpoints usados

   - <strong>Registro</strong>:
      - Método: `POST`,
      - Rota: `/users`
      - Resposta:
      
        ![register](https://user-images.githubusercontent.com/82843746/178498686-a553901d-53fd-4184-b18d-ba0cdeae6439.png)
    
   
   - <strong>Login</strong>:
      - Método: `POST`,
      - Rota: `/users/login`
      - Resposta:
      
        ![login_response](https://user-images.githubusercontent.com/82843746/178500072-d55bda6e-2fce-4d7c-9a75-6d1397de9010.png)
        
   - <strong>Nova Mensagem</strong>:
      - Método: `POST`,
      - Rota: `/messages`,
      - Resposta:
        
        ![new_message](https://user-images.githubusercontent.com/82843746/178502218-6b906df1-ddb7-448c-b9c9-44892d52ed5e.png)
   
   - <strong>Mensagens por Sala</strong>:
      - Método: `GET`,
      - Rota: `/messages/:roomId`,
      - Resposta:
      
        ![messages_room](https://user-images.githubusercontent.com/82843746/178504148-ef9d5a6e-373a-43b1-82b4-752cf05b7cb9.png)
        
   
   - <strong>Salas</strong>:
      - Método: `GET`,
      - Rota: `/rooms`,
      - Resposta:
      
        ![rooms](https://user-images.githubusercontent.com/82843746/178499165-c92d69fb-528d-4caa-9fea-91b954690c14.png)
        

   
  
## Tecnologias Usadas
  - Node.js
  - Express
  - Typescript
  - socket.io
  - MongoDB
  - Mongoose
  
## Rodando localmente
  ### Observação:
   <p>Para fazer conexão com o banco de dados, você precisa ter o <a href="https://www.mongodb.com/docs/manual/installation/">MongoDB</a> instalado na sua máquina</p>

  ### Instruções:
  - Faça o clone do repositório.
  - Utilize o comando `yarn` para instalar as dependências do projeto.
  - Troque o nome do arquivo ".env.example" para ".env".
  - Rode o comando `yarn start` para iniciar a aplicação.
