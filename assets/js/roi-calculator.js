/**
 * ROI Calculator for {ProductName} Water Recovery Systems
 * Calculates potential savings and payback period based on brewery inputs
 */

class ROICalculator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.results = {};
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error('ROI Calculator container not found');
            return;
        }
        
        this.render();
        this.bindEvents();
        this.loadDefaults();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="roi-calculator">
                <div class="calculator-header">
                    <h2>ROI Calculator</h2>
                    <p>Calculate your potential savings with {ProductName}</p>
                </div>
                
                <div class="calculator-content">
                    <div class="calculator-inputs">
                        <div class="input-section">
                            <h3>Brewery Information</h3>
                            
                            <div class="input-group">
                                <label for="brewery-size">Brewery Size</label>
                                <select id="brewery-size" name="brewery-size">
                                    <option value="micro">Microbrewery (< 15,000 bbls/year)</option>
                                    <option value="small">Small Brewery (15,000 - 60,000 bbls/year)</option>
                                    <option value="regional">Regional Brewery (60,000 - 200,000 bbls/year)</option>
                                    <option value="large">Large Brewery (> 200,000 bbls/year)</option>
                                </select>
                            </div>
                            
                            <div class="input-group">
                                <label for="production-days">Production Days per Year</label>
                                <input type="number" id="production-days" name="production-days" 
                                       min="200" max="365" value="250" step="1">
                                <span class="input-help">Typical range: 200-365 days</span>
                            </div>
                            
                            <div class="input-group">
                                <label for="current-water-usage">Current Water Usage (gallons/day)</label>
                                <input type="number" id="current-water-usage" name="current-water-usage" 
                                       min="500" max="50000" value="5000" step="100">
                                <span class="input-help">Include all brewery water usage</span>
                            </div>
                        </div>
                        
                        <div class="input-section">
                            <h3>Steam Generation</h3>
                            
                            <div class="input-group">
                                <label for="steam-usage">Average Steam Generation (lbs/day)</label>
                                <input type="number" id="steam-usage" name="steam-usage" 
                                       min="100" max="20000" value="2000" step="50">
                                <span class="input-help">Steam from brewing, fermentation, and cleaning</span>
                            </div>
                            
                            <div class="input-group">
                                <label for="steam-hours">Steam Generation Hours per Day</label>
                                <input type="number" id="steam-hours" name="steam-hours" 
                                       min="4" max="24" value="8" step="0.5">
                                <span class="input-help">Hours of active steam generation</span>
                            </div>
                        </div>
                        
                        <div class="input-section">
                            <h3>Utility Costs</h3>
                            
                            <div class="input-group">
                                <label for="water-cost">Water Cost ($/1,000 gallons)</label>
                                <input type="number" id="water-cost" name="water-cost" 
                                       min="2" max="20" value="8" step="0.25">
                                <span class="input-help">Include water and sewer charges</span>
                            </div>
                            
                            <div class="input-group">
                                <label for="energy-cost">Energy Cost ($/MMBtu)</label>
                                <input type="number" id="energy-cost" name="energy-cost" 
                                       min="5" max="25" value="12" step="0.50">
                                <span class="input-help">Natural gas or steam generation cost</span>
                            </div>
                            
                            <div class="input-group">
                                <label for="wastewater-cost">Wastewater Cost ($/1,000 gallons)</label>
                                <input type="number" id="wastewater-cost" name="wastewater-cost" 
                                       min="1" max="15" value="4" step="0.25">
                                <span class="input-help">Discharge fees and treatment costs</span>
                            </div>
                        </div>
                        
                        <div class="input-section">
                            <h3>System Configuration</h3>
                            
                            <div class="input-group">
                                <label for="recovery-rate">Expected Recovery Rate (%)</label>
                                <input type="range" id="recovery-rate" name="recovery-rate" 
                                       min="70" max="90" value="85" step="1">
                                <span class="range-value">85%</span>
                                <span class="input-help">Typical range: 70-90% based on system size</span>
                            </div>
                            
                            <div class="input-group">
                                <label for="system-cost">Estimated System Cost ($)</label>
                                <input type="number" id="system-cost" name="system-cost" 
                                       min="50000" max="500000" value="150000" step="5000" readonly>
                                <span class="input-help">Automatically calculated based on capacity</span>
                            </div>
                        </div>
                        
                        <div class="calculator-actions">
                            <button type="button" id="calculate-roi" class="btn btn-primary btn-large">
                                Calculate ROI
                            </button>
                            <button type="button" id="reset-calculator" class="btn btn-secondary">
                                Reset
                            </button>
                        </div>
                    </div>
                    
                    <div class="calculator-results" id="calculator-results">
                        <div class="results-placeholder">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                                <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
                            </svg>
                            <h3>Enter Your Information</h3>
                            <p>Fill in the form to calculate your potential ROI and savings with {ProductName}</p>
                        </div>
                    </div>
                </div>
                
                <div class="calculator-disclaimer">
                    <p><strong>Disclaimer:</strong> These calculations are estimates based on typical performance data. 
                    Actual results may vary based on specific brewery operations, local utility rates, and system configuration. 
                    Contact our team for a detailed site assessment and customized analysis.</p>
                </div>
            </div>
        `;
        `;
        `;
    }
    
    bindEvents() {
        // Input change events
        const inputs = this.container.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updateCalculations();
            });
            
            input.addEventListener('change', () => {
                this.updateCalculations();
            });
        });
        
        // Range slider display update
        const recoveryRate = this.container.querySelector('#recovery-rate');
        const rangeValue = this.container.querySelector('.range-value');
        
        recoveryRate.addEventListener('input', function() {
            rangeValue.textContent = this.value + '%';
        });
        
        // Button events
        const calculateButton = this.container.querySelector('#calculate-roi');
        const resetButton = this.container.querySelector('#reset-calculator');
        
        calculateButton.addEventListener('click', () => {
            this.calculateROI();
        });
        
        resetButton.addEventListener('click', () => {
            this.resetCalculator();
        });
        
        // Brewery size change updates system cost
        const brewerySize = this.container.querySelector('#brewery-size');
        brewerySize.addEventListener('change', () => {
            this.updateSystemCost();
        });
    }
    
    loadDefaults() {
        // Set default values based on typical brewery operations
        this.updateSystemCost();
        this.updateCalculations();
    }
    
    updateSystemCost() {
        const brewerySize = this.container.querySelector('#brewery-size').value;
        const systemCostInput = this.container.querySelector('#system-cost');
        
        // System cost estimates based on brewery size
        const systemCosts = {
            'micro': 75000,      // Small system for microbreweries
            'small': 150000,     // Medium system for small breweries
            'regional': 250000,  // Large system for regional breweries
            'large': 400000      // Industrial system for large breweries
        };
        
        systemCostInput.value = systemCosts[brewerySize] || 150000;
    }
    
    updateCalculations() {
        // Auto-update system cost when brewery size changes
        this.updateSystemCost();
        
        // Update steam usage based on water usage if not manually set
        const waterUsage = parseFloat(this.container.querySelector('#current-water-usage').value) || 0;
        const steamUsage = this.container.querySelector('#steam-usage');
        
        // Estimate steam usage as 20-40% of water usage (in equivalent weight)
        // 1 gallon water ≈ 8.34 lbs, steam generation typically 20-40% of water usage
        const estimatedSteam = Math.round((waterUsage * 8.34 * 0.3) / 10) * 10;
        
        if (!steamUsage.dataset.userModified) {
            steamUsage.value = Math.max(100, Math.min(20000, estimatedSteam));
        }
        
        // Mark as user modified when manually changed
        steamUsage.addEventListener('input', function() {
            this.dataset.userModified = 'true';
        });
    }
    
    calculateROI() {
        const inputs = this.getInputValues();
        
        if (!this.validateInputs(inputs)) {
            return;
        }
        
        // Core calculations
        const calculations = this.performCalculations(inputs);
        
        // Store results
        this.results = calculations;
        
        // Display results
        this.displayResults(calculations);
        
        // Scroll to results
        const resultsSection = this.container.querySelector('#calculator-results');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    getInputValues() {
        return {
            brewerySize: this.container.querySelector('#brewery-size').value,
            productionDays: parseFloat(this.container.querySelector('#production-days').value) || 250,
            currentWaterUsage: parseFloat(this.container.querySelector('#current-water-usage').value) || 5000,
            steamUsage: parseFloat(this.container.querySelector('#steam-usage').value) || 2000,
            steamHours: parseFloat(this.container.querySelector('#steam-hours').value) || 8,
            waterCost: parseFloat(this.container.querySelector('#water-cost').value) || 8,
            energyCost: parseFloat(this.container.querySelector('#energy-cost').value) || 12,
            wastewaterCost: parseFloat(this.container.querySelector('#wastewater-cost').value) || 4,
            recoveryRate: parseFloat(this.container.querySelector('#recovery-rate').value) || 85,
            systemCost: parseFloat(this.container.querySelector('#system-cost').value) || 150000
        };
    }
    
    validateInputs(inputs) {
        const errors = [];
        
        if (inputs.productionDays < 200 || inputs.productionDays > 365) {
            errors.push('Production days must be between 200 and 365');
        }
        
        if (inputs.currentWaterUsage < 500) {
            errors.push('Water usage must be at least 500 gallons per day');
        }
        
        if (inputs.steamUsage < 100) {
            errors.push('Steam usage must be at least 100 lbs per day');
        }
        
        if (errors.length > 0) {
            this.showErrors(errors);
            return false;
        }
        
        return true;
    }
    
    performCalculations(inputs) {
        // Convert steam lbs to gallons of water (1 lb steam ≈ 0.12 gallons water)
        const steamToWaterRatio = 0.12;
        
        // Daily calculations
        const dailySteamGeneration = inputs.steamUsage; // lbs/day
        const dailyWaterFromSteam = dailySteamGeneration * steamToWaterRatio; // gallons/day
        const dailyWaterRecovered = dailyWaterFromSteam * (inputs.recoveryRate / 100); // gallons/day
        
        // Annual calculations
        const annualWaterRecovered = dailyWaterRecovered * inputs.productionDays; // gallons/year
        const annualWaterSavings = annualWaterRecovered * (inputs.waterCost / 1000); // $/year
        const annualWastewaterSavings = annualWaterRecovered * (inputs.wastewaterCost / 1000); // $/year
        
        // Energy savings calculation
        // Assume 1 lb steam contains ~1,000 BTU, recovery captures 70% of thermal energy
        const dailyEnergyRecovered = dailySteamGeneration * 1000 * 0.70; // BTU/day
        const annualEnergyRecovered = dailyEnergyRecovered * inputs.productionDays / 1000000; // MMBtu/year
        const annualEnergySavings = annualEnergyRecovered * inputs.energyCost; // $/year
        
        // Total annual savings
        const totalAnnualSavings = annualWaterSavings + annualWastewaterSavings + annualEnergySavings;
        
        // ROI calculations
        const paybackPeriod = inputs.systemCost / totalAnnualSavings; // years
        const roi10Year = (totalAnnualSavings * 10 - inputs.systemCost) / inputs.systemCost * 100; // %
        const npv10Year = this.calculateNPV(totalAnnualSavings, inputs.systemCost, 10, 0.08); // 8% discount rate
        
        // Environmental impact
        const annualCO2Reduction = annualEnergyRecovered * 0.117; // tons CO2 (0.117 tons CO2/MMBtu for natural gas)
        const equivalentCarsRemoved = annualCO2Reduction / 4.6; // average car emits 4.6 tons CO2/year
        
        return {
            // Input summary
            inputs: inputs,
            
            // Daily results
            dailyWaterRecovered: dailyWaterRecovered,
            waterReductionPercent: (dailyWaterRecovered / inputs.currentWaterUsage) * 100,
            
            // Annual results
            annualWaterRecovered: annualWaterRecovered,
            annualWaterSavings: annualWaterSavings,
            annualEnergySavings: annualEnergySavings,
            annualWastewaterSavings: annualWastewaterSavings,
            totalAnnualSavings: totalAnnualSavings,
            
            // Financial metrics
            paybackPeriod: paybackPeriod,
            roi10Year: roi10Year,
            npv10Year: npv10Year,
            
            // Environmental impact
            annualCO2Reduction: annualCO2Reduction,
            equivalentCarsRemoved: equivalentCarsRemoved
        };
    }
    
    calculateNPV(annualSavings, initialCost, years, discountRate) {
        let npv = -initialCost;
        for (let i = 1; i <= years; i++) {
            npv += annualSavings / Math.pow(1 + discountRate, i);
        }
        return npv;
    }
    
    displayResults(r) {
        const resultsContainer = this.container.querySelector('#calculator-results');
        resultsContainer.innerHTML = `
            <div class="results-summary">
                <div class="summary-item">
                    <div class="summary-value">${r.paybackPeriod.toFixed(1)} years</div>
                    <div class="summary-label">Payback Period</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">$${r.totalAnnualSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                    <div class="summary-label">Total Annual Savings</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${r.waterReductionPercent.toFixed(1)}%</div>
                    <div class="summary-label">Water Usage Reduction</div>
                </div>
            </div>
            
            <div class="results-details">
                <div class="details-section">
                    <h4>Annual Savings Breakdown</h4>
                    <ul>
                        <li><strong>Water Cost Savings:</strong> $${r.annualWaterSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</li>
                        <li><strong>Energy Cost Savings:</strong> $${r.annualEnergySavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</li>
                        <li><strong>Wastewater Savings:</strong> $${r.annualWastewaterSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</li>
                    </ul>
                </div>
                
                <div class="details-section">
                    <h4>Environmental Impact</h4>
                    <ul>
                        <li><strong>Annual Water Recovered:</strong> ${r.annualWaterRecovered.toLocaleString(undefined, {maximumFractionDigits: 0})} gallons</li>
                        <li><strong>Annual CO₂ Reduction:</strong> ${r.annualCO2Reduction.toFixed(1)} tons</li>
                        <li><strong>Equivalent Cars Removed:</strong> ${r.equivalentCarsRemoved.toFixed(1)}</li>
                    </ul>
                </div>
            </div>
            
            <div class="results-actions">
                <button type="button" id="download-report" class="btn btn-primary">Download Full Report</button>
                <button type="button" id="share-results" class="btn btn-secondary">Share Results</button>
            </div>
        `;
        
        // Bind events for new buttons
        this.container.querySelector('#download-report').addEventListener('click', () => this.downloadReport());
        this.container.querySelector('#share-results').addEventListener('click', () => this.shareResults());
    }
    
    downloadReport() {
        if (!this.results) return;
        
        const reportContent = this.generateReportContent();
        
        // Create downloadable text file (in real implementation, use PDF library)
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.results.inputs.brewerySize}-brewery-roi-analysis.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
    
    generateReportContent() {
        const r = this.results;
        
        return `
{StartupName} ROI Analysis Report
Generated: ${new Date().toLocaleDateString()}

BREWERY INFORMATION
==================
Brewery Size: ${r.inputs.brewerySize}
Production Days: ${r.inputs.productionDays} days/year
Current Water Usage: ${r.inputs.currentWaterUsage.toLocaleString()} gallons/day
Steam Generation: ${r.inputs.steamUsage.toLocaleString()} lbs/day

UTILITY COSTS
=============
Water Cost: $${r.inputs.waterCost}/1,000 gallons
Energy Cost: $${r.inputs.energyCost}/MMBtu
Wastewater Cost: $${r.inputs.wastewaterCost}/1,000 gallons

SYSTEM CONFIGURATION
====================
Recovery Rate: ${r.inputs.recoveryRate}%
System Cost: $${r.inputs.systemCost.toLocaleString()}

RESULTS SUMMARY
===============
Payback Period: ${r.paybackPeriod.toFixed(1)} years
Annual Water Recovered: ${r.annualWaterRecovered.toLocaleString()} gallons
Water Usage Reduction: ${r.waterReductionPercent.toFixed(1)}%

ANNUAL SAVINGS
==============
Water Cost Savings: $${r.annualWaterSavings.toLocaleString()}
Energy Cost Savings: $${r.annualEnergySavings.toLocaleString()}
Wastewater Savings: $${r.annualWastewaterSavings.toLocaleString()}
Total Annual Savings: $${r.totalAnnualSavings.toLocaleString()}

FINANCIAL METRICS
=================
10-Year ROI: ${r.roi10Year.toFixed(1)}%
10-Year NPV: $${r.npv10Year.toLocaleString()}

ENVIRONMENTAL IMPACT
====================
Annual CO₂ Reduction: ${r.annualCO2Reduction.toFixed(1)} tons
Equivalent Cars Removed: ${r.equivalentCarsRemoved.toFixed(1)}

DISCLAIMER
==========
These calculations are estimates based on typical system performance. 
Actual results may vary based on specific brewery operations, steam quality, 
local utility rates, and system configuration. Contact {StartupName} for 
a detailed site assessment and customized analysis.

Contact Information:
Phone: (555) 123-4567
Email: info@{StartupName}.com
Website: www.{StartupName}.com
        `.trim();
    }
    
    shareResults() {
        if (!this.results) return;
        
        const shareText = `Check out my brewery's potential ROI with {ProductName}: ${this.results.paybackPeriod.toFixed(1)} year payback, $${this.results.totalAnnualSavings.toLocaleString()} annual savings!`;
        const shareUrl = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: '{StartupName} ROI Calculator Results',
                text: shareText,
                url: shareUrl
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
                this.showShareSuccess();
            });
        }
    }
    
    showShareSuccess() {
        const message = document.createElement('div');
        message.className = 'share-success';
        message.textContent = 'Results copied to clipboard!';
        
        this.container.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    showErrors(errors) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'calculator-errors';
        errorContainer.innerHTML = `
            <div class="error-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <h4>Please correct the following errors:</h4>
            </div>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        
        const resultsContainer = this.container.querySelector('#calculator-results');
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(errorContainer);
        
        // Remove errors after 10 seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 10000);
    }
    
    resetCalculator() {
        // Reset all inputs to defaults
        this.container.querySelector('#brewery-size').value = 'small';
        this.container.querySelector('#production-days').value = '250';
        this.container.querySelector('#current-water-usage').value = '5000';
        this.container.querySelector('#steam-usage').value = '2000';
        this.container.querySelector('#steam-hours').value = '8';
        this.container.querySelector('#water-cost').value = '8';
        this.container.querySelector('#energy-cost').value = '12';
        this.container.querySelector('#wastewater-cost').value = '4';
        this.container.querySelector('#recovery-rate').value = '85';
        this.container.querySelector('.range-value').textContent = '85%';
        
        // Reset steam usage user modification flag
        const steamUsage = this.container.querySelector('#steam-usage');
        delete steamUsage.dataset.userModified;
        
        // Update system cost and clear results
        this.updateSystemCost();
        
        const resultsContainer = this.container.querySelector('#calculator-results');
        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                    <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
                </svg>
                <h3>Enter Your Information</h3>
                <p>Fill in the form to calculate your potential ROI and savings with {ProductName}</p>
            </div>
        `;
        
        this.results = {};
    }
}

// Initialize ROI Calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const calculatorContainer = document.getElementById('roi-calculator-container');
    if (calculatorContainer) {
        new ROICalculator('roi-calculator-container');
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ROICalculator;
}

