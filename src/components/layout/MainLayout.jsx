import { Container } from "@mui/material";

export default function MainLayout({ children }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {children}
    </Container>
  );
}