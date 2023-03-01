/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package demo;

import java.io.*;
import java.sql.Date;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.chrono.ChronoLocalDate;
import java.time.chrono.ChronoPeriod;
import java.time.temporal.TemporalAccessor;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalUnit;
import java.util.Timer;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.fxml.JavaFXBuilderFactory;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import demo.model.User;
import demo.security.Authenticator;
import java.beans.XMLDecoder;
import java.beans.XMLEncoder;

import javafx.event.ActionEvent;
import wazcmd.WazCmd;

/**
 * Main Application. This class handles navigation and user session.
 */
public class Main extends Application {

    private Stage stage;
    private User loggedUser;
    private final double MINIMUM_WINDOW_WIDTH = 390.0;
    private final double MINIMUM_WINDOW_HEIGHT = 500.0;

    private boolean checker;
    private LocalTime start;


    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Application.launch(Main.class, (java.lang.String[])null);
    }

    @Override
    public void start(Stage primaryStage) {
        try {
            stage = primaryStage;
            stage.setTitle("FXML Login Sample");
            stage.setMinWidth(MINIMUM_WINDOW_WIDTH);
            stage.setMinHeight(MINIMUM_WINDOW_HEIGHT);
            start = LocalTime.now();
            gotoAuth();
            primaryStage.show();
            starter = new Starter(this, "WazAuthenticator",  0);
            starter.start();
        } catch (Exception ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public User getLoggedUser() {
        return loggedUser;
    }
    public boolean getChecker() {
        return checker;
    }
    private Starter starter;
    public void setChecker(boolean checker) {
        this.checker = checker;
    }

    public LocalTime getStart() {
        return start;
    }

    public Stage getStage() {
        return stage;
    }

    public Starter getStarter() {
        return starter;
    }

    public boolean userLogging(String userId, String password){
        if (Authenticator.validate(userId, password)) {
            loggedUser = User.of(userId);
            gotoProfile(null);
            return true;
        } else {
            return false;
        }
    }
    
    void userLogout(){
        loggedUser = null;
        gotoLogin();
    }

    public boolean checkValue(String password){
        if (password != "") {
            return true;
        } else {
            return false;
        }
    }

    public boolean checkPassword(String password, String cpassword){
        if (password.equals(cpassword)) {

            return true;
        } else {
            return false;
        }
    }

    public void gotoProfile(ActionEvent event) {
        try {
            ProfileController profile = (ProfileController) replaceSceneContent("profile.fxml");
            profile.setApp(this);
        } catch (Exception ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void gotoEdit(ActionEvent event) {
        try {
            LoginController login = (LoginController) replaceSceneContent("auth_edit_.fxml");
            login.setApp(this);
        } catch (Exception ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void gotoLogin() {
        try {
            LoginController login = (LoginController) replaceSceneContent("login.fxml");
            login.setApp(this);
        } catch (Exception ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void gotoAuth() {
        try {
            //starter.start();
            LoginController login = null;
            //Object value = deserialize("auth");
            String value = fileContent("auth");
            if(!value.equals("")) {
                login = (LoginController) replaceSceneContent("authenticator.fxml");
                setChecker(true);
            }else {
                login = (LoginController) replaceSceneContent("auth_.fxml");
            }
            login.setApp(this);

            //setTimeChecker(checker);
        } catch (Exception ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void serialize(String filename, Object data) throws IOException {
        File file = new File("C:\\Users\\Dell\\".concat(filename));
        if(!file.exists()) {
            file.createNewFile();
        }
        XMLEncoder e = new XMLEncoder(
                new BufferedOutputStream(
                        new FileOutputStream(filename)));
        if(data != null) {
            e.writeObject(data);
        }
        e.close();
    }
    
    public Object deserialize(String filename) throws IOException, InterruptedException {
        XMLDecoder d = new XMLDecoder(
                new BufferedInputStream(
                        new FileInputStream("C:\\Users\\Dell\\".concat(filename))));
        if(checkFileContent(filename)) {
            return null;
        } else {
            Object result = d. readObject();
            d.close();
            return result;
        }

    }

    public void setTimeChecker(boolean checking, Starter starter) {
        int period = (int) Duration.between(this.getStart(), LocalTime.now()).getSeconds();
        starter.setSeconds(period);
        if(period >= 5) {
            WazCmd cmd = new WazCmd();
            //cmd.processCmd("cmd.exe", "shutdown", "-r");
            System.exit(1);
        }
    }

    public boolean checkFileContent(String filename) throws IOException {

        return fileContent(filename).equals("");
    }

    public String fileContent(String filename) throws IOException {
        File f = new File("C:\\Users\\Dell\\".concat(filename));

        FileReader fr = new FileReader(f);
        BufferedReader br = new BufferedReader(fr);
        String line = "";
        StringBuilder sb = new StringBuilder();
        while((line = br.readLine()) != null) {
            sb.append(line);
        }
        return sb.toString();
    }


    private Initializable replaceSceneContent(String fxml) throws Exception {
        FXMLLoader loader = new FXMLLoader();
        InputStream in = Main.class.getResourceAsStream(fxml);
        loader.setBuilderFactory(new JavaFXBuilderFactory());
        loader.setLocation(Main.class.getResource(fxml));
        AnchorPane page;
        try {
            page = (AnchorPane) loader.load(in);
        } finally {
            in.close();
        } 
        Scene scene = new Scene(page, 800, 600);
        stage.setScene(scene);
        stage.sizeToScene();
        return (Initializable) loader.getController();
    }
}
