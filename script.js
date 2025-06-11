// Funcionalidades interativas para a landing page
document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header fixo com mudança de estilo ao rolar
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Validação do formulário
    const form = document.getElementById('form-contato');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validação de email
            const emailField = document.getElementById('email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            // Simulação de envio
            if (isValid) {
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                
                // Simulação de processamento
                setTimeout(() => {
                    form.reset();
                    submitButton.textContent = 'Enviado com sucesso!';
                    
                    // Restaurar botão após alguns segundos
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }, 3000);
                    
                    // Exibir mensagem de sucesso
                    alert('Obrigado pelo seu interesse! Entraremos em contato em breve com sua simulação personalizada.');
                }, 1500);
            }
        });
    }
    
    // Adicionar classe de erro ao perder foco em campo obrigatório vazio
    const requiredInputs = document.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
    
    // Animações ao rolar (opcional - pode ser implementado com bibliotecas como AOS)
    const animatedElements = document.querySelectorAll('.beneficio-card, .solucao-card, .processo-item, .valor-item');
    
    // Função simples para verificar se elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Adicionar classe para animar elementos quando visíveis
    function handleScrollAnimation() {
        animatedElements.forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('animated')) {
                el.classList.add('animated');
            }
        });
    }
    
    // Verificar elementos visíveis no carregamento e ao rolar
    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('load', handleScrollAnimation);
});
