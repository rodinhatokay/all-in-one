import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useAioBackClient } from "../context/AioBackContext";

export const BasicTable = () => {
  const [businesses, setBusinesses] = useState([]);

  const aioBackClient = useAioBackClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await aioBackClient.getBusinesses();
        setBusinesses(response);
        // Handle the response here
      } catch (error) {
        // Handle any errors
      }
    };

    fetchData();
  }, [aioBackClient]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Logo Path</TableCell>
            <TableCell>Latitute</TableCell>
            <TableCell>Longitute</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Has Whatsapp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {businesses.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.logoPath}</TableCell>
              <TableCell>{row.location?.latitude}</TableCell>
              <TableCell>{row.location?.longitude}</TableCell>
              <TableCell>{row.category?.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>
                <Checkbox
                  checked={row.hasWhatsapp}
                  inputProps={{ "aria-label": "controlled" }}
                  disabled
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
