# Desafio Técnico Redway Information Security

Desafio:

- Crie uma aplicação web que contenha apenas um formulário para coletar endereços de e-mail dos usuários.
- Escolha a linguagem de programação que preferir para implementar a aplicação.
- Containerize sua aplicação usando Docker e disponibilize o código-fonte e o Docker Compose em seu repositório no GitHub.
- Forneça instruções claras sobre como configurar e executar sua aplicação usando o Docker.

### Instruções para executar a aplicação:

---

##### Ambiente linux:

1. Baixe primeiro o docker na sua distribuição linux, veja no site https://docs.docker.com/desktop/install/linux-install/
2. Habilite o docker na sua máquina se necessário
3. Verifique se o docker e o docker-compose estão instalados na sua máquina
4. execute os seguintes comandos:

```
docker-compose build
docker-compose down
docker-compose up -d
```

Esses comandos irao fazer a build do nosso projeto, após isso ira derrubar(se tiver), containers do projeto, e apos isso ira contruir os containers novamente

5. Caso tudo ocorra bem você já terá o seu servidor rodando

##### Ambiente Windows:

---
