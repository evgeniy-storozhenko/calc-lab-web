package com.calclab.web.service;

public interface CalculationService {

	String execute(String input) throws Exception;

	String functions() throws Exception;

	String constants() throws Exception;

}
