package net.omaima.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import net.omaima.backend.dtos.CustomerDTO;
import net.omaima.backend.enums.AccountStatus;

import java.util.Date;

@Data
public class SavingBankAccountDTO extends BankAccountDTO
{
    private String id;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private CustomerDTO customerDTO;
    private double interestRate;

}
