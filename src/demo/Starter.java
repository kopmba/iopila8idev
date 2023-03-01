package demo;

import javafx.application.Application;
import wazcmd.WazCmd;

import javax.swing.*;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;

public class Starter  extends Thread {
    private int seconds;
    private String name;

    private Main application;
    public Starter(Main app, String name, int s) {
        this.application = app;
        this.name = name;
        seconds = s;
    }

    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }

    public int getSeconds() {
        return seconds;
    }

    @Override
    public synchronized void start() {
        super.start();
        if(application.getChecker()) {
            int period = (int) Duration.between(application.getStart(), LocalTime.now()).getSeconds();
            setSeconds(period);
            new Timer(60000, (e) -> {
                WazCmd cmd = new WazCmd();
                try {
                    cmd.processCmd("cmd.exe", "/c shutdown -r");
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                } catch (InterruptedException ex) {
                    throw new RuntimeException(ex);
                }
            }).start();
        }
    }
}
