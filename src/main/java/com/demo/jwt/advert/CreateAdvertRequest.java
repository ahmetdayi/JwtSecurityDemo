package com.demo.jwt.advert;

import java.math.BigDecimal;

public record CreateAdvertRequest(
        String name,

        String title,

        BigDecimal price
) {
}
