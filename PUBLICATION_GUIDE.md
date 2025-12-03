
# 📱 Guia de Publicação do ProFinder

## Passo a Passo para Publicar seu Aplicativo

### 1️⃣ Preparação

#### Contas Necessárias:
- **Apple Developer Account** (US$ 99/ano): https://developer.apple.com
- **Google Play Console** (US$ 25 taxa única): https://play.google.com/console
- **Conta Expo** (gratuita): https://expo.dev

### 2️⃣ Configuração Inicial

#### Instalar EAS CLI:
```bash
npm install -g eas-cli
```

#### Login no Expo:
```bash
eas login
```

#### Configurar o projeto:
```bash
eas build:configure
```

Este comando criará automaticamente um `eas.json` se você não tiver um.

### 3️⃣ Criar Build de Produção

#### Para iOS:
```bash
eas build --platform ios --profile production
```

#### Para Android:
```bash
eas build --platform android --profile production
```

#### Para ambos:
```bash
eas build --platform all --profile production
```

**Nota:** O primeiro build pode levar 20-30 minutos. Builds subsequentes são mais rápidos.

### 4️⃣ Testar o Build

Antes de enviar para as lojas, teste o build:

#### Build de Preview (iOS):
```bash
eas build --platform ios --profile preview
```

#### Build de Preview (Android):
```bash
eas build --platform android --profile preview
```

Você pode instalar esses builds em dispositivos físicos para testar.

### 5️⃣ Submeter para as Lojas

#### iOS - App Store:

1. **Preparar informações da App Store:**
   - Nome do app
   - Descrição (curta e longa)
   - Screenshots (vários tamanhos)
   - Ícone (1024x1024px)
   - Palavras-chave
   - Categoria
   - Informações de privacidade

2. **Submeter via EAS:**
```bash
eas submit --platform ios
```

3. **Ou manualmente:**
   - Baixe o arquivo .ipa do EAS Build
   - Use o Transporter app (macOS) ou Application Loader
   - Faça upload para App Store Connect
   - Preencha todas as informações necessárias
   - Envie para revisão

#### Android - Google Play:

1. **Preparar informações da Play Store:**
   - Nome do app
   - Descrição (curta e longa)
   - Screenshots (vários tamanhos)
   - Ícone (512x512px)
   - Banner (1024x500px)
   - Categoria
   - Política de privacidade URL
   - Informações de conteúdo

2. **Criar Service Account Key:**
   - Vá para Google Cloud Console
   - Crie um service account
   - Baixe o arquivo JSON

3. **Submeter via EAS:**
```bash
eas submit --platform android
```

4. **Ou manualmente:**
   - Baixe o arquivo .aab ou .apk do EAS Build
   - Faça upload no Google Play Console
   - Preencha todas as informações necessárias
   - Envie para revisão

### 6️⃣ Informações Importantes para ProFinder

#### Recursos que precisam de permissões especiais:

**iOS:**
- Verificação de usuários (pode precisar de documentação)
- Pagamentos in-app (configure Apple In-App Purchases)
- Dados pessoais (declare no Privacy Policy)

**Android:**
- Verificação de usuários
- Pagamentos (configure Google Play Billing)
- Dados pessoais (declare no Privacy Policy)

#### Política de Privacidade:
Você PRECISA ter uma política de privacidade hospedada online. Ela deve cobrir:
- Quais dados você coleta
- Como você usa os dados
- Como você protege os dados
- Direitos do usuário (GDPR, LGPD)
- Informações de contato

### 7️⃣ Checklist Antes de Publicar

- [ ] Testado em dispositivos iOS reais
- [ ] Testado em dispositivos Android reais
- [ ] Todos os recursos funcionando
- [ ] Sem dados de teste/mock
- [ ] Ícone e splash screen corretos
- [ ] Política de privacidade publicada
- [ ] Termos de serviço publicados
- [ ] Screenshots preparados (vários tamanhos)
- [ ] Descrições escritas (PT, EN, FR, DE, IT)
- [ ] Sistema de pagamento configurado (Stripe/outro)
- [ ] Sistema de verificação de usuários implementado
- [ ] Backup e recuperação de dados testados

### 8️⃣ Atualizações Futuras

#### Over-The-Air (OTA) Updates com EAS Update:
Para atualizações de JavaScript/assets sem novo build:

```bash
eas update --branch production --message "Descrição da atualização"
```

#### Novos Builds:
Para mudanças nativas ou versões maiores:
1. Aumente a versão em `app.json`
2. Crie novo build
3. Submeta para as lojas

### 9️⃣ Monitoramento

Após publicar:
- Configure analytics (Firebase, Amplitude, etc.)
- Configure crash reporting (Sentry)
- Monitore reviews nas lojas
- Responda feedback dos usuários

### 🔟 Custos Estimados

**Desenvolvimento:**
- Apple Developer: US$ 99/ano
- Google Play: US$ 25 (uma vez)
- EAS Build: Gratuito (com limites) ou US$ 29-99/mês

**Operacional:**
- Supabase: Gratuito até certo limite
- Hospedagem de imagens/assets: Variável
- Serviços de pagamento: % por transação

### 📞 Suporte

Se tiver problemas:
- Documentação Expo: https://docs.expo.dev
- Fórum Expo: https://forums.expo.dev
- Discord Expo: https://chat.expo.dev

### 🎯 Próximos Passos Recomendados

1. **Agora:** Configure EAS e faça um build de teste
2. **Esta semana:** Prepare todos os assets (ícones, screenshots)
3. **Próxima semana:** Escreva política de privacidade e termos
4. **Em 2 semanas:** Submeta para revisão nas lojas

**Tempo estimado até aprovação:**
- iOS: 1-3 dias (pode ser rejeitado e precisar reenviar)
- Android: 1-7 dias (geralmente mais rápido)

Boa sorte com a publicação do ProFinder! 🚀
