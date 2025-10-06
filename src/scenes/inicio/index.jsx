/**
 * Componente: Inicio
 * 
 * Este componente representa el menú de **Acciones Rápidas** de la aplicación.
 * Contiene una cuadrícula de tarjetas (cards) que sirven como accesos directos
 * a diferentes módulos: actividades, espacios, socios, instructores, etc.
 * 
 * Cada tarjeta puede mostrar un **ícono de Material UI** o bien una **imagen personalizada**.
 * 
 * Tecnologías usadas:
 * - React
 * - Material UI (MUI) → para la UI responsiva y estilizada
 * - React Router → para la navegación entre rutas
 */

import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/header";

// Íconos importados de MUI
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Inicio = () => {
  // Hook para acceder al tema actual (claro/oscuro)
  const theme = useTheme();

  // Tokens de colores definidos en theme.js (para modo oscuro/claro)
  const colors = tokens(theme.palette.mode);

  /**
   * Definición de las acciones rápidas.
   * Cada objeto representa una tarjeta con:
   * - to: ruta a la que navegará al hacer clic
   * - title: título principal de la tarjeta
   * - subtitle: descripción secundaria
   * - Icon: ícono de MUI (opcional)
   * - imgSrc: ruta a una imagen personalizada (opcional)
   */
  const actions = [
    {
      to: "/actividades",
      title: "Actividades",
      subtitle: "Administrar Actividades Disponibles",
      Icon: SportsBaseballIcon,
    },
    {
      to: "/espacios",
      title: "Espacios",
      subtitle: "Administrar los espacios disponibles",
      Icon: SportsSoccerIcon,
    },
    {
      to: "/socios",
      title: "Socios",
      subtitle: "Administrar Socios",
      Icon: PersonOutlineIcon,
    },
    {
      to: "/instructores",
      title: "Instructores",
      subtitle: "Administrar Instructores",
      Icon: EmojiEventsIcon,
    },
    {
      to: "/events",
      title: "Eventos",
      subtitle: "Administrar Eventos",
      Icon: PlayArrowIcon,
    },
    {
      to: "/horarios",
      title: "Alta de Curso",
      subtitle: "Dar de Alta un Curso",
      Icon: AccessTimeIcon,
    },
    {
      to: "/reporte-accidentes",
      title: "Reporte de Accidentes",
      subtitle: "Ver Reporte de Accidentes",
      imgSrc: "/assets/logo2.png", // 👈 ejemplo usando imagen en lugar de ícono
    },
    {
      to: "/impresion-horarios",
      title: "Impresión de Horarios",
      subtitle: "Ver Horarios",
      Icon: EditNoteIcon,
    },
  ];

  return (
    <Box m="20px">
      {/* Componente de cabecera reutilizable */}
      <Header title="Acciones Rápidas" subtitle="Accede a las rutas comunes." />

      {/* Contenedor principal en formato grid */}
      <Box
        display="grid"
        gap="20px"
        gridTemplateColumns="repeat(4, minmax(220px, 1fr))"
      >
        {/**
         * Iteración sobre el array `actions`
         * Cada acción se renderiza dentro de un Paper (tarjeta clickeable)
         */}
        {actions.map(({ to, title, subtitle, Icon, imgSrc }) => (
          <Paper
            key={to}
            elevation={0}
            component={Link} // Para que toda la tarjeta sea un enlace
            to={to}
            style={{ textDecoration: "none" }}
            sx={{
              p: 3,
              height: 300,
              borderRadius: 3,
              bgcolor: "transparent",
              transition: "all .18s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 6px 20px rgba(0,0,0,.35)"
                    : "0 6px 20px rgba(0,0,0,.08)",
                borderColor: colors.grey[200],
              },
            }}
          >
            {/* Contenedor para el contenido interno de la tarjeta */}
            <Stack spacing={1.5} alignItems="center" textAlign="center">
              {/* Renderiza el ícono o la imagen según corresponda */}
              {Icon ? (
                <Box fontSize={200} lineHeight={0} mb={1}>
                  <Icon fontSize="inherit" sx={{ color: colors.grey[100] }} />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={title}
                    style={{
                      width: "300px",   // tamaño máximo de la imagen
                      height: "200px",   // mantiene proporciones
                      objectFit: "contain",
                      display: "block", // evita espacios en blanco debajo
                    }}
                  />
                </Box>
              )}

              {/* Título de la tarjeta */}
              <Typography fontSize={32} fontWeight={700} color={colors.grey[100]}>
                {title}
              </Typography>

              {/* Subtítulo o descripción */}
              <Typography
                fontSize={24}
                color={colors.grey[300]}
                sx={{ lineHeight: 1.2 }}
              >
                {subtitle}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Inicio;
