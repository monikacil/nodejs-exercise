import multer from "multer";
import sharpMulter from "sharp-multer";

const newFilename = function (originalname, options, req) {
  const newname =
    originalname.split(".").slice(0, -1).join(".") +
    `${options.useTimestamp ? "-" + Date.now() : ""}` +
    "." +
    options.fileFormat;
  return newname;
};

const storage = sharpMulter({
  destination: (req, file, cb) => cb(null, "public/images/"),
  imageOptions: {
    fileFormat: "jpg",
    quality: 80,
    resize: { width: 300, height: 300 },
    useTimestamp: true,
  },
  filename: newFilename,
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    const err = new Error("Only .png, .jpg and .jpeg format allowed!");
    err.name = "ExtensionError";
    return cb(err);
  }
};

export const uploader = multer({ storage }, fileFilter);
