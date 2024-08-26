# BattlePokemon

BattlePokemon es un emocionante proyecto que te permite hacer que tus Pokémon luchen entre sí.

## 🚀 Instalación

Sigue estos pasos para configurar y ejecutar el backend de BatlePokemon:

1. Clona el repositorio
```
git clone https://github.com/xNatzhu/battle-pokemon-backend.git
```

2. Acceder al directorio del proyecto:
```
cd battle-pokemon-backend
```
3. Instala las dependencias:
```
npm install
```
4. Inicia el servidor:
```
npm start
```

## 🔨 Implementacion de servicios:

1. Añadir Pokémon a la Base de Datos

Para añadir todos los Pokémon a la base de datos, realiza una solicitud POST 
```
POST: http://localhost:3000/pokemon
```

2. Obtener el Listado de Pokémon
```
GET: http://localhost:3000/pokemon
```

3. Combatir Pokémon
```
POST: http://localhost:3000/battle

En el cuerpo de la solicitud, incluye el siguiente JSON: json { "pokemon1": "pokemon-4", "pokemon2": "pokemon-1" }
```


## 🔨 Tecnologías utilizadas 

- NestJS: Framework para construir el backend.
- Node.js: Entorno de ejecución para el backend.
  

