import {QRCodeSVG} from 'qrcode.react'


type tFormData = {
  formData: {
    name: string
    studentId: string
    course: string
    sectionYear: string
  }
}

export default function GenerateQr({formData}:tFormData) {
  const qrData = JSON.stringify(formData);

  return (
    <div>
     <QRCodeSVG value={qrData} size={256} level="H" marginSize={2} />
    </div>
  )
}
