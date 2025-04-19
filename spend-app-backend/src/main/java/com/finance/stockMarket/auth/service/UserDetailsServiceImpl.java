package com.finance.stockMarket.auth.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.finance.stockMarket.auth.config.UserPrincipal;
import com.finance.stockMarket.auth.model.MFUser;
import com.finance.stockMarket.auth.model.MapRoleUser;
import com.finance.stockMarket.auth.repo.MFUserRepo;
import com.finance.stockMarket.auth.repo.MapRoleUserRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private MFUserRepo userRepo;
	@Autowired
	private MapRoleUserRepo mapRoleUserRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MFUser user = userRepo.findBYUsernameAndISActive(username);
		if (user == null)
			throw new UsernameNotFoundException(username + " not found");

		MapRoleUser mapRoleUser = mapRoleUserRepo.findByUser(user.getId());

		return new UserPrincipal(user.getId(), user.getUsername(), user.getPassword(),
				mapRoleUser.getRole().getRoleName(), user.getFullname());
	}
	

}