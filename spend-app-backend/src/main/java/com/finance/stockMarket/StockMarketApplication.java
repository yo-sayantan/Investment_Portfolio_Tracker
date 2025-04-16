package com.finance.stockMarket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.finance.stockMarket")
@EnableJpaRepositories(basePackages = {
    "com.finance.stockMarket.auth.repo",
    "com.finance.stockMarket.app.repo"
})
public class StockMarketApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockMarketApplication.class, args);
	}

}
