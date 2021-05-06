import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import Button from "@material-ui/core/Button";
import "react-image-crop/dist/ReactCrop.css";
import TextField from "@material-ui/core/TextField";
import axios, { post } from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function App() {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%" });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [objectLableName, setObjectLableName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const generateDownload = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        fileUpload(blob);
      },
      "image/png",
      1
    );
  };

  const fileUpload = (file) => {
    setObjectLableName("");
    const url = `${global.url}/api/image`;
    const formData = new FormData();
    const newImage = new File([file], objectLableName, { type: file.type });
    formData.append("image", newImage);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    post(url, formData, config)
      .then((data) => {
        console.log(data);
        setOpen(true);
        setObjectLableName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setShowInput(true);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <>
      <h1>Add Image To Crop The Object</h1>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ maxWidth: "30%", padding: 30 }}>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
        </div>
        <div
          style={{
            maxWidth: "70%",
            padding: 30,
            display: showInput ? "block" : "none",
          }}
        >
          <div style={{ justifyContent: "left", display: "flex" }}>
            <TextField
              onChange={(e) => setObjectLableName(e.target.value)}
              value={objectLableName}
              id="standard-basic"
              style={{ marginRight: 30 }}
              label="Lable Name"
            />
            <Button
              variant="outlined"
              type="button"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() =>
                generateDownload(previewCanvasRef.current, completedCrop)
              }
            >
              Save cropped image
            </Button>
          </div>
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              marginTop: 10,
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </div>
      </div>
      // snack bar used to display message upon completion of task successfully
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Image Uploaded Succesfully"
      />
    </>
  );
}
