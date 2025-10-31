export const downloadImage = (imageUrl: string, filename: string) => {
  const link = document.createElement("a")
  link.href = imageUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement("a")
  link.download = filename
  link.href = canvas.toDataURL("image/png")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const printContent = (content: string, title: string) => {
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              text-align: center;
              font-family: 'Arial', sans-serif;
              background: white;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 40px;
              color: #333;
            }
            .content {
              font-size: 200px;
              color: #ddd;
              font-weight: bold;
              margin: 40px 0;
              text-stroke: 2px #ccc;
              -webkit-text-stroke: 2px #ccc;
            }
            .practice-lines {
              border-top: 2px dashed #ccc;
              margin: 40px 0;
              height: 80px;
            }
            @media print {
              body { margin: 20px; }
              .content { font-size: 150px; }
            }
          </style>
        </head>
        <body>
          <div class="header">${title}</div>
          <div class="content">${content}</div>
          <div class="practice-lines"></div>
          <div class="practice-lines"></div>
          <div class="practice-lines"></div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}

export const printImage = (imageUrl: string, title: string) => {
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              text-align: center;
              background: white;
            }
            img {
              max-width: 100%;
              height: auto;
              border: 2px solid #ddd;
              border-radius: 10px;
            }
            @media print {
              body { margin: 10px; }
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" alt="${title}" />
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}
