import app from './configs/app.js';

const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});