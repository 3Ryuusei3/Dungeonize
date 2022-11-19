# DUNGEON EVENT

## ROLES

- Mínimo 3 roles

  - Jugador

    - Registrarse e iniciar sesión
    - Crear personaje y ver sus detalles
    - Unirse a eventos
    - Añadir amigos
    - Escribir en eventos / foro
    - Editar su perfil
    - Editar personaje

  - DM

    - Tiene privilegios de Jugador
    - Puede editar (dar puntos, dinero, subir de nivel...) a personajes de jugadores
    - Crear eventos y eliminar
    - Invitar a jugadores a eventos
    - No interactúa con la tienda

  - Admin

    - Tiene privilegios de jugador y DM
    - Puede hacer que algunos objetos de la tienda no estén visibles para el jugador (???)
    - Editar y eliminar personajes o jugadores
    - Puede promotear de jugador a DM

## RUTAS Y DETALLES

> N: Todos y no registrados / T: Todos registrados / J: Jugador / D: DM / A: Admin
> Admin tiene acceso a todo

- Inicio (N)
- Registro (N)
- Inicio de sesión (N)
- Tus ajustes (T)
  - Ajustes - Editar cuenta
  - Solicitudes de amistad
- Mis personajes (T)
  - Detalles
    - Info
    - Trasfondo
    - Rasgos
    - Equipo
    - Tienda
  - Editar
  - Eliminar - Botón
- Eventos (T)
  - Crear evento (D) - Se une automáticamente - Botón
  - Crear evento (A) - Elegir DM que lleva el evento // Bonus :)
  - Añadir a jugadores a eventos (D)
  - Eliminar evento propios (D) - Botón
  - Eliminar evento todos (A) - Botón
  - Página de cada evento (T)
    - Unirse (J)
    - Detalles del evento
      - Quién asiste
        - Botón de agregar a amigos
      - Geolocalización
      - Hora / fecha
    - Foro (T)
- Amigos (T)
  - Lista de amigos
    - Ver perfil de cada personaje
      - Eventos a los que asiste (hipervínculo)
    - Eliminar de amigos
- Panel de DM (D, A)
  - Lista de eventos creados
  - Listado de player para agregar amigos
- Panel de Admin
  - Lista de usuarios
    - Puede pasar de jugador a DM y viceversa
    - Editar y eliminar
  - Lista de eventos
    - Editar y eliminar
- Footer
  - Víctor y Manu 2022
  - Frasecita copyright

## SÁBADO 19

- Modelos
  - de Jugador - DM - Admin
  - de personaje
  - de eventos
- CRUD
  1.  Cuentas
  - de crear cuenta y registrarse
  - de editar cuenta y eliminarla
  - Admin pueden borrar cuentas
  2. Eventos
     - DM puede crear eventos
     - Admin pueden borrar eventos
- Layout inicial
  - Inicio (N)
  - Registro (N)
  - Inicio de sesión (N)
  - Tu perfil (T)
- Middlewares
  - checkIfAdmin
  - checkIfDm

## DOMINGO 20

- Hojas de personajes
- Investigar Navbar en base a roles

## DÍAS SIGUIENTES

- Eventos
  - Geolocalización
  - Markers
- Navbar en base a roles
- Diseño - logotipo - nombre
- Tienda
- Paneles de control

## BONUS

- [ ] Crear BBDD para que el jugador pueda investigar antes de hacer el personaje
- [ ] Bloquear a jugadores de eventos (???)
- [ ] Campaña
- [ ] Jugadores pueden intercambiar objetos
- [ ] ¿Modo oscuro?
- [ ] Responsiveness
