// public/tracking.js
async function fetchTrackingData(trackingNumber) {
    if (!trackingNumber) {
        activateNode('node-1', 'Please provide a tracking number.');
        return;
    }

    try {
        // 请求自己项目的后端代理接口，无需任何 Token
        const response = await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: trackingNumber })
        });

        const data = await response.json();
        console.log('API Response:', data);

        // ... 这里保留你原有的 statusMap 解析和 activateNode 逻辑 ...
        let statusInfo = statusMap.default;
        if (data.track && data.track.items && data.track.items.length > 0) {
            const item = data.track.items[0];
            const apiStatus = item.info?.status || 1;
            statusInfo = statusMap[apiStatus] || statusMap.default;
        }
        activateNode(statusInfo.node, statusInfo.text);

    } catch (error) {
        console.error('API Fetch Error:', error);
        document.getElementById('error-msg').innerText = '⚠️ API Error: Falling back to simulation mode.';
        startSimulation();
    }
}