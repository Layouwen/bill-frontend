import ShareBtn from '@/pages/Share/ShareBtn';
import ShareCanvas from '@/pages/Share/ShareCanvas';
import { downloadCanvas } from '@/utils';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { NavBar } from 'bw-mobile';

const Share = () => {
  const navigator = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const saveCanvas = () => {
    html2canvas(canvasRef.current!).then(downloadCanvas);
  };
  return (
    <div className="page">
      <NavBar back={'返回'} backArrow={false} onBack={() => navigator(-1)}>
        晒单
      </NavBar>
      <ShareCanvas canvasRef={canvasRef} />
      <ShareBtn onSave={saveCanvas} />
    </div>
  );
};

export default Share;
