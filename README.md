# pw-case-nstech
Case técnico para testes WEB e API - nstech

**Stack Utilizada**

| Framework | Linguagem | Camadas | Reports | CI/CD (Bônus)
| :---: | :---: | :---: | :---: |:---: |
| Playwright | Typescript | Frontend e Backend | [Nativo do Playwright acessível via Github Pages](https://malvesalmeida.github.io/pw-case-nstech/)|GitHub Actions

----------------------------------------------------------------------------------------------

**WEB FRONTEND**

**Cenário 1:** Logar na aplicação com dados válidos 
  - Acessar a URL da aplicação
  - Inserir usuário e senha válidos
  - Validar que foi redirecionado para a listagem de produtos (isso valida o login, pois apenas usuários logados têm acesso à lista)

**Cenário 2:** Visualizar detalhes do produto e voltar para a lista de produtos
  - Acessar a URL da aplicação
  - Inserir usuário e senha válidos
  - Clicar sobre o primeiro produto da lista para ver detalhes e voltar para a lista inicial
  - Validar que o usuário está de volta na lista de produtos 

**Cenário 3:** Adicionar e remover item do carrinho
  - Acessar a URL da aplicação
  - Inserir usuário e senha válidos
  - Clicar sobre o primeiro produto da lista
  - Adicionar o produto ao carrinho e em seguida remover
  - Validar que o produto foi removido do carrinho

**Cenário 4:** Realizar um fluxo completo de compra e fazer logout na aplicação
  - Acessar a URL da aplicação
  - Inserir usuário e senha válidos
  - Clicar sobre o primeiro produto da lista
  - Adicionar o produto ao carrinho
  - Inserir os dados necessários para cadastro e finalização da compra
  - Realizar o pagamento
  - Validar que a compra foi concluída e o item "removido" do carrinho

**Cenário 5:** Login com dados inválidos 
  - Acessar a URL da aplicação
  - Inserir usuário
  - Inserir uma senha inválida
  - Validar a mensagem de erro ao negar o login

------------------------------------------------------------------------------------

**API BACKEND**

**Cenário 1:** Consultar DDD 31 e validar status code e estado do Brasil correspondente ao DDD

**Cenário 2:** Provocar status code 400 - formato do DDD - Inserir um DDD diferente de 2 dígitos 

**Cenário 3:** Provocar status code 404 - DDD não encontrado - Inserir um DDD que não existe 

**Cenário 4:** Consultar feriados nacionais em 2026 - Inserir o ano 2026 na requisição

**Cenário 5:** Provocar status code 404 - Inserir uma ano fora do intervalo válido (1900-2199)

------------------------------------------------------------------------------------------------
**TÉCNICAS DE TESTES UTILIZADAS**

**Foram mescladas as técnicas:** Partição de equivalência; Transição de estados e Análise de valor limite.

-------------------------------------------------------------------------------------

**AUTOMAÇÃO DOS CENÁRIOS**

**A escolha do Playwright foi baseada em critérios técnicos como:**

- Suporte nativo a múltiplos browsers
- Testes de API integrados
- Execução paralela nativa
- Geração de evidências automática
- Facilidade de integração com CI/CD
------------------------------------------------------------------------------------
**Estratégia de automação**

O projeto foi estruturado com foco em:

*Separação de responsabilidades*
- Page Object Model (POM) para UI
- Helpers para API
- Configuração centralizada
  
*Reutilização de código*
- Login centralizado
- API client com base URL
- Credenciais isoladas
  
*Escalabilidade*
- Estrutura preparada para novos cenários
- Fácil manutenção de seletores
- Possibilidade de múltiplos ambientes

-------------------------------------------------------------------------------------------------------------------

**COMO EXECUTAR O PROJETO LOCALMENTE**

> git clone <url-do-repo> - clona o repositório

> npm install - instala as dependências necessárias (inclusive o Playwright) de acordo com as configurações disponíveis nos arquivos package.json e package.lock.json

> npx playwright install - instala os browsers no Playwright

> npx playwright test - executa todos os testes em modo headless (sem abrir interface ou navegador)

> npx playwright test --headed – executa todos os testes abrindo o navegador

> npx playwright test --ui – abre uma interface do Playwright e permite executar todos ou um a um

> npx playwright test tests/e2e/meuTeste.spec.ts - executa um teste específico

> npx playwright test --debug – executa os testes em modo debug

> npx playwright show-report - abre o relatório da execução em html

> npx playwright show-trace trace.zip - abre o trace (debug avançado)
-------------------------------------------------------------------------------------------------------------------------------

**EXECUÇÃO ONLINE (CI)**

Os testes são executados automaticamente via pipeline no GitHub Actions.

([ACESSE O RELATÓRIO AQUI](https://malvesalmeida.github.io/pw-case-nstech/))

O relatório contém:

- Status dos testes
- Screenshots
- Vídeos
----------------------------------------------------------------------------------------------------------
**PRÓXIMOS PASSOS (melhorias possíveis)**
- Execução em múltiplos browsers
- Uso de variáveis de ambiente (.env)
- Testes parametrizados
- Integração com ferramentas de relatório (ex: Allure) - caso o html nativo não atenda 
- Execução paralela otimizada
- Evolução e padronização dos Page Objects (POM)
- Adoção de Cucumber/BDD, caso seja viável para a equipe e o produto

----------------------------------------------------------------------------------------------------------
**CONSIDERAÇÕES FINAIS**

O pipeline foi estruturado para ser executado automaticamente após o deploy da aplicação.
Ele permite validar a aplicação em diferentes ambientes apenas ajustando a URL de execução.
Assim, é possível garantir a qualidade da aplicação após cada nova versão.
