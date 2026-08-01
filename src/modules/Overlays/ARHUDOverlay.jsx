import { useState, useEffect } from "react";
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
  Stack,
  Divider,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";

import { getModelConfigForActivity } from "../../registry/modelRegistry";
import CompletionModal from "./CompletionModal";
import { useApp } from "../../context/AppContext";
import {
  speakText,
  playSuccessChime,
  playErrorTone,
  playClickSound,
} from "../../services/audioService";

export default function ARHUDOverlay({ activity }) {
  const { markActivityCompleted, selectedSubject, selectedGrade, isAudioMuted } = useApp();

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Guided Tour Mode State
  const [isGuidedTourActive, setIsGuidedTourActive] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);

  const modelConfig = getModelConfigForActivity(activity?.id);
  const subject = activity?.subject || "math";
  const hotspots = modelConfig.hotspots || [];

  // Guided Audio Tour Interval Loop
  useEffect(() => {
    let timer;
    if (isGuidedTourActive && hotspots.length > 0) {
      const currentHs = hotspots[tourIndex];
      setActiveHotspot(currentHs);
      speakText(`Guided Tour Step ${tourIndex + 1}: ${currentHs.label}`, isAudioMuted);

      timer = setInterval(() => {
        setTourIndex((prev) => {
          const nextIndex = (prev + 1) % hotspots.length;
          if (nextIndex === 0) {
            // Tour finished full cycle
            setIsGuidedTourActive(false);
            speakText("3D Guided Tour completed. You may now explore freely.", isAudioMuted);
            return 0;
          }
          return nextIndex;
        });
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [isGuidedTourActive, tourIndex, hotspots, isAudioMuted]);

  const handleToggleGuidedTour = () => {
    playClickSound(isAudioMuted);
    if (isGuidedTourActive) {
      setIsGuidedTourActive(false);
      speakText("Guided Tour stopped.", isAudioMuted);
    } else {
      setTourIndex(0);
      setIsGuidedTourActive(true);
    }
  };

  const quizData = subject === "math" ? {
    question: "How many faces and vertices does this 3D Geometric Cube possess?",
    options: ["6 Faces, 8 Vertices", "4 Faces, 6 Vertices", "8 Faces, 12 Vertices"],
    correct: "6 Faces, 8 Vertices",
  } : {
    question: "What is the primary function of the orbiting electrons in this model?",
    options: ["Determine chemical reactivity & bonding", "Provide gravitational pull", "Generate nuclear fusion"],
    correct: "Determine chemical reactivity & bonding",
  };

  const handleHotspotClick = (hs) => {
    playClickSound(isAudioMuted);
    if (activeHotspot?.id === hs.id) {
      setActiveHotspot(null);
    } else {
      setActiveHotspot(hs);
      speakText(`Inspecting hotspot: ${hs.label}`, isAudioMuted);
    }
  };

  const handleQuizSubmit = () => {
    if (!selectedOption) return;
    setQuizSubmitted(true);
    if (selectedOption === quizData.correct) {
      playSuccessChime(isAudioMuted);
      speakText("Correct answer! Great job.", isAudioMuted);
    } else {
      playErrorTone(isAudioMuted);
      speakText("Incorrect. Try observing the model again.", isAudioMuted);
    }
  };

  const handleFinishLesson = () => {
    playSuccessChime(isAudioMuted);
    const score = quizSubmitted && selectedOption === quizData.correct ? "100% (Passed)" : "Completed";
    markActivityCompleted(activity?.id, { score });
    setShowCompletionModal(true);
  };

  return (
    <>
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
            <Stack direction="row" spacing={0.5} alignItems="center">
              {activity?.ncertCode && (
                <Chip label={activity.ncertCode} size="small" color="primary" sx={{ fontSize: "0.65rem", height: 20, fontWeight: 700 }} />
              )}
              <Chip label="3D Active" size="small" color="success" sx={{ fontSize: "0.65rem", height: 20 }} />
            </Stack>
          </Box>

          <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" sx={{ fontSize: "0.825rem", mb: 1.5 }}>
            {subject === "math" ? (
              <>• <strong>Geometry:</strong> Hexahedron (Cube)<br />• <strong>Formula:</strong> Volume V = s³<br />• <strong>Mesh Status:</strong> Real-time Shaded</>
            ) : (
              <>• <strong>Model Type:</strong> 3D Quantum/Bohr Mesh<br />• <strong>Electron Shells:</strong> 3 Active Orbits<br />• <strong>Particle Sync:</strong> 60 FPS</>
            )}
          </Typography>

          {/* Guided Audio Tour Toggle Button */}
          <Button
            fullWidth
            size="small"
            variant={isGuidedTourActive ? "contained" : "outlined"}
            color={isGuidedTourActive ? "warning" : "info"}
            startIcon={isGuidedTourActive ? <StopCircleIcon /> : <PlayCircleIcon />}
            onClick={handleToggleGuidedTour}
            sx={{ mb: 1.5, textTransform: "none", fontWeight: 700, borderRadius: 2 }}
          >
            {isGuidedTourActive ? "Stop 3D Guided Tour" : "Start 3D Guided Audio Tour"}
          </Button>

          {/* Interactive 3D Hotspots Section */}
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1 }} />
          <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" fontWeight={600} display="block" mb={0.8}>
            3D Hotspot Inspection Nodes:
          </Typography>

          <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap mb={1.5}>
            {hotspots.map((hs) => (
              <Chip
                key={hs.id}
                icon={<LocationOnIcon style={{ fontSize: 14 }} />}
                label={hs.label}
                clickable
                size="small"
                onClick={() => handleHotspotClick(hs)}
                color={activeHotspot?.id === hs.id ? "primary" : "default"}
                variant={activeHotspot?.id === hs.id ? "filled" : "outlined"}
                sx={{
                  color: "#FFFFFF",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  fontSize: "0.75rem",
                  "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.2)" },
                }}
              />
            ))}
          </Stack>

          {activeHotspot && (
            <Alert
              severity="info"
              onClose={() => setActiveHotspot(null)}
              sx={{
                py: 0.2,
                px: 1,
                fontSize: "0.75rem",
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                color: "#38BDF8",
                border: "1px solid rgba(56, 189, 248, 0.3)",
              }}
            >
              Inspecting: {activeHotspot.label}
            </Alert>
          )}
        </Paper>

        {/* Classroom Interactive Quiz Toggle */}
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
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <QuizIcon color="warning" fontSize="small" />
              <Typography variant="subtitle2" fontWeight={700} color="#F59E0B">
                Classroom AR Quiz
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={() => setShowQuiz(!showQuiz)}
              sx={{ fontSize: "0.75rem", py: 0.2, textTransform: "none", borderColor: "#F59E0B" }}
            >
              {showQuiz ? "Hide Quiz" : "Take Quiz"}
            </Button>
          </Box>

          <Collapse in={showQuiz}>
            <Box mt={2}>
              <Typography variant="body2" fontWeight={600} color="#FFFFFF" mb={1}>
                {quizData.question}
              </Typography>

              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {quizData.options.map((opt) => (
                  <FormControlLabel
                    key={opt}
                    value={opt}
                    control={<Radio size="small" sx={{ color: "rgba(255, 255, 255, 0.6)" }} />}
                    label={
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                        {opt}
                      </Typography>
                    }
                    disabled={quizSubmitted}
                  />
                ))}
              </RadioGroup>

              {!quizSubmitted ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={handleQuizSubmit}
                  disabled={!selectedOption}
                  sx={{ mt: 1.5, fontWeight: 700 }}
                >
                  Submit Answer
                </Button>
              ) : (
                <Alert
                  severity={selectedOption === quizData.correct ? "success" : "error"}
                  sx={{ mt: 1.5, py: 0.2, fontSize: "0.75rem" }}
                >
                  {selectedOption === quizData.correct
                    ? "Correct! Excellent 3D observation."
                    : `Incorrect. Correct answer: ${quizData.correct}`}
                </Alert>
              )}
            </Box>
          </Collapse>
        </Paper>

        {/* Complete Lesson Action Button */}
        <Button
          fullWidth
          variant="contained"
          color="success"
          size="medium"
          startIcon={<EmojiEventsIcon />}
          onClick={handleFinishLesson}
          sx={{
            py: 1.2,
            borderRadius: 3,
            fontWeight: 800,
            fontSize: "0.95rem",
            boxShadow: "0 8px 24px rgba(34, 197, 94, 0.3)",
          }}
        >
          Finish Lesson & Get Certificate
        </Button>
      </Box>

      {/* Completion & Certificate Modal */}
      <CompletionModal
        open={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        activity={activity}
        subject={selectedSubject}
        grade={selectedGrade}
        score={quizSubmitted && selectedOption === quizData.correct ? "100% (Passed)" : "Completed"}
      />
    </>
  );
}
