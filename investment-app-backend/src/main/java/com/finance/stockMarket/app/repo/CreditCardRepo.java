package com.finance.stockMarket.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.finance.stockMarket.app.model.CreditCard;

public interface CreditCardRepo extends JpaRepository<CreditCard, Integer> {

	@Query("SELECT o FROM CreditCard o WHERE o.user.username = :username")
	public List<CreditCard> findByUsername(String username);
}
