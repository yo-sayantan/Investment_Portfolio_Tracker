package com.finance.SugerMarket.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.SugerMarket.auth.model.MFUser;
import com.finance.SugerMarket.auth.repo.MFUserRepo;

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
