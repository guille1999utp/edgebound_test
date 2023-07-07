## Prueba Tecnica EdgeBound

para ejecutar los dos proyectos entramos al directorio raiz de cada uno e instalamos las dependencias:

```bash

cd backend

npm install --save

node index.js
# and

cd  frontend

npm install 

npm run dev
```

## TEST

*Prueba Backend
Se requiere elaborar un servicio REST con las tecnologías (Node.JS) el cual tendrá las
siguientes consideraciones:
Servicio REST GET (simulador de búsqueda ecommerce)
El servicio debe responder con un listado de productos (encontrados y sugeridos)
Para los productos encontrados debe basarse en el parámetro “filter” de tipo String que
este tenga coincidencia con el atributo nombre del producto
Para los productos sugeridos debe regresar 2 productos de la misma categoría
{
"product": [{
"name": "Samsung Galaxy",
"category": "electronics"
}, {
"name": "Motorola V3",
"category": "electronics"
}, {
"name": "Iphone 12",
"category": "electronics"
}, {
"name": "Skippy",
"category": "grocery store"
}]
}

*Prueba Front
Se requiere del diseño de una pantalla con las tecnologías (React.js, bootstrap) que
consuma la API https://pokeapi.co/ para realizar la búsqueda y representación de los
datos en los diferentes navegadores.
Ejemplo: https://pokeapi.co/api/v2/pokemon/ditto
Debe mostrar la información de la búsqueda en pantalla con un diseño e interfaz
agradable para el usuario


## Resultados (Backend)

en este ejercicio cuando se vaya a buscar un elemento tiene que ser en la ruta:

/search?filter=

para poder buscar los productos de manera adecuada, tambien se debe tener en cuenta que 
que si el producto ya aparece en la primera busqueda en productos en la parte de sugerencias 
no aparecera, en ese caso si solo hay dos productos de una categoria y ya uno esta en productos
en sugerencia no tendria sentido que apareciera, lo mismo pasaria si los dos productos estuvieran en 
la llave producto, no habria sugerencias ya que los dos estarian al otro lado, tambien
esta configurado para meter mas datos en caso tal de exactitud, para lograr eso simplemente agregue
los nuevos datos en la ruta:

backend/src/database/products.json
