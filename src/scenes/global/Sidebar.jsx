import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

// 🔁 Item ahora recibe la ruta actual (currentPath) para marcar activo
const Item = ({ title, to, icon, currentPath }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={currentPath === to} // 👈 activo si la URL coincide
            style={{ color: colors.grey[100] }}
            icon={icon}
        >
            {/* Texto del item (tamaño + peso) */}
            <Typography fontSize="18px">
                {title}
            </Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { pathname } = useLocation(); // 👈 ruta actual

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                    minHeight: "100vh !important",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                // Tamaño global del texto de los items
                "& .pro-inner-item > span": {
                    fontSize: "18px",
                    lineHeight: 1.2,
                },
                "& .pro-inner-item:hover": {
                    color: "#000000ff !important",
                },
                // Activo más marcado
                "& .pro-menu-item.active": {
                    backgroundColor: "#E3D5D5 !important",
                    borderRadius: "10px",
                },
                "& .pro-menu-item.active > .pro-inner-item > span": {
                    fontWeight: 700,
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <img
                                    width="100px"
                                    height="100px"
                                    alt="profile-user"
                                    src={`../../assets/logo.png`}
                                    style={{ cursor: "pointer" }}
                                />
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {/* Sidebar */}
                        <Item
                            title="Inicio"
                            to="/inicio"
                            icon={<HomeOutlinedIcon />}
                            currentPath={pathname} // 👈 pasamos ruta actual
                        />

                        {/* Usuarios */}
                        <Typography
                            fontSize={28}
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
                        >
                            Usuarios
                        </Typography>
                        <Item
                            title="Usuarios"
                            to="/verUsuarios"
                            icon={<PeopleOutlinedIcon />}
                            currentPath={pathname}
                        />

                        {/* Socios */}
                        <Typography
                            fontSize={28}
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
                        >
                            Socios
                        </Typography>
                        <Item
                            title="Socios"
                            to="/socios"
                            icon={<PeopleOutlinedIcon />}
                            currentPath={pathname}
                        />

                        {/* Instructores */}
                        <Typography
                            fontSize={22}
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
                        >
                            Instructores
                        </Typography>
                        <Item
                            title="Instructores"
                            to="/instructores"
                            icon={<PersonOutlinedIcon />}
                            currentPath={pathname}
                        />

                        {/* Actividades */}
                        <Typography
                            fontSize={22}
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
                        >
                            Actividades
                        </Typography>
                        <Item
                            title="Actividades"
                            to="/actividades"
                            icon={<BarChartOutlinedIcon />}
                            currentPath={pathname}
                        />
                        <Item
                            title="Espacios"
                            to="/espacios"
                            icon={<MapOutlinedIcon />}
                            currentPath={pathname}
                        />

                        {/* Eventos */}
                        <Typography
                            fontSize={22}
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
                        >
                            Eventos
                        </Typography>
                        <Item
                            title="Envio de Eventos"
                            to="/eventos"
                            icon={<CalendarTodayOutlinedIcon />}
                            currentPath={pathname}
                        />

                        {/* Reportes */}
                        <Typography
                            fontSize={22}
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px", fontWeight: "bold" }}
                        >
                            Reportes
                        </Typography>
                        <Item
                            title="Reporte de Accidentes"
                            to="/team"
                            icon={<ReceiptOutlinedIcon />}
                            currentPath={pathname}
                        />
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                        <img
                            width="100%"
                            height="100%"
                            alt="profile-user"
                            src={`../../assets/logo2.png`}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
