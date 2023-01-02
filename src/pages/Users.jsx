import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "./../api/firebase";
import { collection, getDocs } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
function createData(avatar, name, email, birthday, phone) {
  return { avatar, name, email, birthday, phone };
}

const Users = () => {
  const [array, setArray] = useState([]);
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const open = Boolean(anchorEl);
  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };
  const getData = async () => {
    let copy = Object.assign([], array);
    const citiesRef = await getDocs(collection(db, "cities"));
    citiesRef.forEach((doc) => {
      copy.push(doc.data());
    });
    setArray(copy);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Аватар</TableCell>
              <TableCell align="right">Ім'я та призвище</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Дата народження</TableCell>
              <TableCell align="right">Телефон</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar sx={{ width: 56, height: 56 }} src={row.avatar} />
                </TableCell>
                <TableCell align="right">
                  {row.name} {row.family}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.birthday}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
