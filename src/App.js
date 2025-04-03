import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
export default function App() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photoTaken, setPhotoTaken] = useState(false);
    const [finalImage, setFinalImage] = useState(null);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
            if (videoRef.current)
                videoRef.current.srcObject = stream;
        });
    }, []);
    const takePhoto = () => {
        if (!canvasRef.current || !videoRef.current)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0);
        setPhotoTaken(true);
        setTimeout(() => {
            const heart = new Image();
            heart.src = '/magic-camera-pwa/heart3.png';
            heart.onload = () => {
                ctx?.drawImage(heart, canvas.width - 100, canvas.height - 150, 80, 120);
                const finalData = canvas.toDataURL('image/png');
                setFinalImage(finalData);
                downloadImage(finalData);
            };
        }, 30000);
    };
    const downloadImage = (dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'magic_photo.png';
        link.click();
    };
    return (_jsxs("div", { style: { textAlign: 'center', padding: '1rem' }, children: [!photoTaken && (_jsxs(_Fragment, { children: [_jsx("video", { ref: videoRef, autoPlay: true, playsInline: true, style: { borderRadius: '1rem', width: '100%', maxWidth: '500px' } }), _jsx("button", { onClick: takePhoto, style: { marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1.2rem' }, children: "\u64AE\u5F71" })] })), _jsx("canvas", { ref: canvasRef, style: { display: 'none' } }), finalImage && (_jsx("div", { style: { marginTop: '1rem' }, children: _jsx("img", { src: finalImage, alt: "\u5408\u6210\u3055\u308C\u305F\u5199\u771F", style: { borderRadius: '1rem', maxWidth: '500px' } }) }))] }));
}
