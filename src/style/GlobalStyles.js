import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
/* Reset CSS e configurazione di base */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 24px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

/* Corpo della pagina con gradiente animato */
body {
    background: linear-gradient(-45deg, #26b567, #2E8B57, #20B2AA, #1E90FF);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    min-height: 100vh;
    overflow-x: hidden;
}

/* Animazione del gradiente di sfondo */
@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

/* Animazione di pulsazione */
@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

/* Animazione di rotazione */
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Animazione di rimbalzo */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

/* Animazione shake per errori */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* Animazione fluttuante per splash screen */
@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
    }
    33% {
        transform: translateY(-20px) rotate(120deg);
    }
    66% {
        transform: translateY(10px) rotate(240deg);
    }
}

/* Animazione glow pulsante */
@keyframes glow {
    0%, 100% {
        box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
    }
    50% {
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6);
    }
}

/* Animazione shimmer per elementi di caricamento */
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

/* Scrollbar personalizzata */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}

/* Utilità per elementi responsive */
@media (max-width: 768px) {
    * {
        font-size: 20px;
    }
}

@media (max-width: 480px) {
    * {
        font-size: 18px;
    }
}

/* Prevenzione del focus outline su mobile */
@media (hover: none) and (pointer: coarse) {
    *:focus {
        outline: none;
    }
}
`;

export default GlobalStyle;
