<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

#TesloDB API

1. Clonar el proyecto 
2. ```yarn install```
3. Clonar el archivo ```.env.template``` y remobrarlo a ```.env```
4. Cambiar las variables de entorno según la necesidad
5. Levantar la base de datos
```
docker-compose up -d 
```

6. Ejecutar Seed para alimentar la base de datos 
```
http://localhost:3000/api/seed
```

7. Levanta el modo desarrollo: ```yarn start:dev```