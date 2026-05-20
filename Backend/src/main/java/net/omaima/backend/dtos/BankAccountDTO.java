package net.omaima.backend.dtos;

import lombok.Data;
//so Jackson can serialize the concrete subtype correctly.
@Data
public class BankAccountDTO {
    private String type;
}
