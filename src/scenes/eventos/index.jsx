import { useRef, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    Select,
    MenuItem,
    useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";

/* ===========================
   Valores iniciales del form
   =========================== */
const initialValues = {
    membresia: "",
    folio: "",
    password: "",
    nombres: "",
    apellidoP: "",
    apellidoM: "",
    fechaN: "",
    sexo: "",
    codigoP: "",
    colonia: "",
    calle: "",
    numero: "",
};

/* ===========================
   Schema de validación (Yup)
   *Nota*: quité campos "email" y "contact"
   porque no existen en initialValues.
   =========================== */
const userSchema = yup.object().shape({
    folio: yup.string().required("Campo Requerido"),
    password: yup.string().required("Campo Requerido"),
    nombres: yup.string().required("Campo Requerido"),
    apellidoP: yup.string().required("Campo Requerido"),
    apellidoM: yup.string().required("Campo Requerido"),
    codigoP: yup.string().required("Campo Requerido"),
    colonia: yup.string().required("Campo Requerido"),
});

const Eventos = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // Ref para disparar submit desde el botón "Guardar" (fuera del <form>)
    const submitFormRef = useRef(null);

    // Estado para imagen (preview y archivo real)
    const [avatarPreview, setAvatarPreview] = useState("/assets/user2.jpg"); // default
    const [avatarFile, setAvatarFile] = useState(null);

    // Handler de carga de imagen
    const handleChangeImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
    };

    // Submit de Formik
    const handleFormSubmit = (values) => {
        console.log("🚀 Datos del socio:", values);
        if (avatarFile) {
            console.log("🖼️ Imagen seleccionada:", {
                name: avatarFile.name,
                size: avatarFile.size,
                type: avatarFile.type,
            });
        } else {
            console.log("🖼️ Sin imagen personalizada (se usó la predeterminada).");
        }

        // Si luego envías a backend con multipart/form-data:
        // const formData = new FormData();
        // Object.entries(values).forEach(([k, v]) => formData.append(k, v));
        // if (avatarFile) formData.append("foto", avatarFile);
        // await fetch("/api/socios", { method: "POST", body: formData });
    };

    return (
        <Box m="20px">
            <Header title="SOCIOS" 
            subtitle="Guardar o Actualizar Socio"/>
            <Box display="flex" gap={4}>
                {/* ======= Columna izquierda: Formulario ======= */}
                <Box flex={3}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={userSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => {
                            // Guardamos handleSubmit para usarlo con el botón externo "Guardar"
                            submitFormRef.current = handleSubmit;

                            return (
                                <form onSubmit={handleSubmit}>
                                    <Box
                                        display="grid"
                                        gap="20px"
                                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": {
                                                gridColumn: isNonMobile ? undefined : "span 2",
                                            },
                                        }}
                                    >
                                        {/* Membresia */}
                                        <Typography
                                            sx={{ minWidth: "100px", gridColumn: "span 2" }}
                                            fontWeight="bold"
                                            fontSize="28px"
                                        >
                                            Informacion de Membresia
                                        </Typography>

                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Tipo de Membresia
                                        </Typography>
                                        <FormControl fullWidth size="small">
                                            <Select
                                                placeholder="Tipo de Membresia"
                                                value={values.membresia}
                                                name="membresia"
                                                onChange={handleChange}
                                                sx={{ borderRadius: "20px" }}
                                            >
                                                <MenuItem value="individual">Individual</MenuItem>
                                                <MenuItem value="familiar">Familiar</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* Informacion del Socio */}
                                        <Typography
                                            sx={{ minWidth: "100px", gridColumn: "span 2" }}
                                            fontWeight="bold"
                                            fontSize="28px"
                                        >
                                            Informacion del Socio
                                        </Typography>

                                        {/* Folio */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Folio
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Folio"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.folio}
                                            name="folio"
                                            error={!!touched.folio && !!errors.folio}
                                            helperText={touched.folio && errors.folio}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Password */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Password
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Nombres */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Nombres
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Nombres"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.nombres}
                                            name="nombres"
                                            error={!!touched.nombres && !!errors.nombres}
                                            helperText={touched.nombres && errors.nombres}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Apellido Paterno */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Apellido Paterno
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Apellido Paterno"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.apellidoP}
                                            name="apellidoP"
                                            error={!!touched.apellidoP && !!errors.apellidoP}
                                            helperText={touched.apellidoP && errors.apellidoP}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Apellido Materno */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Apellido Materno
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Apellido Materno"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.apellidoM}
                                            name="apellidoM"
                                            error={!!touched.apellidoM && !!errors.apellidoM}
                                            helperText={touched.apellidoM && errors.apellidoM}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Fecha de Nacimiento */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Fecha de Nacimiento
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="date"
                                            placeholder="Fecha de Nacimiento"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.fechaN}
                                            name="fechaN"
                                            error={!!touched.fechaN && !!errors.fechaN}
                                            helperText={touched.fechaN && errors.fechaN}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Sexo */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Sexo
                                        </Typography>
                                        <FormControl fullWidth size="small">
                                            <Select
                                                placeholder="Sexo"
                                                value={values.sexo}
                                                name="sexo"
                                                onChange={handleChange}
                                                sx={{ borderRadius: "20px" }}
                                            >
                                                <MenuItem value="masculino">Masculino</MenuItem>
                                                <MenuItem value="femenino">Femenino</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* Domicilio */}
                                        <Typography
                                            sx={{ minWidth: "100px", gridColumn: "span 2" }}
                                            fontWeight="bold"
                                            fontSize="28px"
                                        >
                                            Domicilio
                                        </Typography>

                                        {/* Código Postal */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Codigo Postal
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Codigo Postal"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.codigoP}
                                            name="codigoP"
                                            error={!!touched.codigoP && !!errors.codigoP}
                                            helperText={touched.codigoP && errors.codigoP}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Colonia */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Colonia
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Colonia"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.colonia}
                                            name="colonia"
                                            error={!!touched.colonia && !!errors.colonia}
                                            helperText={touched.colonia && errors.colonia}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Calle */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Calle
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Calle"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.calle}
                                            name="calle"
                                            error={!!touched.calle && !!errors.calle}
                                            helperText={touched.calle && errors.calle}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Número */}
                                        <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">
                                            Numero
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            placeholder="Numero"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.numero}
                                            name="numero"
                                            error={!!touched.numero && !!errors.numero}
                                            helperText={touched.numero && errors.numero}
                                            sx={{ gridColumn: "span 1" }}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />
                                    </Box>
                                </form>
                            );
                        }}
                    </Formik>
                </Box>

                {/* ======= Columna derecha: Foto con upload y preview ======= */}
                <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ alignSelf: "center", mr: "100px", ml: "100px" }}
                >
                    {/* Preview circular */}
                    <Box
                        sx={{
                            width: 380,
                            height: 380,
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: `4px solid ${colors.grey[300]}`,
                            boxShadow:
                                theme.palette.mode === "dark"
                                    ? "0 6px 18px rgba(0,0,0,.4)"
                                    : "0 6px 18px rgba(0,0,0,.1)",
                        }}
                    >
                        <img
                            src={avatarPreview}
                            alt="Socio"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Box>

                    {/* Botón para subir imagen */}
                    <Button
                        variant="contained"
                        component="label"
                        color="secondary"
                        sx={{ mt: 2, px: 4 }}
                    >
                        Subir Foto
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleChangeImage}
                        />
                    </Button>
                </Box>
            </Box>

            {/* ======= Botones inferiores ======= */}
            <Box display="flex" justifyContent="end" mt="20px">
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    sx={{ mr: "20px", width: "300px" }}
                    onClick={() => submitFormRef.current?.()} // dispara el submit de Formik
                >
                    Guardar
                </Button>

                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    size="large"
                    sx={{ mr: "20px", width: "300px" }}
                >
                    Eliminar
                </Button>

                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    size="large"
                    sx={{ mr: "20px", width: "300px" }}
                    component={Link}
                    to="/verSocios"
                >
                    Ver Socios
                </Button>
            </Box>
        </Box>
    );
};

export default Eventos;
