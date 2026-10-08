package org.shub.productservice.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank(message = "name is required") String name,
        String description,
        @NotNull(message = "price is required")
        @DecimalMin(value = "0.0", message = "price must be >= 0")
        BigDecimal price,
        @NotNull(message = "quantity is required")
        @Min(value = 0, message = "quantity must be >= 0")
        Integer quantity
) {
}
