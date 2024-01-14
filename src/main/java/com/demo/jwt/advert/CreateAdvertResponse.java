package com.demo.jwt.advert;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record CreateAdvertResponse(
        String id,
        String name,

        String title,

        BigDecimal price
) {
}
