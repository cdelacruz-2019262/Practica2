import jwt from 'jsonwebtoken';

// Middleware para validar el token JWT
export const validateJwt = (req, res, next) => {
    // Obtener el token de los headers de la solicitud
    const token = req.headers.authorization;

    const currentRoute = req.path;

    const publicRoutes = ['/auth/login', '/courses'];

    if (publicRoutes.includes(currentRoute)) {
        return next();
    }

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ message: 'Authentication token not provided.' });
    }

    try {
        //verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid authentication token', err });
    }

    try{
        return jwt.sign(payload, secretKey, {
         expiresIn: '5h',
         algorithm: 'HS256'
       })  
     }catch(err){
         console.error(err)
         return err
     }
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
};

    