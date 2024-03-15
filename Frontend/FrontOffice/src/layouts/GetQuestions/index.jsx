/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import Footer from "examples/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: theme.spacing(4),
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginLeft: "auto",
  },
  actionColumn: {
    width: "100px",
    textAlign: "center",
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  editButton: {
    color: theme.palette.warning.main,
  },
}));

function GetQuestion() {
  const [questions, setQuestions] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/question/getall");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/question/delete/${questionId}`);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((prevQuestion) => prevQuestion._id !== questionId)
      );
      window.alert("Question supprimée avec succès!");
    } catch (error) {
      console.error("Error deleting question:", error);
      window.alert("Échec de la suppression de la question. Veuillez réessayer.");
    }
  };

  return (
    <DashboardLayout>
      <Header />
      <MDButton variant="gradient" color="info" className={classes.addButton}>
        <Link to="/question/ajouter" style={{ textDecoration: "none", color: "white" }}>
          Ajouter Question
        </Link>
      </MDButton>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question._id}>
                <TableCell>{question.text}</TableCell>
                <TableCell>
                  {question.options.map((option, index) => (
                    <div key={index}>{`Option ${index + 1}: ${option}`}</div>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    component={Link}
                    to="/question/modifier/${question._id}"
                    className={classes.editButton}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteQuestion(question._id)}
                    className={classes.deleteButton}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </DashboardLayout>
  );
}

export default GetQuestion;
