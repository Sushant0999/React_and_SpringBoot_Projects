package com.notes.keep.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Loggers {

    public static Logger logger = LoggerFactory.getLogger(Loggers.class);

    public static void info(String msg){
        logger.info(msg);
    }

}
