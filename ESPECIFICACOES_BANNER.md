# 📸 Especificações das Imagens do Banner

## Dimensões Recomendadas

### Desktop (Telas grandes - 769px+)
- **Largura:** 1920px (ou 1120px para o container máximo)
- **Altura:** 450px a 600px (altura mínima: 450px, máxima: 600px)
- **Proporção:** ~3.2:1 a 4:1
- **Formato:** JPG ou WebP
- **Tamanho máximo:** 500KB por imagem
- **Recomendado:** 1920x600px ou 1120x450px

### Tablet (481px - 768px)
- **Largura:** 1200px
- **Altura:** 350px (altura mínima configurada)
- **Proporção:** ~3.4:1
- **Formato:** JPG ou WebP
- **Tamanho máximo:** 300KB por imagem
- **Recomendado:** 1200x350px

### Mobile (até 480px)
- **Largura:** 800px
- **Altura:** 250px (altura mínima configurada)
- **Proporção:** 3.2:1
- **Formato:** JPG ou WebP
- **Tamanho máximo:** 200KB por imagem
- **Recomendado:** 800x250px

## Como Adicionar Suas Imagens

1. **Prepare as imagens** com as dimensões acima
2. **Faça upload** das imagens para um serviço de hospedagem (ex: Imgur, Cloudinary, ou seu próprio servidor)
3. **Copie as URLs** das imagens
4. **Edite o arquivo** `src/App.tsx`
5. **Localize a constante** `bannerImages` (linha ~963)
6. **Substitua as URLs** de exemplo pelas suas URLs:

```typescript
const bannerImages = [
  'https://sua-url.com/banner1.jpg',
  'https://sua-url.com/banner2.jpg',
  'https://sua-url.com/banner3.jpg',
]
```

## Dicas

- Use imagens de alta qualidade, mas otimizadas
- Mantenha o foco no centro da imagem (importante para mobile)
- Evite texto nas imagens (o texto pode ser cortado em diferentes tamanhos de tela)
- Use imagens relacionadas à barbearia/corte de cabelo
- O carrossel muda automaticamente a cada 5 segundos
- Os indicadores na parte inferior permitem navegação manual

## Exemplo de Dimensões (Atuais)

```
Desktop:  1920 x 600px (ou 1120 x 450px)
Tablet:   1200 x 350px  
Mobile:   800 x 250px
```

## Dimensões Configuradas no Código

- **Mobile (≤480px):** min-height: 250px
- **Tablet (481-768px):** min-height: 350px
- **Desktop (≥769px):** min-height: 450px, max-height: 600px
- **Largura:** Sempre 100% do container (responsivo)

## Ferramentas Recomendadas para Redimensionar

- **Online:** Canva, Photopea, TinyPNG
- **Desktop:** Photoshop, GIMP, ImageMagick
- **Comando:** `convert imagem.jpg -resize 1920x600^ -gravity center -extent 1920x600 banner.jpg`

