# Proyecto de Aplicación Bancaria en React

Este proyecto es una aplicación web desarrollada con React que simula un sistema bancario, permitiendo a los usuarios iniciar sesión, ver sus movimientos, realizar transferencias, solicitar préstamos y cerrar cuentas.

## Características Principales
- Sistema de autenticación de usuarios
- Visualización de movimientos bancarios con fechas relativas
- Transferencias entre cuentas con validaciones
- Sistema de préstamos (limitado al 200% del balance)
- Cierre de cuentas
- Ordenamiento de movimientos por fecha
- Generación de datos aleatorios con faker.js
- Diseño responsive y atractivo

## Tecnologías Utilizadas
- React 19
- JavaScript (ES6+)
- Vite como bundler
- Moment.js para manejo de fechas
- Faker.js para generación de datos aleatorios
- CSS para estilos
- Control de versiones Git

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/banco_app_react.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm run dev
   ```

## Credenciales de Acceso
Puedes iniciar sesión con las siguientes cuentas de prueba:

| Propietario     | Nombre de usuario | PIN  |
|-----------------|-------------------|------|
| Juan Sanchez    | js                | 1111 |
| Maria Garcia    | mg                | 2222 |
| Pedro Martinez  | pm                | 3333 |
| Ana Rodriguez   | ar                | 4444 |

El nombre de usuario se genera automáticamente a partir de las iniciales del propietario.

## Estructura del Proyecto
- `/src`: Código fuente principal
  - `/Balance`: Componente para mostrar el balance actual
  - `/Login`: Componente de autenticación
  - `/Movements`: Componente para visualizar movimientos
  - `/Operations`: Componente para transferencias, préstamos y cierre de cuenta
  - `/Summary`: Componente resumen de movimientos
  - `/Welcome`: Componente de bienvenida
  - `App.jsx`: Componente principal
  - `accounts.js`: Datos de cuentas para la simulación

## Funcionalidades
- **Autenticación**
  - Inicio de sesión con usuario y PIN
  - Validación de credenciales
  
- **Visualización de Movimientos**
  - Lista de transacciones con tipo (depósito/retiro)
  - Fechas en formato relativo ("hace X días")
  - Ordenamiento por fecha reciente/antigua
  
- **Operaciones Bancarias**
  - **Transferencias**: Envío de dinero entre cuentas con validaciones
    - Verificación de existencia de cuentas
    - Validación de saldo suficiente
    - Control de montos positivos
  
  - **Préstamos**: Solicitud de préstamos
    - Validación de montos (no superiores al 200% del balance)
    - Verificación de depósito mínimo del 10%
  
  - **Cierre de Cuenta**: Eliminación de cuenta con verificación

- **Características Adicionales**
  - Resumen de entradas y salidas de dinero
  - Interfaz intuitiva y atractiva
  - Feedback visual de operaciones

## Requisitos Cumplidos
- Implementación de movimientos como objetos con fecha
- Uso de moment.js para formatear fechas relativamente
- Ordenamiento de movimientos por fecha
- Validación completa de transferencias y préstamos
- Cierre de cuentas funcional
- Generación de datos aleatorios con faker.js

## Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:
1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT.

## Autor
Felipe Ortiz
