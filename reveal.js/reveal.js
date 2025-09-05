// Simplified Reveal.js JavaScript functionality
class SimpleReveal {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.totalSlides = 0;
        this.init();
    }

    init() {
        // Get all slides
        this.slides = Array.from(document.querySelectorAll('.slides > section'));
        this.totalSlides = this.slides.length;
        
        // Hide all slides except the first one
        this.slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('present');
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });

        // Add navigation controls
        this.addControls();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
        
        // Add progress bar
        this.addProgressBar();
        
        // Update progress
        this.updateProgress();
    }

    addControls() {
        const controlsHTML = `
            <aside class="controls">
                <button class="navigate-left" onclick="reveal.previousSlide()">◀</button>
                <button class="navigate-right" onclick="reveal.nextSlide()">▶</button>
                <button class="navigate-up" onclick="reveal.previousSlide()">▲</button>
                <button class="navigate-down" onclick="reveal.nextSlide()">▼</button>
            </aside>
        `;
        document.body.insertAdjacentHTML('beforeend', controlsHTML);
    }

    addProgressBar() {
        const progressHTML = `
            <div class="progress">
                <span style="width: 0%"></span>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', progressHTML);
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ': // Spacebar
                    this.nextSlide();
                    break;
                case 'Home':
                    this.goToSlide(0);
                    break;
                case 'End':
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            // Hide current slide
            this.slides[this.currentSlide].classList.remove('present');
            this.slides[this.currentSlide].style.display = 'none';
            
            // Show new slide
            this.currentSlide = index;
            this.slides[this.currentSlide].classList.add('present');
            this.slides[this.currentSlide].style.display = 'block';
            
            // Update progress
            this.updateProgress();
        }
    }

    updateProgress() {
        const progress = (this.currentSlide / (this.totalSlides - 1)) * 100;
        const progressBar = document.querySelector('.progress span');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.reveal = new SimpleReveal();
});