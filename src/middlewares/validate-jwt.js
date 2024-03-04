import jwt from 'jsonwebtoken';

// Middleware para validar el token JWT
export const validateJwt = (req, res, next, payload) => {
    const token = req.headers.authorization;
    const currentRoute = req.path;
    const publicRoutes = ['/auth/login', '/courses'];

    if (publicRoutes.includes(currentRoute)) {
        return next();
    }

    if (!token) {
        return res.status(401).json({ message: 'Authentication token not provided.' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        //console.log('Contenido de req.student en validateJwt:', req.user);  // Añade este log

        // En este punto, req.user contiene la información del usuario (incluyendo el ID)
        
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid authentication token', err });
    }
    try{

        // Firmar un nuevo token
        const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '5h',
            algorithm: 'HS256'
        });
        
        // Hacer algo con el nuevo token si es necesario
        // ...

        return newToken;;
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
};

