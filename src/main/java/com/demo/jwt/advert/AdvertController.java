package com.demo.jwt.advert;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/advert")
@RestController
@RequiredArgsConstructor
public class AdvertController {

    private final AdvertService advertService;

    @PostMapping("/create")
    public ResponseEntity<CreateAdvertResponse> create(@RequestBody CreateAdvertRequest request) {
        return new ResponseEntity<>(advertService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Void> update(UpdateAdvertRequest request) {
        advertService.update(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        advertService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Advert>> findAll(){
        return new ResponseEntity<>(advertService.findAll(),HttpStatus.OK);
    }
}