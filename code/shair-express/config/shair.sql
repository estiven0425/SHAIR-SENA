-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2024 a las 00:36:05
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `shair`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id_administrador` int(100) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `celular` bigint(100) NOT NULL,
  `telefono` bigint(100) DEFAULT NULL,
  `contraseña` varchar(250) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id_administrador`, `nombre`, `email`, `celular`, `telefono`, `contraseña`, `fecha_creacion`) VALUES
(29, 'Administrador', 'administrador@shair.com', 3242018817, NULL, '$2b$10$SZduCUpev5aJoO./boXIOeIttHZyfi4hDTIdytk4/oGmcEaGIO10q', '2024-07-08 20:55:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncio`
--

CREATE TABLE `anuncio` (
  `id` int(100) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `enunciado` varchar(1000) NOT NULL,
  `archivo_adjunto` varchar(1000) DEFAULT NULL,
  `fecha_expiracion` date NOT NULL,
  `mas_informacion` varchar(1000) DEFAULT NULL,
  `id_administrador` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `anuncio`
--

INSERT INTO `anuncio` (`id`, `nombre`, `enunciado`, `archivo_adjunto`, `fecha_expiracion`, `mas_informacion`, `id_administrador`) VALUES
(7, '¿Qué son los anuncios?', 'Los anuncios son noticias de mayor impacto, que no buscan difundir información de eventos, si no, alertas temporales como avisos urgentes o solicitudes temporales, estos desaparecen pasado el tiempo de expiración (Función pendiente de desarrollo)', 'uploads/logo.png', '2024-06-20', 'Preguntar al equipo de desarrollo', 29),
(8, '¿Cómo funciona la edición?', 'Al editar una noticia o anuncio, este pasa a ser propiedad del administrador que lo modificó por última vez, impidiendo de esta manera que se haga usurpación de identidad', 'uploads/logo.png', '2024-06-20', 'Preguntar al equipo de desarrollo', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticia`
--

CREATE TABLE `noticia` (
  `id` int(100) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `enunciado` varchar(1000) NOT NULL,
  `archivo_adjunto` varchar(1000) DEFAULT NULL,
  `lugar` varchar(250) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `mas_informacion` varchar(1000) DEFAULT NULL,
  `id_administrador` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `noticia`
--

INSERT INTO `noticia` (`id`, `nombre`, `enunciado`, `archivo_adjunto`, `lugar`, `fecha_inicio`, `fecha_fin`, `mas_informacion`, `id_administrador`) VALUES
(46, '¿Qué son las noticias?', 'Las noticias son comunicados sobre eventos que se llevaran a cabo, estos eventos los pueden programar los diferentes entes de la institución', 'uploads/logo.png', 'Oficina', '2024-06-20', '2024-06-20', 'Preguntar al equipo de desarrollo', 29),
(47, '¿Cómo funciona SHAIR?', 'SHAIR clasifica su contenido en noticias y anuncios, cada uno con un propósito y función diferente; SHAIR es administrador por dos roles, superadministrador y administrador, el superadministrador tiene control sobre los administradores y sus noticias, mientras que los administradores tienen control sobre las noticias, anuncios y recomendaciones', 'uploads/logo.png', 'Oficina', '2024-06-20', '2024-06-20', 'Preguntar al equipo de desarrollo', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recomendacion`
--

CREATE TABLE `recomendacion` (
  `id` int(100) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `enunciado` varchar(1000) NOT NULL,
  `archivo_adjunto` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recomendacion`
--

INSERT INTO `recomendacion` (`id`, `nombre`, `enunciado`, `archivo_adjunto`) VALUES
(22, '¿Qué son las recomendaciones?', 'La recomendaciones son mensajes que cualquier usuario que haga uso de la página puede enviar a los administradores, ya sea para sugerir una noticia, solicitar que se haga un anuncio, poner una queja y mucho más, este es la forma en que los aprendices, interactúan con los administradores', 'review/logo.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `superadministrador`
--

CREATE TABLE `superadministrador` (
  `id` int(100) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `celular` bigint(100) NOT NULL,
  `telefono` bigint(100) DEFAULT NULL,
  `contraseña` varchar(250) NOT NULL,
  `perfil_ocupacional` varchar(250) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `superadministrador`
--

INSERT INTO `superadministrador` (`id`, `nombre`, `email`, `celular`, `telefono`, `contraseña`, `perfil_ocupacional`, `fecha_creacion`) VALUES
(1, 'Superadministrador', 'superadministrador@shair.com', 324201881, NULL, 'contraseña', 'Gerente', '2024-06-12 18:34:12');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_administrador`);

--
-- Indices de la tabla `anuncio`
--
ALTER TABLE `anuncio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_administrador` (`id_administrador`);

--
-- Indices de la tabla `noticia`
--
ALTER TABLE `noticia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_administrador` (`id_administrador`);

--
-- Indices de la tabla `recomendacion`
--
ALTER TABLE `recomendacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `superadministrador`
--
ALTER TABLE `superadministrador`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_administrador` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `anuncio`
--
ALTER TABLE `anuncio`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `noticia`
--
ALTER TABLE `noticia`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `recomendacion`
--
ALTER TABLE `recomendacion`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `superadministrador`
--
ALTER TABLE `superadministrador`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `anuncio`
--
ALTER TABLE `anuncio`
  ADD CONSTRAINT `anuncio_ibfk_1` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`);

--
-- Filtros para la tabla `noticia`
--
ALTER TABLE `noticia`
  ADD CONSTRAINT `noticia_ibfk_1` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
