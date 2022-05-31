# Contract-Graphql

<p id="sobre" align="center">

  ![](https://img.shields.io/badge/license-MIT-green)
  ![](https://img.shields.io/badge/language-Typescript-blue)
  ![](https://img.shields.io/badge/language-Nodejs-orange)
  

> A ideia deste projeto é mostrar como usar o pact broker (criação, publicação e validação de um contrato) tendo um **consumer** 
  e um **provider** que interagem através do GraphQL
  
Para Saber mais sobre teste de contrato, recomendo ler:<br>
- https://docs.pact.io/ <br>
- https://martinfowler.com/articles/consumerDrivenContracts.html


## Dependências

- Nodejs
- Docker Compose

## Executando o Pact Broker

```
docker-compose up -d
```
    
> Acesse o pact broker em: http://localhost:9292. <br>
As credenciais estão no .env <br>

  
## Executando o backend
  
  
Instalando as dependências e iniciando o backend

```
make back_post
```
  
> O playground do GraphiQl estará disponível em http://localhost:4000

## Executando o frontend
  
  
Instalando as dependências e iniciando o frontend

```
make post_ui
```
> Acesse o Front em: http://localhost:3000.

## Criação, Publicação e Validação de um Contrato

```
make run_contract_test_consumer
```

> O contrato será gerado em: **./contract-graphql/post-ui/pact/pacts**

```
make run_contract_publish
```

> O contrato gerado será publicado no pact broker em: http://localhost:9292

```
make run_contract_verify
```

> O contrato será validado entre o frontend e o backend. **P.S.: É necessário ter o backend rodando.**
