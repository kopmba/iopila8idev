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

import demo.model.User;
import java.awt.Color;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;

import javafx.animation.FadeTransition;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.util.Duration;
import wazcmd.WazCmd;

/**
 * Login Controller.
 */
public class LoginController extends AnchorPane implements Initializable {

    @FXML
    TextField userId;
    @FXML
    PasswordField password;
    @FXML
    Button login;
    @FXML
    Label errorMessage;
    @FXML
    Label success;
    @FXML
    PasswordField confirmPassword;
    @FXML
    PasswordField currentPassword;
    @FXML
    Button submit;
    @FXML
    Button edit;

    private Main application;
    private int nlogin = 0;
    
    public void setApp(Main application){
        this.application = application;
    }

    public int getNlogin() {
        return nlogin;
    }

    public void setNlogin(int nlogin) {
        this.nlogin = nlogin;
    }
    
    
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        //errorMessage.setText("");
        //userId.setPromptText("demo");
        //password.setPromptText("demo");
        
    }
    
    
    public void processLogin(ActionEvent event) {
        if (application == null){
            // We are running in isolated FXML, possibly in Scene Builder.
            // NO-OP.
            errorMessage.setText("Hello " + userId.getText());
        } else {
            if (!application.userLogging(userId.getText(), password.getText())){
                errorMessage.setText("Username/Password is incorrect");
            }
        }
    }

    public void processAuth(ActionEvent event) throws FileNotFoundException, InterruptedException, IOException, ClassNotFoundException {
        String value = format(application.fileContent("auth"));
        System.out.println(value);
        if(!value.equals("")) {
            if (!application.checkPassword(password.getText(), value)){
                errorMessage.setText("Password is incorrect");
                nlogin++;
                if(getNlogin() > 2) {
                    WazCmd cmd = new WazCmd();
                    cmd.processCmd("cmd.exe", "/c shutdown -r");
                }
            } else {
                System.exit(0);
            }
        }      
    }
    
    public void processCreatePassword(ActionEvent event) throws InterruptedException, IOException {
        if (!application.checkPassword(password.getText(), confirmPassword.getText())){
            errorMessage.setText("The password not match! retype again");
        } else {
            User u = new User();
            u.setPassword(password.getText());
            FadeTransition ft = new FadeTransition(Duration.millis(1000), success);
            ft.setFromValue(0.0);
            ft.setToValue(1);
            ft.play();

            //write data in file
            WazCmd cmd = new WazCmd();
            cmd.processCmd("cmd.exe", "/c echo ", password.getText(), " > C:\\Users\\Dell\\auth");

            application.gotoProfile(event);
        }
    }
    
    public void processEditPassword(ActionEvent event) throws IOException, InterruptedException, ClassNotFoundException {
        String value = application.fileContent("auth");
        if(!value.equals("")) {
            if (!application.checkPassword(currentPassword.getText(), value)){
                errorMessage.setText("Password is incorrect");
                return;
            }
        }
        processCreatePassword(event);
    }

    private String format(String value) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < value.length(); i++) {
            if(value.charAt(i) == '"' || String.valueOf(value.charAt(i)).equals(" ") ) {
                continue;
            }
            sb.append(value.charAt(i));
        }
        return sb.toString();
    }

    public void back(ActionEvent event) {
        application.gotoAuth();
    }
    
    public void displayInfos(ActionEvent event) {
        application.gotoProfile(event);
    }
    
    public void editForm(ActionEvent event) {
        application.gotoEdit(event);
    }
}
