//Apagar tudo: 
/*
    COMANDOS DOCKER
docker ps: Exibe os containers que estão de pé
docker ps -a: Exibe todos os containers existentes

docker start IdDoContainer: Executar um container 
docker stop IdDoContainer: Parar um container 
docker rm IdDoContainer: Remover um container

docker exec -it IdContainer ou nomeAplicação: Acessar a máquina de um container
docker logs nomeAplicação: Ver os ultimos logs
docker logs nomeAplicação -f: Ver os logs e manter eles sendo observador no console


    COMANDOS DOCKER-COMPOSE
docker-compose up -d: Executar container em background
docker-compose up: Executar container
docker-compose stop: Parar container
docker-compose down: Remover um container
docker-compose up --force-recreate: Recriar e subir o container com base no docker-compose
*/


// CRIAR migrations: .\node_modules\.bin\typeorm migrations:create -n CreateUsers
// Executar migrations: npm run typeorm migration:run


//instalar typeorm: npm i typeorm reflect-metadata

//biblioteca injeção de dependencias npm i tsyringe --save