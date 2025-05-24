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
        if (this.findStageBtn) {
            this.findStageBtn.addEventListener('click', () => this.handleFindStage());
        }
        if (this.tryAgainBtn) {
            this.tryAgainBtn.addEventListener('click', () => this.handleTryAgain());
        }
        if (this.footLengthInput) {
            this.footLengthInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleFindStage();
                }
            });
            this.footLengthInput.addEventListener('input', () => {
                this.hideError();
            });
        }
        
        // Modal events
        if (this.howToMeasureLink) {
            this.howToMeasureLink.addEventListener('click', () => this.showMeasurementModal());
        }
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.hideMeasurementModal());
        }
        if (this.measurementModal) {
            this.measurementModal.addEventListener('click', (event) => {
                if (event.target === this.measurementModal) { // Click outside modal content
                    this.hideMeasurementModal();
                }
            });
        }
        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !this.measurementModal.classList.contains('hidden')) {
                this.hideMeasurementModal();
            }
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

        this.showLoading();
        
        // Simulate processing time for better UX
        await new Promise(resolve => setTimeout(resolve, 800)); // Slightly reduced for snappiness
        
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
        
        if (footLength < 8.9 || footLength > 24.8) {
            this.showError(
                'Hmm, that seems like a very tiny or very big foot for this ruler! ' +
                'Please check the measurement (8.9cm to 24.8cm) and try again.'
            );
            return false;
        }
        
        return true;
    }

    /**
     * Calculate giraffe stage based on foot length.
     * The conditions are ordered from highest stage (Adult) to lowest (Newborn).
     * This ensures that if a foot length falls on a boundary shared by two stages,
     * it is assigned to the "higher" (older/larger) stage, as per requirements.
     * For example, a footLength of 12.1 cm will be classified as Juvenile, not Newborn.
     */
    calculateGiraffeStage(footLength) {
        if (footLength >= 17.1 && footLength <= 24.8) {
            return GIRAFFE_STAGES.adult;
        } else if (footLength >= 15.6 && footLength <= 19.2) {
            return GIRAFFE_STAGES.subadult;
        } else if (footLength >= 12.1 && footLength <= 16.5) {
            return GIRAFFE_STAGES.juvenile;
        } else if (footLength >= 8.9 && footLength <= 12.1) {
            return GIRAFFE_STAGES.newborn;
        } else {
            // This case should ideally be caught by validateInput, but as a fallback:
            console.warn(`Foot length ${footLength}cm is outside predefined GIRAFFE_STAGES ranges after validation. Review ranges.`);
            this.showError('Could not determine a giraffe stage for this length. Please try a value between 8.9cm and 24.8cm.');
            throw new Error('Foot length outside explicitly mapped GIRAFFE_STAGES ranges.');
        }
    }

    /**
     * Display the results to the user
     */
    displayResults(giraffeStage) {
        this.stageTitle.textContent = `You're like a ${giraffeStage.name} Giraffe!`;
        this.ageRange.textContent = `Children around ${giraffeStage.childAgeRange} typically have this foot size`;
        this.stageName.textContent = giraffeStage.name;
        
        this.giraffeImage.src = giraffeStage.imageUrl;
        this.giraffeImage.alt = `${giraffeStage.name} Giraffe`;
        // Trigger giraffe image animation
        this.giraffeImage.classList.remove('giraffe-image-enter');
        void this.giraffeImage.offsetWidth; // Reflow to restart animation
        this.giraffeImage.classList.add('giraffe-image-enter');
        
        this.height.textContent = `${giraffeStage.height.metric} (${giraffeStage.height.imperial})`;
        this.weight.textContent = `${giraffeStage.weight.metric} (${giraffeStage.weight.imperial})`;
        
        this.displayFunFacts(giraffeStage.funFacts);
        this.showResultsSection();
    }

    /**
     * Display fun facts with styled formatting
     */
    displayFunFacts(funFacts) {
        this.funFacts.innerHTML = ''; // Clear previous facts
        funFacts.forEach(fact => {
            const factElement = document.createElement('div');
            factElement.className = 'bg-white p-3 rounded-lg border-l-4 border-sockomo-orange shadow-sm opacity-0'; // opacity-0 for animation
            factElement.innerHTML = `
                <p class="font-clean text-gray-700 leading-relaxed">
                    <span class="text-sockomo-orange text-lg">🌟</span> ${fact}
                </p>
            `;
            this.funFacts.appendChild(factElement);
        });
    }

    /**
     * Show results section with CSS animation
     */
    showResultsSection() {
        this.inputSection.style.display = 'none';
        this.outputSection.classList.remove('hidden');
        this.outputSection.classList.add('animate-fadeInUp');
        
        this.outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Handle "Try Again" button click
     */
    handleTryAgain() {
        this.footLengthInput.value = '';
        this.hideError();
        
        this.outputSection.classList.add('hidden');
        this.outputSection.classList.remove('animate-fadeInUp'); // Reset animation class
        this.giraffeImage.classList.remove('giraffe-image-enter'); // Reset image animation

        this.inputSection.style.display = 'block';
        this.inputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        setTimeout(() => {
            this.footLengthInput.focus();
        }, 300); // Reduced delay
    }

    /**
     * Show error message
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.errorMessage.style.animation = 'shake 0.4s ease-in-out'; // Slightly faster shake
        
        setTimeout(() => {
            this.errorMessage.style.animation = '';
        }, 400);
    }

    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.classList.add('hidden');
    }

    /**
     * Show loading spinner
     */
    showLoading() {
        this.loadingSpinner.classList.remove('hidden');
        this.loadingSpinner.classList.add('flex'); // Ensure it's flex for centering
    }

    /**
     * Hide loading spinner
     */
    hideLoading() {
        this.loadingSpinner.classList.add('hidden');
        this.loadingSpinner.classList.remove('flex');
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


