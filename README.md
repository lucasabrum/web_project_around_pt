# Tripleten web_project_around_pt

# Around the U.S. (EUA Afora)

Rede social de fotos desenvolvida durante o curso de Desenvolvedor Web da TripleTen. O projeto evoluiu ao longo de várias sprints: começou com HTML/CSS estático, passou para POO com classes JavaScript, e agora está totalmente integrado a uma API REST — os dados de perfil e cartões são carregados, salvos e sincronizados em tempo real com o servidor.

## Funcionalidades

- Carregamento do perfil (nome, "sobre" e avatar) e dos cartões diretamente do servidor
- Edição do nome e "sobre" do perfil
- Troca da foto de perfil (avatar) via link de imagem
- Criação de novos cartões (nome + link da imagem)
- Curtir/descurtir cartões, com o coração refletindo o estado salvo no servidor
- Exclusão de cartões, com pop-up de confirmação — só o dono de um cartão pode excluí-lo
- Validação de formulários em tempo real
- Feedback visual de carregamento ("Salvando...", "Excluindo...") durante as requisições

## Tecnologias

- HTML5 semântico
- CSS3 (Flexbox, Grid, media queries para responsividade)
- JavaScript (ES6+), com Programação Orientada a Objetos
- Fetch API para comunicação com o servidor (GET, POST, PATCH, PUT, DELETE)
- Design de referência feito no Figma

## Estrutura do projeto

```
scripts/
  Api.js                    # Toda a comunicação com o servidor
  Card.js                   # Card de cada foto (curtir, excluir, abrir imagem)
  Section.js                # Renderização da lista de cartões
  UserInfo.js               # Leitura/atualização dos dados do perfil na tela
  Popup.js                  # Classe base de pop-up (abrir/fechar)
  PopupWithForm.js          # Pop-up com formulário (editar perfil, novo cartão, avatar)
  PopupWithImage.js         # Pop-up de imagem ampliada
  PopupWithConfirmation.js  # Pop-up de confirmação de exclusão
  FormValidator.js          # Validação de formulários
  index.js                  # Ponto de entrada: conecta tudo
```

## Como rodar

1. Clone o repositório
2. Gere seu token pessoal em: https://around-api.pt-br.tripleten-services.com/v1/users/create
3. Insira o token em `scripts/Api.js`, na propriedade `authorization`
4. Abra o `index.html` em um servidor local (ex: extensão Live Server do VS Code)

## Link do projeto

https://github.com/lucasabrum/web_project_around_pt.git

