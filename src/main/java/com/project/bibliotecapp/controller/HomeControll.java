package com.project.bibliotecapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class HomeControll {

    ModelAndView mv = new ModelAndView();

    @GetMapping("/")
    public ModelAndView index() {
        mv.setViewName("index.html");
        return mv;
    }
    
    //chamar a pag login.html
    @GetMapping("/login")
    public ModelAndView login() {
        mv.setViewName("login.html");
        return mv;
    }

    //chamar a pag signup.html
    @GetMapping("/signup")
    public ModelAndView signup() {
        mv.setViewName("signup.html");
        return mv;
    }

    //chamar a pag about.html
    @GetMapping("/about")
    public ModelAndView about() {
        mv.setViewName("about.html");
        return mv;
    }


}
