# Relatório de Vendas
Esta é uma solução simples, porém necessária para geração de relatório para os E-commerces da plataforma [iSet](https://www.iset.com.br/)

## API
Integração direta da API da iSet, sendo necessário obter a chave de acesso e usuário da plataforma e inserir no `.env`

A url de serviço e outros dados são obtidos no painel de administrador da iSet no menu lateral `Integrações` e `API & Webhooks`

```env
ISET_API_URL="SUA_URL_DE_SERVIÇO"
ISET_API_KEY="SUA_API_KEY"
ISET_USER="SEU_USUARIO"
```
