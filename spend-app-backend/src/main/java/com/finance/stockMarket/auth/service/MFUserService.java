package com.finance.stockMarket.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.stockMarket.auth.model.MFUser;
import com.finance.stockMarket.auth.repo.MFUserRepo;

@Service
public class MFUserService {
	
	@Autowired
	private MFUserRepo userRepo;
	
	public MFUser getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}
	
	public List<MFUser> findAllUsers() {
		return userRepo.findAll();
	}
}
