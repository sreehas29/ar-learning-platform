import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
  Stack,
  Divider,
  LinearProgress,
  Grid,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import SchoolIcon from "@mui/icons-material/School";

import { useApp } from "../../context/AppContext";
import { playSuccessChime, playErrorTone, playClickSound } from "../../services/audioService";

const quizBank = {
  math: [
    {
      id: "q-m1",
      grade: 6,
      activityId: "math-6-1",
      question: "How many vertices and faces does a 3D rectangular prism (cube/cuboid) possess?",
      options: ["6 Faces, 8 Vertices", "4 Faces, 6 Vertices", "8 Faces, 12 Vertices", "12 Faces, 6 Vertices"],
      correct: "6 Faces, 8 Vertices",
      explanation: "A 3D rectangular prism (hexahedron) has 6 planar faces, 8 corner vertices, and 12 straight edges.",
    },
    {
      id: "q-m2",
      grade: 6,
      activityId: "math-6-2",
      question: "What is the Total Surface Area (TSA) formula for a cylinder of radius r and height h?",
      options: ["2πr(r + h)", "πr²h", "2πrh", "4πr²"],
      correct: "2πr(r + h)",
      explanation: "Total Surface Area = 2 × Base Circle Area (2πr²) + Curved Surface Area (2πrh) = 2πr(r + h).",
    },
    {
      id: "q-m3",
      grade: 7,
      activityId: "math-7-3",
      question: "What is the sum of interior angles in any Euclidean triangle?",
      options: ["180°", "360°", "90°", "270°"],
      correct: "180°",
      explanation: "According to NCERT Angle Sum Property, ∠A + ∠B + ∠C = 180° for all planar triangles.",
    },
    {
      id: "q-m4",
      grade: 8,
      activityId: "math-8-3",
      question: "What is Euler's Formula for regular 3D Polyhedra with Vertices V, Edges E, and Faces F?",
      options: ["V - E + F = 2", "V + E + F = 2", "V - F + E = 1", "E - V + F = 0"],
      correct: "V - E + F = 2",
      explanation: "Euler's characteristic equation states V - E + F = 2 for any convex 3D polyhedra.",
    },
    {
      id: "q-m5",
      grade: 9,
      activityId: "math-8-1",
      question: "In a right-angled triangle with leg lengths a and b and hypotenuse c, which relation holds true?",
      options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c²"],
      correct: "a² + b² = c²",
      explanation: "Pythagoras Theorem states that the square of hypotenuse c equals the sum of squares of legs a² + b².",
    },
  ],
  science: [
    {
      id: "q-s1",
      grade: 6,
      activityId: "sci-6-1",
      question: "Which celestial body forms the gravitational center of our Solar System?",
      options: ["The Sun", "Jupiter", "Earth", "Saturn"],
      correct: "The Sun",
      explanation: "The Sun contains over 99.8% of the total solar system mass, exerting central gravitational pull.",
    },
    {
      id: "q-s2",
      grade: 6,
      activityId: "sci-6-2",
      question: "Which organelle gives plant cells their green color and enables photosynthesis?",
      options: ["Chloroplasts", "Mitochondria", "Nucleus", "Vacuole"],
      correct: "Chloroplasts",
      explanation: "Chloroplasts contain green chlorophyll pigments that capture light energy for photosynthesis.",
    },
    {
      id: "q-s3",
      grade: 7,
      activityId: "sci-7-1",
      question: "Which chamber of the human heart pumps oxygenated blood out into the main Aorta artery?",
      options: ["Left Ventricle", "Right Atrium", "Right Ventricle", "Left Atrium"],
      correct: "Left Ventricle",
      explanation: "The thick muscular Left Ventricle contracts to pump oxygen-rich blood into the Aorta.",
    },
    {
      id: "q-s4",
      grade: 8,
      activityId: "sci-8-1",
      question: "What type of chemical bond is formed by mutual sharing of electron pairs between non-metal atoms?",
      options: ["Covalent Bond", "Ionic Bond", "Metallic Bond", "Hydrogen Bond"],
      correct: "Covalent Bond",
      explanation: "Covalent bonding involves shared valence electron pairs (e.g. H₂O, CH₄) to achieve octet stability.",
    },
    {
      id: "q-s5",
      grade: 9,
      activityId: "sci-9-1",
      question: "According to the Bohr Atomic Model, what are the names of the electron energy shell levels?",
      options: ["K, L, M, N", "A, B, C, D", "Alpha, Beta, Gamma", "1, 3, 5, 7"],
      correct: "K, L, M, N",
      explanation: "Niels Bohr designated electron orbits outward from the nucleus as K (n=1), L (n=2), M (n=3), and N (n=4).",
    },
  ],
};

