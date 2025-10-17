document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.getElementById("carousel");

  // Verifica se o elemento existe
  if (!scrollContainer) {
    console.error("Elemento #carousel não encontrado.");
    return;
  }

  // Clona os itens para criar o efeito de loop infinito
  const originalItems = Array.from(scrollContainer.children);
  originalItems.forEach(item => {
    scrollContainer.appendChild(item.cloneNode(true));
  });

  let speed = 0.8; // Velocidade do scroll em pixels por frame
  let isPaused = false; // Flag para controlar a pausa

  function autoScroll() {
    // Só executa o scroll se não estiver pausado
    if (!isPaused) {
      scrollContainer.scrollLeft += speed;

      // Reseta o scroll para o início ao chegar na metade
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    }

    // Continua a animação
    requestAnimationFrame(autoScroll);
  }

  // --- Melhorias de Experiência do Usuário ---

  // Pausa ao passar o mouse em cima (desktop)
  scrollContainer.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  // Retoma ao tirar o mouse (desktop)
  scrollContainer.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // Pausa ao tocar (mobile)
  scrollContainer.addEventListener("touchstart", () => {
    isPaused = true;
  }, { passive: true });

  // Retoma ao soltar o toque (mobile)
  scrollContainer.addEventListener("touchend", () => {
    isPaused = false;
  });

  // Inicia o scroll automático
  autoScroll();
});


// SCROLL-IMAGENS-PAGINA-DESIGN SOCIAL MEDIA

// Lista de 10 imagens (troque pelas suas URLs)
img.loading = 'lazy';
img.alt = obj.alt;
img.src = obj.url;


const meta = document.createElement('div');
meta.className = 'meta';
meta.innerHTML = `<span class="title">${obj.title}</span><span class="index">${index+1} / ${imageList.length}</span>`;


a.appendChild(img);
a.appendChild(meta);


// Abrir lightbox ao clicar
a.addEventListener('click', (e)=>{
e.preventDefault();
openLightbox(obj.url, obj.alt);
});


return a;{
}


// Injetar itens na galeria
imageList.forEach((imgObj, idx)=>{
const item = createItem(imgObj, idx);
gallery.appendChild(item);
});


// --- Smooth keyboard navigation (setas) ---
gallery.addEventListener('keydown', (e)=>{
const step = 250; // pixels para rolar por vez
if(e.key === 'ArrowDown'){
e.preventDefault();
gallery.scrollBy({top: step, left:0, behavior:'smooth'});
} else if(e.key === 'ArrowUp'){
e.preventDefault();
gallery.scrollBy({top: -step, left:0, behavior:'smooth'});
} else if(e.key === 'Home'){
gallery.scrollTo({top:0, behavior:'smooth'});
} else if(e.key === 'End'){
gallery.scrollTo({top: gallery.scrollHeight, behavior:'smooth'});
}
});


// --- Lightbox simples ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');


function openLightbox(src, alt){
lightboxImg.src = src;
lightboxImg.alt = alt;
lightbox.classList.add('show');
lightbox.setAttribute('aria-hidden', 'false');
// fechar com Esc
document.addEventListener('keydown', onKeyDownLightbox);
}


function closeLightbox(){
lightbox.classList.remove('show');
lightbox.setAttribute('aria-hidden', 'true');
lightboxImg.src = '';
document.removeEventListener('keydown', onKeyDownLightbox);
}


function onKeyDownLightbox(e){
if(e.key === 'Escape') closeLightbox();
}


lightbox.addEventListener('click', (e)=>{
if(e.target === lightbox || e.target === lightboxImg) closeLightbox();
});


// Acessibilidade: focar a galeria ao carregar para ativar navegação por teclado
window.addEventListener('load', ()=>{
gallery.focus();
});