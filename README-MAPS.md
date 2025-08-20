# Porto Guimarães Express - Mapa Interativo

## 🗺️ Implementação do Google Maps com Clusters

Este projeto inclui uma implementação avançada do Google Maps JavaScript API com clusters de marcadores para mostrar a abrangência das bases da Porto Guimarães Express em Minas Gerais.

### 📋 Funcionalidades Implementadas

- **Mapa Interativo**: Centralizado em Minas Gerais
- **8 Bases Mapeadas**: Todas as localizações estratégicas da empresa
- **Clusters Automáticos**: Agrupamento inteligente de marcadores próximos
- **InfoWindows**: Informações detalhadas de cada base ao clicar
- **Design Responsivo**: Adaptado para todos os dispositivos
- **Estilo Personalizado**: Cores da marca Porto Guimarães

### 🏢 Bases Mapeadas

1. **Governador Valadares** (Base Principal)
2. **Teófilo Otoni** (Nordeste MG)
3. **Ribeirão das Neves** (Grande BH)
4. **Contagem** (Hub RMBH)
5. **João Monlevade** (Vale do Aço)
6. **Ipatinga** (Região Leste)
7. **Sete Lagoas** (Central Norte)
8. **Santa Bárbara** (Região Central)

### 🔧 Configuração da API Key

Para ativar o mapa em produção, siga estes passos:

#### 1. Google Cloud Platform
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Maps JavaScript API**
4. Ative a **Marker Library** (se necessário)

#### 2. Gerar API Key
1. Vá para "APIs e Serviços" > "Credenciais"
2. Clique em "Criar Credenciais" > "Chave de API"
3. Copie a chave gerada

#### 3. Configurar Restrições
1. Clique na API Key criada
2. Em "Restrições da aplicação", selecione "Referenciadores HTTP"
3. Adicione os domínios autorizados:
   - `https://porto-guimaraes-site-ad1ffe589ecc.herokuapp.com/*`
   - `https://seudominio.com.br/*`
   - `localhost:*` (apenas para desenvolvimento)

#### 4. Aplicar a Chave
1. No arquivo `abrangencia.html`, linha final:
2. Substitua `YOUR_API_KEY` pela sua chave real:
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&callback=initMap&libraries=marker"></script>
```

### 📁 Arquivos Relacionados

- `abrangencia.html` - Página principal com mapa interativo
- `abrangencia-demo.html` - Versão demo sem API key
- `index.html` - Página inicial com link para abrangência
- `style.css` - Estilos personalizados

### 💰 Custos Estimados

O Google Maps oferece:
- **$200 de crédito mensal grátis**
- **28.000 visualizações de mapa gratuitas/mês**
- Custo adicional: ~$7 por 1.000 visualizações extras

Para um site corporativo, os custos são geralmente mínimos.

### 🚀 Deploy

Após configurar a API key:

1. Atualize o link no `index.html` de `abrangencia-demo.html` para `abrangencia.html`
2. Faça o commit das alterações
3. Deploy no Heroku

### 🔍 Desenvolvimento Local

Para testar localmente:
1. Use `abrangencia-demo.html` para visualizar o layout
2. Configure uma API key com restrição `localhost:*`
3. Teste o `abrangencia.html` com a chave

### 📞 Suporte

Para dúvidas sobre a implementação, consulte:
- [Documentação Google Maps](https://developers.google.com/maps/documentation/javascript)
- [Marker Clusterer](https://github.com/googlemaps/js-markerclusterer)
