const cloudinary = require("cloudinary").v2;

const deleteFile = async (url) => {
  if (!url) return;

  try {
  const imgSplited = url.split("/");
  const folderName = imgSplited.at(-2);
  const fileName = imgSplited.at(-1).split(".")[0];

  const result = await cloudinary.uploader.destroy(`${folderName}/${fileName}`);
  if (result.result !== "ok") {
    console.warn(`No se pudo eliminar la imagen: ${url}`, result);
  }
  } catch (error) {
    console.error("Error borrando imagen en Cloudinary:", error);
  };
};

module.exports = {deleteFile};