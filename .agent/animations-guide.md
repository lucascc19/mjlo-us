# 🎬 Animações Implementadas - Guia de Uso

## ✨ 5 Animações do Site nyousefali.com.br

### 1️⃣ **Scroll Suave (Lenis)**

**Status:** ✅ Implementado e Ativo

**O que faz:**

- Scroll super fluido e suave
- Efeito de inércia natural
- Navegação premium

**Como funciona:**

- Já está ativo automaticamente
- Não precisa fazer nada!

---

### 2️⃣ **Cursor Personalizado**

**Status:** ✅ Implementado e Ativo

**O que faz:**

- Círculo azul translúcido segue o mouse
- Ponto central ciano
- Mix-blend-mode para efeito de tela

**Como funciona:**

- Aparece automaticamente ao mover o mouse
- Desktop only (não aparece no mobile)

---

### 3️⃣ **Scroll Reveal**

**Status:** ✅ Componentes Criados

**Como usar:**

```tsx
import { Reveal, StaggerReveal, StaggerItem } from "@/components/reveal"

// Revelar elemento único
<Reveal delay={0.2} direction="up">
  <h1>Título que aparece ao scrollar</h1>
</Reveal>

// Revelar múltiplos elementos em sequência
<StaggerReveal staggerDelay={0.1}>
  <StaggerItem>
    <p>Primeiro parágrafo</p>
  </StaggerItem>
  <StaggerItem>
    <p>Segundo parágrafo</p>
  </StaggerItem>
  <StaggerItem>
    <p>Terceiro parágrafo</p>
  </StaggerItem>
</StaggerReveal>
```

**Opções:**

- `delay`: Atraso em segundos (padrão: 0)
- `direction`: "up", "down", "left", "right" (padrão: "up")
- `staggerDelay`: Delay entre cada item (padrão: 0.1s)

---

### 4️⃣ **Hover Glow**

**Status:** ✅ Implementado

**Como usar:**

```tsx
<div className="hover-glow rounded-2xl p-6 bg-card">
  <h3>Card com efeito de brilho</h3>
  <p>Passe o mouse para ver o efeito!</p>
</div>
```

**Efeitos:**

- Brilho azul ao redor do card
- Elevação suave (-4px)
- Sombra azul
- Transição de 0.5s

---

### 5️⃣ **Parallax Sutil**

**Status:** 🔄 Pode ser adicionado onde necessário

**Como adicionar:**

```tsx
import { motion, useScroll, useTransform } from "framer-motion"

function ParallaxElement() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return <motion.div style={{ y }}>Elemento com parallax</motion.div>
}
```

---

## 📦 **Pacotes Instalados:**

```json
{
  "@studio-freight/lenis": "^1.x", // Scroll suave
  "framer-motion": "^11.x" // Animações React
}
```

---

## 🎨 **Classes CSS Disponíveis:**

### `.hover-glow`

- Efeito de brilho azul ao hover
- Elevação e sombra
- Transição suave

**Exemplo:**

```tsx
<div className="hover-glow glass rounded-2xl p-8">Conteúdo do card</div>
```

---

## 🚀 **Onde Aplicar:**

### **Recomendações:**

1. **Hero Section:**

   ```tsx
   <Reveal direction="up">
     <h1>Nossa História de Amor</h1>
   </Reveal>
   ```

2. **Contador de Dias:**

   ```tsx
   <StaggerReveal>
     {timeCards.map((card) => (
       <StaggerItem key={card.id}>
         <div className="hover-glow">{card.content}</div>
       </StaggerItem>
     ))}
   </StaggerReveal>
   ```

3. **Timeline:**

   ```tsx
   {
     events.map((event, i) => (
       <Reveal key={event.id} delay={i * 0.1}>
         <div className="hover-glow">{event.content}</div>
       </Reveal>
     ))
   }
   ```

4. **Cards da Galeria:**
   ```tsx
   <div className="hover-glow polaroid">
     <Image src={photo.src} alt={photo.caption} />
   </div>
   ```

---

## ⚡ **Performance:**

- **Lenis:** Usa requestAnimationFrame (60fps)
- **Framer Motion:** Otimizado para GPU
- **Cursor:** CSS transform (hardware accelerated)
- **Hover Glow:** CSS transitions apenas

---

## 🎯 **Próximos Passos:**

Quer que eu aplique essas animações em seções específicas?

1. ✅ Adicionar `Reveal` nos títulos
2. ✅ Adicionar `hover-glow` nos cards
3. ✅ Adicionar `StaggerReveal` na timeline
4. ✅ Adicionar parallax nos doodles

**Diga qual seção quer animar primeiro!** 🚀
