// Expanded mock data for banks/agencies (add real API integration later)
const banks = [
    { name: "State Bank of India (SBI)", type: "government", rates: { personal: 10.5, home: 8.5, business: 9.0 }, eligibility: "Income > ₹3L, Credit Score > 650", pros: "Wide reach, government-backed schemes", link: "https://www.sbi.co.in" },
    { name: "HDFC Bank", type: "private", rates: { personal: 11.0, home: 8.0, business: 10.5 }, eligibility: "Income > ₹5L, Credit Score > 700", pros: "Low rates for home loans, fast processing", link: "https://www.hdfcbank.com" },
    { name: "ICICI Bank", type: "private", rates: { personal: 10.8, home: 8.2, business: 9.5 }, eligibility: "Income > ₹4L, Credit Score > 680", pros: "Flexible terms, digital tools", link: "https://www.icicibank.com" },
    { name: "NABARD", type: "government", rates: { personal: 9.5, home: 7.5, business: 8.0 }, eligibility: "For rural/agri businesses, Income > ₹2L", pros: "Subsidized for farmers, long terms", link: "https://www.nabard.org" },
    { name: "Axis Bank", type: "private", rates: { personal: 11.2, home: 8.3, business: 9.8 }, eligibility: "Income > ₹4.5L, Credit Score > 690", pros: "Good for salaried individuals", link: "https://www.axisbank.com" },
    { name: "Bank of Baroda", type: "government", rates: { personal: 10.0, home: 8.1, business: 8.5 }, eligibility: "Income > ₹3.5L, Credit Score > 650", pros: "Affordable for SMEs", link: "https://www.bankofbaroda.in" }
];

document.getElementById('loanForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loanType = document.getElementById('loanType').value;
    const amount = parseInt(document.getElementById('amount').value);
    const income = parseInt(document.getElementById('income').value);
    const creditScore = parseInt(document.getElementById('creditScore').value) || 0;

    // Filtering and sorting logic: Prioritize based on income, credit score, and lowest rate
    const filteredBanks = banks
        .filter(bank => {
            // Basic eligibility checks
            if (income < 200000) return false; // Minimum income
            if (creditScore && creditScore < 650 && bank.type === 'private') return false; // Stricter for private
            return true;
        })
        .sort((a, b) => {
            // Sort by rate, then by type (government first for accessibility)
            if (a.rates[loanType] !== b.rates[loanType]) return a.rates[loanType] - b.rates[loanType];
            return a.type === 'government' ? -1 : 1;
        })
        .slice(0, 3); // Top 3 recommendations

    const resultsDiv = document.getElementById('results');
    const bankList = document.getElementById('bankList');
    bankList.innerHTML = '';

    if (filteredBanks.length === 0) {
        bankList.innerHTML = '<li>No suitable options found. Improve your income or credit score.</li>';
    } else {
        filteredBanks.forEach(bank => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${bank.name} (${bank.type})</strong><br>
                Interest Rate: ${bank.rates[loanType]}%<br>
                Eligibility: ${bank.eligibility}<br>
                Pros: ${bank.pros}<br>
                <a href="${bank.link}" target="_blank">Visit Website</a>
            `;
            bankList.appendChild(li);
        });
    }

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to results
});
// Credit Score Check Logic
document.getElementById('creditForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const income = parseInt(document.getElementById('income').value);
    const employment = document.getElementById('employment').value;
    const debts = parseInt(document.getElementById('debts').value) || 0;

    // Simple mock calculation (not real; for demo only)
    let score = 300; // Base
    if (age > 25 && age < 60) score += 100;
    if (income > 500000) score += 150;
    if (employment === 'salaried') score += 100;
    if (debts < 100000) score += 50;
    score = Math.min(score, 900); // Cap at 900

    const resultsDiv = document.getElementById('creditResults');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const advice = document.getElementById('advice');

    scoreDisplay.textContent = `Your simulated score: ${score}`;
    if (score >= 750) {
        advice.textContent = "Excellent! You're likely to get low-interest loans.";
    } else if (score >= 650) {
        advice.textContent = "Good. Improve by paying debts on time.";
    } else {
        advice.textContent = "Poor. Focus on building credit history.";
    }

    resultsDiv.style.display = 'block';
});


// Contact Form Handling
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // For demo: Alert success (integrate with EmailJS or Formspree for real sending)
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    this.reset();
});

async function fetchSchemes() {
    try {
        const response = await fetch('https://api.data.gov.in/resource/sample?api-key=YOUR_KEY', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        // Process data
    } catch (error) {
        console.error('Secure fetch failed:', error);
        // Fallback to static data
    }
}