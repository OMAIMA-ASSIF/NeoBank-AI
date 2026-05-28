package net.omaima.chatbottelegram;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class  ChatbotTelegramApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().load();
        System.setProperty("OPENAI_API_KEY", dotenv.get("OPENAI_API_KEY"));
        SpringApplication.run(ChatbotTelegramApplication.class, args);
    }
}