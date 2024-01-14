package com.demo.jwt.advert;


import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvertRepository extends JpaRepository<Advert,String> {
}
