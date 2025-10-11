

 function typeWriter(elemento) {
            const textoArray = elemento.innerHTML.split('');
            elemento.innerHTML = ''; // Limpa o texto original
            textoArray.forEach((letra, i) => {
                setTimeout(() => elemento.innerHTML += letra, 75 * i);
            });
        }

        // Seleciona o elemento e define o texto
        const p = document.querySelector('#texto-animado');
        p.innerHTML = 'Olá! Bem-vindo ao meu portfólio.';
        
        // Inicia o efeito
typeWriter(p);
        

