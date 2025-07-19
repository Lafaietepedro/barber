# BarberElite - Barbearia Website

Um website completo e moderno para barbearia desenvolvido com Next.js e Tailwind CSS.

## 🚀 Características

- **Design Responsivo**: Adaptável a todos os dispositivos
- **Interface Moderna**: Design elegante e profissional
- **Acessibilidade**: Implementação de recursos de acessibilidade
- **Agendamento Online**: Sistema de agendamento integrado
- **Dashboard Gerencial**: Painel administrativo com estatísticas
- **Agendamento por Voz**: Funcionalidade de agendamento via comando de voz
- **Galeria de Trabalhos**: Exibição dos serviços realizados
- **Equipe**: Apresentação dos profissionais
- **Contato**: Formulário de contato e informações

## 🛠️ Tecnologias Utilizadas

- **Next.js 14**: Framework React para produção
- **Tailwind CSS**: Framework CSS utilitário
- **JavaScript**: Linguagem de programação
- **React Hooks**: Gerenciamento de estado
- **SVG**: Ícones e gráficos vetoriais
- **CSS Animations**: Animações suaves

## 📁 Estrutura do Projeto

```
barber/
├── src/
│   ├── app/
│   │   ├── layout.js          # Layout principal
│   │   └── page.js            # Página inicial
│   ├── components/
│   │   ├── Header.js          # Cabeçalho com navegação
│   │   ├── Hero.js            # Seção principal
│   │   ├── Services.js        # Serviços oferecidos
│   │   ├── Gallery.js         # Galeria de trabalhos
│   │   ├── Team.js            # Equipe de profissionais
│   │   ├── Booking.js         # Sistema de agendamento
│   │   ├── Dashboard.js       # Painel administrativo
│   │   ├── Contact.js         # Formulário de contato
│   │   ├── Footer.js          # Rodapé
│   │   ├── VoiceModal.js      # Modal de agendamento por voz
│   │   ├── ConfirmationModal.js # Modal de confirmação
│   │   ├── BackToTop.js       # Botão voltar ao topo
│   │   └── Logo3D.js          # Logo 3D
│   └── styles/
│       ├── globals.css        # Estilos globais
│       └── animations.css     # Animações personalizadas
├── public/                    # Arquivos estáticos
├── package.json              # Dependências do projeto
├── tailwind.config.js        # Configuração do Tailwind
└── README.md                 # Documentação
```

## 🎨 Design System

### Cores
- **Primary**: `#1a1a1a` (Preto)
- **Secondary**: `#c8a97e` (Dourado)
- **Dark**: `#000000` (Preto escuro)

### Tipografia
- **Font Family**: Serif para títulos, Sans para texto
- **Responsive**: Escalável em diferentes dispositivos

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd barber
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Funcionalidades

### 🏠 Página Inicial
- Header com navegação responsiva
- Seção Hero com chamada para ação
- Apresentação dos serviços
- Galeria de trabalhos
- Equipe de profissionais
- Sistema de agendamento
- Dashboard gerencial
- Formulário de contato

### 📅 Sistema de Agendamento
- Formulário completo de agendamento
- Seleção de serviços e horários
- Confirmação via modal
- Agendamento por comando de voz

### 📊 Dashboard Gerencial
- Estatísticas em tempo real
- Gráficos de agendamentos
- Lista de agendamentos recentes
- Ações rápidas para gestão

### 🎤 Agendamento por Voz
- Interface intuitiva
- Reconhecimento de voz simulado
- Processamento de comandos
- Confirmação automática

### ♿ Acessibilidade
- Navegação por teclado
- Alto contraste
- Tamanho de fonte ajustável
- Foco visível
- Labels semânticos

## 🎯 Seções do Website

### 1. Header
- Logo da barbearia
- Menu de navegação
- Botão de agendamento por voz
- Recursos de acessibilidade

### 2. Hero
- Título principal
- Descrição dos serviços
- Botões de call-to-action
- Design impactante

### 3. Serviços
- Cards dos serviços oferecidos
- Preços e descrições
- Botões de agendamento
- Animações suaves

### 4. Galeria
- Grid de trabalhos realizados
- Efeitos hover
- Modal de visualização
- Filtros por categoria

### 5. Equipe
- Perfis dos profissionais
- Especialidades
- Redes sociais
- Experiência

### 6. Agendamento
- Formulário completo
- Validação de campos
- Seleção de horários
- Confirmação

### 7. Dashboard
- Métricas importantes
- Gráficos interativos
- Agendamentos recentes
- Ações rápidas

### 8. Contato
- Informações de contato
- Formulário de mensagem
- Redes sociais
- Localização

### 9. Footer
- Links importantes
- Informações da empresa
- Políticas
- Copyright

## 🔧 Configurações

### Tailwind CSS
O projeto utiliza Tailwind CSS com configurações personalizadas:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'barber-primary': 'var(--barber-primary)',
        'barber-secondary': 'var(--barber-secondary)',
        'barber-dark': 'var(--barber-dark)',
      },
    },
  },
  plugins: [],
};
```

### Variáveis CSS
```css
:root {
  --barber-primary: #1a1a1a;
  --barber-secondary: #c8a97e;
  --barber-dark: #000000;
}
```

## 📱 Responsividade

O website é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Acessibilidade

- **Navegação por teclado**: Todos os elementos são navegáveis
- **Alto contraste**: Modo de alto contraste disponível
- **Tamanho de fonte**: Ajustável via localStorage
- **Foco visível**: Indicadores de foco claros
- **Labels semânticos**: Descrições adequadas

## 🎨 Animações

- **Fade In**: Elementos aparecem suavemente
- **Hover Effects**: Interações visuais
- **Smooth Scrolling**: Navegação suave
- **Loading States**: Estados de carregamento

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Netlify
1. Build: `npm run build`
2. Publish directory: `out`
3. Deploy

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- Email: contato@barberelite.com.br
- Telefone: (11) 99999-9999

---

**BarberElite** - Transformando seu visual com estilo e precisão.
