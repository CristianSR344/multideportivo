import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
import { Routes, Route } from "react-router-dom";
import Usuarios from "./scenes/verUsuarios";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Socios from "./scenes/socios";
import Espacios from "./scenes/espacios";
import Instructores from "./scenes/instructores";
import VerSocios from "./scenes/verSocios";
import Inicio from "./scenes/inicio";
import Actividades from "./scenes/actividades";

// import Bar from "./scenes/bar";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar"



function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/verUsuarios" element={<Usuarios />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/socios" element={<Socios />} />
            <Route path="/verSocios" element={<VerSocios />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/instructores" element={<Instructores />} />
            {/* <Route path="/bar" element={<Bar />} /> */}
            {/* <Route path="/pie" element={<Pie />} /> */}
            {/* <Route path="/line" element={<Line />} /> */}
            {/* <Route path="/faq" element={<FAQ />} /> */}
            {/* <Route path="/geography" element={<Geography />} /> */}
            {/* <Route path="/calendar" element={<Calendar />} /> */}
            </Routes> 
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
