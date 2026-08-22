import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  RadioGroup,
  FormControlLabel,
  Collapse,
  Alert,
  Stack,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import FunctionsIcon from "@mui/icons-material/Functions";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { useApp } from "../../context/AppContext";
import { getModelConfigForActivity } from "../../registry/modelRegistry";
import CompletionModal from "./CompletionModal";
import FormulaVisualizerModal from "../../components/dashboard/FormulaVisualizerModal";
import { speakText, playSuccessChime, playErrorTone } from "../../services/audioService";

export default function ARHUDOverlay({ activity }) {
  const { isAudioMuted } = useApp();
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Audio Tour Mode State
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);

  const modelConfig = getModelConfigForActivity(activity?.id);
  const hotspots = modelConfig?.hotspots || [];

  // Guided 3D Audio Tour Loop
  useEffect(() => {
    let timer;
    if (isTourActive && hotspots.length > 0) {
      const node = hotspots[tourIndex % hotspots.length];
      setActiveHotspot(node);
      speakText(`${node.label}. ${node.description || ""}`, isAudioMuted);

      timer = setInterval(() => {
        setTourIndex((prev) => (prev + 1) % hotspots.length);
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [isTourActive, tourIndex, hotspots, isAudioMuted]);

  const toggleTour = () => {
    if (isTourActive) {
      setIsTourActive(false);
      setActiveHotspot(null);
    } else {
      setIsTourActive(true);
      setTourIndex(0);
    }
  };

  const handleSelectHotspot = (node) => {
    setActiveHotspot(node);
    speakText(`${node.label}. ${node.description || ""}`, isAudioMuted);
  };

  // Mock Quiz Question tailored to active lesson
  const quizData = {
    question: `What is the primary scientific principle demonstrated in ${activity?.title || "this 3D lesson"}?`,
    options: [
      "Spatial Geometry & Conservation Laws",
      "Wave Refraction & Dispersion Angle",
      "Thermodynamic Equilibrium",
    ],
    correctAnswer: "Spatial Geometry & Conservation Laws",
  };

  const handleQuizSubmit = () => {
    if (!selectedOption) return;

    const correct = selectedOption === quizData.correctAnswer;
    setIsCorrect(correct);
    setQuizSubmitted(true);

    if (correct) {
      playSuccessChime(isAudioMuted);
      setShowCompletionModal(true);
    } else {
      playErrorTone(isAudioMuted);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 75,
          left: 20,
          zIndex: 20,
          maxWidth: 340,
        }}
      >
        {/* Hotspot & Guided Audio Tour Panel */}
        <Paper
          elevation={8}
          sx={{
            p: 2,
            mb: 1.5,
            borderRadius: 4,
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            color: "#FFFFFF",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2" fontWeight={800} color="#38BDF8">
              3D Inspection Hotspots
            </Typography>

            {/* Guided Audio Tour Toggle */}
            <Button
              size="small"
              variant={isTourActive ? "contained" : "outlined"}
              color={isTourActive ? "secondary" : "info"}
              startIcon={isTourActive ? <StopCircleIcon /> : <PlayCircleIcon />}
              onClick={toggleTour}
              sx={{ fontSize: "0.75rem", py: 0.2, textTransform: "none", fontWeight: 700, borderRadius: 2 }}
            >
              {isTourActive ? "Stop Tour" : "Audio Tour"}
            </Button>
          </Box>

          <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap mb={1}>
            {hotspots.map((node) => (
              <Chip
                key={node.id}
                label={node.label}
                size="small"
                onClick={() => handleSelectHotspot(node)}
                color={activeHotspot?.id === node.id ? "primary" : "default"}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  backgroundColor: activeHotspot?.id === node.id ? "#1565C0" : "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.2)" },
                }}
              />
            ))}
          </Stack>

          {activeHotspot && (
            <Alert
              severity="info"
              icon={<VolumeUpIcon style={{ color: "#38BDF8" }} />}
              sx={{
                py: 0.5,
                px: 1,
                fontSize: "0.8rem",
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                color: "#FFFFFF",
                border: "1px solid rgba(56, 189, 248, 0.3)",
              }}
            >
              <strong>{activeHotspot.label}:</strong> {activeHotspot.description || "Active 3D inspection node."}
            </Alert>
          )}
        </Paper>

        {/* 3D Formula Visualizer & Quiz Action Triggers */}
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
          <Stack direction="row" spacing={1} mb={1}>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              color="info"
              startIcon={<FunctionsIcon />}
              onClick={() => setShowFormulaModal(true)}
              sx={{ fontSize: "0.75rem", py: 0.5, textTransform: "none", fontWeight: 700, borderColor: "#38BDF8", color: "#38BDF8" }}
            >
              3D Formulas
            </Button>

            <Button
              fullWidth
              size="small"
              variant="outlined"
              color="warning"
              startIcon={<QuizIcon />}
              onClick={() => setShowQuiz(!showQuiz)}
              sx={{ fontSize: "0.75rem", py: 0.5, textTransform: "none", fontWeight: 700, borderColor: "#F59E0B", color: "#F59E0B" }}
            >
              {showQuiz ? "Hide Quiz" : "AR Quiz"}
            </Button>
          </Stack>

          <Collapse in={showQuiz}>
            <Box mt={2}>
              <Typography variant="body2" fontWeight={600} color="#FFFFFF" mb={1}>
                {quizData.question}
              </Typography>

              <Stack spacing={0.5} mb={2}>
                {quizData.options.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    size="small"
                    onClick={() => !quizSubmitted && setSelectedOption(opt)}
                    sx={{
                      fontWeight: 600,
                      justifyContent: "flex-start",
                      backgroundColor: selectedOption === opt ? "rgba(56, 189, 248, 0.3)" : "rgba(255, 255, 255, 0.08)",
                      color: "#FFFFFF",
                    }}
                  />
                ))}
              </Stack>

              {!quizSubmitted ? (
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={handleQuizSubmit}
                  disabled={!selectedOption}
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                >
                  Submit Answer
                </Button>
              ) : (
                <Alert
                  severity={isCorrect ? "success" : "error"}
                  icon={isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                  sx={{ py: 0.5, fontSize: "0.8rem", borderRadius: 2 }}
                >
                  {isCorrect ? "Correct! 100% NCERT Verified" : "Incorrect. Try again!"}
                </Alert>
              )}
            </Box>
          </Collapse>
        </Paper>
      </Box>

      {/* Completion Modal Trigger */}
      <CompletionModal
        open={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        activity={activity}
      />

      {/* Interactive 3D STEM Formula Visualizer Modal */}
      <FormulaVisualizerModal
        open={showFormulaModal}
        onClose={() => setShowFormulaModal(false)}
        activityId={activity?.id}
      />
    </>
  );
}