export default function QuizHub() {
  const navigate = useNavigate();
  const { setSelectedActivity, isAudioMuted } = useApp();

  const [activeSubject, setActiveSubject] = useState("math");
  const [activeGrade, setActiveGrade] = useState(6);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQuestions = quizBank[activeSubject] || quizBank.math;
  const currentQ = currentQuestions[currentStep];

  const handleSubjectChange = (subj) => {
    playClickSound(isAudioMuted);
    setActiveSubject(subj);
    resetQuiz();
  };

  const handleGradeChange = (grd) => {
    playClickSound(isAudioMuted);
    setActiveGrade(grd);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption("");
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  const handleOptionSelect = (opt) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correct;
    if (isCorrect) {
      playSuccessChime(isAudioMuted);
    } else {
      playErrorTone(isAudioMuted);
    }

    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        userAnswer: selectedOption,
        correctAnswer: currentQ.correct,
        isCorrect,
        activityId: currentQ.activityId,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentStep < currentQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption("");
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleLaunchAR = (actId) => {
    setSelectedActivity({ id: actId, title: "NCERT Interactive Activity" });
    navigate("/instructions");
  };

  const calculateScore = () => {
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    return {
      count: correctCount,
      total: currentQuestions.length,
      percentage: Math.round((correctCount / currentQuestions.length) * 100),
    };
  };

  const scoreData = isQuizCompleted ? calculateScore() : { count: 0, total: 5, percentage: 0 };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        color: "#FFFFFF",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Header Title Banner */}
        <Box textAlign="center" mb={4}>
          <Box display="inline-flex" alignItems="center" gap={1.5} mb={1}>
            <QuizIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="h3" fontWeight={900} color="#38BDF8">
              NCERT Practice Quiz Hub
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.7)">
            Test your STEM conceptual mastery & jump straight into 3D WebAR lessons
          </Typography>
        </Box>

        {/* Filter Chip Selector */}
        <Paper
          elevation={4}
          sx={{
            p: 2.5,
            mb: 4,
            borderRadius: 4,
            backgroundColor: "rgba(30, 41, 59, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" fontWeight={700} display="block" mb={1}>
                SELECT SUBJECT:
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label="Mathematics"
                  onClick={() => handleSubjectChange("math")}
                  color={activeSubject === "math" ? "primary" : "default"}
                  variant={activeSubject === "math" ? "filled" : "outlined"}
                  sx={{ color: "#FFFFFF", fontWeight: 700, px: 1 }}
                />
                <Chip
                  label="Science"
                  onClick={() => handleSubjectChange("science")}
                  color={activeSubject === "science" ? "success" : "default"}
                  variant={activeSubject === "science" ? "filled" : "outlined"}
                  sx={{ color: "#FFFFFF", fontWeight: 700, px: 1 }}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" fontWeight={700} display="block" mb={1}>
                FILTER BY GRADE LEVEL:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {[6, 7, 8, 9, 10].map((grd) => (
                  <Chip
                    key={grd}
                    label={`Grade ${grd}`}
                    onClick={() => handleGradeChange(grd)}
                    color={activeGrade === grd ? "warning" : "default"}
                    variant={activeGrade === grd ? "filled" : "outlined"}
                    size="small"
                    sx={{ color: "#FFFFFF", fontWeight: 700 }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Quiz Execution Area */}
        {!isQuizCompleted ? (
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 5,
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Progress Bar & Stepper */}
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="caption" color="#38BDF8" fontWeight={700}>
                  QUESTION {currentStep + 1} OF {currentQuestions.length}
                </Typography>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.6)">
                  Subject: {activeSubject.toUpperCase()} • Grade {activeGrade}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={((currentStep + 1) / currentQuestions.length) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#38BDF8" },
                }}
              />
            </Box>

            {/* Question Text */}
            <Typography variant="h5" fontWeight={700} color="#FFFFFF" mb={3}>
              {currentQ.question}
            </Typography>

            {/* Options Selection */}
            <RadioGroup value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
              {currentQ.options.map((opt) => (
                <Paper
                  key={opt}
                  onClick={() => handleOptionSelect(opt)}
                  elevation={0}
                  sx={{
                    p: 1.8,
                    mb: 1.5,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor:
                      selectedOption === opt
                        ? "#38BDF8"
                        : "rgba(255, 255, 255, 0.15)",
                    backgroundColor:
                      selectedOption === opt
                        ? "rgba(56, 189, 248, 0.15)"
                        : "rgba(255, 255, 255, 0.04)",
                    cursor: isAnswerSubmitted ? "default" : "pointer",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: !isAnswerSubmitted && "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  <FormControlLabel
                    value={opt}
                    control={<Radio color="info" disabled={isAnswerSubmitted} />}
                    label={
                      <Typography variant="body1" fontWeight={600} color="#FFFFFF">
                        {opt}
                      </Typography>
                    }
                    sx={{ width: "100%", m: 0 }}
                  />
                </Paper>
              ))}
            </RadioGroup>

            {/* Explanation Alert Box */}
            {isAnswerSubmitted && (
              <Alert
                severity={selectedOption === currentQ.correct ? "success" : "error"}
                icon={
                  selectedOption === currentQ.correct ? (
                    <CheckCircleIcon fontSize="inherit" />
                  ) : (
                    <CancelIcon fontSize="inherit" />
                  )
                }
                sx={{ my: 3, borderRadius: 3, fontSize: "0.95rem" }}
              >
                <Typography variant="subtitle2" fontWeight={700}>
                  {selectedOption === currentQ.correct ? "Correct Answer!" : "Incorrect Answer"}
                </Typography>
                {currentQ.explanation}
              </Alert>
            )}

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 3 }} />

            {/* Action Controls */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button
                variant="outlined"
                startIcon={<ViewInArIcon />}
                onClick={() => handleLaunchAR(currentQ.activityId)}
                sx={{ color: "#38BDF8", borderColor: "rgba(56, 189, 248, 0.4)", textTransform: "none", borderRadius: 3 }}
              >
                Inspect 3D AR Model
              </Button>

              {!isAnswerSubmitted ? (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  sx={{ px: 4, py: 1, borderRadius: 3, fontWeight: 800 }}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleNextQuestion}
                  sx={{ px: 4, py: 1, borderRadius: 3, fontWeight: 800 }}
                >
                  {currentStep < currentQuestions.length - 1 ? "Next Question" : "View Final Score"}
                </Button>
              )}
            </Box>
          </Paper>
        ) : (
          /* Final Score Review Summary Card */
          <Paper
            elevation={8}
            sx={{
              p: { xs: 4, sm: 5 },
              borderRadius: 5,
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                color: "#F59E0B",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: 48 }} />
            </Box>

            <Typography variant="h4" fontWeight={900} color="#FFFFFF" gutterBottom>
              Quiz Assessment Complete!
            </Typography>

            <Typography variant="h2" fontWeight={900} color="#38BDF8" sx={{ my: 2 }}>
              {scoreData.percentage}%
            </Typography>

            <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.8)" mb={3}>
              You answered <strong>{scoreData.count}</strong> out of <strong>{scoreData.total}</strong> questions correctly.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
              <Button
                variant="contained"
                color="warning"
                startIcon={<RestartAltIcon />}
                onClick={resetQuiz}
                sx={{ borderRadius: 3, px: 3, fontWeight: 700 }}
              >
                Retake Quiz
              </Button>
              <Button
                variant="outlined"
                startIcon={<SchoolIcon />}
                onClick={() => navigate("/activity")}
                sx={{ color: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: 3, px: 3 }}
              >
                Explore More Lessons
              </Button>
            </Stack>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 3 }} />

            {/* Detailed Question Review Breakdown */}
            <Typography variant="h6" fontWeight={700} textAlign="left" color="#38BDF8" mb={2}>
              Concept Review Breakdown:
            </Typography>

            {userAnswers.map((ans, idx) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 1.5,
                  borderRadius: 3,
                  backgroundColor: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid",
                  borderColor: ans.isCorrect ? "rgba(74, 222, 128, 0.3)" : "rgba(248, 113, 113, 0.3)",
                  textAlign: "left",
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {ans.isCorrect ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    <Typography variant="subtitle2" fontWeight={700} color="#FFFFFF">
                      Question #{idx + 1}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    startIcon={<ViewInArIcon fontSize="small" />}
                    onClick={() => handleLaunchAR(ans.activityId)}
                    sx={{ color: "#38BDF8", textTransform: "none", fontSize: "0.75rem" }}
                  >
                    Open 3D Model
                  </Button>
                </Box>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  Your Answer: <strong>{ans.userAnswer}</strong>
                </Typography>
                {!ans.isCorrect && (
                  <Typography variant="body2" color="#4ADE80" mt={0.5}>
                    Correct Answer: <strong>{ans.correctAnswer}</strong>
                  </Typography>
                )}
              </Paper>
            ))}
          </Paper>
        )}
      </Container>
    </Box>
  );
}
