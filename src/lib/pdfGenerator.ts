import jsPDF from 'jspdf';

export interface DocumentData {
  title: string;
  content: string;
  metadata?: {
    state?: string;
    county?: string;
    caseType?: string;
    court?: string;
    date?: string;
  };
}

export const generatePDF = (data: DocumentData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  
  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(data.title, margin, 30);
  
  // Metadata
  if (data.metadata) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let yPos = 45;
    
    if (data.metadata.date) {
      doc.text(`Date: ${data.metadata.date}`, margin, yPos);
      yPos += 10;
    }
    
    if (data.metadata.state && data.metadata.county) {
      doc.text(`Jurisdiction: ${data.metadata.state}, ${data.metadata.county} County`, margin, yPos);
      yPos += 10;
    }
    
    if (data.metadata.court) {
      doc.text(`Court: ${data.metadata.court}`, margin, yPos);
      yPos += 15;
    }
  }
  
  // Content
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const lines = data.content.split('\n');
  let yPosition = data.metadata ? 75 : 50;
  
  lines.forEach(line => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    if (line.trim() === '') {
      yPosition += 5;
      return;
    }
    
    // Handle long lines
    const wrappedLines = doc.splitTextToSize(line, maxWidth);
    wrappedLines.forEach((wrappedLine: string) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(wrappedLine, margin, yPosition);
      yPosition += 6;
    });
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, 285);
  }
  
  // Download
  const filename = `${data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
  doc.save(filename);
};

export const generateTXT = (data: DocumentData): void => {
  let content = `${data.title}\n${'='.repeat(data.title.length)}\n\n`;
  
  if (data.metadata) {
    if (data.metadata.date) content += `Date: ${data.metadata.date}\n`;
    if (data.metadata.state && data.metadata.county) {
      content += `Jurisdiction: ${data.metadata.state}, ${data.metadata.county} County\n`;
    }
    if (data.metadata.court) content += `Court: ${data.metadata.court}\n`;
    content += '\n';
  }
  
  content += data.content;
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};