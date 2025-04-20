package com.finance.stockMarket.auth.service;

import java.security.SecureRandom;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.finance.stockMarket.auth.config.UserPrincipal;
import com.finance.stockMarket.auth.dto.AuthenticationRequest;
import com.finance.stockMarket.auth.dto.AuthenticationResponse;
import com.finance.stockMarket.auth.dto.SignUpRequestDTO;
import com.finance.stockMarket.auth.dto.SignUpResponseDTO;
import com.finance.stockMarket.auth.memory.Tokens;
import com.finance.stockMarket.auth.memory.UserOTPs;
import com.finance.stockMarket.auth.model.MFRole;
import com.finance.stockMarket.auth.model.MFUser;
import com.finance.stockMarket.auth.model.MapRoleUser;
import com.finance.stockMarket.auth.model.OTPDetails;
import com.finance.stockMarket.auth.model.Token;
import com.finance.stockMarket.auth.repo.MFUserRepo;
import com.finance.stockMarket.auth.repo.MapRoleUserRepo;
import com.finance.stockMarket.auth.repo.RoleRepo;
import com.finance.stockMarket.sms.service.EmailService;

@Service
public class AuthenticationService {

	private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private MFUserRepo userRepo;
	@Autowired
	private MapRoleUserRepo mapRoleUserRepo;
	@Autowired
	private RoleRepo roleRepo;
	@Autowired
	private EmailService emailService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final SecureRandom secureRandom = new SecureRandom();
	private static final int OTP_LENGTH = 6;
	private static final long OTP_EXPIRATION_TIME_MS = 5 * 60 * 1000;

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
		var jwtToken = jwtService.generateToken(user);

		saveUserToken(user, jwtToken);
		removeUserPassword(user);
		return new AuthenticationResponse(jwtToken, user);
	}

	private void removeUserPassword(UserDetails user) {
		if (user instanceof UserPrincipal) {
			UserPrincipal up = (UserPrincipal) user;
			up.setPassword(null);
			user = up;
		}
	}

	private void saveUserToken(UserDetails user, String jwtToken) {
		Token token = new Token();
		token.setToken(jwtToken);
		token.setUser(user);
		token.setExpired(false);
		Tokens.tokenMap.put(jwtToken, token);
	}

	public UserDetails getUserDetailsByToken(String token) throws Exception {
		if (Tokens.tokenMap.get(token) == null) {
			throw new Exception("token not found");
		}

		String userName = jwtService.extractUsername(token);
		UserDetails user = userDetailsService.loadUserByUsername(userName);
		removeUserPassword(user);
		return user;
	}

	public SignUpResponseDTO signup(SignUpRequestDTO request) {
		if (userRepo.existsByUsernameAndIsActive(request.getUsername(), true)) {
			return new SignUpResponseDTO(request.getUsername() + " already exists", false);
		}
		if (userRepo.existsByEmailAndIsActive(request.getEmailId(), true)) {
			return new SignUpResponseDTO(request.getEmailId() + " already exists", false);
		}

		MFUser user = new MFUser();
		user.setEmail(request.getEmailId());
		user.setFullname(request.getFullName());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setPhonenumber(request.getPhoneNumber());
		user.setUsername(request.getUsername());
		user.setIsActive(false);
		user = userRepo.save(user);
		MapRoleUser mapRoleUser = saveMapRoleUser(user);

		if (!sendOTPEmailandSave(request.getEmailId(), request.getUsername(), request.getFullName())) {
			removeUserAndRoleMapping(user, mapRoleUser);
			return new SignUpResponseDTO("Failed to send OTP. Please try again.", false);
		}
		return new SignUpResponseDTO(request.getUsername(), request.getEmailId(),
				"OTP is sent to the registered email ID", true);
	}

	private MapRoleUser saveMapRoleUser(MFUser user) {
		MFRole role = roleRepo.getReferenceById(2);
		MapRoleUser mapRoleUser = new MapRoleUser();
		mapRoleUser.setRole(role);
		mapRoleUser.setUser(user);
		return mapRoleUserRepo.save(mapRoleUser);
	}

	private boolean sendOTPEmailandSave(String emailId, String username, String fullName) {
		try {
			log.info("sending otp for " + username);
			OTPDetails otp = new OTPDetails(generateOTP(), OTP_EXPIRATION_TIME_MS);
			UserOTPs.getInstance().addOtp(username, otp);
			String subject = fullName + "! Here is your OTP";
			String body = otp.getOtp()
					+ " is your OTP for Portfolio Tracker Application. Please do not share to anyone.\nSignup is valid for 5 minutes.\n\n"
					+ "Thank you,\nPortfolio Tracker Team";
			emailService.sendEmail(emailId, subject, body);
		} catch (Exception e) {
			log.error("Error while sending OTP.", e);
			return false;
		}
		return true;
	}

	private static String generateOTP() throws Exception {
		StringBuilder otp = new StringBuilder();
		for (int i = 0; i < OTP_LENGTH; i++) {
			otp.append(secureRandom.nextInt(10));
		}
		return otp.toString();
	}

	private void removeUserAndRoleMapping(MFUser user, MapRoleUser mapRoleUser) {
		mapRoleUserRepo.delete(mapRoleUser);
		userRepo.delete(user);
	}

	public SignUpResponseDTO verifyotp(SignUpRequestDTO request) {
		OTPDetails otp = UserOTPs.getInstance().getOtp(request.getUsername());

		if (otp != null
				&& (otp.getExpirationTime() > System.currentTimeMillis() || otp.getOtp().equals(request.getOtp()))) {
			MFUser user = userRepo.findByUsername(request.getUsername());
			user.setIsActive(true);
			userRepo.save(user);

			UserOTPs.getInstance().removeOtp(request.getUsername());
			return new SignUpResponseDTO(request.getUsername(), request.getEmailId(), "Signup successful please login",
					true);
		} else if (otp != null && otp.getExpirationTime() < System.currentTimeMillis()) {
			UserOTPs.getInstance().removeOtp(request.getUsername());
			return new SignUpResponseDTO(request.getUsername(), request.getEmailId(), "OTP Expired", false);
		}

		return new SignUpResponseDTO(request.getUsername(), request.getEmailId(), "Incorrect OTP", false);
	}

}