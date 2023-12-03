export const convertBase64 = (file: File): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result?.toString());
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
