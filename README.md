# Contract-Graphql

<p id="sobre" align="center">

  ![](https://img.shields.io/badge/license-MIT-green)
  ![](https://img.shields.io/badge/language-Typescript-blue)
  ![](https://img.shields.io/badge/language-Nodejs-orange)
  

> A ideia deste projeto é mostrar como usar o pact broker (criação, publicação e validação de um contrato) tendo um **consumer** 
  e um **provider** que interagem através do GraphQL
  
Para Saber mais sobre teste de contrato, recomendo ler/assistir:<br>
- [Pact docs](https://docs.pact.io/) <br>
- [Tio Martin Fowler](https://martinfowler.com/articles/consumerDrivenContracts.html) <br>
- [DevTests #38: Teste de contrato com Pact num contexto GraphQL](https://www.youtube.com/watch?v=KtCwZ5h8LZ8&t=3784s&ab_channel=DevTestsBR)


## Dependências

- Nodejs 16ˆ
- Docker
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
cd back-post
docker-compose up -d postgres
yarn prisma migrate dev --name init
yarn dev
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
make run_contract_generate
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
