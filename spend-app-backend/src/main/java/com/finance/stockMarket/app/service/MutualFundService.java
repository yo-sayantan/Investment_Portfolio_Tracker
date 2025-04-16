package com.finance.stockMarket.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.stockMarket.app.model.MutualFund;
import com.finance.stockMarket.app.repo.MutualFundRepo;

@Service
public class MutualFundService {

	@Autowired
	private MutualFundRepo mutualfundRepo;

	public List<MutualFund> findAllMutualFunds() {
		return mutualfundRepo.findAll();
	}
	
	public void saveMutualFund(MutualFund fund) {
		mutualfundRepo.save(fund);
	}
}
