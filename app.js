/**
 * Sockomo Giraffe Growth Stage Interactive Application
 * Handles user input, data processing, and dynamic content display
 */

class SockomoGiraffeApp {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        // Input elements
        this.footLengthInput = document.getElementById('footLength');
        this.findStageBtn = document.getElementById('findStageBtn');
        this.errorMessage = document.getElementById('errorMessage');
        this.inputSection = document.getElementById('inputSection');
        
        // Output elements
        this.outputSection = document.getElementById('outputSection');
        this.stageTitle = document.getElementById('stageTitle');
        this.ageRange = document.getElementById('ageRange');
        this.stageName = document.getElementById('stageName');
        this.giraffeImage = document.getElementById('giraffeImage');
        this.height = document.getElementById('height');
        this.weight = document.getElementById('weight');
        this.funFacts = document.getElementById('funFacts');
        this.tryAgainBtn = document.getElementById('tryAgainBtn');
        
        // Loading elements
        this.loadingSpinner = document.getElementById('loadingSpinner');
   // Modal elements for "How to measure?"
        this.howToMeasureLink = document.getElementById('howToMeasureLink');
        this.measurementModal = document.getElementById('measurementModal');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        this.modalContent = this.measurementModal ? this.measurementModal.querySelector('.modal-content') : null;
    
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.findStageBtn.addEventListener('click', () => this.handleFindStage());
        this.tryAgainBtn.addEventListener('click', () => this.handleTryAgain());
        this.footLengthInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleFindStage();
            }
        });
        if (this.howToMeasureLink) {
            this.howToMeasureLink.addEventListener('click', () => this.showMeasurementModal());
        }
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.hideMeasurementModal());
        }
        if (this.measurementModal) {
            this.measurementModal.addEventListener('click', (event) => {
                if (event.target === this.measurementModal) {
                this.hideMeasurementModal();
                }
            });
        }
        document.addEventListener('keydown', (event) => {
             if (event.key === 'Escape' && !this.measurementModal.classList.contains('hidden')) {
                 this.hideMeasurementModal();
             }
        });

        // Clear error message when user starts typing
        this.footLengthInput.addEventListener('input', () => {
            this.hideError();
        });
    }

    /**
     * Handle the "Find My Giraffe Stage" button click
     */
    async handleFindStage() {
        const footLength = this.getFootLength();
        
        if (!this.validateInput(footLength)) {
            return;
        }

        // Button click animation
        this.findStageBtn.classList.add('animate-click-bounce');
        setTimeout(() => {
            this.findStageBtn.classList.remove('animate-click-bounce');
        }, 300); // Duration of clickBounceEffect animation

        this.showLoading();
        
        // Simulate processing time for better UX
        await new Promise(resolve => setTimeout(resolve, 800)); // Slightly shorter wait
        
        try {
            const giraffeStage = this.calculateGiraffeStage(footLength);
            this.displayResults(giraffeStage);
        } catch (error) {
            this.showError('Something went wrong. Please try again.');
            console.error('Error processing giraffe stage:', error);
        }
        
        this.hideLoading();
    }

    /**
     * Get foot length value from input
     */
    getFootLength() {
        const value = this.footLengthInput.value.trim();
        return value ? parseFloat(value) : null;
    }

    /**
     * Validate user input
     */
    validateInput(footLength) {
        this.hideError();
        
        if (footLength === null || footLength === undefined || isNaN(footLength)) {
            this.showError('Oops! Please enter a number for the foot length.');
            return false;
        }
        
        // Using precise boundaries from data.js
        if (footLength < 8.9 || footLength > 24.8) {
            this.showError(
                'Hmm, that seems like a very tiny or very big foot for this ruler! ' +
                'Please measure between 8.9 cm and 24.8 cm.'
            );
            return false;
        }
        
        return true;
    }

    /**
     * Calculate giraffe stage based on foot length
     * Uses the mapping logic from the consolidated data.
     * The order of conditions handles overlaps by prioritizing stages listed earlier.
     */
    calculateGiraffeStage(footLength) {
        if (footLength >= 17.1) {
        return GIRAFFE_STAGES.adult;
        } else if (footLength >= 15.6 && footLength <= 19.2) {
            return GIRAFFE_STAGES.subadult;
        } else if (footLength >= 12.1 && footLength <= 16.5) {
            return GIRAFFE_STAGES.juvenile;
        } else if (footLength >= 8.9 && footLength <= 12.1) {
            return GIRAFFE_STAGES.newborn;
        } else {
            // This case should ideally be caught by validateInput, but as a fallback:
            console.warn('Foot length passed validation but not caught by stage logic:', footLength);
            this.showError('Could not determine giraffe stage. Please try a valid measurement.');
            throw new Error('Foot length outside expected range after validation.');
        }
    }

    /**
     * Display the results to the user
     */
    displayResults(giraffeStage) {
        // Update stage information
        this.stageTitle.textContent = `You're like a ${giraffeStage.name} Giraffe!`;
        this.ageRange.textContent = `Children around ${giraffeStage.childAgeRange} typically have this foot size`;
        this.stageName.textContent = giraffeStage.name;
        
        // Update giraffe image and trigger animation
        this.giraffeImage.src = giraffeStage.imageUrl;
        this.giraffeImage.alt = `${giraffeStage.name} Giraffe`;
        // Re-trigger animation if element is re-displayed
        this.giraffeImage.classList.remove('animate-giraffe-appear');
        void this.giraffeImage.offsetWidth; // Force reflow to restart animation
        this.giraffeImage.classList.add('animate-giraffe-appear');
        
        // Update characteristics
        this.height.textContent = `${giraffeStage.height.metric} (${giraffeStage.height.imperial})`;
        this.weight.textContent = `${giraffeStage.weight.metric} (${giraffeStage.weight.imperial})`;
        
        // Update fun facts
        this.displayFunFacts(giraffeStage.funFacts);
        
        // Show results with animation
        this.showResults();
    }

    /**
     * Display fun facts with styled formatting
     */
    displayFunFacts(funFacts) {
        this.funFacts.innerHTML = ''; // Clear previous facts
        
        funFacts.forEach(fact => {
            const factElement = document.createElement('div');
            // Tailwind classes ensure consistency with styles.css fadeInUp which applies to #funFacts > div
            factElement.className = 'bg-white p-3 rounded-lg border-l-4 border-sockomo-orange shadow-sm';
            factElement.innerHTML = `
                <p class="font-clean text-gray-700 leading-relaxed">
                    <span class="text-sockomo-orange font-bold">🌟</span> ${fact}
                </p>
            `;
            this.funFacts.appendChild(factElement);
        });
    }

    /**
     * Show results section with smooth transition
     */
    showResults() {
        this.inputSection.style.display = 'none';
        this.outputSection.classList.remove('hidden');
        this.outputSection.style.opacity = '0';
        this.outputSection.style.transform = 'translateY(20px)';
        
        // Smooth transition for the whole output section
        requestAnimationFrame(() => { // Ensures styles are applied before transition starts
            this.outputSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            this.outputSection.style.opacity = '1';
            this.outputSection.style.transform = 'translateY(0)';
        });
        
        // Scroll to results
        // Ensure scrolling happens after the element is fully visible and transition starts
        setTimeout(() => {
            this.outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); 
    }

    /**
     * Handle "Try Again" button click
     */
    handleTryAgain() {
        // Reset input
        this.footLengthInput.value = '';
        this.hideError();
        
        // Show input section
        this.outputSection.classList.add('hidden');
        // Reset output section styles for next appearance
        this.outputSection.style.opacity = '0';
        this.outputSection.style.transform = 'translateY(20px)';
        
        this.inputSection.style.display = 'block';
        
        // Scroll to input section
        this.inputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus on input field
        setTimeout(() => {
            this.footLengthInput.focus();
        }, 500); // Delay to ensure scroll is complete
    }

    /**
     * Show error message
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
        // Use Tailwind animation class
        this.errorMessage.classList.remove('animate-shake-error');
        void this.errorMessage.offsetWidth; // Reflow
        this.errorMessage.classList.add('animate-shake-error');
    }

    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.classList.add('hidden');
        this.errorMessage.classList.remove('animate-shake-error');
    }

    /**
     * Show loading spinner
     */
    showLoading() {
        this.loadingSpinner.classList.remove('hidden');
    }

   /**
     * Hide loading spinner
     */
    hideLoading() {
        this.loadingSpinner.classList.add('hidden');
    }

    /**
     * Show measurement instruction modal
     */
    showMeasurementModal() {
        if (!this.measurementModal || !this.modalContent) return;
        this.measurementModal.classList.remove('hidden');
        this.measurementModal.classList.add('flex'); // Make modal visible
        // Trigger transition
        setTimeout(() => {
            this.measurementModal.style.opacity = '1';
            this.modalContent.style.opacity = '1';
            this.modalContent.style.transform = 'scale(1)';
        }, 10); // Short delay for transition
    }

    /**
     * Hide measurement instruction modal
     */
    hideMeasurementModal() {
        if (!this.measurementModal || !this.modalContent) return;
        this.measurementModal.style.opacity = '0';
        this.modalContent.style.opacity = '0';
        this.modalContent.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.measurementModal.classList.add('hidden');
            this.measurementModal.classList.remove('flex');
        }, 300); // Match CSS transition duration
    }
}
// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SockomoGiraffeApp();
});
