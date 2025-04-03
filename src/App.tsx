import { useEffect, useRef, useState } from 'react'

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [finalImage, setFinalImage] = useState<string | null>(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream
      })
  }, [])

  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const video = videoRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx?.drawImage(video, 0, 0)
    setPhotoTaken(true)

    setTimeout(() => {
      const heart = new Image()
      heart.src = '/magic-camera-pwa/heart3.png'
      heart.onload = () => {
        ctx?.drawImage(heart, canvas.width - 100, canvas.height - 150, 80, 120)
        const finalData = canvas.toDataURL('image/png')
        setFinalImage(finalData)
        downloadImage(finalData)
      }
    }, 30000)
  }

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'magic_photo.png'
    link.click()
  }

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      {!photoTaken && (
        <>
          <video ref={videoRef} autoPlay playsInline style={{ borderRadius: '1rem', width: '100%', maxWidth: '500px' }} />
          <button onClick={takePhoto} style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1.2rem' }}>撮影</button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {finalImage && (
        <div style={{ marginTop: '1rem' }}>
          <img src={finalImage} alt="合成された写真" style={{ borderRadius: '1rem', maxWidth: '500px' }} />
        </div>
      )}
    </div>
  )
}
