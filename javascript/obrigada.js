document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.glass-card');
    
    document.addEventListener('mousemove', (e) => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const angleX = (mouseY - cardY) / 30;
        const angleY = (mouseX - cardX) / -30;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    // Reset transform when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
    
    // Add click handler for the back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // You can customize this to navigate to your home page
            console.log('Navigate to home page');
        });
    }
});