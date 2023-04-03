package project.moyedream.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/post/*")
@Controller
public class PostController {

    @GetMapping("list")
    public String boardMain(){
        return "/board/board";
    }
}
