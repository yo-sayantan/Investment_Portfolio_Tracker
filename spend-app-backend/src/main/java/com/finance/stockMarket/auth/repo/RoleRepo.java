package com.finance.stockMarket.auth.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.finance.stockMarket.auth.model.MFRole;

public interface RoleRepo extends JpaRepository<MFRole, Integer>{

}