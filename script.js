document.addEventListener('DOMContentLoaded', () => {

    // --- 1. UTM GENERATOR LOGIC ---
    const utmInputs = document.querySelectorAll('#utm-url, #utm-source, #utm-medium, #utm-campaign, #utm-term, #utm-content');
    const utmResult = document.getElementById('utm-result');
    
    function generateUtmUrl() {
        const baseUrl = document.getElementById('utm-url').value.trim();
        if (!baseUrl) {
            utmResult.value = '';
            return;
        }
        const params = new URLSearchParams();
        ['utm-source', 'utm-medium', 'utm-campaign', 'utm-term', 'utm-content'].forEach(id => {
            const value = document.getElementById(id).value.trim();
            if (value) {
                params.set(id.replace('utm-', 'utm_'), value);
            }
        });
        utmResult.value = `${baseUrl}?${params.toString()}`;
    }
    utmInputs.forEach(input => input.addEventListener('input', generateUtmUrl));

    // --- 2. AD COPY GENERATOR LOGIC ---
    const adInputs = document.querySelectorAll('#ad-product, #ad-benefit, #ad-cta');
    const adResult = document.getElementById('ad-result');

    function generateAdCopy() {
        const product = document.getElementById('ad-product').value.trim();
        const benefit = document.getElementById('ad-benefit').value.trim();
        const cta = document.getElementById('ad-cta').value.trim();

        if (!product || !benefit || !cta) {
            adResult.innerHTML = '';
            return;
        }

        adResult.innerHTML = `
        <strong>Вариант 1:</strong>
        <p>H1: ${product} | Официальный сайт<br>H2: ${benefit}<br>Описание: ${cta} Быстрая доставка и гарантия качества.</p>
        <strong>Вариант 2 (агрессивный):</strong>
        <p>H1: Шок! ${product} - ${benefit}<br>H2: Успей купить по акции!<br>Описание: Ограниченное предложение! ${cta}</p>
        <strong>Вариант 3 (вопрос):</strong>
        <p>H1: Ищете ${product}?<br>H2: ${benefit}<br>Описание: Тысячи довольных клиентов. ${cta}</p>
        `;
    }
    adInputs.forEach(input => input.addEventListener('input', generateAdCopy));

    // --- 3. CLOAKING SIMULATOR LOGIC ---
    const cloakButton = document.getElementById('cloak-button');
    cloakButton.addEventListener('click', () => {
        const whiteUrl = document.getElementById('cloak-white').value.trim();
        const blackUrl = document.getElementById('cloak-black').value.trim();
        
        if (confirm("Трекер анализирует ваш визит...\n\nВы модератор или бот? (Нажмите 'Отмена', если вы реальный клиент)")) {
            // Пользователь нажал 'OK' (он 'бот')
            window.open(whiteUrl, '_blank');
        } else {
            // Пользователь нажал 'Отмена' (он 'клиент')
            window.open(blackUrl, '_blank');
        }
    });

    // --- 4. PROFIT CALCULATOR LOGIC ---
    const calcInputs = document.querySelectorAll('#calc-spend, #calc-leads, #calc-payout, #calc-approve');
    const calcResult = document.getElementById('calc-result');

    function calculateProfit() {
        const spend = parseFloat(document.getElementById('calc-spend').value) || 0;
        const leads = parseFloat(document.getElementById('calc-leads').value) || 0;
        const payout = parseFloat(document.getElementById('calc-payout').value) || 0;
        const approve = parseFloat(document.getElementById('calc-approve').value) || 0;
        
        if (spend === 0 && leads === 0) {
            calcResult.innerHTML = '';
            return;
        }

        const approvedLeads = leads * (approve / 100);
        const revenue = approvedLeads * payout;
        const profit = revenue - spend;
        const roi = (profit / spend) * 100;
        const cpl = spend / leads;

        calcResult.innerHTML = `
        <p>Подтвержденных лидов: ${approvedLeads.toFixed(2)}</p>
        <p>Доход (Revenue): $${revenue.toFixed(2)}</p>
        <p>Цена за лид (CPL): $${leads > 0 ? cpl.toFixed(2) : '0.00'}</p>
        <p><strong>Чистая прибыль (Profit): $${profit.toFixed(2)}</strong></p>
        <p><strong>Возврат инвестиций (ROI): ${spend > 0 ? roi.toFixed(2) : '0.00'}%</strong></p>
        `;
    }
    calcInputs.forEach(input => input.addEventListener('input', calculateProfit));
});
