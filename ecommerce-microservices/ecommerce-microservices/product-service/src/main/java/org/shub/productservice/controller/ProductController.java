package org.shub.productservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.shub.productservice.dto.ApiResponse;
import org.shub.productservice.dto.ProductRequest;
import org.shub.productservice.dto.ProductResponse;
import org.shub.productservice.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> create(@Valid @RequestBody ProductRequest request) {
        ProductResponse created = productService.create(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(ApiResponse.success(created));
    }

    @GetMapping
    public ApiResponse<Page<ProductResponse>> getAll(Pageable pageable) {
//        return ApiResponse.success(new PagedModel<ProductResponse>(productService.getAll(pageable)));
        return ApiResponse.success(productService.getAll(pageable));
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductResponse> getById(@PathVariable Long id) {
        return ApiResponse.success(productService.getById(id));
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductResponse> update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return ApiResponse.success(productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ApiResponse.success(null);
    }
}
