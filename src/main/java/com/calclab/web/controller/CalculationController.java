package com.calclab.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.calclab.web.service.CalculationService;

@Controller
@RequestMapping("/calculationService")
public class CalculationController {

    @Autowired
    private CalculationService calculationService;

    @RequestMapping(value = "/execute", method = RequestMethod.POST, produces="application/json")
    public @ResponseBody
    String execute(@RequestParam(value = "input") String input) throws Exception {
        return calculationService.execute(input);
    }

    @RequestMapping(value = "/functions", method = RequestMethod.GET, produces="application/json")
    public @ResponseBody
    String functions()throws Exception {
        return calculationService.functions();
    }

    @RequestMapping(value = "/constants", method = RequestMethod.GET, produces="application/json")
    public @ResponseBody
    String constants()throws Exception {
        return calculationService.constants();
    }

}