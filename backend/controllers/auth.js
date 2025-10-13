import poolPromise from "../connect.js";
import sql from "mssql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/* ============================
   REGISTRO DE USUARIOS
=============================== */
export const register = async (req, res) => {
    const {
        id_usuario,
        nombre,
        apellidoP,
        apellidoM,
        correo,
        password,
        cp,
        colonia,
        calle,
        numero,
        sexo,
        dob,
        imagen,
        rol
    } = req.body;

    try {
        const pool = await poolPromise;

        // 1️⃣ Verificar si ya existe un usuario con ese correo o ID
        const check = await pool.request()
            .input("id_usuario", sql.Int, id_usuario)
            .input("correo", sql.VarChar(50), correo)
            .query(`
        SELECT 1 FROM dbo.usuarios
        WHERE id_usuario = @id_usuario OR correo = @correo
      `);

        if (check.recordset.length) {
            return res.status(409).json({ message: "El usuario ya existe" });
        }

        // 2️⃣ Hashear contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // 3️⃣ Insertar usuario
        await pool.request()
            .input("id_usuario", sql.Int, id_usuario)
            .input("nombre", sql.VarChar(45), nombre)
            .input("apellidoP", sql.VarChar(50), apellidoP)
            .input("apellidoM", sql.VarChar(50), apellidoM)
            .input("correo", sql.VarChar(50), correo)
            .input("contraseña", sql.VarChar(200), hashedPassword)
            .input("cp", sql.Int, cp)
            .input("colonia", sql.VarChar(100), colonia)
            .input("calle", sql.VarChar(100), calle)
            .input("numero", sql.Int, numero)
            .input("sexo", sql.VarChar(10), sexo)
            .input("dob", sql.Date, dob ? new Date(dob) : null)
            .input("imagen", sql.VarBinary(sql.MAX), imagen ? Buffer.from(imagen, "base64") : null)
            .input("rol", sql.Int, rol)
            .query(`
        INSERT INTO dbo.usuarios
        (id_usuario, nombre, apellidoP, apellidoM, correo, contraseña, cp, colonia, calle, numero, sexo, dob, imagen, rol)
        VALUES
        (@id_usuario, @nombre, @apellidoP, @apellidoM, @correo, @contraseña, @cp, @colonia, @calle, @numero, @sexo, @dob, @imagen, @rol)
      `);

        res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (err) {
        console.error("❌ Error en register:", err);
        res.status(500).json({ error: err.message });
    }
};

/* ============================
   CREAR NUEVO ROL
=============================== */
export const rol = async (req, res) => {
    const { idRoles, descripcion } = req.body;

    try {
        const pool = await poolPromise;

        // 1️⃣ Verificar si ya existe el rol
        const existe = await pool.request()
            .input("idRoles", sql.Int, idRoles)
            .query(`SELECT 1 FROM dbo.roles WHERE idRoles = @idRoles`);

        if (existe.recordset.length > 0) {
            return res.status(409).json({ message: "El rol ya existe" });
        }

        // 2️⃣ Insertar nuevo rol
        await pool.request()
            .input("idRoles", sql.Int, idRoles)
            .input("descripcion", sql.VarChar(20), descripcion)
            .query(`
        INSERT INTO dbo.roles (idRoles, descripcion)
        VALUES (@idRoles, @descripcion);
      `);

        res.status(201).json({ message: "Rol creado correctamente" });
    } catch (err) {
        console.error("❌ Error al crear rol:", err);
        res.status(500).json({ error: err.message });
    }
};

/* ============================
   LOGIN
=============================== */
export const login = async (req, res) => {
    const { id_usuario, password } = req.body;

    try {
        const pool = await poolPromise;

        // Buscar usuario por ID
        const result = await pool.request()
            .input("id_usuario", sql.Int, id_usuario)
            .query(`
        SELECT 
          id_usuario, nombre, apellidoP, apellidoM, correo, 
          [contraseña] AS hash, rol
        FROM dbo.usuarios
        WHERE id_usuario = @id_usuario
      `);

        // 1️⃣ Usuario no encontrado
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = result.recordset[0];

        // 2️⃣ Validar contraseña
        const passwordOk = bcrypt.compareSync(password, user.hash);
        if (!passwordOk) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // 3️⃣ Generar JWT
        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                rol: user.rol
            },
            "mi_secreto_super_seguro_123", // 🔒 Clave fija solo para pruebas locales
            { expiresIn: "1d" }
        );

        // 4️⃣ Configurar cookie
        res.cookie("accessToken", token, {
            httpOnly: true,      // evita acceso desde JS
            secure: false,       // ⚠️ en local sin HTTPS, debe estar en false
            sameSite: "Lax",     // permite peticiones desde el mismo dominio
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });

        // 5️⃣ Enviar respuesta
        const { hash, ...userData } = user;
        return res.status(200).json({
            message: "Login exitoso",
            user: userData,
            token // opcional: por si también quieres usarlo en el front
        });

    } catch (err) {
        console.error("❌ Error en login:", err);
        return res.status(500).json({ error: err.message });
    }
};
/* ============================
   LOGOUT
=============================== */
export const logout = (_req, res) => {
    // En este caso el logout se maneja desde el cliente (borrar token).
    res.json({ message: "Logout exitoso" });
};
