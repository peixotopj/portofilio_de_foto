const categoryFileInput = document.getElementById('category-file-input');
let categoriaAtual = 'Paisagem';

// Alterna a cor/borda ao clicar em qualquer quadro (Etapa 5 da atividade)
function alternarDestaque(card) {
  const isSelected = card.style.backgroundColor === 'rgb(255, 99, 71)';
  card.style.backgroundColor = isSelected ? '#ddd' : 'rgb(255, 99, 71)';
  card.style.borderColor = isSelected ? 'transparent' : 'rgb(255, 99, 71)';
}

// 1. Ativa o clique nos cards e botões de Paisagem, Urbano e Retrato
document.querySelectorAll('.category-btn, .add-cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('image')) {
      alternarDestaque(btn);
    }
    categoriaAtual = btn.getAttribute('data-category');
    categoryFileInput.click();
  });
});

// 2. Cria um card de foto com etiqueta
function criarCardDeFoto(src, alt, categoria) {
  const card = document.createElement('div');
  card.className = 'image photo-card';

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;

  const badge = document.createElement('span');
  badge.className = 'photo-badge';
  badge.textContent = categoria;

  card.appendChild(img);
  card.appendChild(badge);

  // Clicar na foto adicionada destaca ela sem substituir nem abrir arquivos
  card.addEventListener('click', () => alternarDestaque(card));

  return card;
}

// 3. Envia a foto direto para a galeria da categoria escolhida (grid-Paisagem, grid-Urbano ou grid-Retrato)
if (categoryFileInput) {
  categoryFileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const gradeDestino = document.getElementById(`grid-${categoriaAtual}`);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const novoCard = criarCardDeFoto(event.target.result, file.name, categoriaAtual);
        if (gradeDestino) {
          gradeDestino.appendChild(novoCard);
        }
      };

      reader.readAsDataURL(file);
    });

    // Muda automaticamente para a aba Galeria para o usuário ver a foto na seção certa
    ativarAba('galeria');
    categoryFileInput.value = '';
  });
}

// 4. Controle das abas (Início, Galeria, Sobre, Contato)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function ativarAba(nomeAba) {
  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === nomeAba);
  });
  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === nomeAba);
  });
}

tabButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const targetTab = button.getAttribute('data-tab');
    ativarAba(targetTab);
  });
});

// 5. Feedback ao enviar o formulário da aba Contato
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formFeedback.textContent = 'Mensagem enviada com sucesso!';
    contactForm.reset();
  });
}
