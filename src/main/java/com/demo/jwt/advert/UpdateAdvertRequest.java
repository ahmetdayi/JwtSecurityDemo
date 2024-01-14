package com.demo.jwt.advert;

import java.math.BigDecimal;

public record UpdateAdvertRequest(
        String id,
        String name,
        String title,
        BigDecimal price
) {
}
