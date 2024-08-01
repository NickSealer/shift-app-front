# README

- [Instrucciones](#instrucciones)
- [Sobre la app](#sobre-la-app)
- [Características](#características)
- [Alcance](#alcance)
- [Restricciones](#restricciones)

## Instrucciones
Aplicación creada con React v18.3.3.

### Dependencias

- Node v20.12.0
- npm 10.5.0

### Instalación
Clonar el repositorio y ejecutar los siguientes comandos:
```
npm install
npm run dev
```
Users:
```
<!-- Usuarios estándar-->
email: ernesto@email.com
password: Password123?

email: barbara@email.com
password: Password123?

email: benjamin@email.com
password: Password123?

<!-- Usuario admin -->
email: admin@email.com
password: Password123?

```

## Sobre la app
Es una aplicación para el control de turnos de trabajo. En ella, el personal asignado a los servicios o compañías pueden crear sus calendarios de disponibilidad desde la semana actual hasta 4 más en el futuro, con el objetivo de dar a conocer su disponibilidad de 5 semanas a su supervisor. Permite realizar los ajustes necesarios antes de confirmar su hoja de turnos para mayor comodidad. La aplicación también permite la asignación de los turnos por parte del supervisor para cumplir con las horas semanales que exige el servicio, al tiempo que le da una visión de quienes han confirmado su disponibilidad y quienes no, lo que permite tener un control al momento de confirmar la hoja de turnos.

> Nota: Es una aplicación MVP para el control de turnos de trabajo, por ello cuenta con algunas restricciones y funciona con un set de usuario inicial.

## Características

- Login de usuarios.
- Logout de usuarios.
- Visualización de servicios asignados.
- Los horarios confirmados son resaltados con un color azul verdoso.
- Los horarios sin confirmar se resaltan con una tonalidad rojiza.

**Rol user:**
- Visualización de disponibilidades.
- Creación de disponibilidad.
- Actualización de disponibilidad.
- Confirmación de disponibilidad.

**Rol admin:**
- Visualización de hojas de turno.
- Creación de hojas de turno.
- Asignación de disponibilidades.
- Confirmación de la hoja de turnos.
- Eliminación de hojas de turno.


## Alcance
- El inicio de sesión reconoce el rol del usuario y lo redirige a las vistas correspondientes.
- Visualización de todos los servicios en los que se esté asignado.

**Rol user:**
- Visualización de sus hojas de disponibilidad por servicio.
- Creación de hojas de disponibilidad, con selección de 5 semanas, están se van actualizando a medida que hay cambio de semana.
- Actualización de sus hojas de disponibilidad.
- Confirmación de sus hojas de disponibilidad.

**Rol admin:**
- Visualización de hojas de turnos por servicio.
- Creación automática de hojas de turno.
- Confirmación de las hojas de turno.

## Restricciones
- Creación de hojas de disponibilidad o de turnos únicos por número de semana, año y servicio.
- No se permite la eliminación de hojas de disponibilidad, para eso se pueden actualizar o confirmar, es responsabilidad del usuario registrar su disponibilidad, ya sea con fechas o no, para que el flujo de turnos funcione bien al momento de que el admin/supervisor los quiera confirmar.
- No se permiten cambios en las hojas de disponibilidad una vez confirmadas.
- Creación automática de hojas de turno. El sistema es capaz de identificar el consecutivo de la semana y año, y asociar a ésta los usuarios implicados que deben registrar su disponibilidad para esa semana y servicio.
- Para confirmar una hoja de turnos, el admin/supervisor puede elegir quienes estarán en según qué día y hora presentes, ya sea turno en solitario o compartido.
- El sistema le indica al admin/supervisor las horas requeridas por el servicio y las horas disponibles por los usuarios, de ese modo puede ver si hacen falta o se excede, y cumplir con las horas solicitadas.
- No se permite la creación de hojas de turnos donde las horas no coincidan con las requeridas por el servicio, tienen que ser iguales.
- No se permite la creación de hojas de turnos si todos los usuario asignados a él no han cargado sus hojas de disponibilidad.
- No se permite la eliminación de hojas de turno una vez confirmadas.
- No se permite crear más hojas de turnos cuando éstas son un total de 10 sin confirmar.
