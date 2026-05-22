# ULIMA MARKET

Aplicacion frontend universitaria tipo e-commerce/marketplace creada con React + Vite. Simula dos experiencias:

- **ULIMA MARKETPLACE**: publicaciones entre alumnos para libros, tecnologia, utiles, servicios y productos usados.
- **ULIMA STORE**: tienda oficial con merchandising universitario, carrito de compras y visor 3D para productos oficiales.

## Tecnologias

- React
- Vite
- React Router DOM
- Tailwind CSS
- Context API
- localStorage
- lucide-react
- react-qr-code
- html5-qrcode instalado para soporte de escaneo QR
- @react-three/fiber, @react-three/drei y three

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm run dev
```

Luego abre la URL local que muestra Vite.

## Funcionalidades principales

- Home con hero, productos destacados y categorias.
- Login y registro simulados con validacion de correos `@aloe.ulima.edu.pe` y `@ulima.edu.pe`.
- Marketplace de alumnos con busqueda, filtros, favoritos y detalle de producto.
- Formulario para publicar, editar y eliminar publicaciones.
- Flujo de compra marketplace con transaccion simulada y sala de entrega QR.
- Vista comprador/vendedor en sala de entrega, con simulacion de escaneo correcto.
- Perfil con reputacion, entregas exitosas, publicaciones activas e historial.
- ULIMA STORE con busqueda, filtros, categorias circulares, carrito y favoritos.
- Detalle de producto oficial con visor 3D interactivo.
- Carrito exclusivo para productos oficiales, con cantidades, total y checkout simulado.

## Partes simuladas

No existe backend, base de datos, Firebase ni Supabase. La app usa datos mock, estado global con Context API y persistencia en `localStorage` para:

- usuario actual
- publicaciones marketplace
- carrito
- favoritos
- transacciones

El lector QR se presenta como flujo demostrable con boton de simulacion. La dependencia `html5-qrcode` esta instalada para poder ampliar el componente a lectura real de camara si se desea.

## Uso de IA en el desarrollo

La IA se uso como apoyo para generar la estructura inicial del proyecto, componentes reutilizables, datos mock, estilos responsive y flujos simulados. La aplicacion esta pensada para ser facil de explicar en una exposicion de Programacion Web: todo ocurre en frontend y cada flujo se puede demostrar sin servicios externos.
