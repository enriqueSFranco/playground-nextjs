'use client';
import { selectResumeState } from '@/lib/redux/features/resume/resume.selector';
import { useAppSelector } from '@/lib/redux/hooks';
import { Button } from '@/ui/atoms/Button/Button';

export function DownloadPdfButton() {
  const personalDetails = useAppSelector(selectResumeState).personalDetails;
  const { firstName, lastName, job } = personalDetails;

  async function handleDownloadResumePreview() {
    const $resumePreview = document.getElementById('resume-preview');
    if (!$resumePreview) return;

    const html2pdf = (await import('html2pdf.js')).default;
    $resumePreview.classList.add('exporting');

    const sanitize = (str: string) =>
      String(str)
        .trim()
        .replace(/\s+/g, '_') // Reemplaza espacios por guiones bajos
        .replace(/[^\w\-]/g, '');

    const fileNameParts = [
      'CV',
      sanitize(firstName || 'Nombre'),
      sanitize(lastName || 'Apellido'),
      sanitize(job || 'Puesto'),
    ].filter(Boolean);

    const fileName = fileNameParts.join('_') + '.pdf';

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5, logging: false, useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf()
      .set(opt)
      .from($resumePreview)
      .save()
      .then(() => {
        $resumePreview.classList.remove('exporting');
      });
  }

  return (
    <Button onClick={handleDownloadResumePreview}>
      <span className="text-sm font-light text-gray-400">Descargar PDF</span>
    </Button>
  );
}
