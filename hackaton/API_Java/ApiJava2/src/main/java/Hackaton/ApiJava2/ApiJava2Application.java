package Hackaton.ApiJava2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiJava2Application {

	public static void main(String[] args) {
		SpringApplication.run(ApiJava2Application.class, args);
	}

}

/*
* Processo de construção da API
* 1 - Iniciar um projeto através do spring Initializing (O projeto deve possuir o mesmo java instalado, além dos pacotes que vc deseja ter ex: MySQL driver)
* 2 - Crie seus controllers e seus models
* 3 - Crie seu Repository para criar uma interface com os pacotes de CRUD, assim vc pode usar os métodos da biclioteca
* 4 - na pasta sources e application.properties, add as configurações do banco de dados (MySQL)
* 5 - Execute a aplicação e verifica se a rota está funcionando, ex: localhost:8080/api/status
*
* */
