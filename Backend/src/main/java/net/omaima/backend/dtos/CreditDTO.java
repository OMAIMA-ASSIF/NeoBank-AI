package net.omaima.backend.dtos;

import lombok.Data;

@Data
public class CreditDTO {
    private String id;
    private double amount;
    private String description;
}
