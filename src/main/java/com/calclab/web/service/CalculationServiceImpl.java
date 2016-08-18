package com.calclab.web.service;

import org.springframework.stereotype.Service;

@Service("CalculationService")
public class CalculationServiceImpl implements CalculationService {

    private static final CalcLabBridge bridge = new CalcLabBridge();

    public String execute(String input) throws Exception {
        return bridge.execute(input);
    }

    public String functions() throws Exception {
        return bridge.functions();
    }

    public String constants() throws Exception {
        return null;
    }

}
