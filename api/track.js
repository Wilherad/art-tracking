export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { number } = req.body;
    const token = process.env.TRACK_17_TOKEN; 

    try {
        const response = await fetch('https://api.17track.net/track/v2.4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                '17token': token || '' 
            },
            body: JSON.stringify([{ "number": number }])
        });
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Tracking failed" });
    }
}