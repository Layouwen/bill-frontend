export { default as request } from './request';
export * from './component';

export const downloadCanvas = (
  canvas: HTMLCanvasElement,
  fileName = '蓝鲸账本',
) => {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = fileName;
  a.click();
};
