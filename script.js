document.addEventListener('DOMContentLoaded', () => {

    // --- 1. UTM GENERATOR LOGIC ---
    const utmInputs = document.querySelectorAll('#utm-url, #utm-source, #utm-medium, #utm-campaign');
    const utmResult = document.getElementById('utm-result');
    function generateUtmUrl() {
        const baseUrl = document.getElementById('utm-url').value.trim();
        if (!baseUrl) {
            utmResult.value = '';
            return;
        }
        const params = new URLSearchParams();
        ['utm-source', 'utm-medium', 'utm-campaign'].forEach(id => {
            const value = document.getElementById(id).value.trim();
            if (value) params.set(id.replace('utm-', 'utm_'), value);
        });
        utmResult.value = `${baseUrl}?${params.toString()}`;
    }
    utmInputs.forEach(input => input.addEventListener('input', generateUtmUrl));

    // --- 2. FINGERPRINT GENERATOR LOGIC ---
    const fpGenerateButton = document.getElementById('fp-generate-button');
    const fpResult = document.getElementById('fp-result');
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    ];
    const resolutions = ['1920x1080', '1366x768', '1536x864', '390x844', '412x915'];
    const languages = ['en-US', 'pt-BR', 'es-ES', 'de-DE'];

    fpGenerateButton.addEventListener('click', () => {
        const ua = userAgents[Math.floor(Math.random() * userAgents.length)];
        const res = resolutions[Math.floor(Math.random() * resolutions.length)];
        const lang = languages[Math.floor(Math.random() * languages.length)];
        fpResult.innerHTML = `User-Agent: ${ua}\nResolution: ${res}\nLanguage: ${lang}`;
    });

    // --- 3. AD COPY GENERATOR LOGIC ---
    const adInputs = document.querySelectorAll('#ad-product, #ad-keyword, #ad-cta');
    const adResult = document.getElementById('ad-result');
    function generateAdCopy() {
        const product = document.getElementById('ad-product').value.trim();
        const keyword = document.getElementById('ad-keyword').value.trim();
        const cta = document.getElementById('ad-cta').value.trim();
        if (!product || !cta) { adResult.innerHTML = ''; return; }
        const dynamicKeyword = `{KeyWord:${keyword || product}}`;
        adResult.innerHTML = `<strong>Вариант с динамической вставкой:</strong>
<p>H1: ${dynamicKeyword} | Официальный сайт<br>Описание: Лучшее средство для ваших суставов. ${cta}</p>
<strong>Вариант с "шоковым" заголовком:</strong>
<p>H1: Врачи в шоке! ${product} помогает...<br>Описание: Тысячи довольных клиентов. ${cta}</p>`;
    }
    adInputs.forEach(input => input.addEventListener('input', generateAdCopy));

    // --- 4. LIVE SEO ANALYZER LOGIC ---
    const seoUrlInput = document.getElementById('seo-url');
    const seoAnalyzeButton = document.getElementById('seo-analyze-button');
    const seoResult = document.getElementById('seo-result');
    
    seoAnalyzeButton.addEventListener('click', async () => {
        let url = seoUrlInput.value.trim();
        if (!url) { seoResult.textContent = 'Введите URL для анализа.'; return; }
        if (!url.startsWith('http')) { url = 'https://' + url; }

        seoResult.textContent = 'Анализирую...';
        seoAnalyzeButton.disabled = true;

        try {
            // Используем CORS-прокси, чтобы обойти ограничения браузера
            const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const title = doc.querySelector('title')?.textContent || 'Не найден';
            const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || 'Не найден';
            const h1 = doc.querySelector('h1')?.textContent || 'Не найден';

            seoResult.innerHTML = `<strong>Title:</strong> ${title.trim()} (${title.length} симв.)
<strong>Description:</strong> ${description.trim()} (${description.length} симв.)
<strong>H1:</strong> ${h1.trim()}`;

        } catch (error) {
            seoResult.textContent = `Ошибка: Не удалось загрузить или проанализировать страницу. \n${error.message}`;
        } finally {
            seoAnalyzeButton.disabled = false;
        }
    });

    // --- 5. CLOAKING SIMULATOR LOGIC ---
    const cloakButton = document.getElementById('cloak-button');
    const cloakUserType = document.getElementById('cloak-user-type');
    cloakButton.addEventListener('click', () => {
        const whiteUrl = 'https://en.wikipedia.org/wiki/Health';
        const blackUrl = 'https://www.amazon.com/s?k=joint+supplement';
        if (cloakUserType.value === 'bot') {
            alert("Трекер определил вас как БОТА/МОДЕРАТОРА.\n\nОтправляю вас на 'белую' страницу (White Page)...");
            window.open(whiteUrl, '_blank');
        } else {
            alert("Трекер определил вас как РЕАЛЬНОГО КЛИЕНТА.\n\nОтправляю вас на 'черную' страницу (Black Page)...");
            window.open(blackUrl, '_blank');
        }
    });

    // --- 6. PROFIT CALCULATOR LOGIC ---
    const calcInputs = document.querySelectorAll('#calc-spend, #calc-leads, #calc-payout, #calc-approve');
    const calcResult = document.getElementById('calc-result');
    function calculateProfit() {
        const spend = parseFloat(document.getElementById('calc-spend').value) || 0;
        const leads = parseFloat(document.getElementById('calc-leads').value) || 0;
        const payout = parseFloat(document.getElementById('calc-payout').value) || 0;
        const approve = parseFloat(document.getElementById('calc-approve').value) || 0;
        if (spend === 0 && leads === 0) { calcResult.innerHTML = ''; return; }
        const approvedLeads = leads * (approve / 100);
        const revenue = approvedLeads * payout;
        const profit = revenue - spend;
        const roi = spend > 0 ? (profit / spend) * 100 : 0;
        const cpl = leads > 0 ? spend / leads : 0;
        calcResult.innerHTML = `<p>Доход (Revenue): $${revenue.toFixed(2)}</p><p>Цена за лид (CPL): $${cpl.toFixed(2)}</p><p><strong>Чистая прибыль (Profit): $${profit.toFixed(2)}</strong></p><p><strong>Возврат инвестиций (ROI): ${roi.toFixed(2)}%</strong></p>`;
    }
    calcInputs.forEach(input => input.addEventListener('input', calculateProfit));
});