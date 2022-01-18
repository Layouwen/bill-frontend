const choseFile = (cb: (files: FileList | null) => void) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.hidden = true;
  fileInput.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    cb(input.files);
    fileInput.remove();
  });
  document.body.append(fileInput);
  fileInput.click();
};

export default choseFile;
