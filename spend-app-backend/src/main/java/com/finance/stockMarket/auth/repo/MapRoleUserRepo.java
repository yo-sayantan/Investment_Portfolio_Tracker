package com.finance.stockMarket.auth.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.finance.stockMarket.auth.model.MFUser;
import com.finance.stockMarket.auth.model.MapRoleUser;

public interface MapRoleUserRepo extends JpaRepository<MapRoleUser, Integer>{
	public MapRoleUser findByUser(MFUser user);
}