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

@Service("CalculationService")
public class CalculationServiceImpl implements CalculationService,
        ResourceLoaderAware {

    private static final String propPath = "WEB-INF/classes/calculation.properties";
    private static final String propPathName = "calc-lab-headless-path";
    private static final String propLauncherName = "launcher";
    private ResourceLoader resourceLoader;
    private String calcLabPath;
    private String launcher;

    private void setCalcLabPath() {
        Resource resource = resourceLoader.getResource(propPath);
        Properties prop = new Properties();
        try {
            prop.load(resource.getInputStream());
            calcLabPath = prop.getProperty(propPathName);
            launcher = prop.getProperty(propLauncherName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public String execute(String input) throws Exception {
        String result = "";
        if (calcLabPath == null) {
            setCalcLabPath();
        }
        try {
            String[] command = { "java", "-jar", "plugins/" + launcher, "-t", "json", "-i", input };

            ProcessBuilder calcProcessBuilder = new ProcessBuilder(command);
            calcProcessBuilder.directory(new File(calcLabPath));
            Process calcProcess = calcProcessBuilder.start();
            result = readProcessOutput(calcProcess);
            if (result.startsWith("An error has occurred.")) {
                throw new Exception();
            }
        } catch (IOException e) {
            result = e.getMessage();
            e.printStackTrace();
        }
        return result;
    }

    private String readProcessOutput(Process calcProcess) throws IOException {
        InputStreamReader isr = null;
        BufferedReader br = null;
        try {
            StringBuilder result = new StringBuilder();
            isr = new InputStreamReader(calcProcess.getInputStream(), "UTF8");
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
