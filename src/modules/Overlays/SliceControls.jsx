import {
  Paper,
  Box,
  Typography,
  Slider,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function SliceControls({ sliceParams, onUpdateSliceParams, onClose }) {
  const { enabled = false, axis = "x", depth = 0 } = sliceParams || {};

  const handleToggleEnabled = (e) => {
    onUpdateSliceParams({ ...sliceParams, enabled: e.target.checked });
  };

  const handleAxisChange = (e) => {
    onUpdateSliceParams({ ...sliceParams, axis: e.target.value });
  };

  const handleDepthChange = (e, val) => {
    onUpdateSliceParams({ ...sliceParams, depth: val });
  };

  const handleReset = () => {
    onUpdateSliceParams({ enabled: false, axis: "x", depth: 0 });
  };

  return (
    <Paper
      elevation={12}
      sx={{
        p: 2.5,
        borderRadius: 4,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(16px)",
        border: "1.5px solid rgba(239, 68, 68, 0.4)",
        color: "#FFFFFF",
        width: 320,
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Box display="flex" alignItems="center" gap={1}>
          <ContentCutIcon style={{ color: "#EF4444" }} />
          <Typography variant="subtitle2" fontWeight={800} color="#EF4444">
            3D Cross-Section & Slice Controls
          </Typography>
        </Box>

        <IconButton size="small" onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Enable Clipping Plane Toggle */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} px={1} py={0.8} sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700} color="rgba(255, 255, 255, 0.9)">
          Enable 3D Slicing Plane
        </Typography>
        <Switch checked={enabled} onChange={handleToggleEnabled} color="error" size="small" />
      </Box>

      {enabled && (
        <>
          {/* Axis Selection */}
          <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
            SELECT CLIPPING AXIS:
          </Typography>
          <RadioGroup row value={axis} onChange={handleAxisChange} sx={{ mb: 2 }}>
            <FormControlLabel
              value="x"
              control={<Radio size="small" sx={{ color: "#EF4444", "&.Mui-checked": { color: "#EF4444" } }} />}
              label={<Typography variant="caption" fontWeight={700}>X (Side)</Typography>}
            />
            <FormControlLabel
              value="y"
              control={<Radio size="small" sx={{ color: "#EF4444", "&.Mui-checked": { color: "#EF4444" } }} />}
              label={<Typography variant="caption" fontWeight={700}>Y (Top)</Typography>}
            />
            <FormControlLabel
              value="z"
              control={<Radio size="small" sx={{ color: "#EF4444", "&.Mui-checked": { color: "#EF4444" } }} />}
              label={<Typography variant="caption" fontWeight={700}>Z (Front)</Typography>}
            />
          </RadioGroup>

          {/* Depth Slider */}
          <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
            SLICE DEPTH OFFSET: {depth.toFixed(2)}m
          </Typography>
          <Slider
            value={depth}
            min={-2.0}
            max={2.0}
            step={0.05}
            onChange={handleDepthChange}
            sx={{ color: "#EF4444", mb: 2 }}
          />

          {/* Quick Presets */}
          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label="50% Cut"
              size="small"
              onClick={() => onUpdateSliceParams({ ...sliceParams, depth: 0 })}
              sx={{ backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#EF4444", fontWeight: 800, cursor: "pointer" }}
            />
            <Chip
              label="75% Cut"
              size="small"
              onClick={() => onUpdateSliceParams({ ...sliceParams, depth: 0.5 })}
              sx={{ backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#EF4444", fontWeight: 800, cursor: "pointer" }}
            />
            <Chip
              label="Quarter Cut"
              size="small"
              onClick={() => onUpdateSliceParams({ ...sliceParams, depth: -0.5 })}
              sx={{ backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#EF4444", fontWeight: 800, cursor: "pointer" }}
            />
          </Stack>
        </>
      )}

      <Button
        fullWidth
        size="small"
        variant="outlined"
        color="error"
        startIcon={<RestartAltIcon />}
        onClick={handleReset}
        sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700 }}
      >
        Reset Slice Plane
      </Button>
    </Paper>
  );
}
