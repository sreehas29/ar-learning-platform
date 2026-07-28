import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
  Collapse,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ARHUDOverlay({ activity }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const subject = activity?.subject || "math";

  const quizData = subject === "math" ? {
    question: "How many faces and vertices does this 3D Geometric Cube possess?",
    options: ["6 Faces, 8 Vertices", "4 Faces, 6 Vertices", "8 Faces, 12 Vertices"],
    correct: "6 Faces, 8 Vertices",
  } : {
    question: "What is the primary function of the orbiting electrons in this model?",
    options: ["Determine chemical reactivity & bonding", "Provide gravitational pull", "Generate nuclear fusion"],
    correct: "Determine chemical reactivity & bonding",
  };

  const handleQuizSubmit = () => {
    if (selectedOption) {
      setQuizSubmitted(true);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 80,
        right: 20,
        zIndex: 2,
        maxWidth: 340,
        width: "calc(100% - 40px)",
        pointerEvents: "auto",
      }}
    >
      {/* 3D Model Metadata Overlay Card */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 1.5,
          borderRadius: 3,
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          color: "#FFFFFF",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <AnalyticsIcon color="primary" fontSize="small" />
            <Typography variant="subtitle2" fontWeight={700} color="#38BDF8">
              Live AR Analytics
            </Typography>
          </Box>
          <Chip label="3D Mesh Active" size="small" color="success" sx={{ fontSize: "0.7rem", height: 20 }} />
        </Box>

        <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" sx={{ fontSize: "0.825rem" }}>
          {subject === "math" ? (
            <>• <strong>Geometry:</strong> Hexahedron (Cube)<br />• <strong>Formula:</strong> Volume V = s³<br />• <strong>Mesh Status:</strong> Real-time Shaded</>
          ) : (
            <>• <strong>Model Type:</strong> 3D Quantum/Bohr Mesh<br />• <strong>Electron Shells:</strong> 3 Active Orbits<br />• <strong>Particle Sync:</strong> 60 FPS</>
          )}
        </Typography>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<QuizIcon />}
          onClick={() => setShowQuiz(!showQuiz)}
          sx={{
            mt: 1.5,
            color: "#38BDF8",
            borderColor: "rgba(56, 189, 248, 0.4)",
            textTransform: "none",
            fontSize: "0.8rem",
          }}
        >
          {showQuiz ? "Close Quiz Check" : "Open Classroom Quick Quiz"}
        </Button>
      </Paper>

      {/* Classroom Quick Quiz Collapse Panel */}
      <Collapse in={showQuiz}>
        <Paper
          elevation={4}
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: "#FFFFFF",
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} color="#38BDF8" gutterBottom>
            Classroom Quick Check
          </Typography>

          <Typography variant="body2" sx={{ mb: 1.5, fontSize: "0.85rem" }}>
            {quizData.question}
          </Typography>

          <RadioGroup
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setQuizSubmitted(false);
            }}
          >
            {quizData.options.map((opt) => (
              <FormControlLabel
                key={opt}
                value={opt}
                control={<Radio size="small" sx={{ color: "rgba(255, 255, 255, 0.5)" }} />}
                label={<Typography variant="body2" sx={{ fontSize: "0.8rem" }}>{opt}</Typography>}
              />
            ))}
          </RadioGroup>

          {!quizSubmitted ? (
            <Button
              fullWidth
              size="small"
              variant="contained"
              disabled={!selectedOption}
              onClick={handleQuizSubmit}
              sx={{ mt: 1.5, borderRadius: 2 }}
            >
              Submit Answer
            </Button>
          ) : (
            <Alert
              icon={<CheckCircleIcon fontSize="inherit" />}
              severity={selectedOption === quizData.correct ? "success" : "error"}
              sx={{ mt: 1.5, py: 0.5, fontSize: "0.8rem" }}
            >
              {selectedOption === quizData.correct
                ? "Correct! Excellent 3D observation."
                : `Incorrect. Correct answer: ${quizData.correct}`}
            </Alert>
          )}
        </Paper>
      </Collapse>
    </Box>
  );
}
