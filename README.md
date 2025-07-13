# 📅 Event Buddy

**Event Buddy** é um aplicativo mobile construído em **React Native com Expo** que permite a usuários autenticarem-se com Firebase, explorarem eventos, favoritar, participar e visualizar a localização dos eventos em um mapa ou abrir no Google Maps.

## 📌 Inspiração do Projeto

Este projeto nasceu como proposta do módulo final do curso de desenvolvimento mobile. O desafio era criar uma aplicação multiplataforma em **React Native** com **autenticação**, **persistência de dados em cloud (Firebase)** e **navegação multi-ecrã**, simulando uma solução real do mercado. A ideia era permitir que os utilizadores pudessem **explorar, guardar e participar de eventos**, com foco em usabilidade, organização de código e boas práticas de desenvolvimento.

## 🚀 Funcionalidades

- 🔐 **Autenticação com Firebase**
  - Cadastro, login e recuperação de senha.
  - Proteção de rotas com contexto de autenticação.

- 📋 **Listagem de eventos**
  - Exibição dos eventos cadastrados no Firestore.
  - Detalhes completos ao clicar em um evento.

- ❤️ **Favoritar eventos**
  - Usuário pode favoritar ou desfavoritar eventos.
  - Favoritos salvos na coleção do usuário.

- ✅ **Participar de eventos**
  - Usuário pode confirmar ou cancelar participação.
  - Lista de participantes salva nos dados do evento.

- 🗺️ **Mapa integrado**
  - Em dispositivos mobile, mapa interativo com `react-native-maps`.
  - Em navegadores, link para o Google Maps.

- 👤 **Perfil do usuário**
  - Visualização dos eventos favoritados e dos quais participa. Edição de dados pessoais e inclusão de URL da foto do perfil.

- 🧭 **Navegação com React Navigation**
  - Navegação por Stack e Bottom Tabs.

## 🛠️ Tecnologias e bibliotecas utilizadas

- **React Native + Expo**
- **Firebase** (`auth`, `firestore`)
- **React Navigation** (`@react-navigation/native`, `stack`, `bottom-tabs`)
- **Context API** para autenticação
- **React Native Maps** (native-only)
- **dotenv (.env)** para ocultar credenciais do Firebase
- **react-native-dotenv** para importar variáveis de ambiente
- **JavaScript** moderno (ES6+)

## 📸 Exemplos de Telas

### 📱 Telas APP

**Tela login do APP**

<img src="./assets/TelaLoginApp.png" width="300"/>

<img src="./assets/TelaLoginApp_ValidacaoEmail.png" width="300"/>

<img src="./assets/TelaLoginApp_ValidacaoSenha.png" width="300"/>

<img src="./assets/TelaRegistoApp.png" width="300"/>

<img src="./assets/TelaRegistoApp_ValidacaoEmail.png" width="300"/>

<img src="./assets/TelaRegistoApp_ValidacaoCampos.png" width="300"/>

<img src="./assets/TelaRegistoApp_SenhaInvalida.png" width="300"/>

<img src="./assets/TelaRegistoApp_DataInvalida.png" width="300"/>

<img src="./assets/TelaRecuperarApp.png" width="300"/>

<img src="./assets/TelaRecuperacaoApp_ValidacaoEmail.png" width="300"/>

<img src="./assets/TelaRecuperacaoApp_Sucesso.png" width="300"/>

<img src="./assets/TelaHomeApp.png" width="300"/>

<img src="./assets/TelaFavoritoApp.png" width="300"/>

<img src="./assets/TelaPerfilApp.png" width="300"/>

<img src="./assets/TelaPerfilApp_ValidacaoData.png" width="300"/>

<img src="./assets/TelaPerfilApp_Sucesso.png" width="300"/>

<img src="./assets/TelaEventosApp.png" width="300"/>

<img src="./assets/TelaDetalhesEventoApp.png" width="300"/>


### 💻 Telas Web

**Tela login Web**

<img src="./assets/TelaLoginWeb.png" width="300"/>

<img src="./assets/TelaLoginWeb_ValidacaoSenhaIncorreta.png" width="300"/>

<img src="./assets/TelaLoginWeb_ValidacaoEmailInexistente.png" width="300"/>

<img src="./assets/TelaLoginWeb_ValidacaoEmail.png" width="300"/>

<img src="./assets/TelaRegistoWeb.png" width="300"/>

<img src="./assets/TelaRecuperarWeb_ValidacaoEmail.png" width="300"/>

<img src="./assets/TelaRegistoWeb.png" width="300"/>

<img src="./assets/TelaHomeWeb.png" width="300"/>

<img src="./assets/TelaFavoritosWeb.png" width="300"/>

<img src="./assets/TelaPerfilWeb.png" width="300"/>

<img src="./assets/TelaPerfilWeb_Parte2.png" width="300"/>

<img src="./assets/TelaEventosWeb.png" width="300"/>

<img src="./assets/TelaDetalhesEventosWeb" width="300"/>


## 📁 Estrutura de pastas

```
├── styles.js
├── Readme.md
├── package.json
├── package-lock.json
├── index.js
├── firebaseConfig.js
├── babel.config.js
├── App.js
├── app.json
├── .gitignore
├── .env
├── /services
│   ├── firebaseAuth.js
├── /screens
│   ├── Signup.js
│   ├── Recovery.js
│   ├── Profile.js
│   ├── Login.js
│   ├── Home.js
│   ├── Favorites.js
│   ├── Events.js
│   ├── EventDetails.js
├── /node_modules
├── /navigators
│   ├── HomeStackNavigator.js
│   ├── MainTabsNavigator.js
├── /context
│   └── AuthContext.js
├── /components
│   ├── MapButton.js
│   ├── EventMap.web.js
│   ├── EventMap.native.js
│   ├── EventMap.js
│   ├── AssetExample.js
├── /assets
├── /.expo
```

## ⚙️ Configuração do ambiente

1. Clone este repositório:
   ```bash
   git clone https://github.com/SaraRZChagas/EventBuddy.git
   cd EventBuddy
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz e preencha com suas credenciais Firebase:
   ```env
   API_KEY=...
   AUTH_DOMAIN=...
   PROJECT_ID=...
   STORAGE_BUCKET=...
   MESSAGING_SENDER_ID=...
   APP_ID=...
   MEASUREMENT_ID=...
   ```

4. Rode o projeto:
   ```bash
   npx expo start
   ```

## 🔐 Segurança

- O arquivo `.env` está listado no `.gitignore` para proteger suas credenciais.
- As variáveis são acessadas via `@env`.

## 📌 Observações

- O mapa interativo (`react-native-maps`) funciona apenas em dispositivos mobile. No web, um link para o Google Maps é exibido.
- Projeto desenvolvido para fins educacionais com foco em autenticação e CRUD no Firebase.

## 🧑‍💻 Autora

Sara Chagas
[LinkedIn](https://www.linkedin.com/in/sarachagas/) • [GitHub](https://github.com/SaraRZChagas)