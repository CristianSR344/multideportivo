// src/scenes/socios/index.jsx
import { useRef, useState, useEffect, useMemo } from "react";
import {
    Box, Button, TextField, Typography, FormControl, Select, MenuItem, useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import axios from "axios";

const initialValues = {
    membresia: "", // idMembresia
    folio: "",
    password: "",
    nombres: "",
    apellidoP: "",
    apellidoM: "",
    fechaN: "",
    correo: "",
    sexo: "",      // "masculino" | "femenino"
    codigoP: "",
    colonia: "",
    calle: "",
    numero: "",
    rol: "",       // idRoles
};

// helper: ¿el id de rol corresponde a "Socio"?
const isSocioById = (roles, rolId) => {
    const r = roles.find(x => Number(x.idRoles) === Number(rolId));
    return r ? r.descripcion?.toLowerCase() === "socio" : false;
};

const Socios = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const submitFormRef = useRef(null);

    const [avatarPreview, setAvatarPreview] = useState("/assets/user2.jpg");
    const [avatarFile, setAvatarFile] = useState(null);
    const [err, setErr] = useState("");

    const [roles, setRoles] = useState([]);
    const [membresias, setMembresias] = useState([]);

    // instancia axios
    const api = useMemo(() => axios.create({
        baseURL: "https://multideportivobackend-aecmffdgfwf9bmg8.mexicocentral-01.azurewebsites.net",
    }), []);

    // cargar catálogos
    useEffect(() => {
        const fetchCatalogos = async () => {
            try {
                const resRoles = await api.get("/api/roles/getRoles");
                setRoles(resRoles.data || []);
                const resM = await api.get("/api/membresias/getMembresias");
                setMembresias(resM.data || []);
            } catch (e) {
                console.error("Error cargando catálogos:", e);
            }
        };
        fetchCatalogos();
    }, [api]);

    const handleChangeImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
    };

    // archivo -> base64 (solo payload)
    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    // esquema con validación condicional de membresía
    const schema = useMemo(() => {
        return yup.object().shape({
            folio: yup.string().required("Campo Requerido"),
            password: yup.string().required("Campo Requerido"),
            nombres: yup.string().required("Campo Requerido"),
            apellidoP: yup.string().required("Campo Requerido"),
            apellidoM: yup.string().required("Campo Requerido"),
            correo: yup.string().email("Correo inválido").required("Campo Requerido"),
            codigoP: yup.string().required("Campo Requerido"),
            colonia: yup.string().required("Campo Requerido"),
            rol: yup.number().typeError("Selecciona un rol").required("Campo Requerido"),
            membresia: yup
                .number()
                .typeError("Selecciona una membresía")
                .when("rol", (rol, s) =>
                    isSocioById(roles, rol)
                        ? s.required("Campo Requerido")
                        : s.notRequired().nullable()
                ),
        });
    }, [roles]);

    return (
        <Box m="20px">
            <Header title="USUARIOS" subtitle="Guardar o Actualizar Usuario" />
            <Box display="flex" gap={4}>
                <Box flex={3}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={async (values, { resetForm }) => {
                            try {
                                setErr("");

                                const imagenBase64 = avatarFile ? await fileToBase64(avatarFile) : null;
                                const socio = isSocioById(roles, values.rol);

                                // 1) Crear usuario
                                const payloadUsuario = {
                                    // id_usuario: (NO enviar si es IDENTITY)
                                    nombre: values.nombres,
                                    apellidoP: values.apellidoP,
                                    apellidoM: values.apellidoM,
                                    correo: values.correo,
                                    password: values.password,
                                    cp: Number(values.codigoP),
                                    colonia: values.colonia,
                                    calle: values.calle,
                                    numero: values.numero ? Number(values.numero) : 0,
                                    sexo: values.sexo === "masculino" ? 1 : 0,
                                    dob: values.fechaN || null,
                                    imagen: imagenBase64,
                                    rol: Number(values.rol),
                                };

                                const res = await api.post("/api/auth/register", payloadUsuario);
                                const userId =
                                    res.data?.userId ??
                                    res.data?.user?.id_usuario ??
                                    res.data?.id_usuario;

                                if (!userId) {
                                    throw new Error("No se recibió id del usuario al registrar.");
                                }

                                // 2) Si es Socio, crear registro en socios
                                if (socio) {
                                    const idMembresia = Number(values.membresia);
                                    await api.post("/api/socios/createSocio", {
                                        idUsuario: Number(userId),
                                        idMembresia,
                                    });
                                }

                                alert("¡Usuario guardado!");
                                resetForm();
                                setAvatarFile(null);
                                setAvatarPreview("/assets/user2.jpg");
                            } catch (e) {
                                console.error(e);
                                setErr(e?.response?.data?.message || e.message || "Error al guardar");
                            }
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
                            submitFormRef.current = handleSubmit;

                            return (
                                <form onSubmit={handleSubmit}>
                                    <Box
                                        display="grid"
                                        gap="20px"
                                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 2" } }}
                                    >
                                        {/* Tipo de Usuario */}
                                        <Typography sx={{ gridColumn: "span 2" }} fontWeight="bold" fontSize="28px">
                                            Tipo de Usuario
                                        </Typography>

                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Rol</Typography>
                                        <FormControl fullWidth size="small">
                                            <Select
                                                value={values.rol}
                                                name="rol"
                                                onChange={(e) => {
                                                    // Asegura número
                                                    e.target.value = Number(e.target.value);
                                                    handleChange(e);
                                                }}
                                                sx={{ borderRadius: "20px" }}
                                                error={!!touched.rol && !!errors.rol}
                                                displayEmpty
                                            >
                                                <MenuItem value="" disabled>Selecciona rol</MenuItem>
                                                {roles.map((r) => (
                                                    <MenuItem key={r.idRoles} value={Number(r.idRoles)}>
                                                        {r.descripcion}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {touched.rol && errors.rol && (
                                                <Typography color="error" variant="caption">{errors.rol}</Typography>
                                            )}
                                        </FormControl>

                                        {/* Membresía: SOLO si rol = Socio */}
                                        {isSocioById(roles, values.rol) && (
                                            <>
                                                <Typography sx={{ gridColumn: "span 2" }} fontWeight="bold" fontSize="28px">
                                                    Información de Membresía
                                                </Typography>

                                                <Typography sx={{ ml: "15px" }} fontSize="24px">
                                                    Tipo de Membresía
                                                </Typography>
                                                <FormControl fullWidth size="small">
                                                    <Select
                                                        value={values.membresia}
                                                        name="membresia"
                                                        onChange={(e) => {
                                                            e.target.value = Number(e.target.value);
                                                            handleChange(e);
                                                        }}
                                                        sx={{ borderRadius: "20px" }}
                                                        error={!!touched.membresia && !!errors.membresia}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>Selecciona membresía</MenuItem>
                                                        {membresias.map((m) => (
                                                            <MenuItem key={m.idMembresia} value={Number(m.idMembresia)}>
                                                                {m.descripcion}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {touched.membresia && errors.membresia && (
                                                        <Typography color="error" variant="caption">{errors.membresia}</Typography>
                                                    )}
                                                </FormControl>
                                            </>
                                        )}

                                        {/* Información del Socio */}
                                        <Typography sx={{ gridColumn: "span 2" }} fontWeight="bold" fontSize="28px">
                                            Información del Socio
                                        </Typography>

                                        {/* Folio */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Folio</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Folio"
                                            onBlur={handleBlur} onChange={handleChange} value={values.folio} name="folio"
                                            error={!!touched.folio && !!errors.folio}
                                            helperText={touched.folio && errors.folio}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Password */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Password</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="password" placeholder="Password"
                                            onBlur={handleBlur} onChange={handleChange} value={values.password} name="password"
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Nombres */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Nombres</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Nombres"
                                            onBlur={handleBlur} onChange={handleChange} value={values.nombres} name="nombres"
                                            error={!!touched.nombres && !!errors.nombres}
                                            helperText={touched.nombres && errors.nombres}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Apellido Paterno */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Apellido Paterno</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Apellido Paterno"
                                            onBlur={handleBlur} onChange={handleChange} value={values.apellidoP} name="apellidoP"
                                            error={!!touched.apellidoP && !!errors.apellidoP}
                                            helperText={touched.apellidoP && errors.apellidoP}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Apellido Materno */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Apellido Materno</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Apellido Materno"
                                            onBlur={handleBlur} onChange={handleChange} value={values.apellidoM} name="apellidoM"
                                            error={!!touched.apellidoM && !!errors.apellidoM}
                                            helperText={touched.apellidoM && errors.apellidoM}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Correo */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Correo</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Correo"
                                            onBlur={handleBlur} onChange={handleChange} value={values.correo} name="correo"
                                            error={!!touched.correo && !!errors.correo}
                                            helperText={touched.correo && errors.correo}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Fecha de Nacimiento */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Fecha de Nacimiento</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="date" placeholder="Fecha de Nacimiento"
                                            onBlur={handleBlur} onChange={handleChange} value={values.fechaN} name="fechaN"
                                            error={!!touched.fechaN && !!errors.fechaN}
                                            helperText={touched.fechaN && errors.fechaN}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Sexo */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Sexo</Typography>
                                        <FormControl fullWidth size="small">
                                            <Select
                                                value={values.sexo} name="sexo" onChange={handleChange} sx={{ borderRadius: "20px" }}
                                            >
                                                <MenuItem value="masculino">Masculino</MenuItem>
                                                <MenuItem value="femenino">Femenino</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* Domicilio */}
                                        <Typography sx={{ gridColumn: "span 2" }} fontWeight="bold" fontSize="28px">
                                            Domicilio
                                        </Typography>

                                        {/* Código Postal */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Código Postal</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Código Postal"
                                            onBlur={handleBlur} onChange={handleChange} value={values.codigoP} name="codigoP"
                                            error={!!touched.codigoP && !!errors.codigoP}
                                            helperText={touched.codigoP && errors.codigoP}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Colonia */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Colonia</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Colonia"
                                            onBlur={handleBlur} onChange={handleChange} value={values.colonia} name="colonia"
                                            error={!!touched.colonia && !!errors.colonia}
                                            helperText={touched.colonia && errors.colonia}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Calle */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Calle</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Calle"
                                            onBlur={handleBlur} onChange={handleChange} value={values.calle} name="calle"
                                            error={!!touched.calle && !!errors.calle}
                                            helperText={touched.calle && errors.calle}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />

                                        {/* Número */}
                                        <Typography sx={{ ml: "15px" }} fontSize="24px">Número</Typography>
                                        <TextField
                                            fullWidth size="small" variant="outlined" type="text" placeholder="Número"
                                            onBlur={handleBlur} onChange={handleChange} value={values.numero} name="numero"
                                            error={!!touched.numero && !!errors.numero}
                                            helperText={touched.numero && errors.numero}
                                            slotProps={{ input: { sx: { borderRadius: "20px" } } }}
                                        />
                                    </Box>
                                </form>
                            );
                        }}
                    </Formik>
                </Box>

                {/* derecha: imagen */}
                <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ alignSelf: "center", mr: "100px", ml: "100px" }}
                >
                    <Box
                        sx={{
                            width: 380, height: 380, borderRadius: "50%", overflow: "hidden",
                            border: `4px solid ${colors.grey[300]}`,
                            boxShadow: theme.palette.mode === "dark" ? "0 6px 18px rgba(0,0,0,.4)" : "0 6px 18px rgba(0,0,0,.1)",
                        }}
                    >
                        <img
                            src={avatarPreview}
                            alt="Socio"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                    </Box>

                    <Button variant="contained" component="label" color="secondary" sx={{ mt: 2, px: 4 }}>
                        Subir Foto
                        <input type="file" accept="image/*" hidden onChange={handleChangeImage} />
                    </Button>
                </Box>
            </Box>

            {err && <Typography color="error" mt={2}>{err}</Typography>}

            <Box display="flex" justifyContent="end" mt="20px">
                <Button
                    color="secondary" variant="contained" size="large"
                    sx={{ mr: "20px", width: "300px" }}
                    onClick={() => submitFormRef.current?.()}
                >
                    Guardar
                </Button>

                <Button type="button" color="secondary" variant="contained" size="large" sx={{ mr: "20px", width: "300px" }}>
                    Eliminar
                </Button>

                <Button type="button" color="secondary" variant="contained" size="large" sx={{ mr: "20px", width: "300px" }} component={Link} to="/verSocios">
                    Ver Socios
                </Button>
            </Box>
        </Box>
    );
};

export default Socios;
