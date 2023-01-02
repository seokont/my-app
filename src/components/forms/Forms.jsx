import React, { useEffect, useState } from "react";
// import TextField from '@mui/material/TextField';

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import ImageCrop from "./../ImageCrop/ImageCrop";
import PhoneInput from "./PhoneInput";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./../../api/firebase";

import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

const Forms = () => {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [birthday, setbBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [openCrop, setOpenCrop] = useState(true);
  const [photoURL, setPhotoURL] = useState("");
  const [file, setFile] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [imgBase64, setImgBase64] = useState();

  const saveImage = (url) => {
    const img = document.createElement("img");
    img.src = url;
    img.onload = function () {
      let key = encodeURIComponent(url),
        canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // localStorage.setItem(key, canvas.toDataURL("image/png"));
      setImgBase64(canvas.toDataURL("image/png"));
    };
  };

  let reader = new FileReader();
  reader.onloadend = () => {
    setImgUrl(reader.result);
    setOpenModal(true);
  };
  const setData = async () => {
    let ms = Date.parse(new Date());
    await setDoc(doc(db, "cities", String(ms)), {
      name,
      family,
      birthday,
      email,
      phone,
      avatar: imgBase64,
    });
    setName("");
    setFamily("");
    setbBirthday("");
    setEmail("");
    setImgBase64("");
  };

  const getImageFiles = (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    setImg(files);
    reader.readAsDataURL(files);
  };

  useEffect(() => {
    saveImage(photoURL);
  }, [photoURL]);

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  return (
    <div
      style={{ width: "400px", display: "grid", margin: "0 auto", gap: "15px" }}
    >
      <h1>Форма</h1>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Ім'я</InputLabel>
        <Input
          required={true}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          id="component-simple"
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple-pr">Призвище</InputLabel>
        <Input
          required
          type="text"
          onChange={(e) => {
            setFamily(e.target.value);
          }}
          value={family}
          id="component-simple-pr"
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple-email">
          Електронна пошта
        </InputLabel>
        <Input
          required
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          id="component-simple-email"
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple-data">Дата народження</InputLabel>
        <Input
          required
          onChange={(e) => {
            setbBirthday(e.target.value);
          }}
          value={birthday ? birthday : "2022-01-12"}
          type="date"
          id="component-simple-data"
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="formatted-text-mask-input">Телефон</InputLabel>
        <PhoneInput setPhone={setPhone} />
      </FormControl>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Обрізати аватар
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ImageCrop
            photoURL={imgUrl}
            setOpenCrop={setOpenCrop}
            setPhotoURL={setPhotoURL}
            setFile={setFile}
            setOpenModal={setOpenModal}
          />
        </DialogContent>
      </BootstrapDialog>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            item
            xs={8}
          >
            <Button variant="contained">Обрати аватар</Button>
            <Input
              sx={{
                position: "absolute",
                zIndex: "5",
                cursor: "pointer",
                height: "40px",
                width: "140px",
                opacity: "0",
              }}
              type="file"
              onChange={getImageFiles}
              accept="image/png, image/jpeg"
            />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            item
            xs={4}
          >
            {imgBase64 ? <Avatar src={imgBase64} /> : "Немає аватара"}
          </Grid>
        </Grid>
      </Box>

      <Button variant="contained" onClick={setData}>
        Зберегти
      </Button>
    </div>
  );
};

export default Forms;
