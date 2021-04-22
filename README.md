# Api de Endereço
## Descrição do Projeto
<p align="center">API que expõe endpoints para CRUD de cidade e estado.</p>

<img src="https://img.shields.io/static/v1?label=API&message=Mikael&color=73459c1&style=for-the-badge&logo=ghost"/>

## - 

<p align="center">
 <a href="#Features">Features</a> •
 <a href="#Libs">Libs</a> • 
 <a href="#Licenca">Licença</a> •
 <a href="#Demo">Demo</a> 
</p>

# Pré-requisitos
### Ter configurado as seguintes tecnologias na máquina local:
- [Docker](https://www.docker.com/) 
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- Algum terminal (cmd)

# Subindo a API

### Partindo do princípio que o docker, node e git foi configurado na máquina execute o seguinte comando: 

```
docker volume create --name=mongo-endereco
```

### Isso irá criar um espaço para que seja utilizado pelo mongoDB.

### Em seguida, suba o mongo db apontado para esse local com o seguinte comando: 
```
docker run --name mongodbEndereco -v mongo-endereco:/data/db -d -p 27017:27017 mongo
```

### Após subir a imagem, entre no shell do mongo: 
```
docker exec -it mongodbEndereco bash
```

### e entre no mongo
```
mongo
```

### depois no banco de dados admin: 
```
use admin
```
### crie um usuário admin: 
```
db.createUser(
  {
    user: "mikael",
    pwd: "secretPass",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```
### crie um usuário para a aplicação, mas primeiro entre no banco endereco: 
```
use endereco
```
### agora sim, crie o usuário:
```
db.createUser(
  {
    user: "enderecouser",
    pwd:  "secretpass", // ou use o passwordPrompt()
    roles: [ { role: "readWrite", db: "endereco" } ]
  }
)
```
caso use o prompt, logo depois irá pedir para que informe a senha, faça, e então o usuário será criado de acordo com a senha fornecida! Tahdah! :D

### Saia do terminal do mongo
```
exit
```
### Saia do bash 
```
exit
```

## Clone este repositório
```
$ git clone <https://github.com/MikaelMedeiros/api-endereco.git>
```

## Acesse a pasta do projeto no terminal/cmd
```
$ cd api-endereco
```
## Instale as dependências
```
$ npm i
```

## Crie um .env na raiz do projeto com a conexão do MongoDB
◘`DB_CONNECTION=mongodb://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>`◘

`<usuario>: nome do usuário da aplicação que foi criado anteriormente, nesse caso 'enderecouser'`

`<senha>: senha digitada no prompt`

`<host>: provavelmente será 'localhost'`

`<porta>: o mongo por padrão utiliza a 27071`

`nome do banco: colocamos endereco, na hora do "use endereco"`

Ficaria assim:
```
DB_CONNECTION=mongodb://enderecouser:secretpass@localhost:27071/endereco
```

## Execute a aplicação
```
$ npm start
```

## O servidor inciará na porta:3000 - acesse <http://localhost:3000> 


# Libs 🛠

- dotenv: 8.2.0
- express: 4.17.1
- mongoose: 5.12.4
- nodemon: 2.0.7

# Features

- [x] Cadastro de Estados
- [x] Cadastro de Cidades
- [x] Validações de cadastro 
- [] Testes automatizados
- [] Documentação (openAPI)
- [] Cache
- [] Proteção da API por chave de api no header X-Api-Key

# Licenca
  MIT

# Demo
  Caso queira testar as requisições, pode acessar esse link, fiz um front-end em Angular 6.0.0:
  # [Endereco-demo](https://mikaelmedeiros.github.io/demo-endereco/)