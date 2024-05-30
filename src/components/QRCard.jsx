import React, { useState } from "react";
import './QRCard.css';
import axios from 'axios';

function QRCard(){

    const [url, setUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    

    const generateQrCode = async () =>{
        try {
            const response = await axios.post('http://localhost:3001/generate', { url }, {responseType: 'blob'});
            const qrCodeUrl = URL.createObjectURL(new Blob([response.data], {type: 'image/png'}));
            setQrCode(qrCodeUrl);
        }catch (error){
            console.error("Error generating QR code:",error);
        }
    };

    return(
        <div>
            <input 
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={generateQrCode}>Generate QR code</button>
            {qrCode && (
                <div>
                    <h3>QR Code: </h3>
                    <img src={qrCode} alt="QR Code" />
                </div>
            )}
        </div>
    );
};

export default QRCard;
