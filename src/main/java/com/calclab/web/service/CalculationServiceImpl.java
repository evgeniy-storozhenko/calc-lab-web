package com.calclab.web.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.calclab.web.model.CalcResult;

@Service("CalculationService")
public class CalculationServiceImpl implements CalculationService, ResourceLoaderAware {

    private static final String propPath = "WEB-INF/classes/calculation.properties";
    private static final String propName = "calc-lab-headless-path";
    private ResourceLoader resourceLoader;
    private String calcLabPath;

    private void setCalcLabPath() {
        Resource resource = resourceLoader.getResource(propPath);
        Properties prop = new Properties();
        try {
            prop.load(resource.getInputStream());
            calcLabPath = prop.getProperty(propName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public CalcResult execute(String input) {
        String result = "";
        if (calcLabPath == null) {
            setCalcLabPath();
        }
        String command =  calcLabPath + "/calclab.sh";

        try {
            ProcessBuilder calcProcessBuilder = new ProcessBuilder("/bin/sh", command, "-i", input);
            calcProcessBuilder.directory(new File(calcLabPath));
            Process calcProcess = calcProcessBuilder.start();
            result = readProcessOutput(calcProcess);
        } catch (IOException e) {
            result = e.getMessage();
            e.printStackTrace();
        }

        return new CalcResult(result);
    }

    private String readProcessOutput(Process calcProcess) throws IOException {
        InputStreamReader isr = null;
        BufferedReader br = null;
        try {
            StringBuilder result = new StringBuilder();
            isr = new InputStreamReader(calcProcess.getInputStream());
            br = new BufferedReader(isr);
            String line;
            while ((line = br.readLine()) != null) {
                result.append(line);
                result.append(System.lineSeparator());
            }
            return result.toString();
        } finally {
            if (br != null) {
                br.close();
            }
            if (isr != null) {
                isr.close();
            }
        }
    }
}
