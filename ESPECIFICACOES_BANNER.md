# 📸 Especificações das Imagens do Banner

## Dimensões Recomendadas

### Desktop (Telas grandes)
- **Largura:** 1920px
- **Altura:** 600px
- **Proporção:** 16:5 (3.2:1)
- **Formato:** JPG ou WebP
- **Tamanho máximo:** 500KB por imagem

### Tablet
- **Largura:** 1200px
- **Altura:** 400px
- **Proporção:** 3:1
- **Formato:** JPG ou WebP
- **Tamanho máximo:** 300KB por imagem

### Mobile
- **Largura:** 800px
- **Altura:** 400px
- **Proporção:** 2:1
- **Formato:** JPG ou WebP
- **Tamanho máximo:** 200KB por imagem

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

## Exemplo de Dimensões

```
Desktop:  1920 x 600px
Tablet:   1200 x 400px  
Mobile:   800 x 400px
```

## Ferramentas Recomendadas para Redimensionar

- **Online:** Canva, Photopea, TinyPNG
- **Desktop:** Photoshop, GIMP, ImageMagick
- **Comando:** `convert imagem.jpg -resize 1920x600^ -gravity center -extent 1920x600 banner.jpg`

