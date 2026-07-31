import { Container } from "@mui/material";

export default function MainLayout({ children }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Container>
  );
}