const choseFile = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.hidden = true;
  document.body.append(fileInput);
  fileInput.click();
  return new Promise<FileList | null>((resolve) => {
    fileInput.addEventListener('change', (e) => {
      const input = e.target as HTMLInputElement;
      resolve(input.files);
      fileInput.remove();
    });
  });
};

export default choseFile;
